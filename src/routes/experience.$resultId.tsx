import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { getVibration } from '~/lib/vibrations';
import { type StructuredReading } from '~/lib/schemas/reading-schema';
import {
  IntroSection,
  ReadingSection,
  AreaSection,
  AdviceSection,
  ImageSection,
  NewYearSection,
  ScrollProgress,
  ScrollColorBackground,
} from '~/components/parallax';

interface ExperienceData {
  resultId: string;
  status: string;
  vibrationNumber: number;
  userName: string;
  reading: StructuredReading;
  imageUrl?: string;
}

export const Route = createFileRoute('/experience/$resultId')({
  component: ExperiencePage,
  loader: async ({ params }) => {
    return { resultId: params.resultId };
  },
});

function ExperiencePage() {
  const { resultId } = Route.useLoaderData();
  const [data, setData] = useState<ExperienceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/results/${resultId}?includeImage=true`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setError('No se pudo cargar tu lectura');
        }
      } catch (err) {
        console.error('Error fetching result:', err);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="text-yellow-400 animate-spin mx-auto mb-4" size={48} />
          <p className="text-white/60">Preparando tu experiencia...</p>
        </div>
      </div>
    );
  }

  if (error || !data || data.status !== 'completed') {
    return (
      <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center p-4">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">
            {error || 'Resultado no encontrado'}
          </h1>
          <a href="/" className="text-yellow-400 underline">
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  const vibration = getVibration(data.vibrationNumber);
  if (!vibration) {
    return (
      <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center">
        <p className="text-white">Vibración no válida</p>
      </div>
    );
  }

  const { reading, userName, imageUrl } = data;

  // Define section colors for background transitions
  const sectionColors = [
    '#0D1B2A', // Intro - night
    '#1a1a2e', // Overview - slightly lighter
    '#2d1b3d', // Love - pink tint
    '#1b2d3d', // Career - blue tint
    '#1b3d2d', // Health - green tint
    '#2d1b4d', // Spirituality - purple tint
    '#1a1a2e', // Advice
    '#0D1B2A', // Image
    '#0D1B2A', // Celebration - dark base (component handles its own gradients)
  ];

  const sectionNames = [
    'Inicio',
    'Tu Lectura',
    'Amor',
    'Carrera',
    'Bienestar',
    'Espíritu',
    'Consejos',
    'Tu Imagen',
    '¡Feliz Año!',
  ];

  return (
    <div className="relative md:block mobile-snap-container">
      {/* Scroll-triggered background color */}
      <ScrollColorBackground colors={sectionColors} />

      {/* Progress indicator with dots */}
      <ScrollProgress colors={sectionColors} sections={sectionNames} />

      {/* 1. Intro Section */}
      <div id="section-0" className="mobile-snap-section">
        <IntroSection
          vibration={vibration}
          userName={userName}
          headline={reading.headline}
        />
      </div>

      {/* 2. Overview Reading */}
      <div id="section-1" className="mobile-snap-section">
        <ReadingSection
          overview={reading.overview}
          vibrationColor={vibration.color}
        />
      </div>

      {/* 3. Love & Relationships */}
      <div id="section-2" className="mobile-snap-section">
        <AreaSection
          type="love"
          content={reading.loveLife}
          vibrationColor={vibration.color}
        />
      </div>

      {/* 4. Career & Work */}
      <div id="section-3" className="mobile-snap-section">
        <AreaSection
          type="career"
          content={reading.career}
          vibrationColor={vibration.color}
        />
      </div>

      {/* 5. Health & Wellness */}
      <div id="section-4" className="mobile-snap-section">
        <AreaSection
          type="health"
          content={reading.health}
          vibrationColor={vibration.color}
        />
      </div>

      {/* 6. Spirituality */}
      <div id="section-5" className="mobile-snap-section">
        <AreaSection
          type="spirituality"
          content={reading.spirituality}
          vibrationColor={vibration.color}
        />
      </div>

      {/* 7. Advice Section */}
      <div id="section-6" className="mobile-snap-section">
        <AdviceSection
          advice={reading.advice}
          vibrationColor={vibration.color}
        />
      </div>

      {/* 8. Image Section (if available) */}
      {imageUrl && (
        <div id="section-7" className="mobile-snap-section">
          <ImageSection
            imageUrl={imageUrl}
            vibrationName={vibration.shortName}
            vibrationColor={vibration.color}
          />
        </div>
      )}

      {/* 9. New Year Celebration */}
      <div id="section-8" className="mobile-snap-section">
        <NewYearSection
          userName={userName}
          newYearMessage={reading.newYearMessage}
          mantra={reading.mantra}
          vibrationColor={vibration.color}
          vibrationNumber={vibration.number}
          imageUrl={imageUrl}
        />
      </div>
    </div>
  );
}
