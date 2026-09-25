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
			// Temporal: Lo que creemos queda fuera del sitemap mientras sea noindex.
			// Eliminar este filtro al publicar el contenido doctrinal oficial.
			filter: (page) => !new URL(page).pathname.endsWith('/lo-que-creemos/'),
			namespaces: {
				news: false,
				xhtml: false,
				image: false,
				video: false,
			},
		}),
	],
});
