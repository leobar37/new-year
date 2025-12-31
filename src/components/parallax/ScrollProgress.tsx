import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ScrollProgressProps {
  /**
   * Array of colors to transition through as user scrolls
   * Should have at least 2 colors for smooth transition
   */
  colors: string[];
  /**
   * Section titles for navigation dots
   */
  sections?: string[];
  /**
   * Callback when background color changes
   */
  onColorChange?: (color: string) => void;
}

/**
 * Custom hook for touch swipe detection
 */
function useSwipeDetection(onSwipeUp: () => void, onSwipeDown: () => void) {
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      const deltaTime = Date.now() - touchStartTime.current;

      // Minimum swipe distance (50px) and maximum time (300ms) for a quick swipe
      const minSwipeDistance = 50;
      const maxSwipeTime = 300;

      if (Math.abs(deltaY) > minSwipeDistance && deltaTime < maxSwipeTime) {
        if (deltaY > 0) {
          onSwipeUp();
        } else {
          onSwipeDown();
        }
      }

      touchStartY.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeUp, onSwipeDown]);
}

/**
 * Scroll progress indicator with background color transitions
 * Changes the background color as user scrolls through sections
 */
export function ScrollProgress({ colors, sections = [], onColorChange }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const [currentSection, setCurrentSection] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Smooth spring animation for progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Create color stops based on number of colors
  const colorStops = colors.map((_, i) => i / (colors.length - 1));

  // Transform scroll progress to current color index
  const colorIndex = useTransform(scrollYProgress, colorStops, colors.map((_, i) => i));

  // Navigate to section with smooth scroll
  const navigateToSection = useCallback((index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Hide swipe hint after first navigation
    setShowSwipeHint(false);
  }, []);

  // Navigate to next/previous section
  const navigateNext = useCallback(() => {
    const nextIndex = Math.min(currentSection + 1, sections.length - 1);
    navigateToSection(nextIndex);
  }, [currentSection, sections.length, navigateToSection]);

  const navigatePrev = useCallback(() => {
    const prevIndex = Math.max(currentSection - 1, 0);
    navigateToSection(prevIndex);
  }, [currentSection, navigateToSection]);

  // Mobile swipe detection
  useSwipeDetection(navigateNext, navigatePrev);

  // Hide swipe hint after 5 seconds or on scroll
  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        navigateNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        navigatePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateNext, navigatePrev]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const sectionIndex = Math.min(
        Math.floor(latest * sections.length),
        sections.length - 1
      );
      if (sectionIndex !== currentSection) {
        setCurrentSection(sectionIndex);
      }

      // Calculate current color based on progress
      const colorIdx = Math.min(
        Math.floor(latest * (colors.length - 1)),
        colors.length - 2
      );
      const progress = (latest * (colors.length - 1)) % 1;

      if (onColorChange && colors[colorIdx]) {
        onColorChange(interpolateColor(colors[colorIdx], colors[colorIdx + 1] || colors[colorIdx], progress));
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, colors, sections.length, currentSection, onColorChange]);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${colors.join(', ')})`,
        }}
      />

      {/* Side navigation - Desktop */}
      {sections.length > 0 && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2">
          {/* Up arrow */}
          <motion.button
            onClick={navigatePrev}
            disabled={currentSection === 0}
            className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp size={20} />
          </motion.button>

          {/* Section dots */}
          <div className="flex flex-col gap-3 py-2">
            {sections.map((section, index) => (
              <motion.button
                key={section}
                onClick={() => navigateToSection(index)}
                className="group relative flex items-center justify-end"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute right-8 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {section}
                </span>
                <motion.div
                  className="w-3 h-3 rounded-full border-2 transition-colors cursor-pointer"
                  animate={{
                    backgroundColor:
                      currentSection === index ? colors[index % colors.length] : 'transparent',
                    borderColor:
                      currentSection === index ? colors[index % colors.length] : 'rgba(255,255,255,0.5)',
                    scale: currentSection === index ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Down arrow */}
          <motion.button
            onClick={navigateNext}
            disabled={currentSection === sections.length - 1}
            className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronDown size={20} />
          </motion.button>
        </div>
      )}

      {/* Mobile bottom navigation */}
      {sections.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex md:hidden items-center gap-4 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full">
          <motion.button
            onClick={navigatePrev}
            disabled={currentSection === 0}
            className="p-1 text-white/70 disabled:opacity-30"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={20} />
          </motion.button>

          <div className="flex gap-2">
            {sections.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => navigateToSection(index)}
                className="w-2 h-2 rounded-full transition-colors"
                animate={{
                  backgroundColor:
                    currentSection === index ? colors[index % colors.length] : 'rgba(255,255,255,0.3)',
                  scale: currentSection === index ? 1.5 : 1,
                }}
              />
            ))}
          </div>

          <motion.button
            onClick={navigateNext}
            disabled={currentSection === sections.length - 1}
            className="p-1 text-white/70 disabled:opacity-30"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown size={20} />
          </motion.button>
        </div>
      )}

      {/* Mobile swipe hint indicator */}
      <AnimatePresence>
        {showSwipeHint && currentSection === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex md:hidden flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <ChevronUp className="text-white/60" size={24} />
              <span className="text-white/60 text-sm">Desliza hacia arriba</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Background color provider that changes based on scroll
 */
export function ScrollColorBackground({ colors }: { colors: string[] }) {
  const { scrollYProgress } = useScroll();
  const [bgColor, setBgColor] = useState(colors[0]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const colorIdx = Math.min(
        Math.floor(latest * (colors.length - 1)),
        colors.length - 2
      );
      const progress = (latest * (colors.length - 1)) % 1;

      const color = interpolateColor(
        colors[colorIdx],
        colors[colorIdx + 1] || colors[colorIdx],
        progress
      );
      setBgColor(color);
    });

    return () => unsubscribe();
  }, [scrollYProgress, colors]);

  return (
    <motion.div
      className="fixed inset-0 -z-10 transition-colors duration-300"
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.5 }}
    />
  );
}

/**
 * Interpolate between two hex colors
 */
function interpolateColor(color1: string, color2: string, factor: number): string {
  const hex = (c: string) => parseInt(c, 16);
  const r1 = hex(color1.slice(1, 3));
  const g1 = hex(color1.slice(3, 5));
  const b1 = hex(color1.slice(5, 7));
  const r2 = hex(color2.slice(1, 3));
  const g2 = hex(color2.slice(3, 5));
  const b2 = hex(color2.slice(5, 7));

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}
