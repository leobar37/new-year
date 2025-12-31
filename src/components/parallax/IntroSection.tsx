import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { type Vibration } from '~/lib/vibrations';

interface IntroSectionProps {
  vibration: Vibration;
  userName: string;
  headline: string;
}

/**
 * Intro section with enhanced parallax and cosmic animations
 */
export function IntroSection({ vibration, userName, headline }: IntroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Enhanced parallax transforms
  const numberScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const numberY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const numberRotate = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  
  // Parallax layers at different speeds
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(180deg, ${vibration.color}15 0%, #0D1B2A 100%)` 
        }}
      />

      {/* Parallax Layer 1 - Slow moving stars */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: layer1Y }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`star1-${i}`}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 2,
              height: 2 + Math.random() * 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: 'white',
              opacity: 0.3 + Math.random() * 0.4,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Parallax Layer 2 - Medium speed particles */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: layer2Y }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: 4 + Math.random() * 4,
              height: 4 + Math.random() * 4,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              backgroundColor: vibration.color,
              opacity: 0.2 + Math.random() * 0.3,
              filter: `blur(${1 + Math.random() * 2}px)`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Parallax Layer 3 - Fast moving glow orbs */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: layer3Y }}
      >
        <div 
          className="absolute left-1/4 top-1/4 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: vibration.color }}
        />
        <div 
          className="absolute right-1/4 bottom-1/3 w-48 h-48 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: '#FFD700' }}
        />
      </motion.div>

      {/* Central glow effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: contentOpacity }}
      >
        <div 
          className="w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{ 
            background: `radial-gradient(circle, ${vibration.color}60 0%, transparent 70%)` 
          }}
        />
      </motion.div>

      {/* Orbiting rings with parallax */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ y: layer1Y, opacity: contentOpacity }}
      >
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full"
            style={{
              width: `${ring * 180}px`,
              height: `${ring * 180}px`,
              border: `1px solid ${vibration.color}${Math.max(10, 40 - ring * 10)}`,
            }}
            animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: 30 + ring * 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </motion.div>

      {/* Main content with parallax */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white/60 text-lg md:text-xl mb-2 tracking-wide"
        >
          {userName}, tu año personal es
        </motion.p>

        {/* Number reveal with enhanced parallax */}
        <motion.div
          style={{ scale: numberScale, y: numberY, rotate: numberRotate }}
          className="relative inline-block my-4"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 12,
              delay: 0.5,
            }}
            className="relative"
          >
            {/* Multi-layer glow effect */}
            <div
              className="absolute inset-0 blur-[100px] opacity-60"
              style={{ backgroundColor: vibration.color }}
            />
            <div
              className="absolute inset-0 blur-[60px] opacity-40"
              style={{ backgroundColor: '#FFD700' }}
            />

            {/* Number with gradient */}
            <h1
              className="relative text-[10rem] md:text-[14rem] lg:text-[18rem] font-black leading-none select-none"
              style={{
                background: `linear-gradient(135deg, #FFD700 0%, ${vibration.color} 50%, #FFD700 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 0 60px ${vibration.color}80)`,
              }}
            >
              {vibration.number}
            </h1>
          </motion.div>
        </motion.div>

        {/* Vibration name */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3"
        >
          {vibration.name}
        </motion.h2>

        {/* Emoji with pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: 'spring' }}
          className="text-4xl md:text-5xl mb-6"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {vibration.emoji}
          </motion.span>
        </motion.div>

        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          {headline}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-sm tracking-wider uppercase">Desliza</span>
          <motion.div 
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1"
            animate={{ borderColor: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-2 rounded-full"
              style={{ backgroundColor: vibration.color }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
