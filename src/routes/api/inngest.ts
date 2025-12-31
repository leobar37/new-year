import { createFileRoute } from '@tanstack/react-router';
import { serve } from 'inngest/edge';
import { inngest } from '~/inngest/client';
import { inngestFunctions } from '~/inngest/functions/generate-image';

// Create the Inngest serve handler using the edge adapter
// This returns a (req: Request) => Promise<Response> function
const inngestHandler = serve({
  client: inngest,
  functions: inngestFunctions,
});

// Server route to serve Inngest functions
export const Route = createFileRoute('/api/inngest')({
  server: {
    handlers: {
      GET: async ({ request }) => inngestHandler(request),
      POST: async ({ request }) => inngestHandler(request),
      PUT: async ({ request }) => inngestHandler(request),
    },
  },
});
