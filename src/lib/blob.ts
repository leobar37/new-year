import { put } from '@vercel/blob';

export async function saveImageToBlob(base64Data: string, resultId: string): Promise<string> {
  // Convert base64 to Buffer
  const buffer = Buffer.from(base64Data, 'base64');

  // Generate unique filename
  const filename = `${resultId}.png`;

  // Upload to Vercel Blob
  const blob = await put(filename, buffer, {
    access: 'public',
    contentType: 'image/png',
  });

  return blob.url;
}
