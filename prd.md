# PRD: Tu Vibración 2026

## Visión

Webapp que calcula tu número de año personal basado en numerología y genera una predicción + imagen AI personalizada para compartir en redes sociales.

## Problema

Las personas buscan orientación y significado al comenzar un nuevo año. La numerología ofrece una perspectiva personalizada basada en la fecha de nacimiento, pero las herramientas actuales son genéricas y poco compartibles.

## Solución

Una experiencia web simple y visualmente atractiva que:
1. Calcula el número de año personal del usuario
2. Genera una lectura personalizada con consejos prácticos
3. Crea una imagen AI única para compartir

---

## Stack Técnico

| Componente | Tecnología |
|------------|------------|
| Framework | TanStack Start |
| AI SDK | Vercel AI SDK |
| AI Text | Gemini (streaming con `streamText`) |
| AI Image | Gemini 2.5 Flash Image (`generateText` + `result.files`) |
| Background Jobs | Inngest |
| Hosting | Vercel |
| Tema Visual | Amarillo / Dorado / Año Nuevo |

---

## Flujo de Usuario

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Landing   │ ──▶ │ Fecha nacimiento │ ──▶ │ Subir foto? │
└─────────────┘     └──────────────────┘     └─────────────┘
                                                    │
                                                    ▼
┌─────────────────────────────────────────────────────────────┐
│                      Procesando...                          │
│            (cálculo + lectura AI + imagen AI)               │
└─────────────────────────────────────────────────────────────┘
                                                    │
                                                    ▼
┌─────────────────────────────────────────────────────────────┐
│                        Resultado                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Tu Año Personal: 5 - El Año del Cambio             │   │
│  │  [Lectura personalizada]                            │   │
│  │  [Consejos prácticos]                               │   │
│  │  [Imagen AI generada]                               │   │
│  │                                                     │   │
│  │  [Descargar] [Copiar mensaje] [Compartir WhatsApp]  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Historias de Usuario

### Epic 1: Cálculo Numerológico

#### US-1.1: Ingresar fecha de nacimiento

> Como usuario, quiero ingresar mi fecha de nacimiento para conocer mi número de año personal.

**Criterios de aceptación:**
- Selector de fecha (día, mes, año)
- Validación de fecha válida
- Usuarios mayores a 10 años
- UX mobile-first

#### US-1.2: Ver mi número de año personal

> Como usuario, quiero ver mi número calculado (1-9) con su significado.

**Criterios de aceptación:**
- Mostrar número prominente con animación de revelación
- Nombre de la vibración (ej: "5 - El Año del Cambio")
- Breve descripción de la energía del número

---

### Epic 2: Lectura y Consejos

#### US-2.1: Recibir lectura personalizada

> Como usuario, quiero recibir una lectura de cómo será mi 2026 según mi vibración.

**Criterios de aceptación:**
- Lectura de 3-4 párrafos generada por AI
- Tono místico pero accesible
- Basada en el número de año personal
- Streaming de texto para mejor UX

#### US-2.2: Recibir consejos prácticos

> Como usuario, quiero recibir consejos accionables para aprovechar mi año.

**Criterios de aceptación:**
- 4-5 consejos específicos a la vibración
- Formato fácil de leer
- Accionables y prácticos

---

### Epic 3: Generación de Imagen

#### US-3.1: Subir foto de referencia (opcional)

> Como usuario, quiero subir mi foto para que la imagen generada me incluya.

**Criterios de aceptación:**
- Upload de imagen (jpg, png, webp)
- Preview antes de confirmar
- Límite de tamaño: 5MB
- Completamente opcional

#### US-3.2: Generar imagen del año

> Como usuario, quiero recibir una imagen AI que represente mi vibración 2026.

**Criterios de aceptación:**
- Procesamiento en background con Inngest
- Indicador de progreso mientras genera
- Estética: místico, cósmico, dorado/amarillo
- Con foto: incluirla estilizada en la imagen
- Sin foto: imagen abstracta de la vibración
- Resolución optimizada para compartir

#### US-3.3: Descargar imagen

> Como usuario, quiero descargar mi imagen para compartirla.

**Criterios de aceptación:**
- Botón de descarga prominente
- Formato: 1080x1920 (stories) o 1080x1080 (feed)
- Incluye texto overlay: "Mi 2026: Año [#]"
- Watermark sutil con URL de la app

---

### Epic 4: Compartir

#### US-4.1: Pantalla de carga durante generación

> Como usuario, quiero ver un estado de progreso mientras se genera mi imagen.

**Criterios de aceptación:**
- Animación temática (estrellas, destellos dorados)
- Mensajes de espera amigables rotativos
- Indicador de progreso o tiempo estimado

#### US-4.2: Copiar resultado completo

> Como usuario, quiero copiar mi lectura y consejos en un solo mensaje para compartirlo.

**Criterios de aceptación:**
- Botón "Copiar mensaje"
- Confirmación visual al copiar ("¡Copiado!")
- Formato del mensaje:

```
✨ Mi Vibración 2025: Año [#] - [Nombre] ✨

[Lectura resumida en 2-3 líneas]

🔮 Mis consejos para 2025:
• [Consejo 1]
• [Consejo 2]
• [Consejo 3]
• [Consejo 4]

Descubre tu vibración en: [url]
```

#### US-4.3: Compartir en WhatsApp

> Como usuario, quiero compartir directamente a WhatsApp.

**Criterios de aceptación:**
- Botón "Compartir en WhatsApp"
- Abre WhatsApp con mensaje pre-llenado
- Web Share API como fallback en mobile

---

## Resumen de Acciones de Compartir

| Acción | Contenido | Formato |
|--------|-----------|---------|
| Descargar imagen | Imagen AI + número + año | PNG/JPG |
| Copiar mensaje | Lectura + consejos + URL | Texto |
| Compartir WhatsApp | Mensaje pre-llenado | Deep link |

---

## Contenido por Número

| # | Nombre | Energía | Keywords para Imagen |
|---|--------|---------|---------------------|
| 1 | Nuevos Comienzos | Independencia, liderazgo, iniciativa | sunrise, phoenix, golden light, new dawn |
| 2 | Armonía | Relaciones, cooperación, paciencia | balance, yin-yang, soft glow, partnership |
| 3 | Expresión | Creatividad, comunicación, alegría | colors, creativity, sparkles, joy |
| 4 | Fundamentos | Estructura, trabajo, estabilidad | earth, roots, structure, golden bricks |
| 5 | Cambio | Libertad, aventura, transformación | wind, transformation, butterfly, motion |
| 6 | Amor | Familia, responsabilidad, servicio | heart, family, warmth, embrace |
| 7 | Introspección | Espiritualidad, sabiduría, análisis | stars, meditation, cosmic, third eye |
| 8 | Abundancia | Poder, logros, manifestación | gold coins, success, crown, prosperity |
| 9 | Transformación | Cierre de ciclos, humanitarismo | phoenix, ending, rebirth, spiral |

---

## Fórmula de Cálculo

**Número de Año Personal = Día + Mes + 2026 (reducido a un dígito)**

Ejemplo para alguien nacido el 15 de marzo:
```
15 + 3 + 2026 = 2044
2 + 0 + 4 + 4 = 1

Año Personal: 1
```

*Nota: Los números maestros (11, 22, 33) se reducen a un dígito para simplificar.*

---

## Diseño Visual

### Paleta de Colores

| Uso | Color | Hex |
|-----|-------|-----|
| Primario | Amarillo dorado | #FFD700 |
| Secundario | Amarillo suave | #FFF8DC |
| Acento | Dorado oscuro | #DAA520 |
| Fondo | Negro/Azul noche | #0D1B2A |
| Texto | Blanco | #FFFFFF |

### Estética General
- Temática: Año Nuevo, celebración, misticismo
- Elementos: Estrellas, destellos, partículas doradas
- Tipografía: Elegante pero legible
- Animaciones: Sutiles, fluidas

---

## Fuera de Alcance (v1)

- Autenticación / guardar resultados
- Múltiples idiomas
- Comparar con otros años
- Compatibilidad entre personas
- Historial de consultas
- Notificaciones

---

## Métricas de Éxito

| Métrica | Objetivo |
|---------|----------|
| Tasa de completación | > 70% de usuarios que inician terminan el flujo |
| Descargas de imagen | > 50% de usuarios descargan su imagen |
| Compartidos | > 30% de usuarios usan alguna opción de compartir |
| Tiempo en sitio | < 3 minutos para completar flujo |

---

## Consideraciones Técnicas

### Background Jobs (Inngest)
- La generación de imagen puede tomar 10-30 segundos
- Usar jobs para no bloquear la UI
- Implementar polling o webhooks para notificar completación

### Vercel AI SDK + Gemini
- Streaming de texto para la lectura (`streamText`)
- Generación de imagen con `generateText` + Gemini 2.5 Flash Image
- Las imágenes vienen en `result.files` como `Uint8Array`
- Manejo de errores y reintentos

### Optimización de Imágenes
- Generar múltiples tamaños para diferentes usos
- Cachear resultados si es posible
- Considerar Vercel Blob para storage temporal

---

## Implementación de Imagen AI

```typescript
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const result = await generateText({
  model: google('gemini-2.5-flash-image-preview'),
  prompt: `Create a mystical, cosmic image for Year ${number} - ${name}. 
           Style: golden, ethereal, new year celebration.
           Keywords: ${keywords}`,
});

for (const file of result.files) {
  if (file.mediaType.startsWith('image/')) {
    // file.base64 o file.uint8Array para guardar/enviar
  }
}
```
