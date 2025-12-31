import { forwardRef } from 'react';

interface ShareableCardProps {
  userName: string;
  mantra: string;
  vibrationNumber: number;
  vibrationColor: string;
  newYearMessage?: string;
}

/**
 * Static card optimized for image capture (no animations)
 * Aspect ratio: 9:16 (1080x1920 equivalent for Instagram Stories)
 */
export const ShareableCard = forwardRef<HTMLDivElement, ShareableCardProps>(
  ({ userName, mantra, vibrationNumber, vibrationColor, newYearMessage }, ref) => {
    // Generate fixed star positions for consistent rendering
    const stars = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${(i * 17 + 5) % 95}%`,
      top: `${(i * 23 + 7) % 90}%`,
      size: 2 + (i % 3),
      opacity: 0.4 + (i % 5) * 0.1,
    }));

    return (
      <div
        ref={ref}
        style={{
          width: 540,
          height: 960,
          position: 'relative',
          overflow: 'hidden',
          background: '#0D1B2A',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Dark gradient base */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, #0D1B2A 0%, #1a1a2e 50%, #0D1B2A 100%)`,
          }}
        />

        {/* Vibration color gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at 50% 20%, ${vibrationColor}50 0%, transparent 50%),
              radial-gradient(ellipse at 30% 80%, ${vibrationColor}30 0%, transparent 40%),
              radial-gradient(ellipse at 70% 70%, #FFD70025 0%, transparent 40%)
            `,
          }}
        />

        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: 'absolute',
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              opacity: star.opacity,
            }}
          />
        ))}

        {/* Content container */}
        <div
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 32px',
            textAlign: 'center',
          }}
        >
          {/* Top decoration */}
          <div
            style={{
              fontSize: 48,
              marginBottom: 16,
            }}
          >
            ✨
          </div>

          {/* Main title */}
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              marginBottom: 24,
              background: `linear-gradient(135deg, #FFD700, ${vibrationColor}, #FFD700)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              lineHeight: 1.1,
            }}
          >
            ¡Feliz 2026!
          </h1>

          {/* Vibration number badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: vibrationColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 700,
                color: '#0D1B2A',
                boxShadow: `0 0 30px ${vibrationColor}80`,
              }}
            >
              {vibrationNumber}
            </div>
          </div>

          {/* Personalized greeting */}
          <p
            style={{
              fontSize: 26,
              color: '#ffffff',
              marginBottom: 12,
              fontWeight: 400,
            }}
          >
            Querido/a
          </p>
          <p
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: vibrationColor,
              marginBottom: 40,
            }}
          >
            {userName}
          </p>

          {/* Mantra card */}
          <div
            style={{
              backgroundColor: `${vibrationColor}20`,
              border: `2px solid ${vibrationColor}50`,
              borderRadius: 24,
              padding: '28px 24px',
              marginBottom: 40,
              maxWidth: 440,
              width: '100%',
            }}
          >
            <p
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: 14,
                marginBottom: 12,
                textTransform: 'uppercase',
                letterSpacing: 2,
              }}
            >
              Tu mantra 2026
            </p>
            <p
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: vibrationColor,
                lineHeight: 1.4,
              }}
            >
              "{mantra}"
            </p>
          </div>

          {/* Short message if provided */}
          {newYearMessage && (
            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.6,
                maxWidth: 400,
                marginBottom: 32,
              }}
            >
              {newYearMessage.length > 150
                ? newYearMessage.slice(0, 150) + '...'
                : newYearMessage}
            </p>
          )}

        </div>

        {/* Decorative corner accents */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            width: 40,
            height: 40,
            borderTop: `3px solid ${vibrationColor}60`,
            borderLeft: `3px solid ${vibrationColor}60`,
            borderRadius: '8px 0 0 0',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 40,
            height: 40,
            borderTop: `3px solid ${vibrationColor}60`,
            borderRight: `3px solid ${vibrationColor}60`,
            borderRadius: '0 8px 0 0',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            width: 40,
            height: 40,
            borderBottom: `3px solid ${vibrationColor}60`,
            borderLeft: `3px solid ${vibrationColor}60`,
            borderRadius: '0 0 0 8px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 40,
            height: 40,
            borderBottom: `3px solid ${vibrationColor}60`,
            borderRight: `3px solid ${vibrationColor}60`,
            borderRadius: '0 0 8px 0',
          }}
        />
      </div>
    );
  }
);

ShareableCard.displayName = 'ShareableCard';
