import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from './ParallaxSection';

interface ReadingSectionProps {
  overview: string;
  vibrationColor: string;
}

/**
 * Reading section with scroll-triggered paragraph animations
 * Text appears paragraph by paragraph with blur-to-clear effect
 */
export function ReadingSection({ overview, vibrationColor }: ReadingSectionProps) {
  // Split overview into paragraphs
  const paragraphs = overview.split('\n\n').filter(Boolean);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(180deg, ${vibrationColor}20 0%, transparent 50%, ${vibrationColor}10 100%)`,
        }}
      />

      {/* Decorative side lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 h-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 h-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tu Lectura 2026
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: vibrationColor }}
          />
        </motion.div>

        {/* Paragraphs with stagger animation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-8"
        >
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              variants={staggerItem}
              className="text-white/85 text-lg md:text-xl leading-relaxed text-center"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <span className="text-4xl">✨</span>
        </motion.div>
      </div>
    </section>
  );
}
