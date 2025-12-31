import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Download, Share2, Redo, Image, Heart, X, Copy, Check } from 'lucide-react';
import { toPng } from 'html-to-image';
import { ShareableCard } from './ShareableCard';

interface NewYearSectionProps {
  userName: string;
  newYearMessage: string;
  mantra: string;
  vibrationColor: string;
  vibrationNumber: number;
  imageUrl?: string;
  onShare?: () => void;
}

/**
 * Final celebration section with personalized new year message
 * Features: confetti burst, animated mantra, share buttons
 */
export function NewYearSection({
  userName,
  newYearMessage,
  mantra,
  vibrationColor,
  vibrationNumber,
  imageUrl,
  onShare,
}: NewYearSectionProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [generatingStory, setGeneratingStory] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const shareableCardRef = useRef<HTMLDivElement>(null);

  // Trigger confetti when section comes into view
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRecommend = () => {
    const text = `🔮 ¡Descubre tu vibración para 2026! ✨\n\nYo ya descubrí la mía. Prueba esta app y descubre qué te depara el nuevo año:\n\n${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `mi-vibracion-2026-${vibrationNumber}.png`;
      link.click();
    }
  };

  const handleGenerateStory = async () => {
    if (!shareableCardRef.current || generatingStory) return;

    setGeneratingStory(true);
    try {
      const dataUrl = await toPng(shareableCardRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });

      // Try native share if available (mobile)
      if (navigator.share && navigator.canShare) {
        const blob = await fetch(dataUrl).then((r) => r.blob());
        const file = new File([blob], `feliz-2026-${userName}.png`, {
          type: 'image/png',
        });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: '¡Feliz 2026!',
            text: `Mi mantra 2026: "${mantra}"`,
          });
          return;
        }
      }

      // Fallback: download the image
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `feliz-2026-${userName}.png`;
      link.click();
    } catch (error) {
      console.error('Error generating story image:', error);
    } finally {
      setGeneratingStory(false);
    }
  };

  const handleCopyNumber = async () => {
    await navigator.clipboard.writeText('967966237');
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Dark overlay base for consistency */}
      <div className="absolute inset-0 bg-[#0D1B2A]/80" />

      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: 2 + Math.random() * 2,
              height: 2 + Math.random() * 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Multiple gradient layers for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, ${vibrationColor}40 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, ${vibrationColor}20 0%, transparent 40%),
            radial-gradient(ellipse at 80% 80%, #FFD70020 0%, transparent 40%)
          `,
        }}
      />

      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  y: -20,
                  x: `${Math.random() * 100}%`,
                  rotate: 0,
                }}
                animate={{
                  opacity: [1, 1, 0],
                  y: '100vh',
                  rotate: Math.random() * 720 - 360,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  ease: 'easeOut',
                }}
                className="absolute"
                style={{
                  width: 8 + Math.random() * 8,
                  height: 8 + Math.random() * 8,
                  backgroundColor:
                    i % 3 === 0
                      ? vibrationColor
                      : i % 3 === 1
                        ? '#FFD700'
                        : '#ffffff',
                  borderRadius: i % 2 === 0 ? '50%' : '2px',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Celebration header */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <motion.span
            className="text-4xl md:text-6xl"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎆
          </motion.span>
          <motion.h1
            className="text-5xl md:text-7xl font-bold"
            animate={{
              textShadow: [
                `0 0 20px ${vibrationColor}`,
                `0 0 40px ${vibrationColor}`,
                `0 0 20px ${vibrationColor}`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: `linear-gradient(135deg, #FFD700, ${vibrationColor}, #FFD700)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ¡Feliz 2026!
          </motion.h1>
          <motion.span
            className="text-4xl md:text-6xl"
            animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            🎆
          </motion.span>
        </motion.div>

        {/* Personalized greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl text-white mb-8"
        >
          Querido/a <span style={{ color: vibrationColor }}>{userName}</span>
        </motion.p>

        {/* New year message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            {newYearMessage}
          </p>
        </motion.div>

        {/* Mantra card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, type: 'spring' }}
          className="relative p-8 rounded-3xl mb-12 overflow-hidden"
          style={{
            backgroundColor: `${vibrationColor}15`,
            border: `2px solid ${vibrationColor}40`,
          }}
        >
          {/* Decorative corners */}
          <div
            className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-3xl"
            style={{ borderColor: vibrationColor }}
          />
          <div
            className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-3xl"
            style={{ borderColor: vibrationColor }}
          />

          <p className="text-white/50 text-sm mb-3">Tu mantra para 2026</p>
          <motion.p
            className="text-2xl md:text-3xl font-bold"
            style={{ color: vibrationColor }}
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "{mantra}"
          </motion.p>
        </motion.div>

        {/* Story share button - prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mb-6"
        >
          <button
            onClick={handleGenerateStory}
            disabled={generatingStory}
            className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl font-semibold text-lg transition-all hover:scale-[1.02] disabled:opacity-70"
            style={{
              background: `linear-gradient(135deg, ${vibrationColor}, ${vibrationColor}cc)`,
              color: '#0D1B2A',
              boxShadow: `0 4px 20px ${vibrationColor}50`,
            }}
          >
            {generatingStory ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Image size={24} />
                </motion.div>
                <span>Generando historia...</span>
              </>
            ) : (
              <>
                <Image size={24} />
                <span>Crear Historia para Compartir</span>
              </>
            )}
          </button>
          <p className="text-white/40 text-xs mt-2">
            Formato vertical 9:16 para Instagram y WhatsApp Stories
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <button
            onClick={handleDownload}
            disabled={!imageUrl}
            className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="text-white" size={24} />
            <span className="text-white/80 text-sm">Imagen</span>
          </button>

          <button
            onClick={handleRecommend}
            className="flex flex-col items-center gap-2 p-4 bg-green-500/20 rounded-xl hover:bg-green-500/30 transition-colors"
          >
            <Share2 className="text-green-400" size={24} />
            <span className="text-white/80 text-sm">Recomendar</span>
          </button>

          <button
            onClick={() => setShowDonateModal(true)}
            className="flex flex-col items-center gap-2 p-4 bg-amber-500/20 rounded-xl hover:bg-amber-500/30 transition-colors"
          >
            <Heart className="text-amber-400" size={24} />
            <span className="text-white/80 text-sm">Donar</span>
          </button>
        </motion.div>

        {/* New reading button */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
          style={{
            backgroundColor: vibrationColor,
            color: '#0D1B2A',
            boxShadow: `0 0 30px ${vibrationColor}50`,
          }}
        >
          <Redo size={20} />
          Descubrir otra vibración
        </motion.a>
      </div>

      {/* Hidden shareable card for image generation */}
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <ShareableCard
          ref={shareableCardRef}
          userName={userName}
          mantra={mantra}
          vibrationNumber={vibrationNumber}
          vibrationColor={vibrationColor}
        />
      </div>

      {/* Donation Modal */}
      <AnimatePresence>
        {showDonateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowDonateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md p-6 rounded-3xl bg-[#0D1B2A] border border-white/10"
              style={{
                boxShadow: `0 0 40px ${vibrationColor}30`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowDonateModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="text-white/70" size={20} />
              </button>

              {/* Heart icon */}
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="p-4 rounded-full"
                  style={{ backgroundColor: `${vibrationColor}20` }}
                >
                  <Heart
                    className="fill-current"
                    style={{ color: vibrationColor }}
                    size={32}
                  />
                </motion.div>
              </div>

              {/* Title */}
              <h3
                className="text-2xl font-bold text-center mb-4"
                style={{ color: vibrationColor }}
              >
                Apoya este proyecto
              </h3>

              {/* Message */}
              <p className="text-white/80 text-center mb-6 leading-relaxed">
                Esta app es{' '}
                <span className="text-white font-semibold">
                  libre de publicidad
                </span>{' '}
                porque creo en experiencias sin interrupciones.
                <br />
                <br />
                Si te fue útil y quieres apoyar, puedes hacer una donación
                voluntaria. ¡Cada aporte ayuda a mantener vivo este proyecto!
              </p>

              {/* Payment info */}
              <div
                className="p-4 rounded-2xl mb-4"
                style={{ backgroundColor: `${vibrationColor}15` }}
              >
                <p className="text-white/60 text-sm text-center mb-2">
                  Plin / Yape
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span
                    className="text-2xl font-bold tracking-wider"
                    style={{ color: vibrationColor }}
                  >
                    967 966 237
                  </span>
                  <button
                    onClick={handleCopyNumber}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    title="Copiar número"
                  >
                    {copiedNumber ? (
                      <Check className="text-green-400" size={18} />
                    ) : (
                      <Copy className="text-white/70" size={18} />
                    )}
                  </button>
                </div>
                {copiedNumber && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-xs text-center mt-2"
                  >
                    ¡Número copiado!
                  </motion.p>
                )}
              </div>

              {/* Thank you note */}
              <p className="text-white/50 text-xs text-center">
                Gracias por tu generosidad y por creer en este proyecto
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
