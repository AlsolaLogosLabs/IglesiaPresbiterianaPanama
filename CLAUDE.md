# Iglesia Presbiteriana de Panamá — Project Rules

Official website of Iglesia Presbiteriana de Panamá.
This file is the canonical source of project rules.

## Stack

- Astro
- TypeScript
- Native CSS
- Static-first architecture
- GitHub Pages deployment

Do not add React, Vue, Svelte, Tailwind, Bootstrap, a CMS, a database or
other major dependencies without a real need.

## Development principles

- Review the existing structure before making changes.
- Reuse existing components, styles and utilities first.
- Make minimal, incremental changes.
- Do not refactor or reorganize anything outside the scope of the task.
- Minimize client-side JavaScript; add it only when real interaction requires it.

## UI / UX

- Mobile-first and responsive.
- Semantic HTML.
- Accessibility: visible keyboard focus and accessible labels.
- Keep the visual system consistent.

## SEO

- Maintain correct titles and metadata (description, canonical, social).
- Use a semantic heading hierarchy.
- Optimize images and avoid layout shifts.

## Content and data

- Global church information (address, schedules, social links) must have a
  single source of truth.
- Sermons will use Astro Content Collections when that feature is implemented.
- Do not invent church information, schedules, leadership, URLs, APIs,
  environment variables or dependencies. If something is not confirmed,
  leave it pending.

## Validation

Before completing a change:

1. Check imports and TypeScript errors.
2. Verify responsive layouts when UI is affected.
3. Check accessibility basics.
4. Run `npm run build` and make sure it completes without errors.
