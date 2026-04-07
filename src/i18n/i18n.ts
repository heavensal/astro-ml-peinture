import i18next, { type i18n } from 'i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

const resources = {
	en: { translation: en },
	fr: { translation: fr },
};

const instances = new Map<Locale, i18n>();

/**
 * Get a fixed translation function for the given locale.
 * Uses i18next with one instance per locale (static build).
 */
export function getFixedT(locale: Locale) {
	let instance = instances.get(locale);
	if (!instance) {
		instance = i18next.createInstance();
		instance.init({
			lng: locale,
			fallbackLng: 'fr',
			resources,
			interpolation: { escapeValue: false },
		});
		instances.set(locale, instance);
	}
	return instance.getFixedT(locale);
}

/**
 * Check if multi-language mode is enabled via ENABLE_MULTILANG env variable.
 * When false, only French is available; when true, language switcher is shown.
 */
export function isMultilangEnabled(): boolean {
	return import.meta.env.ENABLE_MULTILANG === 'true';
}
