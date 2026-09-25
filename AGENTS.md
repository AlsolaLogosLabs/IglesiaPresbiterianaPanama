# Iglesia Presbiteriana de Panamá — Project Rules

Official website of Iglesia Presbiteriana de Panamá.
This file is the canonical source of project rules.

## Stack

- Astro
- TypeScript
- Native CSS
- Static-first architecture
- Planned deployment: GitHub Pages

Do not add React, Vue, Svelte, Tailwind, Bootstrap, a CMS, a database or
other large dependencies without a real need.

## Development principles

- Review the existing structure before making changes.
- Reuse before creating.
- Make minimal, incremental changes.
- Do not refactor or reorganize anything outside the scope of the task.
- Minimize client-side JavaScript.

## UI / UX

- Mobile-first and responsive.
- Semantic HTML.
- Accessibility: visible focus and accessible labels.
- Keep the visual system consistent.

## SEO

- Correct titles and descriptions.
- Canonical and social metadata when applicable.
- Semantic heading hierarchy.
- Optimized images.

## Content and data

- Global church data must have a single source of truth.
- Sermons will use Astro Content Collections when implemented.
- Do not invent church data, schedules, leadership, URLs, APIs,
  environment variables or dependencies.

## Validation

Before completing a change:

1. Check imports and TypeScript.
2. Check responsive layouts.
3. Check accessibility.
4. Run `npm run build`.
