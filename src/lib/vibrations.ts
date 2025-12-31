/**
 * Vibration data for each Personal Year Number (1-9)
 */

export interface Vibration {
  number: number;
  name: string;
  shortName: string;
  energy: string;
  description: string;
  keywords: string[];
  imageKeywords: string[];
  color: string;
  element: string;
  emoji: string;
}

export const vibrations: Record<number, Vibration> = {
  1: {
    number: 1,
    name: 'El Año de los Nuevos Comienzos',
    shortName: 'Nuevos Comienzos',
    energy: 'Independencia, liderazgo, iniciativa',
    description: 'Este es tu año para plantar semillas. La energía del 1 te impulsa a tomar la iniciativa, comenzar proyectos nuevos y liderar tu propio camino. Es momento de independencia y autoafirmación.',
    keywords: ['independencia', 'liderazgo', 'iniciativa', 'coraje', 'originalidad'],
    imageKeywords: ['sunrise', 'phoenix', 'golden light', 'new dawn', 'first ray of light', 'mountain peak'],
    color: '#FF6B35',
    element: 'Fuego',
    emoji: '🌅',
  },
  2: {
    number: 2,
    name: 'El Año de la Armonía',
    shortName: 'Armonía',
    energy: 'Relaciones, cooperación, paciencia',
    description: 'La energía del 2 trae equilibrio y conexión. Es un año para fortalecer relaciones, colaborar con otros y desarrollar la paciencia. Las asociaciones florecen bajo esta vibración.',
    keywords: ['armonía', 'cooperación', 'paciencia', 'diplomacia', 'sensibilidad'],
    imageKeywords: ['balance', 'yin-yang', 'soft glow', 'partnership', 'two moons', 'reflection on water'],
    color: '#4A90A4',
    element: 'Agua',
    emoji: '☯️',
  },
  3: {
    number: 3,
    name: 'El Año de la Expresión',
    shortName: 'Expresión',
    energy: 'Creatividad, comunicación, alegría',
    description: 'El 3 despierta tu voz creativa. Es momento de expresarte, comunicar tus ideas y disfrutar de la vida social. La alegría y el optimismo son tus aliados este año.',
    keywords: ['creatividad', 'expresión', 'alegría', 'comunicación', 'optimismo'],
    imageKeywords: ['colors explosion', 'creativity', 'sparkles', 'joy', 'paintbrush strokes', 'dancing light'],
    color: '#FFD700',
    element: 'Aire',
    emoji: '🎨',
  },
  4: {
    number: 4,
    name: 'El Año de los Fundamentos',
    shortName: 'Fundamentos',
    energy: 'Estructura, trabajo, estabilidad',
    description: 'La energía del 4 pide construir bases sólidas. Es año de trabajo dedicado, organización y crear estructuras duraderas. La disciplina te lleva al éxito.',
    keywords: ['estructura', 'trabajo', 'estabilidad', 'disciplina', 'organización'],
    imageKeywords: ['earth', 'roots', 'structure', 'golden bricks', 'foundation stones', 'solid ground'],
    color: '#8B4513',
    element: 'Tierra',
    emoji: '🏛️',
  },
  5: {
    number: 5,
    name: 'El Año del Cambio',
    shortName: 'Cambio',
    energy: 'Libertad, aventura, transformación',
    description: 'El 5 trae movimiento y transformación. Espera cambios emocionantes, aventuras y la libertad de explorar nuevos horizontes. Abraza lo inesperado.',
    keywords: ['libertad', 'aventura', 'cambio', 'versatilidad', 'movimiento'],
    imageKeywords: ['wind', 'transformation', 'butterfly metamorphosis', 'motion blur', 'open road', 'wings'],
    color: '#9B59B6',
    element: 'Éter',
    emoji: '🦋',
  },
  6: {
    number: 6,
    name: 'El Año del Amor',
    shortName: 'Amor',
    energy: 'Familia, responsabilidad, servicio',
    description: 'La vibración del 6 centra la energía en el hogar y los seres queridos. Es año para nutrir relaciones familiares, asumir responsabilidades con amor y servir a otros.',
    keywords: ['amor', 'familia', 'responsabilidad', 'servicio', 'armonía del hogar'],
    imageKeywords: ['heart', 'family embrace', 'warmth', 'home', 'rose garden', 'nurturing light'],
    color: '#E91E63',
    element: 'Venus',
    emoji: '💕',
  },
  7: {
    number: 7,
    name: 'El Año de la Introspección',
    shortName: 'Introspección',
    energy: 'Espiritualidad, sabiduría, análisis',
    description: 'El 7 invita a la reflexión profunda. Es momento de buscar respuestas internas, desarrollar la espiritualidad y confiar en tu intuición. La sabiduría viene del silencio.',
    keywords: ['espiritualidad', 'sabiduría', 'introspección', 'intuición', 'análisis'],
    imageKeywords: ['stars', 'meditation', 'cosmic', 'third eye', 'mystic forest', 'moonlight meditation'],
    color: '#6A5ACD',
    element: 'Neptuno',
    emoji: '🔮',
  },
  8: {
    number: 8,
    name: 'El Año de la Abundancia',
    shortName: 'Abundancia',
    energy: 'Poder, logros, manifestación',
    description: 'La energía del 8 atrae abundancia material y éxito. Es año para manifestar tus metas, alcanzar logros importantes y ejercer tu poder personal con responsabilidad.',
    keywords: ['abundancia', 'poder', 'éxito', 'manifestación', 'logros'],
    imageKeywords: ['gold coins', 'success', 'crown', 'prosperity', 'infinity symbol', 'treasure'],
    color: '#FFD700',
    element: 'Saturno',
    emoji: '👑',
  },
  9: {
    number: 9,
    name: 'El Año de la Transformación',
    shortName: 'Transformación',
    energy: 'Cierre de ciclos, humanitarismo, sabiduría',
    description: 'El 9 cierra un ciclo de 9 años. Es momento de soltar lo que ya no sirve, practicar la compasión y prepararse para un nuevo comienzo. La sabiduría de tus experiencias te guía.',
    keywords: ['transformación', 'cierre', 'humanitarismo', 'compasión', 'sabiduría'],
    imageKeywords: ['phoenix rebirth', 'ending', 'rebirth', 'spiral galaxy', 'sunset and sunrise', 'completion'],
    color: '#FF4500',
    element: 'Marte',
    emoji: '🔥',
  },
};

/**
 * Gets vibration data by number
 */
export function getVibration(number: number): Vibration | undefined {
  return vibrations[number];
}

/**
 * Gets all vibrations as an array
 */
export function getAllVibrations(): Vibration[] {
  return Object.values(vibrations);
}

/**
 * Gets the display title for a vibration
 */
export function getVibrationTitle(number: number): string {
  const vibration = vibrations[number];
  return vibration ? `${number} - ${vibration.shortName}` : '';
}
