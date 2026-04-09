# TalkPower — Copilot Instructions

## Project Overview

TalkPower is a "Meeting Power Overlay" web app that reveals hidden power dynamics in meetings by analyzing diarized meeting transcripts from uploaded audio. Built as a hackathon prototype.

## Tech Stack

- **Framework**: Nuxt 4 with Vue 3 Composition API
- **Language**: TypeScript everywhere
- **Components**: shadcn-vue (built on Reka UI primitives)
- **Utilities**: VueUse for reactive browser helpers
- **Animation**: GSAP for timeline-based motion
- **Media**: MagicPlayer from `@maas/vue-equipment` for audio playback
- **Styling**: Pure CSS only — no Tailwind, no SCSS
- **API**: OpenAI `gpt-4o-transcribe-diarize` for speaker diarization
- **Backend**: Nuxt server routes only — no database, no auth

## Project Structure

```
app/
  pages/            → Thin routing pages
  components/       → Vue SFCs (UI + data-visual)
  composables/      → Shared logic and side effects
  utils/            → Pure functions (metrics, formatting)
  types/            → TypeScript types
  data/             → Mock data
  assets/css/       → CSS foundation (tokens, global styles)
server/
  api/              → Nuxt server routes
```

## Coding Conventions

### TypeScript

- Use `<script setup lang="ts">` in all Vue SFCs
- All utility functions must be typed — no `any` unless truly unavoidable
- Prefer interfaces over type aliases for object shapes
- Export types from `app/types/` and import where needed

### Functional-first

- Prefer pure functions — data in, data out
- No mutation of arguments
- No hidden writes to outer scopes
- Use `const` by default, `let` only when absolutely needed, never `var`
- Prefer `map`, `filter`, `reduce`, spreads over `push`, `splice`

### Control Flow

- Guard clauses over nesting
- Early returns to reduce depth
- Soft limit of 2 indentation levels
- Break complex conditions into small named helpers

### Functions

- Keep functions small and focused
- If it does multiple conceptual things, split it
- Target ~30 lines max, extract helpers beyond that

### Vue / Nuxt

- `<script setup lang="ts">` always
- Composables for shared logic and side effects
- Pages are thin: routing + wiring only, push logic into composables/utils
- Props: destructure with defaults, not `withDefaults`
  ```vue
  const { loading = false, size = "medium" } = defineProps<Props>();
  ```
- When adding logic to a component, prefer creating a small composable

### VueUse

- Use where it clearly simplifies browser-side logic
- Good: file/object URL handling, reactive timers, local storage, element observers, debounce
- Don't add VueUse utilities just for the sake of it

### GSAP

- Use only where motion improves understanding and dramatic clarity
- Good: transcript highlight synced to playback, insight cards revealing in sequence, bars animating by dominance, timeline markers pulsing at key moments
- Bad: decorative motion that makes UI feel slow
- Always use CSS variable timing tokens (`--time-1` through `--time-6`) for durations
- Encapsulate in composables, not scattered raw calls

### MagicPlayer

- Import from `@maas/vue-equipment/plugins/MagicPlayer`
- Components: `MagicPlayerProvider`, `MagicPlayerAudio`, `MagicPlayerAudioControls`
- Composable: `useMagicPlayer(id)` returns `currentTime`, `duration`, `audioApi.seek(time)`, etc.
- Player is the engine — the transcript, timeline, and insight layers are the main UI surface

## CSS Conventions

### Foundation

- Pure CSS only — no Tailwind, no SCSS, no preprocessors
- Use Vue scoped CSS or regular CSS files
- All styling derives from the project's CSS custom property system

### Class Naming

- **PascalCase**: specific UI elements → `CounterButton`, `UserChip`
- **lowercase**: abstract reusable classes → `button`, `rounded`, `border`
- **camelCase**: variants/states/mods → `buttonMedium`, `chipPrimary`
- **kebab-case**: token conversions → `base-accent`, `base-warning`

### Spacing Model

- Parents control spacing — use `gap` and `padding`
- Avoid margins — especially on children
- Reset margins on semantic elements

### Token System (always use these)

```css
/* Radius */
--radius-inner, --radius, --radius-outer

/* Borders */
--border-size, --border-color, --border

/* Internal spacing (inside elements) */
--space-bit-0 through --space-bit-5

/* External spacing (between elements) */
--space-1 through --space-10

/* Element heights */
--block-0 through --block-4

/* Panel widths */
--panel-0 through --panel-3

/* Timing */
--time-1 (0.1s), --time-2, --time-3, --time-4, --time-6
--timing: ease-in-out

/* Colors (Umbra-generated) */
--base, --base-10 through --base-120, --base-text
--accent, --accent-10 through --accent-120, --accent-text
--warning-*, --success-*, --info-*, --yellow-*

/* Token conversion classes */
.base-accent, .base-warning, .base-success, .base-info, .base-yellow
```

### Rules

- Avoid hardcoded pixel values when a token can reasonably be used
- If introducing a new CSS custom property, explain why and keep it aligned with the system
- When styling shadcn-vue or Reka UI components, adapt them to this token system
- Semantic class names always

## OpenAI Diarization API

- Model: `gpt-4o-transcribe-diarize`
- Response format: `diarized_json`
- Chunking strategy: `"auto"` (required for audio > 30s)
- Returns segments with: `speaker`, `text`, `start`, `end`
- File size limit: 25 MB
- Supported formats: mp3, mp4, mpeg, mpga, m4a, wav, webm

## Architecture Principles

- Hackathon-friendly: minimal, fast to iterate, strong demo potential
- No database, no auth, no overengineering
- Thin backend (server routes) + strong frontend presentation
- Mock data fallback so UI works without live API
- Interruption detection is heuristic — doesn't need to be academically correct
- Speaker labels are generic (Speaker A, B, C) — rename later is optional
