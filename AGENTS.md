# Iglesia Presbiteriana de Panamá — Development Guidelines

## Project

Official website of Iglesia Presbiteriana de Panamá.

## Stack

- Astro
- TypeScript
- Native CSS
- Static-first architecture
- GitHub Pages deployment

Do not add React, Vue, Svelte, Tailwind, Bootstrap, a CMS, database,
state-management library, or other major dependency unless the requirement
clearly justifies it.

## Development principles

- Inspect the existing structure before making changes.
- Reuse existing components, styles, utilities, and configuration first.
- Make the smallest change required.
- Avoid unnecessary refactors, abstractions, wrappers, and dependencies.
- Keep components cohesive and responsibilities clear.
- Do not rename or reorganize unrelated files.
- Preserve existing behavior unless the requirement explicitly changes it.
- Prefer Astro components and server-rendered/static HTML.
- Add client-side JavaScript only when real interaction requires it.

## UI / UX

- Mobile-first and responsive.
- Use semantic HTML.
- Maintain visible keyboard focus and accessible labels.
- Do not rely only on color to communicate state.
- Respect the existing visual system and design tokens.
- Avoid unnecessary animation.
- Optimize images and avoid layout shifts.

## SEO / Performance

- Keep pages lightweight.
- Minimize client-side JavaScript.
- Maintain correct title, meta description, canonical and social metadata.
- Use semantic heading hierarchy.
- Optimize public images with Astro image tooling when appropriate.

## Project conventions

Global church information such as address, schedules and social links
should have one source of truth rather than being duplicated across pages.

Sermons should use Astro Content Collections when that feature is implemented.

Do not invent:
- church information
- schedules
- leadership information
- URLs
- environment variables
- APIs
- dependencies

If information is not confirmed, leave it pending instead of fabricating it.

## Validation

Before completing a change:

1. Check imports and TypeScript errors.
2. Verify mobile and desktop layouts when UI is affected.
3. Check accessibility basics.
4. Run:

```bash
npm run build