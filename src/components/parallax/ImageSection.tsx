import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ImageSectionProps {
  imageUrl: string;
  vibrationName: string;
  vibrationColor: string;
}

/**
 * Image section with multi-layer parallax depth effect
 * The image moves slower than the scroll creating a floating effect
 */
export function ImageSection({ imageUrl, vibrationName, vibrationColor }: ImageSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Multi-layer parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
    >
      {/* Parallax background layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: backgroundY,
          background: `radial-gradient(ellipse at 50% 50%, ${vibrationColor}20 0%, transparent 70%)`,
        }}
      />

      {/* Stars layer (moves slower) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['-10%', '10%']) }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            🎨 Tu Imagen Mística
          </h2>
        </motion.div>

        {/* Image container with parallax */}
        <motion.div
          style={{
            y: imageY,
            scale: imageScale,
          }}
          className="relative"
        >
          {/* Glow effect behind image */}
          <motion.div
            className="absolute inset-0 blur-3xl -z-10"
            style={{
              backgroundColor: vibrationColor,
              opacity: glowOpacity,
              transform: 'scale(1.2)',
            }}
          />

          {/* Image frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{
              boxShadow: `0 25px 50px -12px ${vibrationColor}40, 0 0 50px ${vibrationColor}20`,
            }}
          >
            {/* Border gradient */}
            <div
              className="absolute inset-0 rounded-3xl p-[2px]"
              style={{
                background: `linear-gradient(135deg, ${vibrationColor}80, transparent, ${vibrationColor}40)`,
              }}
            >
              <div className="absolute inset-[2px] rounded-3xl bg-[#0D1B2A]" />
            </div>

            {/* Actual image */}
            <img
              src={imageUrl}
              alt={`Tu Vibración 2026 - ${vibrationName}`}
              className="relative z-10 w-full rounded-3xl"
              loading="lazy"
            />

            {/* Shimmer overlay */}
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/50 text-sm mt-6"
        >
          Imagen generada con IA para tu vibración personal
        </motion.p>
      </div>
    </section>
  );
}
