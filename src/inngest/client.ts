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
      userName: string;
      birthDate: string;
      vibrationNumber: number;
      userPhotoBase64?: string;
    };
  };
};
