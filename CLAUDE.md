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
- Prefer Astro components and serve