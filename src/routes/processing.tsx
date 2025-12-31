import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, AlertCircle } from 'lucide-react';
import { getLoadingMessage } from '~/lib/prompts';

export const Route = createFileRoute('/processing')({
  component: ProcessingPage,
  validateSearch: (search: Record<string, unknown>) => ({
    resultId: typeof search.resultId === 'string' ? search.resultId : '',
  }),
});

function ProcessingPage() {
  const router = useRouter();
  const search = Route.useSearch();
  const resultId = search.resultId;

  const [loadingMessage, setLoadingMessage] = useState(getLoadingMessage());
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resultId) return;

    // Rotate loading messages
    const interval = setInterval(() => {
      setLoadingMessage(getLoadingMessage());
    }, 3000);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 15, 95));
    }, 1500);

    // Poll for completion
    const checkCompletion = async () => {
      try {
        const response = await fetch(`/api/results/${resultId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'completed') {
            setProgress(100);
            // Redirect to new experience route instead of result
            router.navigate({ to: '/experience/$resultId', params: { resultId } });
          } else if (data.status === 'error') {
            setError('Hubo un error generando tu lectura. Por favor intenta de nuevo.');
            clearInterval(interval);
            clearInterval(progressInterval);
            clearInterval(pollInterval);
          }
        }
      } catch (err) {
        console.error('Error checking status:', err);
      }
    };

    const pollInterval = setInterval(checkCompletion, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearInterval(pollInterval);
    };
  }, [resultId, router]);

  if (!resultId) {
    return (
      <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center">
        <a href="/" className="text-yellow-400 underline">Volver al inicio</a>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0D1B2A] to-[#1a1a2e] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <AlertCircle className="text-red-400 mx-auto mb-6" size={64} />
          <h1 className="text-2xl font-bold text-white mb-4">
            Algo salió mal
          </h1>
          <p className="text-white/60 mb-8">
            {error}
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1a1a2e] font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all"
          >
            Volver a intentar
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1B2A] to-[#1a1a2e] flex items-center justify-center p-4">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star className="text-yellow-400/30" size={Math.random() * 4 + 2} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-md w-full text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main icon */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="inline-block mb-8"
          >
            <Sparkles className="text-yellow-400" size={80} fill="currentColor" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Canalizando tu energía
          </h1>

          <p className="text-white/60 mb-8 min-h-[3rem]">
            {loadingMessage}
          </p>

          {/* Progress bar */}
          <div className="bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-200"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <p className="text-white/40 text-sm">
            {Math.round(progress)}% completado
          </p>
        </motion.div>
      </div>
    </div>
  );
}
