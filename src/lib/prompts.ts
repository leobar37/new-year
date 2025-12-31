/**
 * AI Prompts for generating readings and images
 */

import { type Vibration } from './vibrations';

/**
 * Generates a system prompt for the structured reading with generateObject
 */
export function generateStructuredReadingPrompt(vibration: Vibration, userName: string): string {
  return `Eres un experto en numerología con un estilo místico pero accesible.
Genera una lectura COMPLETA y personalizada para ${userName}, cuyo Año Personal 2026 es el número ${vibration.number} (${vibration.name}).

CONTEXTO:
- Número: ${vibration.number}
- Nombre de la vibración: ${vibration.name}
- Energía principal: ${vibration.energy}
- Palabras clave: ${vibration.keywords.join(', ')}
- Elemento: ${vibration.element}

INSTRUCCIONES:
1. Personaliza todo el contenido mencionando a ${userName} donde sea apropiado
2. Usa un tono místico pero accesible y esperanzador
3. Incluye referencias específicas al significado del número ${vibration.number}
4. El mensaje de año nuevo debe ser cálido y personal, dirigido a ${userName}
5. El mantra debe ser memorable y relacionado con la energía del ${vibration.number}
6. Usa "tú" para dirigirte al lector
7. NO uses asteriscos ni formato markdown
8. Escribe en español

IMPORTANTE: Genera contenido ÚNICO y ESPECÍFICO para cada área de vida.`;
}

/**
 * Generates a prompt for the personalized reading
 * @deprecated Use generateStructuredReadingPrompt with generateObject instead
 */
export function generateReadingPrompt(vibration: Vibration): string {
  return `Eres un experto en numerología con un estilo místico pero accesible. 
  Genera una lectura personalizada para alguien cuyo Año Personal 2026 es el número ${vibration.number} (${vibration.name}).

  CONTEXTO:
  - Número: ${vibration.number}
  - Nombre de la vibración: ${vibration.name}
  - Energía principal: ${vibration.energy}
  - Palabras clave: ${vibration.keywords.join(', ')}

  INSTRUCCIONES:
  1. Escribe una lectura de 3-4 párrafos cortos
  2. Usa un tono místico pero accesible y esperanzador
  3. Incluye referencias específicas al significado del número ${vibration.number}
  4. Menciona cómo esta energía se manifestará en diferentes áreas de la vida (trabajo, amor, crecimiento personal)
  5. Termina con un mensaje inspirador y empoderador
  6. Usa "tú" para dirigirte al lector
  7. NO uses asteriscos ni formato markdown
  8. Escribe en español

  FORMATO DE RESPUESTA:
  Escribe directamente la lectura, sin títulos ni encabezados.`;
}

/**
 * Generates a prompt for the practical advice
 */
export function generateAdvicePrompt(vibration: Vibration): string {
  return `Eres un coach de vida experto en numerología. 
  Genera 5 consejos prácticos y accionables para alguien cuyo Año Personal 2026 es el número ${vibration.number} (${vibration.name}).

  CONTEXTO:
  - Número: ${vibration.number}
  - Energía: ${vibration.energy}
  - Palabras clave: ${vibration.keywords.join(', ')}

  INSTRUCCIONES:
  1. Cada consejo debe ser específico y accionable
  2. Relaciona cada consejo con la energía del número ${vibration.number}
  3. Los consejos deben cubrir diferentes áreas: trabajo, relaciones, salud, crecimiento personal, finanzas
  4. Usa verbos en imperativo o infinitivo
  5. Mantén cada consejo en 1-2 oraciones máximo
  6. Escribe en español

  FORMATO DE RESPUESTA:
  Devuelve SOLO un array JSON con 5 strings, cada uno siendo un consejo.
  Ejemplo: ["Consejo 1", "Consejo 2", "Consejo 3", "Consejo 4", "Consejo 5"]`;
}

/**
 * Generates a prompt for image generation with Gemini
 */
export function generateImagePrompt(vibration: Vibration, includePhoto: boolean = false): string {
  const basePrompt = `Create a mystical, ethereal digital artwork representing the numerology Year ${vibration.number} - "${vibration.name}" for 2026.

  VISUAL STYLE:
  - Color palette: Rich golds, deep blacks, cosmic purples, warm ambers
  - Aesthetic: Mystical, cosmic, New Year celebration, luxury
  - Mood: Inspiring, magical, hopeful, transformative
  - Quality: High detail, professional digital art, 4K quality

  KEY ELEMENTS TO INCLUDE:
  - The number "${vibration.number}" integrated elegantly into the composition
  - ${vibration.imageKeywords.join(', ')}
  - Golden particles and light rays
  - Cosmic/starry background elements
  - Subtle "2026" text or New Year elements

  COMPOSITION:
  - Vertical format optimized for mobile/stories (9:16 aspect ratio)
  - Central focal point with the number
  - Ethereal glow and light effects
  - Space for text overlay at bottom

  DO NOT INCLUDE:
  - Human faces or recognizable people
  - Text other than the number
  - Realistic photographs
  - Cluttered compositions`;

  if (includePhoto) {
    return `${basePrompt}

  ADDITIONAL INSTRUCTION:
  Incorporate the provided reference photo in a stylized, artistic way - 
  transform it into part of the mystical composition while maintaining 
  the overall ethereal aesthetic. The person should appear dreamlike and 
  integrated with the cosmic elements.`;
  }

  return basePrompt;
}

/**
 * Generates the shareable message text
 */
export function generateShareMessage(
  vibration: Vibration,
  readingSummary: string,
  advice: string[],
  appUrl: string = 'https://myyear.app'
): string {
  const adviceList = advice.slice(0, 4).map(a => `• ${a}`).join('\n');
  
  return `✨ Mi Vibración 2026: Año ${vibration.number} - ${vibration.shortName} ✨

  ${readingSummary}

  🔮 Mis consejos para 2026:
  ${adviceList}

  Descubre tu vibración en: ${appUrl}`;
}

/**
 * Gets a random loading message for the generation screen
 */
export function getLoadingMessage(): string {
  const messages = [
    'Consultando las estrellas...',
    'Alineando tu energía cósmica...',
    'Decodificando tu vibración...',
    'Conectando con el universo...',
    'Revelando tu destino 2026...',
    'Canalizando la sabiduría ancestral...',
    'Preparando tu lectura mística...',
    'Sincronizando con tu número personal...',
    'Tejiendo la magia de los números...',
    'Iluminando tu camino...',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
