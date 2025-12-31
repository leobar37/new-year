import { db } from '~/db/client';
import { results } from '~/db/schema';
import { eq } from 'drizzle-orm';
import { createFileRoute } from '@tanstack/react-router';
import { type StructuredReading } from '~/lib/schemas/reading-schema';

export const Route = createFileRoute('/api/results/$resultId')({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const { resultId } = params;
        const url = new URL(request.url);
        const includeImage = url.searchParams.get('includeImage') === 'true';

        const result = await db.query.results.findFirst({
          where: eq(results.resultId, resultId),
        });

        if (!result) {
          return new Response(JSON.stringify({ error: 'Result not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify({
          resultId: result.resultId,
          status: result.status,
          vibrationNumber: result.vibrationNumber,
          userName: result.userName || 'Viajero',
          reading: result.reading as StructuredReading,
          imageUrl: includeImage && result.imageBlobPath ? result.imageBlobPath : undefined,
          createdAt: result.createdAt,
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
