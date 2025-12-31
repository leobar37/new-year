import { inngest } from '~/inngest/client';

export async function startImageGeneration(params: {
  resultId: string;
  birthDate: string;
  vibrationNumber: number;
  userPhotoBase64?: string;
}) {
  await inngest.send({
    name: 'myyear/image.generate',
    data: params,
  });
}
