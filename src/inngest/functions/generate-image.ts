import { inngest } from '../client';
import { google } from '@ai-sdk/google';
import { generateText, generateObject } from 'ai';
import { generateImagePrompt, generateStructuredReadingPrompt } from '~/lib/prompts';
import { getVibration } from '~/lib/vibrations';
import { saveImageToBlob } from '~/lib/blob';
import { db } from '~/db/client';
import { results } from '~/db/schema';
import { eq } from 'drizzle-orm';
import { readingSchema, type StructuredReading } from '~/lib/schemas/reading-schema';

type ImageGenerationResult = {
  success: boolean;
  error: string | null;
  url: string | null;
};

export const generateImageFunction = inngest.createFunction(
  {
    id: 'generate-vibration-image',
    name: 'Generate Vibration Image',
    retries: 2,
  },
  { event: 'myyear/image.generate' },
  async ({ event, step }) => {
    const { resultId, userName, vibrationNumber, birthDate, userPhotoBase64 } = event.data;

    const vibration = getVibration(vibrationNumber);
    if (!vibration) {
      throw new Error(`Invalid vibration number: ${vibrationNumber}`);
    }

    // Save initial result to DB
    await step.run('save-initial-result', async () => {
      await db.insert(results).values({
        resultId,
        userName,
        birthDate: new Date(birthDate),
        vibrationNumber,
        status: 'processing',
      }).onConflictDoNothing();
    });

    // Generate structured reading using generateObject
    const readingResult = await step.run('generate-structured-reading', async (): Promise<StructuredReading> => {
      const result = await generateObject({
        model: google('gemini-2.0-flash-exp'),
        schema: readingSchema,
        system: generateStructuredReadingPrompt(vibration, userName),
        prompt: `Genera una lectura numerológica completa y personalizada para ${userName} con número de vibración ${vibrationNumber} (${vibration.name}) para el año 2026. Incluye todos los campos requeridos: headline, overview, loveLife, career, health, spirituality, advice (5 consejos), newYearMessage y mantra.`,
      });
      return result.object;
    });

    // Generate image
    const imageResult = await step.run('generate-image', async (): Promise<ImageGenerationResult> => {
      try {
        const prompt = generateImagePrompt(vibration, !!userPhotoBase64);
        
        // Build request config based on whether we have a reference image
        let result;
        if (userPhotoBase64) {
          // Use messages format to include reference image
          // Handle both raw base64 and data URL format
          const imageData = userPhotoBase64.includes(',') 
            ? userPhotoBase64.split(',')[1] 
            : userPhotoBase64;
          
          result = await generateText({
            model: google('gemini-2.5-flash-image-preview'),
            messages: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: prompt },
                  { 
                    type: 'image', 
                    image: imageData,
                  },
                ],
              },
            ],
          });
        } else {
          // Simple prompt without reference image
          result = await generateText({
            model: google('gemini-2.5-flash-image-preview'),
            prompt,
          });
        }

        // Cast to access file properties (v4.x SDK)
        const imageFile = result.files?.find(file => {
          const f = file as { mimeType?: string };
          return f.mimeType?.startsWith('image/');
        }) as { base64?: string; mimeType?: string } | undefined;

        if (!imageFile) {
          console.log('[generate-image] No image file found in response');
          return { success: false, error: 'No image in response', url: null };
        }
        
        if (!imageFile.base64) {
          console.log('[generate-image] Image file has no base64 data');
          return { success: false, error: 'No base64 data', url: null };
        }

        console.log('[generate-image] Image found, mimeType:', imageFile.mimeType);

        // Extract pure base64 (remove data URL prefix if present)
        let base64Data = imageFile.base64;
        if (base64Data.includes(',')) {
          base64Data = base64Data.split(',')[1];
        }

        console.log('[generate-image] Uploading to Vercel Blob...');
        
        // Upload directly to Vercel Blob
        const blobUrl = await saveImageToBlob(base64Data, resultId);
        
        console.log('[generate-image] Upload success:', blobUrl);
        return { success: true, error: null, url: blobUrl };
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        console.error('[generate-image] Error:', errorMsg);
        return { success: false, error: errorMsg, url: null };
      }
    });

    // Update DB with all results
    const dbResult = await step.run('save-to-database', async () => {
      console.log('[save-to-database] Saving results...');
      console.log('[save-to-database] Image result:', imageResult);
      
      await db.update(results)
        .set({
          reading: readingResult,
          imageBlobPath: imageResult.url,
          status: 'completed',
        })
        .where(eq(results.resultId, resultId));
      
      return { 
        success: true, 
        message: `Saved: reading structured, image=${!!imageResult.url}` 
      };
    });

    return {
      reading: readingResult,
      imageUrl: imageResult.url,
      imageError: imageResult.error,
      dbResult,
    };
  }
);

export const inngestFunctions = [generateImageFunction];
