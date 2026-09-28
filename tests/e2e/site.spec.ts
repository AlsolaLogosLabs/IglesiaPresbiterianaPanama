import { expect, test } from '@playwright/test';

const PAGES = [
	'',
	'nosotros/',
	'lo-que-creemos/',
	'sermones/',
	'visitanos/',
	'contacto/',
	'privacidad/',
];

// Prefijo de URL (relativo al base) y atributo lang esperado por idioma
const LOCALES = [
	{ prefix: '', lang: 'es' },
	{ prefix: 'en/', lang: 'en' },
	{ prefix: 'pt-br/', lang: 'pt-BR' },
];

// Breakpoint de navegación de escritorio en Header.astro (72rem)
const DESKTOP_NAV_MIN_WIDTH = 1152;

// canonical/hreflang son absolutos con el dominio de producción (`site`): se compara la ruta
// (las rutas solo contienen letras, guiones y barras, sin caracteres especiales de RegExp)
const absoluteURL = (path: string, baseURL?: string) =>
	new RegExp(`^https://[^/]+${new URL(path, baseURL).pathname}$`);

// Nada de terceros en los tests: miniaturas e iframe de YouTube no se cargan.
test.beforeEach(async ({ page, baseURL }) => {
	const origin = new URL(baseURL!).origin;
	await page.route(
		(url) => url.origin !== origin,
		(route) => route.abort(),
	);
});

for (const { prefix, lang } of LOCALES) {
	for (const path of PAGES) {
		test(`página «/${prefix}${path}»: estructura, SEO e idioma`, async ({ page, baseURL }) => {
			const response = await page.goto(prefix + path);
			expect(response?.status()).toBe(200);

			await expect(page.locator('html')).toHaveAttribute('lang', lang);
			await expect(page.locator('main#main-content')).toHaveCount(1);
			await expect(page.locator('h1')).toHaveCount(1);

			const overflow = await page.evaluate(
				() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
			);
			expect(overflow).toBeLessThanOrEqual(0);

			// Cero JavaScript cliente: solo datos estructurados JSON-LD
			await expect(page.locator('script:not([type="application/ld+json"])')).toHaveCount(0);

			// Canonical de la URL actual y alternativas en los tres idiomas + x-default (español)
			await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
				'href',
				absoluteURL(prefix + path, baseURL),
			);
			for (const alternate of LOCALES) {
				await expect(
					page.locator(`link[rel="alternate"][hreflang="${alternate.lang}"]`),
				).toHaveAttribute('href', absoluteURL(alternate.prefix + path, baseURL));
			}
			await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
				'href',
				absoluteURL(path, baseURL),
			);

			// El feed RSS (solo en español) se anuncia únicamente en páginas españolas
			await expect(page.locator('link[type="application/rss+xml"]')).toHaveCount(
				lang === 'es' ? 1 : 0,
			);

			// Selector de idioma: el actual marcado y el resto apuntando a la misma página
			const switcher = page.locator('nav.lang').first();
			await expect(switcher.locator('a[aria-current="page"]')).toHaveAttribute('lang', lang);
			for (const alternate of LOCALES) {
				await expect(switcher.locator(`a[lang="${alternate.lang}"]`)).toHaveAttribute(
					'href',
					new URL(alternate.prefix + path, baseURL).pathname,
				);
			}

			// La navegación principal permanece en el idioma actual
			const navLinks = await page
				.locator('.site-nav--desktop a')
				.evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));
			const localeRoot = new URL(prefix, baseURL).pathname;
			expect(navLinks.length).toBeGreaterThan(0);
			for (const href of navLinks) expect(href.startsWith(localeRoot)).toBe(true);
		});
	}

	test(`detalle de sermón en «${lang}» con vídeo youtube-nocookie`, async ({ page }) => {
		await page.goto(`${prefix}sermones/`);
		const href = await page.locator('.sermon-list h3 a').first().getAttribute('href');
		expect(href).toBeTruthy();

		const response = await page.goto(href!);
		expect(response?.status()).toBe(200);
		await expect(page.locator('html')).toHaveAttribute('lang', lang);
		await expect(page.locator('h1')).toHaveCount(1);
		await expect(page.locator('iframe')).toHaveAttribute(
			'src',
			/^https:\/\/www\.youtube-nocookie\.com\/embed\//,
		);
		// «Volver a Sermones» se mantiene en el idioma actual
		await expect(page.locator('.back-link')).toHaveAttribute(
			'href',
			new RegExp(`/${prefix}sermones/$`),
		);
	});
}

test('navegación principal accesible', async ({ page }) => {
	await page.goto('');
	const isMobile = (page.viewportSize()?.width ?? 0) < DESKTOP_NAV_MIN_WIDTH;

	if (isMobile) {
		const menu = page.locator('details.site-nav--mobile');
		const nav = menu.getByRole('navigation', { name: 'Principal' });
		await expect(nav).toBeHidden();
		await menu.locator('summary').click();
		await expect(menu).toHaveAttribute('open', '');
		await expect(nav).toBeVisible();
		await expect(nav.getByRole('link', { name: 'Sermones' })).toBeVisible();
		// El selector de idioma forma parte del menú desplegable
		const languages = menu.getByRole('navigation', { name: 'Idioma' });
		await expect(languages.getByRole('link', { name: 'English' })).toBeVisible();
	} else {
		const nav = page.locator('nav.site-nav--desktop');
		await expect(nav).toBeVisible();
		await expect(nav.getByRole('link', { name: 'Inicio' })).toHaveAttribute('aria-current', 'page');
		await expect(nav.getByRole('link', { name: 'Sermones' })).toBeVisible();
		const languages = page.locator('.site-header__desktop').getByRole('navigation', {
			name: 'Idioma',
		});
		await expect(languages.getByRole('link', { name: 'Español' })).toHaveAttribute(
			'aria-current',
			'page',
		);
	}
});

test('calendario horarios.ics', async ({ request }) => {
	const response = await request.get('horarios.ics');
	expect(response.status()).toBe(200);
	expect(response.headers()['content-type']).toContain('text/calendar');
	const body = await response.text();
	expect(body).toContain('BEGIN:VCALENDAR');
	expect(body).toContain('BEGIN:VEVENT');
});

test('feed sermones/rss.xml', async ({ request }) => {
	const response = await request.get('sermones/rss.xml');
	expect(response.status()).toBe(200);
	expect(response.headers()['content-type']).toMatch(/xml/);
	const body = await response.text();
	expect(body).toContain('<rss');
	expect(body).toContain('<item>');
	expect(body).toContain('<language>es-PA</language>');
});

test('404 para rutas inexistentes', async ({ page }) => {
	const response = await page.goto('ruta-que-no-existe/');
	expect(response?.status()).toBe(404);
	await expect(page.locator('h1')).toHaveCount(1);
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

// Misma hora real (site.schedule) presentada según el idioma
for (const { prefix, times } of [
	{ prefix: '', times: ['6:30 p. m.', '9:30 a. m.', '11:00 a. m.'] },
	{ prefix: 'en/', times: ['6:30 PM', '9:30 AM', '11:00 AM'] },
	{ prefix: 'pt-br/', times: ['18:30', '09:30', '11:00'] },
]) {
	test(`horarios con formato local en «/${prefix}»`, async ({ page }) => {
		// Home: los horarios solo aparecen en el panel del Hero
		await page.goto(prefix);
		await expect(page.locator('.hero__time')).toHaveText(times);
		await expect(page.locator('.schedule')).toHaveCount(0);

		// Visítanos: detalle completo en tarjetas
		await page.goto(`${prefix}visitanos/`);
		await expect(page.locator('.schedule--cards .schedule__time')).toHaveText(times);
	});
}

test('Home: teasers de historia y creencias enlazan a sus páginas', async ({ page }) => {
	await page.goto('');
	await expect(page.locator('h2#historia')).toHaveCount(1);
	await expect(page.locator('h2#creencias')).toHaveCount(1);
	await expect(page.locator('.intro a[href$="/nosotros/"]')).toHaveCount(1);
	await expect(page.locator('.intro a[href$="/lo-que-creemos/"]')).toHaveCount(1);
});

for (const { prefix, tocLabel } of [
	{ prefix: '', tocLabel: 'En esta página' },
	{ prefix: 'en/', tocLabel: 'On this page' },
	{ prefix: 'pt-br/', tocLabel: 'Nesta página' },
]) {
	test(`Lo que creemos en «/${prefix}»: Escritura, credos, Westminster y salida a Sermones`, async ({
		page,
	}) => {
		await page.goto(`${prefix}lo-que-creemos/`);

		// Navegación interna traducida: 5 anclas, cada una a un h2 existente
		const toc = page.getByRole('navigation', { name: tocLabel });
		const anchors = toc.locator('a');
		await expect(anchors).toHaveCount(5);
		for (const href of await anchors.evaluateAll((links) =>
			links.map((link) => link.getAttribute('href') ?? ''),
		)) {
			expect(href).toMatch(/^#[a-z-]+$/);
			await expect(page.locator(`h2${href}`)).toHaveCount(1);
		}

		await expect(page.locator('h2#escritura')).toHaveCount(1);
		await expect(page.locator('section[aria-labelledby="fe-historica"] .documents h3')).toHaveCount(
			4,
		);
		const standards = page.locator('section[aria-labelledby="confesion"] .documents h3');
		await expect(standards).toHaveCount(3);
		for (const title of await standards.allInnerTexts()) expect(title).toContain('Westminster');
		await expect(page.locator('h2#identidad')).toHaveCount(1);
		await expect(page.locator('h2#tradicion-reformada')).toHaveCount(1);
		await expect(
			page.locator(`section[aria-labelledby="ensenanza"] a[href$="/${prefix}sermones/"]`),
		).toHaveCount(1);
	});
}

test('Lo que creemos: la Escritura encabeza el contenido doctrinal', async ({ page }) => {
	await page.goto('lo-que-creemos/');
	await expect(page.locator('main h2').first()).toHaveText('La Escritura, nuestra autoridad');
});

test('selector compacto: el nombre accesible incluye el código visible (Label in Name)', async ({
	page,
}) => {
	// La variante compacta solo se muestra con la navegación de escritorio
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto('');
	const links = page.locator('.site-header__desktop nav.lang a');
	await expect(links).toHaveCount(3);
	for (const link of await links.all()) {
		const code = (await link.innerText()).trim();
		expect(code).toMatch(/^(ES|EN|PT)$/);
		// «ES — Español»: el nombre accesible empieza por el código visible
		await expect(link).toHaveAccessibleName(new RegExp(`^${code} `));
	}
});

// Borde exacto del breakpoint desktop del Header (72rem): navegación y selector en una línea
for (const { prefix, lang } of LOCALES) {
	test(`Header desktop justo en ${DESKTOP_NAV_MIN_WIDTH}px en «${lang}»: sin menú móvil ni overflow`, async ({
		page,
	}) => {
		await page.setViewportSize({ width: DESKTOP_NAV_MIN_WIDTH, height: 900 });
		await page.goto(prefix);

		const desktop = page.locator('.site-header__desktop');
		await expect(desktop).toBeVisible();
		await expect(page.locator('details.site-nav--mobile')).toBeHidden();
		await expect(desktop.locator('nav.site-nav--desktop')).toBeVisible();
		await expect(desktop.locator('nav.lang')).toBeVisible();

		const overflow = await page.evaluate(() => {
			const root = document.documentElement;
			const header = document.querySelector<HTMLElement>('.site-header__inner')!;
			return {
				page: root.scrollWidth - root.clientWidth,
				header: header.scrollWidth - header.clientWidth,
			};
		});
		expect(overflow.page).toBeLessThanOrEqual(0);
		expect(overflow.header).toBeLessThanOrEqual(0);
	});
}
