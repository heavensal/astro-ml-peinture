// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * Astro configuration for landing page template.
 *
 * SEO: Update SITE and BASE when deploying to production.
 *
 * Deployment scenarios:
 * - GitHub Pages project repo: SITE = 'https://USER.github.io', BASE = '/repo-name/'
 * - GitHub Pages user repo: SITE = 'https://USER.github.io', BASE = '/'
 * - Custom domain: SITE = 'https://your-domain.tld', BASE = '/'
 */

// SEO: Production site URL (affects canonical URLs, sitemap, Open Graph)
const SITE = 'https://mlpeinture.fr';

// SEO: Base path (repo name for GitHub Pages, '/' for custom domain)
const BASE = '/';

// https://astro.build/config
export default defineConfig({
	site: SITE,
	base: BASE,
	integrations: [sitemap()],
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport',
	},
	vite: {
		plugins: [tailwind()],
	},
});
