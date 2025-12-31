import { inngest } from '~/inngest/client';
import { z } from 'zod';
import { createFileRoute } from '@tanstack/react-router';

const schema = z.object({
  resultId: z.string().uuid(),
  birthDate: z.string().datetime(),
  vibrationNumber: z.number().min(1).max(9),
  userPhotoBase64: z.string().optional(),
});

export const Route = createFileRoute('/api/generate')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const data = schema.parse(body);

          await inngest.send({
            name: 'myyear/image.generate',
            data,
          });

          return new Response(JSON.stringify({ success: true, resultId: data.resultId }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (error) {
          if (error instanceof z.ZodError) {
            return new Response(JSON.stringify({ error: error.errors }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      },
    },
  },
});
