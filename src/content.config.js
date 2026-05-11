import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    link: z.string().optional(),
    date: z.date(),
    gallery: z.array(z.string()).optional(),
  })
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    category: z.enum(['devlog', 'tutorial', 'announcement']),
    image: z.string().optional(),
  })
});

const passions = defineCollection({
  loader: file("src/content/passions.json"),
  schema: z.object({
    working_on: z.string(),
    learning: z.string(),
    current_addiction: z.string(),
    favourite_song: z.string(),
  })
});

export const collections = { projects, blog, passions };