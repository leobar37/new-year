import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Copy, Check } from 'lucide-react';
import { getVibration } from '~/lib/vibrations';

interface ResultData {
  resultId: string;
  status: string;
  vibrationNumber: number;
  reading: string;
  advice: string[];
  imageUrl?: string;
}

export const Route = createFileRoute('/result/$resultId')({
  component: ResultPage,
  loader: async ({ params }) => {
    return { resultId: params.resultId };
  },
});

function ResultPage() {
  const { resultId } = Route.useLoaderData();
  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/results/${resultId}?includeImage=true`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching result:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center">
        <div className="animate-spin text-yellow-400">
          <Sparkles size={40} />
        </div>
      </div>
    );
  }

  if (!data || data.status !== 'completed') {
    return (
      <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center p-4">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Resultado no encontrado</h1>
          <a href="/" className="text-yellow-400 underline">Volver al inicio</a>
        </div>
      </div>
    );
  }

  const vibration = getVibration(data.vibrationNumber);
  if (!vibration) return null;

  const shareOnWhatsApp = () => {
    const message = `✨ Mi Vibración 2026: Año ${vibration.number} - ${vibration.shortName} ✨\n\nDescubre tu vibración en: ${window.location.origin}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = async () => {
    const message = `✨ Mi Vibración 2026: Año ${vibration.number} - ${vibration.shortName} ✨\n\n${data.reading}\n\n🔮 Mis consejos para 2026:\n${data.advice.map(a => `• ${a}`).join('\n')}\n\nDescubre tu vibración en: ${window.location.origin}`;
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadImage = () => {
    if (data.imageUrl) {
      const link = document.createElement('a');
      link.href = data.imageUrl;
      link.download = `mi-vibracion-2026-${vibration.number}.png`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1B2A] to-[#1a1a2e]">
      <div className="max-w-2xl mx-auto p-4 pb-20">
        {/* Vibration Number Reveal */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center py-12"
        >
          <motion.div
            className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-6xl font-bold text-white">{vibration.number}</span>
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-2">
            {vibration.name}
          </h1>
          <p className="text-yellow-400 text-lg">{vibration.emoji}</p>
        </motion.div>

        {/* Reading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10"
        >
          <p className="text-white/90 leading-relaxed whitespace-pre-wrap">
            {data.reading}
          </p>
        </motion.div>

        {/* Advice */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10"
        >
          <h2 className="text-xl font-bold text-white mb-4">🔮 Consejos para tu año</h2>
          <ul className="space-y-3">
            {data.advice.map((advice, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="text-white/80">{advice}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Image */}
        {data.imageUrl && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10"
          >
            <img
              src={data.imageUrl}
              alt={`Tu Vibración 2026 - ${vibration.shortName}`}
              className="w-full rounded-xl"
            />
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-3 gap-3"
        >
          <button
            onClick={downloadImage}
            disabled={!data.imageUrl}
            className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            <Download className="text-white" size={24} />
            <span className="text-white/80 text-sm">Descargar</span>
          </button>

          <button
            onClick={copyToClipboard}
            className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            {copied ? <Check className="text-green-400" size={24} /> : <Copy className="text-white" size={24} />}
            <span className="text-white/80 text-sm">{copied ? 'Copiado' : 'Copiar'}</span>
          </button>

          <button
            onClick={shareOnWhatsApp}
            className="flex flex-col items-center gap-2 p-4 bg-green-500/20 rounded-xl hover:bg-green-500/30 transition-colors"
          >
            <Share2 className="text-green-400" size={24} />
            <span className="text-white/80 text-sm">WhatsApp</span>
          </button>
        </motion.div>

        {/* New reading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-center mt-8"
        >
          <a
            href="/"
            className="inline-block px-6 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-colors"
          >
            Descubrir otra vibración
          </a>
        </motion.div>
      </div>
    </div>
  );
}

function Sparkles({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
