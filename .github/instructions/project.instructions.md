# Copilot Project Instructions

Project-specific instructions for GitHub Copilot.
These complement the base instructions in `.github/copilot-instructions.md`.

## First Steps

**READ THE README.md FIRST** to understand:
- How to configure the project (`site.config.ts`, `astro.config.mjs`)
- Component patterns and the `locale` prop system
- Translation file structure (`src/i18n/locales/`)
- SEO configuration (look for `// SEO:` comments in code)
- ContentForge API integration for dynamic content
- Tailwind styling conventions

## Project Overview

Landing page template for conversion-focused marketing sites:
- Single-language (French) or bilingual (French/English) modes
- Multi-language controlled by `ENABLE_MULTILANG` environment variable
- ContentForge API integration for dynamic FAQ content
- Complete SEO setup (Open Graph, JSON-LD, hreflang, sitemap)

## Key Files

| File | Purpose |
|------|---------|
| `src/site.config.ts` | SEO: Site name, contact, social, OG image |
| `astro.config.mjs` | SEO: Site URL and base path |
| `src/i18n/locales/fr.json` | French translations |
| `src/i18n/locales/en.json` | English translations |
| `src/layouts/Layout.astro` | SEO: Meta tags, hreflang, JSON-LD |
| `src/lib/seo.ts` | JSON-LD structured data builders |
| `src/lib/contentforge.ts` | API integration utility |

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

## SEO Markers

Files containing `// SEO:` comments indicate elements requiring updates:
- `astro.config.mjs` — Site URL and base path
- `src/site.config.ts` — All site metadata

## ContentForge API

FAQ section supports API-driven content:
- Set `CONTENTFORGE_API_TOKEN` in `.env` to enable
- Falls back to translation file if API unavailable

## Tailwind Styling

**STRICT RULES**:
- Native Tailwind classes ONLY
- NO arbitrary values like `w-[347px]` or `text-[#color]`
- NO inline styles
- Animations: Tailwind native → transitions → keyframes (last resort)

## Color Palette

- **Primary**: `emerald-600`, `emerald-700`
- **Dark sections**: `gray-900`, `gray-950`
- **Light sections**: `white`, `gray-50`
- **Text**: `gray-900` (headings), `gray-600` (body)
- **Borders**: `gray-200`, `gray-300`

## Conversion Focus

- Guide visitors toward clear conversion actions
- Primary CTA: `bg-emerald-600 text-white hover:bg-emerald-700`
- Secondary CTA: `border border-gray-300 hover:bg-gray-50`
