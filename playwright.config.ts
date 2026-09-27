import { defineConfig, devices } from '@playwright/test';

// Único punto donde vive el base de pruebas; debe coincidir con `base` en astro.config.mjs.
// Los tests navegan con rutas relativas (p. ej. 'sermones/') resueltas contra baseURL.
const BASE_PATH = '/IglesiaPresbiterianaPanama/';
const PORT = 4321;
const baseURL = `http://127.0.0.1:${PORT}${BASE_PATH}`;

export default defineConfig({
	testDir: 'tests/e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? 'github' : 'list',
	use: {
		baseURL,
		trace: 'retain-on-failure',
	},
	projects: [
		{
			name: 'mobile-320',
			use: { ...devices['Desktop Chrome'], viewport: { width: 320, height: 800 } },
		},
		{
			name: 'tablet-768',
			use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } },
		},
		{
			name: 'desktop-1280',
			use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
		},
	],
	// Build de producción servido localmente; `npm run test:e2e` construye antes.
	webServer: {
		command: `npx astro preview --host 127.0.0.1 --port ${PORT}`,
		url: baseURL,
		reuseExistingServer: !process.env.CI,
	},
});
