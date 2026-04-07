# Astro Landing Page Template

Production-ready template: Astro 6, Tailwind 4, i18n (French/English), SEO (sitemap, Open Graph, JSON-LD, hreflang), landing page sections, legal pages, GitHub Pages deployment.

**Requirements:** Node.js ≥ 22.12 (see `package.json` → `engines`). A `.nvmrc` file is included for `nvm use`.

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Components](#components)
- [Internationalization (i18n)](#internationalization-i18n)
- [SEO Configuration](#seo-configuration)
- [ContentForge API](#contentforge-api)
- [Styling Guidelines](#styling-guidelines)
- [Deployment](#deployment)
- [Commands](#commands)

---

## Features

- **i18n**: French/English with toggle via `ENABLE_MULTILANG` environment variable
- **SEO**: Open Graph, Twitter Cards, JSON-LD, canonical URLs, hreflang, sitemap
- **Landing sections**: Hero, Services, Process, Reviews, FAQ, Contact, Footer
- **Legal pages**: Legal notice, Privacy policy, Terms of service
- **Accessibility**: Skip-link, semantic HTML, ARIA labels, focus management
- **LLM-ready**: Rules for Cursor, GitHub Copilot, and Codex

---

## Quick Start

### Option 1: Using as GitHub Template

1. Click **Use this template** → **Create a new repository**
2. Clone and install:

   ```sh
   git clone https://github.com/YOUR_USER/YOUR_REPO.git
   cd YOUR_REPO
   pnpm install
   cp .env.example .env
   pnpm dev
   ```

### Option 2: Using Astro CLI

Create a new project from this template:

```sh
pnpm create astro@latest my-landing -- --template YOUR_USER/landing-page-template
cd my-landing
pnpm install
cp .env.example .env
pnpm dev
```

Or with pnpm/yarn:

```sh
pnpm create astro@latest my-landing -- --template YOUR_USER/landing-page-template
yarn create astro my-landing --template YOUR_USER/landing-page-template
```

### Initial Configuration Checklist

After creating your project, update these files:

1. **`astro.config.mjs`** — Set `SITE` and `BASE` for your deployment URL
2. **`src/site.config.ts`** — Site name, contact info, SEO metadata
3. **`src/i18n/locales/fr.json`** — French content
4. **`src/i18n/locales/en.json`** — English content (if multilingual)
5. **`.env`** — Set `ENABLE_MULTILANG=true` for bilingual mode

---

## Project Structure

```text
/
├── public/
│   ├── favicon.svg
│   └── site.webmanifest
├── src/
│   ├── components/           # Landing sections and UI components
│   │   ├── HeroSection.astro
│   │   ├── LandingHome.astro         # Main composition component
│   │   ├── LandingServicesSection.astro
│   │   ├── LandingProcessSection.astro
│   │   ├── LandingReviewsSection.astro
│   │   ├── LandingFaqSection.astro   # Supports ContentForge API
│   │   ├── LandingContactSection.astro
│   │   ├── SiteFooter.astro
│   │   └── LanguageSwitcher.astro
│   ├── i18n/
│   │   ├── i18n.ts           # Translation system
│   │   └── locales/
│   │       ├── fr.json       # French translations
│   │       └── en.json       # English translations
│   ├── layouts/
│   │   └── Layout.astro      # SEO, hreflang, JSON-LD, meta tags
│   ├── lib/
│   │   ├── paths.ts          # URL utilities for base path
│   │   ├── seo.ts            # JSON-LD and hreflang helpers
│   │   └── contentforge.ts   # API integration
│   ├── pages/
│   │   ├── index.astro       # French landing (default)
│   │   ├── en/index.astro    # English landing
│   │   ├── legal-notice.astro
│   │   ├── privacy-policy.astro
│   │   ├── terms-of-service.astro
│   │   └── robots.txt.ts
│   ├── styles/
│   │   └── global.css        # Tailwind import and global styles
│   └── site.config.ts        # SEO: Central site configuration
├── .env.example              # Environment variables template
├── astro.config.mjs          # SEO: Site URL and base path
├── AGENTS.md                 # Codex base instructions
├── AGENTS.project.md         # Project-specific Codex instructions
└── .cursor/rules/            # Cursor AI rules
```

---

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Default | Description |
|----------|---------|-------------|
| `ENABLE_MULTILANG` | `false` | Set to `true` to enable French/English switcher |
| `CONTENTFORGE_API_TOKEN` | - | Optional API token for dynamic FAQ content |
| `CONTENTFORGE_URL` | `https://contentforge.1344.fr/api/v1` | Optional API base URL |

### Site Configuration (`src/site.config.ts`)

Central configuration file for all site metadata:

```typescript
export const siteConfig = {
  // SEO: Update for your site
  name: 'Your Site Name',
  tagline: 'Your tagline',
  defaultDescription: 'SEO description (150-160 chars)',
  
  // SEO: Browser and PWA
  lang: 'fr',
  locale: 'fr_FR',
  themeColor: '#047857',
  
  // Contact info (used in footer, contact section, JSON-LD)
  contact: {
    email: 'contact@example.com',
    phone: '+33 1 23 45 67 89',
  },
  
  // Legal (footer)
  legalId: 'SIRET: 123 456 789 00012',
  
  // SEO: Social media
  twitterHandle: 'yourhandle',
  sameAs: ['https://linkedin.com/company/...'],
  
  // SEO: Open Graph image
  ogImageUrl: '/og-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
};
```

### Astro Configuration (`astro.config.mjs`)

Update `SITE` and `BASE` for your deployment:

```javascript
// SEO: Update when switching to custom domain
const SITE = 'https://YOUR_USER.github.io';

// SEO: Set to '/' for custom domain root deployment
const BASE = '/your-repo-name/';
```

---

## Components

### Component Architecture

All landing sections follow a consistent pattern:

```astro
---
import { getFixedT, type Locale } from '../i18n/i18n';

interface Props {
  locale: Locale;  // Required: 'fr' or 'en'
}

const { locale } = Astro.props;
const t = getFixedT(locale);  // Get translation function
---

<section id="section-id" aria-labelledby="heading-id">
  <h2 id="heading-id">{t('SectionName.title')}</h2>
  <!-- Content using t() for all text -->
</section>
```

### Using Components

#### In Page Files

```astro
---
import Layout from '../layouts/Layout.astro';
import LandingHome from '../components/LandingHome.astro';
import { type Locale } from '../i18n/i18n';

const locale: Locale = 'fr';  // or 'en' for English page
---

<Layout lang="fr" ogLocale="fr_FR">
  <LandingHome locale={locale} />
</Layout>
```

#### Composition Component (`LandingHome.astro`)

This component assembles all landing sections:

```astro
---
import HeroSection from './HeroSection.astro';
import LandingServicesSection from './LandingServicesSection.astro';
import LandingProcessSection from './LandingProcessSection.astro';
import LandingReviewsSection from './LandingReviewsSection.astro';
import LandingFaqSection from './LandingFaqSection.astro';
import LandingContactSection from './LandingContactSection.astro';
import SiteFooter from './SiteFooter.astro';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
---

<HeroSection locale={locale} />
<main id="main-content">
  <LandingServicesSection locale={locale} />
  <LandingProcessSection locale={locale} />
  <LandingReviewsSection locale={locale} />
  <LandingFaqSection locale={locale} />
  <LandingContactSection locale={locale} />
</main>
<SiteFooter locale={locale} />
```

### Creating New Sections

1. Create `src/components/LandingNewSection.astro`:

```astro
---
import { getFixedT, type Locale } from '../i18n/i18n';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const t = getFixedT(locale);
---

<section
  id="new-section"
  class="border-t border-gray-200 bg-white px-4 py-20 md:py-24"
  aria-labelledby="heading-new-section"
>
  <div class="container mx-auto max-w-4xl">
    <h2 id="heading-new-section" class="mb-4 text-3xl font-bold text-gray-900">
      {t('LandingNewSection.title')}
    </h2>
    <p class="text-gray-600">{t('LandingNewSection.content')}</p>
  </div>
</section>
```

2. Add translation keys to `src/i18n/locales/fr.json` and `en.json`:

```json
{
  "LandingNewSection": {
    "title": "New Section Title",
    "content": "Section content here."
  }
}
```

3. Import and add to `LandingHome.astro`:

```astro
import LandingNewSection from './LandingNewSection.astro';
// ...
<LandingNewSection locale={locale} />
```

---

## Internationalization (i18n)

### Language Modes

#### French Only (Default)

Set `ENABLE_MULTILANG=false` in `.env`. The language switcher is hidden, and only the French page is accessible.

#### Bilingual (French + English)

Set `ENABLE_MULTILANG=true` in `.env`. The language switcher appears in the hero section.

### Translation System

The i18n system uses i18next with per-locale instances:

```typescript
// src/i18n/i18n.ts
import { getFixedT, type Locale } from '../i18n/i18n';

// Get translation function for a locale
const t = getFixedT('fr');  // or 'en'

// Use in components
t('HeroSection.tagline')  // Returns translated string
```

### Translation File Structure

Translations are organized by component in JSON files:

```json
// src/i18n/locales/fr.json
{
  "Layout": {
    "skipToContent": "Aller au contenu principal",
    "ogImageAlt": "Description of OG image"
  },
  "LandingPage": {
    "metaTitle": "Site Name — Tagline",
    "metaDescription": "SEO description (150-160 chars)"
  },
  "HeroSection": {
    "ariaLabel": "Accueil",
    "eyebrow": "Category or subtitle",
    "tagline": "Main headline",
    "primaryCta": "Contact Us",
    "secondaryCta": "Learn More"
  },
  "LandingServices": {
    "title": "Our Services",
    "intro": "Introduction text",
    "item1Title": "Service 1",
    "item1Desc": "Description 1"
    // ... more items
  }
  // ... more sections
}
```

### Checking Multilang Status

```typescript
import { isMultilangEnabled } from '../i18n/i18n';

const showLanguageSwitcher = isMultilangEnabled();
```

---

## SEO Configuration

Files and elements marked with `// SEO:` comments require updates for proper SEO:

### Required SEO Updates

#### 1. Site URL (`astro.config.mjs`)

```javascript
// SEO: Update when switching to custom domain
const SITE = 'https://your-domain.com';

// SEO: Set to '/' for custom domain root deployment
const BASE = '/';
```

#### 2. Site Metadata (`src/site.config.ts`)

```typescript
export const siteConfig = {
  // SEO: Update for your site
  name: 'Your Site Name',
  tagline: 'Your compelling tagline',
  defaultDescription: 'SEO description: who you are, what you do, for whom. 150-160 characters.',
  
  // SEO: Social media
  twitterHandle: 'yourhandle',
  sameAs: [
    'https://www.linkedin.com/company/yourcompany',
    'https://www.instagram.com/yourcompany'
  ],
  
  // SEO: Open Graph image
  ogImageUrl: 'https://your-domain.com/og-image.jpg',
};
```

#### 3. Page Meta (`src/i18n/locales/*.json`)

```json
{
  "LandingPage": {
    "metaTitle": "Site Name — Main Keyword | Secondary Keyword",
    "metaDescription": "Compelling description with keywords. Who you are, what you offer, call to action. 150-160 chars."
  },
  "Layout": {
    "ogImageAlt": "Descriptive alt text for social sharing image"
  }
}
```

### JSON-LD Structured Data

The template generates Organization and WebSite schema automatically via `src/lib/seo.ts`:

```typescript
// Automatically included in Layout.astro
const jsonLd = buildLandingJsonLd(alternates);
// Generates: @type Organization, @type WebSite
```

### Hreflang for Multilingual Sites

Automatically configured in `Layout.astro` when `alternateLanguages` prop is provided:

```astro
<Layout
  lang="fr"
  ogLocale="fr_FR"
  ogLocaleAlternate="en_US"
  alternateLanguages={[
    { hreflang: 'fr', href: '/fr/' },
    { hreflang: 'en', href: '/en/' },
    { hreflang: 'x-default', href: '/fr/' }
  ]}
/>
```

---

## ContentForge API

The FAQ section supports dynamic content from ContentForge API with graceful fallback.

### Setup

Set environment variables in `.env`:

```sh
CONTENTFORGE_URL=https://contentforge.1344.fr/api/v1
CONTENTFORGE_API_TOKEN=your_api_token_here
```

### How It Works

`LandingFaqSection.astro` fetches FAQs from the API at build time:

1. If API token is set and API responds: uses API data
2. If API fails or no token: falls back to translation file content

```typescript
// src/lib/contentforge.ts
import { contentforgeApiUrl } from '../lib/contentforge';

const faqsUrl = contentforgeApiUrl('faqs');
// Returns: https://contentforge.1344.fr/api/v1/faqs
```

### Extending to Other Sections

To add ContentForge support to another section:

```astro
---
import { contentforgeApiUrl } from '../lib/contentforge';

const apiUrl = contentforgeApiUrl('reviews');  // or your endpoint
const apiToken = import.meta.env.CONTENTFORGE_API_TOKEN;

const getData = async () => {
  if (!apiToken) return getFallbackData();
  
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Accept: 'application/json',
      },
    });
    if (!response.ok) return getFallbackData();
    return await response.json();
  } catch {
    return getFallbackData();
  }
};

const data = await getData();
---
```

---

## Styling Guidelines

### Tailwind CSS Rules

This template uses **Tailwind CSS 4** with strict conventions:

#### ✅ DO: Use Native Tailwind Classes

```astro
<div class="flex items-center justify-between gap-4 px-6 py-4">
  <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">Title</h2>
  <button class="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
    Click
  </button>
</div>
```

#### ❌ DON'T: Use Arbitrary Values

```astro
<!-- WRONG: Arbitrary values with brackets -->
<div class="w-[347px] mt-[23px] text-[#1a2b3c]">
```

#### ❌ DON'T: Use Inline Styles

```astro
<!-- WRONG: Inline styles -->
<div style="margin-top: 23px; color: #1a2b3c;">
```

### Animations

#### 1. First: Try Native Tailwind Animations

```astro
<div class="animate-pulse">Loading...</div>
<div class="animate-spin">⟳</div>
<div class="animate-bounce">↓</div>
```

#### 2. Then: Use Tailwind Transitions

```astro
<button class="transition-colors duration-200 hover:bg-emerald-700">
  Hover me
</button>

<div class="transition-transform duration-300 hover:scale-105">
  Scale on hover
</div>
```

#### 3. Only if Needed: Custom Keyframes

Add to `src/styles/global.css`:

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
```

### Color Palette

The template uses Tailwind's emerald and gray palettes:

- **Primary**: `emerald-600`, `emerald-700` (CTAs, accents)
- **Background**: `white`, `gray-50`, `gray-900` (dark sections)
- **Text**: `gray-900` (headings), `gray-600` (body), `gray-400` (muted)
- **Borders**: `gray-200`, `gray-300`

---

## Deployment

### GitHub Pages

The workflow `.github/workflows/deploy-github-pages.yml` builds and deploys on push to `main` or `master`.

1. **Repository** → **Settings** → **Pages**: set source to **GitHub Actions**
2. Update `SITE` and `BASE` in `astro.config.mjs`:
   - Project repo: `SITE = 'https://USER.github.io'`, `BASE = '/repo-name/'`
   - Custom domain: `SITE = 'https://your-domain.tld'`, `BASE = '/'`

### Other Platforms

#### Vercel

```sh
pnpm astro add vercel
```

#### Netlify

```sh
pnpm astro add netlify
```

#### Cloudflare Pages

```sh
pnpm astro add cloudflare
```

---

## Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build for production → `dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm astro add [integration]` | Add Astro integration |
| `pnpm astro check` | Check for TypeScript errors |

---

## Documentation

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [i18next](https://www.i18next.com/)
