import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const PAGES = [
	'',
	'en/',
	'pt-br/',
	'nosotros/',
	'sermones/',
	'en/sermones/',
	'visitanos/',
	'pt-br/visitanos/',
	'contacto/',
];

// Solo se analiza el HTML propio: los recursos de terceros no se cargan.
test.beforeEach(async ({ page, baseURL }) => {
	const origin = new URL(baseURL!).origin;
	await page.route(
		(url) => url.origin !== origin,
		(route) => route.abort(),
	);
});

async function expectNoViolations(page: import('@playwright/test').Page) {
	const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
	expect(results.violations).toEqual([]);
}

for (const path of PAGES) {
	test(`axe WCAG A/AA: «/${path}»`, async ({ page }) => {
		await page.goto(path);
		await expectNoViolations(page);
	});
}

test('axe WCAG A/AA: detalle de sermón', async ({ page }) => {
	await page.goto('sermones/');
	const href = await page.locator('.sermon-list h3 a').first().getAttribute('href');
	await page.goto(href!);
	await expectNoViolations(page);
});
