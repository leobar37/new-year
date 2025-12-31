import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
  parallaxSpeed?: number;
  id?: string;
}

/**
 * Base component for parallax scroll sections
 * Provides scroll-triggered animations and parallax effects
 */
export function ParallaxSection({
  children,
  className = '',
  backgroundColor,
  parallaxSpeed = 0.5,
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * parallaxSpeed, -100 * parallaxSpeed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-4xl mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}

/**
 * Hook for scroll-based animations within a section
 */
export function useScrollAnimation(
  scrollYProgress: MotionValue<number>,
  options: {
    fadeIn?: boolean;
    slideUp?: boolean;
    scale?: boolean;
  } = {}
) {
  const { fadeIn = true, slideUp = true, scale = false } = options;

  return {
    opacity: fadeIn ? useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]) : 1,
    y: slideUp ? useTransform(scrollYProgress, [0, 0.3], [50, 0]) : 0,
    scale: scale ? useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]) : 1,
  };
}

/**
 * Staggered children animation variants
 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Floating particles animation for cosmic effect
 */
export function FloatingParticles({ count = 20, color = '#FFD700' }: { count?: number; color?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${4 + Math.random() * 8}px ${color}`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
