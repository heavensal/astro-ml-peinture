/**
 * Single source of truth for site metadata (SEO, contact, social).
 * Legal pages reuse these values where relevant.
 *
 * SEO: All values in this file affect SEO and should be customized.
 */
export const siteConfig = {
	// SEO: Site identity
	/** Displayed name (meta tags, footer, Open Graph) */
	name: 'ML Entreprise Peinture',
	/** Short phrase below main title */
	tagline: 'Artisan peintre à Marseille — 15 ans d'expérience',

	// SEO: Meta description (150-160 chars recommended)
	/** Default meta description for search engines */
	defaultDescription:
		'ML Entreprise Peinture, artisan peintre à Marseille et Bouches-du-Rhône. Rénovation appartement, maison, dégât des eaux. Devis gratuit sous 24h.',

	// SEO: Language and locale
	lang: 'fr',
	locale: 'fr_FR',

	/** Browser theme color (mobile) */
	themeColor: '#ea580c',

	// SEO: Contact info (used in footer, contact section, JSON-LD)
	contact: {
		email: 'contact@mlpeinture.fr',
		phone: '06 11 03 03 69',
	},

	/** SIRET / legal ID displayed in footer and legal pages */
	legalId: '790 748 230 RM 13013 — APE 43.34Z',

	// SEO: Social media profiles
	/** @handle without @; leave empty if no account */
	twitterHandle: '',
	/**
	 * Social profile URLs for JSON-LD sameAs (LinkedIn, Instagram, etc.)
	 * Example: ['https://www.linkedin.com/company/...', 'https://instagram.com/...']
	 */
	sameAs: [] as string[],

	// SEO: Open Graph image for social sharing
	/**
	 * Open Graph image dimensions (1200×630 recommended).
	 * Set to 0 to omit width/height meta tags.
	 */
	ogImageWidth: 1200,
	ogImageHeight: 630,
	/**
	 * Absolute URL for Open Graph image, or '' to omit.
	 * After deployment, can be `https://your-domain.com/og-image.jpg` if you add the file to public/.
	 */
	// SEO: Update ogImageUrl after deploying to final domain
	ogImageUrl: '',
} as const;
