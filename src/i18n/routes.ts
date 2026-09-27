import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from 'astro:i18n';
import { site } from '../config/site';
import { defaultLocale, locales, type Locale } from './locales';

type RouteKey = keyof typeof site.routes;

const base = site.routes.home;

// 'IglesiaPresbiterianaPanama/nosotros/' → 'nosotros/'
const stripBase = (pathname: string) =>
	pathname.startsWith(base) ? pathname.slice(base.length) : pathname.replace(/^\//, '');

/** Ruta de la página sin base ni prefijo de idioma, p. ej. '' o 'sermones/la-justicia-de-dios/' */
export function pagePath(pathname: string): string {
	const path = stripBase(pathname);
	const [first, ...rest] = path.split('/');
	const isLocalePrefix = first !== defaultLocale && locales.some((locale) => locale === first);
	return isLocalePrefix ? rest.join('/') : path;
}

export const localeUrl = (locale: Locale, path = '') => getRelativeLocaleUrl(locale, path);

export const absoluteLocaleUrl = (locale: Locale, path = '') => getAbsoluteLocaleUrl(locale, path);

/** site.routes en el idioma indicado (los slugs son iguales en todos los idiomas) */
export function localizedRoutes(locale: Locale): Record<RouteKey, string> {
	return Object.fromEntries(
		Object.entries(site.routes).map(([key, href]) => [key, localeUrl(locale, stripBase(href))]),
	) as Record<RouteKey, string>;
}
