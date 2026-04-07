# Codex Project Instructions

Project-specific instructions for this landing page template.
These complement the base instructions in `AGENTS.md`.

## First Steps

**READ THE README.md FIRST** to understand:
- How to configure the project (`site.config.ts`, `astro.config.mjs`)
- Component patterns and the `locale` prop system
- Translation file structure (`src/i18n/locales/`)
- SEO configuration (look for `// SEO:` comments in code)
- ContentForge API integration for dynamic content
- Tailwind styling conventions

## Project Overview

This is a landing page template for conversion-focused marketing sites with:
- Single-language (French) or bilingual (French/English) modes
- Multi-language controlled by `ENABLE_MULTILANG` environment variable
- ContentForge API integration for dynamic FAQ content
- Complete SEO setup (Open Graph, JSON-LD, hreflang, sitemap)

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/site.config.ts` | SEO: Site name, contact, social, OG image |
| `astro.config.mjs` | SEO: Site URL and base path |
| `src/i18n/locales/fr.json` | French translations (all text content) |
| `src/i18n/locales/en.json` | English translations |
| `src/layouts/Layout.astro` | SEO: Meta tags, hreflang, JSON-LD |
| `src/lib/seo.ts` | JSON-LD structured data builders |
| `src/lib/contentforge.ts` | API integration utility |
| `.env` | Runtime configuration |

## Component Architecture

All landing components follow this pattern:

```astro
---
import { getFixedT, type Locale } from '../i18n/i18n';

interface Props {
  locale: Locale;  // Required: 'fr' or 'en'
}

const { locale } = Astro.props;
const t = getFixedT(locale);
---

<section id="section-id" aria-labelledby="heading-id">
  <h2 id="heading-id">{t('SectionName.title')}</h2>
</section>
```

### Creating New Components

1. Create `src/components/LandingNewSection.astro` with `locale` prop
2. Add translation keys to both `fr.json` and `en.json`
3. Import and add to `src/components/LandingHome.astro`

## SEO Markers

Files containing `// SEO:` comments indicate elements requiring updates:
- `astro.config.mjs` — Site URL and base path
- `src/site.config.ts` — All site metadata
- Look for these comments when doing SEO setup

## ContentForge API

The FAQ section supports API-driven content with fallback:
- Set `CONTENTFORGE_API_TOKEN` in `.env` to enable
- API data fetched at build time
- Falls back to translation file if API unavailable

## Conversion Focus

- Every section should guide visitors toward a clear conversion action
- Emphasize trust signals, social proof, and clear CTAs
- Primary CTA: emerald-600 background with white text
- Secondary CTA: white/transparent with border

## Tailwind Styling

**STRICT RULES** (see `AGENTS.md` for details):
- Use native Tailwind classes ONLY
- NO arbitrary values like `w-[347px]` or `text-[#color]`
- NO inline styles
- Animations: Tailwind native → transitions → keyframes (last resort)

## Color Palette

- **Primary**: `emerald-600`, `emerald-700`
- **Dark sections**: `gray-900`, `gray-950`
- **Light sections**: `white`, `gray-50`
- **Text**: `gray-900` (headings), `gray-600` (body)
- **Borders**: `gray-200`, `gray-300`
