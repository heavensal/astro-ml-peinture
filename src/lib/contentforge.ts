const DEFAULT_URL = 'https://contentforge.1344.fr/api/v1';

/**
 * Build full Contentforge API URL for a given endpoint path.
 * Uses CONTENTFORGE_URL env variable with fallback to default.
 */
export function contentforgeApiUrl(path: string): string {
	const base = import.meta.env.CONTENTFORGE_URL || DEFAULT_URL;
	const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	return `${cleanBase}/${cleanPath}`;
}
