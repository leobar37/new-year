import { createFileRoute } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User } from 'lucide-react';
import { DatePicker } from '~/components/DatePicker';
import { PhotoUpload } from '~/components/PhotoUpload';
import { calculatePersonalYear, validateBirthDate } from '~/lib/numerology';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const [dateStr, setDateStr] = useState('');
  const [userName, setUserName] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startMutation = useMutation({
    mutationFn: async () => {
      if (!userName.trim()) throw new Error('Por favor ingresa tu nombre');
      if (!dateStr) throw new Error('Por favor selecciona una fecha válida');

      // Parsear YYYY-MM-DD a números locales para evitar problemas de zona horaria
      const [year, month, day] = dateStr.split('-').map(Number);

      const validation = validateBirthDate(day, month, year);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      const vibrationNumber = calculatePersonalYear(day, month);
      const resultId = crypto.randomUUID();

      // Trigger Inngest event
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resultId,
          userName: userName.trim(),
          birthDate: new Date(year, month - 1, day).toISOString(),
          vibrationNumber,
          userPhotoBase64: photo || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar la generación. Intenta de nuevo.');
      }

      return { resultId };
    },
    onSuccess: ({ resultId }) => {
      window.location.href = `/processing?resultId=${resultId}`;
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = () => {
    setError(null);
    
    if (!userName.trim()) {
      setError('Por favor ingresa tu nombre');
      return;
    }
    
    // Validate complete date (YYYY-MM-DD format with all parts filled)
    if (!dateStr) {
      setError('Por favor selecciona tu fecha de nacimiento');
      return;
    }
    
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) {
      setError('Por favor completa día, mes y año');
      return;
    }
    
    startMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1B2A] to-[#1a1a2e] flex flex-col justify-center py-12 px-6">
      <div className="w-full max-w-md mx-auto space-y-10">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-6"
          >
            <Sparkles className="text-yellow-400 mx-auto drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" size={64} fill="currentColor" />
          </motion.div>
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight font-display">
            Tu Vibración <span className="text-yellow-400">2026</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-xs mx-auto">
            Descubre la energía de tu año personal a través de la numerología.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card-mystical p-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Comienza tu viaje</h2>

          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Tu nombre
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="¿Cómo te llamas?"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  maxLength={50}
                />
              </div>
            </div>

            <DatePicker
              value={dateStr}
              onChange={setDateStr}
              error={error || undefined}
            />

            <div className="pt-2">
              <PhotoUpload value={photo} onChange={setPhoto} />
            </div>

            <button
              onClick={handleSubmit}
              disabled={startMutation.isPending}
              className="w-full py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-[#1a1a2e] text-lg font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
            >
              {startMutation.isPending ? (
                <span className="flex items-center justify-center gap-3">
                  <Sparkles className="animate-spin" size={24} />
                  Interpretando estrellas...
                </span>
              ) : (
                'Revelar mi destino 2026'
              )}
            </button>
          </div>
        </motion.div>

        <p className="text-center text-white/30 text-xs">
          © 2026 Tu Vibración Cósmica
        </p>
      </div>
    </div>
  );
}
