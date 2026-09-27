import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../../config/site';

export const GET: APIRoute = async (context) => {
	const sermons = (await getCollection('sermons')).sort(
		(a, b) => b.data.date.getTime() - a.data.date.getTime(),
	);

	return rss({
		title: `Sermones — ${site.name}`,
		description: `Sermones publicados por la ${site.name}.`,
		// Enlace del canal: la página de Sermones (incluye el base de GitHub Pages)
		site: new URL(site.routes.sermons, context.site).href,
		customData: '<language>es-PA</language>',
		items: sermons.map((sermon) => {
			const { title, date, preacher, scripture, description } = sermon.data;
			// Sin descripción propia: solo metadata existente, sin texto inventado
			const metadata = [
				scripture && `Texto: ${scripture}`,
				preacher && `Predicador: ${preacher}`,
			].filter(Boolean);

			return {
				title,
				pubDate: date,
				link: `${site.routes.sermons}${sermon.id}/`,
				description: description ?? (metadata.length > 0 ? metadata.join(' · ') : undefined),
			};
		}),
	});
};
