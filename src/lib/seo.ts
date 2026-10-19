import { siteConfig } from '../site.config';

export function getAlternateLanguageUrls(site: URL | undefined) {
  if (!site) return undefined;
  return { fr: new URL(import.meta.env.BASE_URL, site).href };
}

/** SEO/GEO: one consistent business entity, no invented reviews, prices or address. */
export function buildLandingJsonLd(alternates: { fr: string }): Record<string, unknown> {
  const url = alternates.fr;
  const businessId = `${url}#business`;
  const business: Record<string, unknown> = {
    '@type': 'HousePainter', '@id': businessId, name: siteConfig.name, url,
    telephone: siteConfig.contact.phone, email: siteConfig.contact.email,
    areaServed: siteConfig.serviceAreas.map(name => ({ '@type': 'AdministrativeArea', name })),
    ...(siteConfig.sameAs.length ? { sameAs: siteConfig.sameAs } : {}),
  };
  // TODO: Add the verified public business address and opening hours when supplied.
  if (siteConfig.address && siteConfig.postalCode) business.address = {
    '@type': 'PostalAddress', streetAddress: siteConfig.address,
    postalCode: siteConfig.postalCode, addressLocality: siteConfig.city, addressCountry: 'FR',
  };
  return {
    '@context': 'https://schema.org', '@graph': [business,
      { '@type': 'WebSite', '@id': `${url}#website`, url, name: siteConfig.name,
        inLanguage: 'fr-FR', publisher: { '@id': businessId } },
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: siteConfig.name,
        inLanguage: 'fr-FR', isPartOf: { '@id': `${url}#website` }, about: { '@id': businessId } },
      { '@type': 'Service', '@id': `${url}#painting`, name: 'Peinture et rénovation',
        serviceType: 'Travaux de peinture', provider: { '@id': businessId }, url: `${url}#services` },
    ],
  };
}
