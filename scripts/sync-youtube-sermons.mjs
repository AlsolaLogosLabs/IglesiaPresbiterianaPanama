import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const CONTENT_DIR = 'src/content/sermons';
const SITE_CONFIG = 'src/config/site.ts';
const PANAMA_TIME_ZONE = 'America/Panama';
const USER_AGENT = 'IglesiaPresbiterianaPanama-sermon-sync/1.0';

function decodeXmlEntities(value) {
	return value
		.replaceAll('&amp;', '&')
		.replaceAll('&lt;', '<')
		.replaceAll('&gt;', '>')
		.replaceAll('&quot;', '"')
		.replaceAll('&apos;', "'")
		.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
		.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function extractTag(source, tag) {
	const match = source.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
	return match ? decodeXmlEntities(match[1].trim()) : null;
}

function parseFeed(xml) {
	return (xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [])
		.map((entry) => ({
			youtubeId: extractTag(entry, 'yt:videoId'),
			title: extractTag(entry, 'title'),
			published: extractTag(entry, 'published'),
		}))
		.filter((video) => video.youtubeId && video.title && video.published);
}

function slugify(title) {
	return title
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 80);
}

function toPanamaDate(isoDate) {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: PANAMA_TIME_ZONE,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).formatToParts(new Date(isoDate));
	const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
	return `${values.year}-${values.month}-${values.day}`;
}

function yamlString(value) {
	return `'${value.replaceAll("'", "''")}'`;
}

function extractChannelHandle(siteConfig) {
	const match = siteConfig.match(/https:\/\/(?:www\.)?youtube\.com\/@([A-Za-z0-9._-]+)/);
	if (!match) throw new Error('No se encontró el handle oficial de YouTube en src/config/site.ts.');
	return match[1];
}

async function resolveChannelId(handle) {
	const response = await fetch(`https://www.youtube.com/@${handle}`, {
		headers: { 'User-Agent': USER_AGENT },
	});
	if (!response.ok) {
		throw new Error(`YouTube respondió ${response.status} al resolver el canal @${handle}.`);
	}

	const html = await response.text();
	const patterns = [
		/<meta[^>]+itemprop=["']channelId["'][^>]+content=["'](UC[A-Za-z0-9_-]+)["']/i,
		/"externalId":"(UC[A-Za-z0-9_-]+)"/,
		/"channelId":"(UC[A-Za-z0-9_-]+)"/,
		/youtube\.com\/channel\/(UC[A-Za-z0-9_-]+)/,
	];

	for (const pattern of patterns) {
		const match = html.match(pattern);
		if (match) return match[1];
	}

	throw new Error(`No se pudo resolver el channelId de YouTube para @${handle}.`);
}

async function getExistingSermons() {
	const files = (await readdir(CONTENT_DIR)).filter((file) => file.endsWith('.md'));
	const youtubeIds = new Set();
	let latestDate = null;
	const usedSlugs = new Set(files.map((file) => file.replace(/\.md$/, '')));

	for (const file of files) {
		const content = await readFile(join(CONTENT_DIR, file), 'utf8');
		const youtubeId = content.match(/^youtubeId:\s*['"]?([^'"\s]+)['"]?/m)?.[1];
		const date = content.match(/^date:\s*(\d{4}-\d{2}-\d{2})\s*$/m)?.[1];

		if (youtubeId) youtubeIds.add(youtubeId);
		if (date && (!latestDate || date > latestDate)) latestDate = date;
	}

	return { youtubeIds, latestDate, usedSlugs };
}

async function main() {
	const siteConfig = await readFile(SITE_CONFIG, 'utf8');
	const handle = extractChannelHandle(siteConfig);
	const channelId = await resolveChannelId(handle);

	const feedResponse = await fetch(
		`https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`,
		{ headers: { 'User-Agent': USER_AGENT } },
	);
	if (!feedResponse.ok) {
		throw new Error(`YouTube respondió ${feedResponse.status} al consultar el feed del canal.`);
	}

	const videos = parseFeed(await feedResponse.text());
	const { youtubeIds, latestDate, usedSlugs } = await getExistingSermons();
	const candidates = videos
		.map((video) => ({ ...video, date: toPanamaDate(video.published) }))
		.filter((video) => !youtubeIds.has(video.youtubeId))
		.filter((video) => !latestDate || video.date >= latestDate)
		.sort((a, b) => a.published.localeCompare(b.published));

	if (candidates.length === 0) {
		console.log('No hay videos nuevos para preparar como sermones.');
		return;
	}

	const created = [];
	for (const video of candidates) {
		let slug = slugify(video.title) || `sermon-${video.youtubeId}`;
		if (usedSlugs.has(slug)) slug = `${slug}-${video.youtubeId.slice(0, 6)}`;
		usedSlugs.add(slug);

		const path = join(CONTENT_DIR, `${slug}.md`);
		const content = [
			'---',
			`title: ${yamlString(video.title)}`,
			`date: ${video.date}`,
			`youtubeId: ${yamlString(video.youtubeId)}`,
			'---',
			'',
		].join('\n');

		await writeFile(path, content, { flag: 'wx' });
		created.push(path);
	}

	console.log(`Preparados ${created.length} sermón(es) nuevo(s):`);
	for (const path of created) console.log(`- ${path}`);
	console.log('Revisar título y fecha; completar predicador y texto bíblico si están confirmados.');
}

await main();
