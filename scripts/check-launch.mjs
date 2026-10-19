import { readFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
if (existsSync('.env')) loadEnvFile('.env');
const env = process.env;
const issues = [];
if (!env.SITE_URL || !env.SITE_URL.startsWith('https://') || env.SITE_URL.includes('github.io')) issues.push('Confirm SITE_URL with the final HTTPS domain.');
if (!env.SITE_BASE) issues.push('Set SITE_BASE (/ for a custom domain).');
if (env.PUBLIC_SITE_INDEXABLE !== 'true') issues.push('PUBLIC_SITE_INDEXABLE must be true only for the validated production build.');
if (!env.PUBLIC_CONTACT_FORM_URL?.startsWith('https://') || !env.PUBLIC_CONTACT_FORM_TOKEN || env.PUBLIC_CONTACT_FORM_TOKEN.includes('your_')) issues.push('Configure the HTTPS contact endpoint and its send-only public website token.');
if (readFileSync('src/i18n/locales/fr.json', 'utf8').includes('[À compléter')) issues.push('Replace the legal placeholders and obtain owner approval.');
for (const flag of ['FAQ', 'REVIEWS']) {
  if (env[`CONTENTFORGE_${flag}_ENABLED`] === 'true' && !env.CONTENTFORGE_API_TOKEN) issues.push(`CONTENTFORGE_${flag}_ENABLED requires the private API token.`);
}
if (env.CONTENTFORGE_ARTICLES_ENABLED === 'true') issues.push('Blog adapter exists, but article publication/templates are intentionally not enabled yet.');
console.log(issues.length ? issues.map(issue => `- ${issue}`).join('\n') : 'Automated launch checks passed. Complete the manual checklist too.');
process.exitCode = issues.length ? 1 : 0;
