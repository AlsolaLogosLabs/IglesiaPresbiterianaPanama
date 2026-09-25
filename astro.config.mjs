// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://alsolalogoslabs.github.io',
	base: '/IglesiaPresbiterianaPanama',
	trailingSlash: 'always',
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
