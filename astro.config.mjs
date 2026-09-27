// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://alsolalogoslabs.github.io',
	base: '/IglesiaPresbiterianaPanama',
	trailingSlash: 'always',
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en', 'pt-br'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [
		sitemap({
			namespaces: {
				news: false,
				xhtml: false,
				image: false,
				video: false,
			},
		}),
	],
});
