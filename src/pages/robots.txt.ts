import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	const lines = ['User-agent: *', 'Allow: /'];

	if (site) {
		const sitemapURL = new URL('sitemap-index.xml', new URL(import.meta.env.BASE_URL, site));
		lines.push('', `Sitemap: ${sitemapURL.href}`);
	}

	return new Response(`${lines.join('\n')}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
