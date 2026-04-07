/**
 * Single source of truth for site metadata (SEO, contact, social).
 * Legal pages reuse these values where relevant.
 *
 * SEO: All values in this file affect SEO and should be customized.
 */
export const siteConfig = {
	// SEO: Site identity
	/** Displayed name (meta tags, footer, Open Graph) */
	name: '[Site name — to modify]',
	/** Short phrase below main title */
	tagline: '[A sentence summarizing your activity — to modify]',

	// SEO: Meta description (150-160 chars recommended)
	/** Default meta description for search engines */
	defaultDescription:
		'[Search engine description: who you are, where, what. To modify.]',

	// SEO: Language and locale
	lang: 'fr',
	locale: 'fr_FR',

	/** Browser theme color (mobile) */
	themeColor: '#047857',

	// SEO: Contact info (used in footer, contact section, JSON-LD)
	contact: {
		email: '[contact@example.com — to modify]',
		phone: '[+33 1 23 45 67 89 — to modify]',
	},

	/** SIRET / legal ID displayed in footer and legal pages */
	legalId: '[SIRET or legal ID — to modify]',

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
