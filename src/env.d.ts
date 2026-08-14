/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly ENABLE_MULTILANG?: string;
	readonly CONTENTFORGE_ENABLED?: string;
	readonly CONTENTFORGE_API_TOKEN?: string;
	readonly CONTENTFORGE_URL?: string;
	readonly PUBLIC_CONTACT_FORM_URL?: string;
	readonly PUBLIC_CONTACT_FORM_TOKEN?: string;
}
