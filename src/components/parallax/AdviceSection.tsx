import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { type StructuredReading } from '~/lib/schemas/reading-schema';

interface AdviceSectionProps {
  advice: StructuredReading['advice'];
  vibrationColor: string;
}

/**
 * Advice section with numbered tips and progress reveal
 * Features: scroll-triggered tip reveal, animated icons, progress indicator
 */
export function AdviceSection({ advice, vibrationColor }: AdviceSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const progressWidth = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(${vibrationColor} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔮 Consejos para tu 2026
          </h2>

          {/* Progress bar */}
          <div className="max-w-xs mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: progressWidth,
                backgroundColor: vibrationColor,
                boxShadow: `0 0 10px ${vibrationColor}`,
              }}
            />
          </div>
        </motion.div>

        {/* Advice cards */}
        <div className="space-y-6">
          {advice.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              className="relative"
            >
              <div
                className="relative p-6 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden"
                style={{
                  backgroundColor: `${vibrationColor}10`,
                }}
              >
                {/* Number indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
                  className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{
                    backgroundColor: vibrationColor,
                    color: '#0D1B2A',
                    boxShadow: `0 0 20px ${vibrationColor}50`,
                  }}
                >
                  {index + 1}
                </motion.div>

                {/* Content */}
                <div className="pl-6">
                  {/* Area & Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span
                      className="text-sm font-medium px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${vibrationColor}30`,
                        color: vibrationColor,
                      }}
                    >
                      {item.area}
                    </span>
                  </div>

                  {/* Tip text */}
                  <p className="text-white/90 text-lg leading-relaxed">
                    {item.tip}
                  </p>
                </div>

                {/* Decorative gradient */}
                <div
                  className="absolute bottom-0 right-0 w-32 h-32 opacity-10 blur-2xl"
                  style={{ backgroundColor: vibrationColor }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
