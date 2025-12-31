import { Inngest } from 'inngest';

/**
 * Inngest client for background job processing
 * Used primarily for AI image generation which can take 10-30 seconds
 */
export const inngest = new Inngest({
  id: 'myyear',
  name: 'MyYear - Tu Vibración 2026',
});

/**
 * Event types for type safety
 */
export type InngestEvents = {
  'myyear/image.generate': {
    data: {
      resultId: string;
      vibrationNumber: number;
      vibrationName: string;
      imageKeywords: string[];
      userPhotoBase64?: string;
    };
  };
};
