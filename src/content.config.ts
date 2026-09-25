import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sermons = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/sermons' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		youtubeId: z.string().trim().min(1),
		preacher: z.string().optional(),
		scripture: z.string().optional(),
		series: z.string().optional(),
		description: z.string().optional(),
	}),
});

export const collections = { sermons };
