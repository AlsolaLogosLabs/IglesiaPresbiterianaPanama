// Idiomas del sitio; deben coincidir con `i18n.locales` en astro.config.mjs.
export const locales = ['es', 'en', 'pt-br'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

interface LocaleMeta {
	/** Atributo `lang` de <html> y `hreflang` */
	lang: string;
	/** Locale para Intl (fechas) y JSON-LD `inLanguage` */
	intl: string;
	/** Formato de Open Graph (`og:locale`) */
	ogLocale: string;
	/** Nombre del idioma en su propio idioma */
	name: string;
	/** Etiqueta compacta del selector */
	code: string;
}

export const localeMeta: Record<Locale, LocaleMeta> = {
	es: { lang: 'es', intl: 'es-PA', ogLocale: 'es_PA', name: 'Español', code: 'ES' },
	en: { lang: 'en', intl: 'en', ogLocale: 'en_US', name: 'English', code: 'EN' },
	'pt-br': { lang: 'pt-BR', intl: 'pt-BR', ogLocale: 'pt_BR', name: 'Português', code: 'PT' },
};

export function toLocale(value: string | undefined): Locale {
	return locales.find((locale) => locale === value) ?? defaultLocale;
}
