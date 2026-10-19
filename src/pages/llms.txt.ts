import type { APIRoute } from 'astro';
import { siteConfig } from '../site.config';
export const GET: APIRoute = ({ site }) => {
  const url = new URL(import.meta.env.BASE_URL, site).href;
  // An editorial aid for machine readers, not a ranking guarantee or access control.
  return new Response(`# ${siteConfig.name}\n\n> Peinture et rénovation à Marseille.\n\n## Sources\n- [Accueil et prestations](${url})\n- [Contact et demande de devis](${url}#contact)\n- [Mentions légales](${url}mentions-legales/)\n\n## Contact\n${siteConfig.contact.phone}\n${siteConfig.contact.email}\n\nLes disponibilités, le périmètre d’intervention et les prix sont à confirmer directement avec l’entreprise.\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
