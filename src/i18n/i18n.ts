import i18next from 'i18next';
import fr from './locales/fr.json';
export const locales = ['fr'] as const;
export type Locale = (typeof locales)[number];
const instance = i18next.createInstance();
await instance.init({ lng: 'fr', fallbackLng: 'fr', resources: { fr: { translation: fr } },
  interpolation: { escapeValue: false } });
export const getFixedT = (locale: Locale) => instance.getFixedT(locale);
/** TODO: Add reviewed translations and matching routes before publishing another locale. */
export const isMultilangEnabled = () => false;
