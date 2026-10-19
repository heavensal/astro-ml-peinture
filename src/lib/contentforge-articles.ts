import { asList, fetchContentforge, isArticlesEnabled } from './contentforge';
export interface Article { slug: string; title: string; description: string }
/** Future blog foundation. No article routes are published until the editorial project is approved. */
export async function fetchArticleSummaries(): Promise<Article[]> {
  if (!isArticlesEnabled()) return [];
  const payload = await fetchContentforge('articles', 'fr');
  return asList(payload).flatMap((item): Article[] => {
    if (!item || typeof item !== 'object') return [];
    const article = item as Record<string, unknown>;
    if (typeof article.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) return [];
    if (typeof article.title !== 'string' || !article.title.trim()) return [];
    return [{ slug: article.slug, title: article.title,
      description: typeof article.description === 'string' ? article.description : '' }];
  });
}
// TODO: Add reviewed article templates, HTML sanitization and publication-aware routes before enabling a blog.
