# ✨ Tu Vibración 2026

Webapp de numerología que calcula tu número de año personal y genera una predicción personalizada con imagen AI para compartir en redes sociales.

## 🌟 Características

- Calculo del **Número de Año Personal** (1-9) basado en numerología
- **Lectura personalizada** generada por IA con streaming de texto
- **Consejos prácticos** accionables para todo el año
- **Imagen AI única** representando tu vibración del 2026
- Experiencia **interactiva con parallax** y animaciones fluidas
- **Imagen para stories** (9:16) para compartir en redes sociales
- **Modal de donaciones** integrado con Plin/Yape
- Diseño **mobile-first** totalmente responsivo
- Sin anuncios - experiencia limpia

## 🛠 Stack Técnico

| Componente | Tecnología |
|------------|------------|
| **Runtime** | Bun |
| **Framework** | TanStack Start (file-based routing) |
| **UI** | React 19 + Tailwind CSS 4 |
| **AI SDK** | Vercel AI SDK |
| **AI Text** | Google Gemini (streaming) |
| **AI Image** | Gemini 2.5 Flash Image Preview |
| **Background Jobs** | Inngest |
| **Database** | Neon (PostgreSQL) + Drizzle ORM |
| **Image Storage** | Vercel Blob |
| **Animations** | Framer Motion |
| **Language** | TypeScript (strict mode) |

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd myyear

# Instalar dependencias
bun install

# Copiar archivo de entorno
cp .env.example .env
```

## ⚙️ Configuración

Configura las siguientes variables de entorno en `.env`:

```bash
# Google AI (Gemini) - para generación de texto e imágenes
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here

# Inngest - para jobs en background
INNGEST_EVENT_KEY=your_inngest_event_key_here
INNGEST_SIGNING_KEY=your_inngest_signing_key_here

# Neon Database - PostgreSQL serverless
DATABASE_URL=postgres://user:password@ep-xyz.us-east-1.aws.neon.tech/myyear?sslmode=require

# Vercel Blob - almacenamiento de imágenes
BLOB_READ_WRITE_TOKEN=vercel_blobs_xxxxxxxx
BLOB_STORE_NAME=myyear-images

# URL de la aplicación
VITE_APP_URL=http://localhost:3000
```

### Obtener API Keys

- **Gemini API**: https://aistudio.google.com/apikey
- **Inngest**: https://app.inngest.com (crear cuenta gratuita)
- **Neon Database**: https://console.neon.tech
- **Vercel Blob**: https://vercel.com/dashboard/blob

## 💻 Comandos

```bash
# Desarrollo
bun run dev              # Iniciar servidor de desarrollo (puerto 3000)

# Base de datos
bun run db:push          # Hacer push del schema a la DB
bun run db:reset         # Resetear la base de datos (dev only)

# Producción
bun run build            # Build de producción + check de TypeScript
bun run preview          # Previsualizar build de producción
bun run start            # Ejecutar servidor de producción

# Inngest (background jobs)
bun run inngest:dev      # Iniciar servidor de desarrollo de Inngest
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React de UI
│   ├── parallax/       # Secciones con efecto parallax
│   └── ui/             # Componentes reutilizables
├── db/                 # Schema de base de datos (Drizzle)
├── inngest/            # Background jobs para generación de imágenes
│   ├── client.ts       # Cliente de Inngest + tipos de eventos
│   └── functions/      # Funciones de job
├── lib/                # Lógica de negocio core (no UI)
│   ├── numerology.ts   # Cálculos de numerología
│   ├── vibrations.ts   # Base de datos de 9 vibraciones
│   └── prompts.ts      # Generadores de prompts para IA
├── routes/             # Rutas de TanStack (file-based)
├── styles/             # Estilos globales + Tailwind
└── utils/              # Utilidades varias
```

## 🔮 Fórmula Numerológica

El **Número de Año Personal** se calcula sumando tu día de nacimiento + mes + año objetivo (2026), y reduciendo a un solo dígito.

### Ejemplo

Para alguien nacido el **15 de marzo**:

```
15 + 3 + 2026 = 2044
2 + 0 + 4 + 4 = 10
1 + 0 = 1

Año Personal: 1 - Nuevos Comienzos
```

### Los 9 Números

| # | Nombre | Energía |
|---|--------|---------|
| 1 | Nuevos Comienzos | Independencia, liderazgo, iniciativa |
| 2 | Armonía | Relaciones, cooperación, paciencia |
| 3 | Expresión | Creatividad, comunicación, alegría |
| 4 | Fundamentos | Estructura, trabajo, estabilidad |
| 5 | Cambio | Libertad, aventura, transformación |
| 6 | Amor | Familia, responsabilidad, servicio |
| 7 | Introspección | Espiritualidad, sabiduría, análisis |
| 8 | Abundancia | Poder, logros, manifestación |
| 9 | Transformación | Cierre de ciclos, humanitarismo |

## 🎨 Tema Visual

- **Paleta**: Oro (#FFD700), Noche (#0D1B2A), Púrpura (#4A0E78)
- **Estética**: Mística, cósmica, celebración de año nuevo
- **Clases CSS personalizadas**: `.btn-gold`, `.card-mystical`, `.stars-bg`
- **Animaciones**: `shimmer`, `float`, `pulse-gold`, `twinkle`

## 🌐 Despliegue

El proyecto está optimizado para despliegue en:

- **Vercel** (recomendado) - hosting + funciones serverless
- **Netlify** - alternativa viable
- **Cualquier plataforma** que soporte Bun/Node.js

## 📄 Licencia

Este proyecto es privado y confidencial.

---

**Desarrollado con** 🚀 Bun + React 19 + Tailwind 4
