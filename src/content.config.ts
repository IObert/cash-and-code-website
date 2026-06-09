import { defineCollection, z } from "astro:content";

const episodes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    episodeNumber: z.number(),
    spotifyUrl: z.string().url(),
    spotifyId: z.string(),
    durationMinutes: z.number().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
  }),
});

const authors = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    role: z.string(),
    image: z.string().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        }),
      )
      .default([]),
  }),
});

const topics = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { episodes, authors, topics };
