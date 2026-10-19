/** Internal link compatible with GitHub Pages (non-root base in astro.config.mjs). */
export function pageHref(path: string): string {
	const base = import.meta.env.BASE_URL;
	const clean = path.startsWith('/') ? path.slice(1) : path;
	return base + clean;
}

/** URL path segments for pages (matches filenames in src/pages/). */
export const pageRoutes = {
	home: '',
	englishHome: 'en/',
	legalNotice: 'mentions-legales/',
	privacyPolicy: 'politique-de-confidentialite/',
	termsOfService: 'conditions-generales/',
} as const;
