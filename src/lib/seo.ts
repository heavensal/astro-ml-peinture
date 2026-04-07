import { siteConfig } from '../site.config';

/** Canonical URLs for FR / EN (using Astro's `site` + `base`). */
export function getAlternateLanguageUrls(
	site: URL | undefined,
): { fr: string; en: string } | undefined {
	if (!site) return undefined;
	const base = import.meta.env.BASE_URL;
	const fr = new URL(base, site).href;
	const en = new URL(`${base}en/`, site).href;
	return { fr, en };
}

/** JSON-LD structured data for landing page (Organization + WebSite). */
export function buildLandingJsonLd(alternates: {
	fr: string;
	en: string;
}): Record<string, unknown> {
	const orgId = `${alternates.fr}#organization`;
	const organization: Record<string, unknown> = {
		'@type': 'Organization',
		'@id': orgId,
		name: siteConfig.name,
		url: alternates.fr,
		email: siteConfig.contact.email,
		telephone: siteConfig.contact.phone,
	};
	if (siteConfig.sameAs.length > 0) {
		organization.sameAs = [...siteConfig.sameAs];
	}
	return {
		'@context': 'https://schema.org',
		'@graph': [
			organization,
			{
				'@type': 'WebSite',
				'@id': `${alternates.fr}#website`,
				url: alternates.fr,
				name: siteConfig.name,
				inLanguage: ['fr-FR', 'en-US'],
				publisher: { '@id': orgId },
			},
		],
	};
}
