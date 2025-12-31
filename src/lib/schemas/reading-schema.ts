import { z } from 'zod';

/**
 * Structured schema for AI-generated numerology reading
 * Used with generateObject for type-safe responses
 */
export const readingSchema = z.object({
  // Headline for intro section
  headline: z.string().describe('A captivating headline like "2026 será tu año de..." (max 10 words)'),

  // Main overview reading
  overview: z.string().describe('General reading for 2026 (2-3 paragraphs, mystical but accessible)'),

  // Life area predictions
  loveLife: z.string().describe('Love and relationships prediction for 2026 (1-2 paragraphs)'),
  career: z.string().describe('Career and work prediction for 2026 (1-2 paragraphs)'),
  health: z.string().describe('Health and wellness prediction for 2026 (1-2 paragraphs)'),
  spirituality: z.string().describe('Spiritual growth prediction for 2026 (1-2 paragraphs)'),

  // Structured advice
  advice: z.array(z.object({
    area: z.string().describe('Life area: Amor, Trabajo, Salud, Espíritu, Finanzas'),
    tip: z.string().describe('Specific actionable advice (1-2 sentences)'),
    icon: z.string().describe('Single emoji that represents this advice'),
  })).length(5).describe('Exactly 5 pieces of advice covering different life areas'),

  // Personalized new year message
  newYearMessage: z.string().describe('Warm, personalized new year message addressing the person by name (2-3 sentences)'),

  // Inspirational mantra for the year
  mantra: z.string().describe('A short inspirational phrase/mantra to remember throughout 2026 (max 12 words)'),
});

export type StructuredReading = z.infer<typeof readingSchema>;

/**
 * Schema for the complete result including metadata
 */
export const resultSchema = z.object({
  resultId: z.string(),
  status: z.enum(['pending', 'processing', 'completed', 'error']),
  vibrationNumber: z.number().min(1).max(9),
  userName: z.string().optional(),
  reading: readingSchema,
  imageUrl: z.string().url().optional(),
  createdAt: z.string().datetime().optional(),
});

export type CompleteResult = z.infer<typeof resultSchema>;
