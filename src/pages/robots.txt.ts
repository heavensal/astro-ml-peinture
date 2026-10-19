import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const indexable = import.meta.env.PUBLIC_SITE_INDEXABLE === 'true';
  const sitemap = new URL(`${import.meta.env.BASE_URL}sitemap-index.xml`, site).href;
  return new Response(`User-agent: *\n${indexable ? `Allow: /\nSitemap: ${sitemap}` : 'Disallow: /'}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
