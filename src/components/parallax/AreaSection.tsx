import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Briefcase, Leaf, Sparkles } from 'lucide-react';
import { staggerContainer, staggerItem } from './ParallaxSection';

type AreaType = 'love' | 'career' | 'health' | 'spirituality';

interface AreaSectionProps {
  type: AreaType;
  content: string;
  vibrationColor: string;
}

const areaConfig: Record<
  AreaType,
  {
    title: string;
    icon: typeof Heart;
    emoji: string;
    gradient: string;
  }
> = {
  love: {
    title: 'Amor y Relaciones',
    icon: Heart,
    emoji: '💕',
    gradient: 'from-pink-500/20 to-rose-600/20',
  },
  career: {
    title: 'Carrera y Trabajo',
    icon: Briefcase,
    emoji: '💼',
    gradient: 'from-blue-500/20 to-indigo-600/20',
  },
  health: {
    title: 'Salud y Bienestar',
    icon: Leaf,
    emoji: '🧘',
    gradient: 'from-green-500/20 to-emerald-600/20',
  },
  spirituality: {
    title: 'Crecimiento Espiritual',
    icon: Sparkles,
    emoji: '✨',
    gradient: 'from-purple-500/20 to-violet-600/20',
  },
};

/**
 * Area section for life predictions (love, career, health, spirituality)
 * Features: icon animation, parallax background, staggered text reveal
 */
export function AreaSection({ type, content, vibrationColor }: AreaSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const config = areaConfig[type];
  const Icon = config.icon;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const iconRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  // Split content into paragraphs
  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
    >
      {/* Parallax background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
        style={{ y: backgroundY }}
      />

      {/* Floating background icon */}
      <motion.div
        className="absolute right-[10%] top-1/4 opacity-5"
        style={{ rotate: iconRotate }}
      >
        <Icon size={300} strokeWidth={0.5} />
      </motion.div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header with icon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Animated icon container */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{
              backgroundColor: vibrationColor + '20',
              border: `2px solid ${vibrationColor}40`,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Icon
                size={36}
                className="text-white"
                style={{ filter: `drop-shadow(0 0 10px ${vibrationColor})` }}
              />
            </motion.div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {config.emoji} {config.title}
          </h2>

          <div
            className="w-16 h-1 mx-auto rounded-full mt-4"
            style={{ backgroundColor: vibrationColor }}
          />
        </motion.div>

        {/* Content with stagger animation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
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
      </div>
    </section>
  );
}
