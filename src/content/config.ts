import { z, defineCollection } from "astro:content";

const docs = defineCollection({
	schema: z.object({
		title: z.string(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { docs };
