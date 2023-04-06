import { z, defineCollection } from "astro:content";

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    active: z.boolean(),
  }),
});

export const collections = { docs };
