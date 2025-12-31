# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tu Vibración 2026** is a Spanish-language numerology webapp that calculates a user's Personal Year Number (1-9) for 2026, generates AI-powered personalized readings, and creates shareable AI-generated images.

### Tech Stack
- **Runtime:** Bun
- **Framework:** TanStack Start (file-based routing meta-framework)
- **UI:** React 19 + Tailwind CSS 4
- **AI:** Vercel AI SDK + Google Gemini (streaming text + image generation)
- **Background Jobs:** Inngest
- **Language:** TypeScript (strict mode)

### Development Commands

```bash
bun run dev          # Start dev server (port 3000)
bun run build        # Production build + TypeScript check
bun run preview      # Preview production build
bun run start        # Run production server
bun run inngest:dev  # Start Inngest dev server (background jobs)
```

## Architecture

```
src/
├── lib/               # Core business logic (no UI)
│   ├── numerology.ts  # Numerology calculations (formula, validation)
│   ├── vibrations.ts  # Database of 9 vibrations with metadata
│   └── prompts.ts     # AI prompt generators
├── inngest/           # Background jobs
│   ├── client.ts      # Inngest client + event types
│   └── functions/     # Job functions (e.g., image generation)
├── routes/            # TanStack file-based routing
├── components/        # React components
└── styles/app.css     # Tailwind + custom theme
```

## Key Concepts

### Numerology Formula
Personal Year = Day + Month + 2026, reduced to single digit (1-9)
Example: March 15 → 15 + 3 + 2026 = 2044 → 2+0+4+4 = 1

All master numbers (11, 22, 33) are reduced to single digits for this app.

### Vibrations Database
Each vibration (1-9) in `lib/vibrations.ts` contains:
- `name`, `shortName`, `energy`, `description`
- `keywords` (for text generation), `imageKeywords` (for image prompts)
- `color`, `element`, `emoji`

### AI Integration
- **Text:** `streamText` with Gemini for real-time reading generation
- **Images:** `generateText` with `gemini-2.5-flash-image-preview`, images in `result.files`
- **Background:** Inngest handles 10-30s image generation async

## Visual Theme

**Palette:** Gold (#FFD700), Night (#0D1B2A), Purple (#4A0E78)

**Custom CSS classes** (see `styles/app.css`):
- `.btn-gold` - Primary CTA with gradient
- `.card-mystical` - Glassmorphism effect
- `.stars-bg` - Animated starry background
- Animations: `shimmer`, `float`, `pulse-gold`, `twinkle`

## Important Notes

- Path alias `~/*` maps to `./src/*`
- Date validation: ages 10-120 only
- Image format: 9:16 vertical (stories) or 1:1 (feed)
- All user-facing text in Spanish
- Template routes in `src/routes/` (e.g., `/users`, `/posts`) are leftovers from TanStack Start template - remove for production

## Environment Variables

```
GOOGLE_GENERATIVE_AI_API_KEY    # Gemini API
INNGEST_EVENT_KEY               # Inngest event key
INNGEST_SIGNING_KEY             # Inngest signing key
VITE_APP_URL                    # App URL (default: http://localhost:3000)
```

## Reference

See `prd.md` for complete Product Requirements Document with user stories and implementation details.
