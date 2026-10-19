import { defineConfig } from 'astro/config';
import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
if (existsSync('.env')) loadEnvFile('.env');
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
const env = process.env;
// TODO: Confirm the final domain before enabling search indexing.
const site = env.SITE_URL || 'https://heavensal.github.io';
const base = env.SITE_BASE || '/astro-ml-peinture/';
export default defineConfig({
  site, base, trailingSlash: 'always',
  integrations: [sitemap({ filter: (url) => env.PUBLIC_SITE_INDEXABLE === 'true' &&
    !/\/(404|mentions-legales|politique-de-confidentialite|conditions-generales|legal-notice|privacy-policy|terms-of-service)\/?$/.test(url) })],
  vite: { plugins: [tailwind()] },
});
