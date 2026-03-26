import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    author: z.string().default('Altoby Team'),
    tags: z.array(z.string()).default([]),
  }),
});

const worksCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/works" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    industry: z.array(z.string()),
    services: z.array(z.string()),
    description: z.string(),
    coverImage: z.string(),
    
    challengeHeading: z.string().optional(),
    challengeText: z.string().optional(),
    image2: z.string().optional(),
    image3: z.string().optional(),

    quoteText: z.string().optional(),
    image4: z.string().optional(),

    solutionHeading: z.string().optional(),
    solutionText1: z.string().optional(),
    solutionText2: z.string().optional(),

    gridImages: z.array(z.string()).optional(),

    impactHeading: z.string().optional(),
    impactText: z.string().optional(),

    client: z.string().optional(),
    projectTeam: z.array(z.string()).optional(),

    upNextSlug: z.string().optional(),
    upNextTitle: z.string().optional(),
    upNextImage: z.string().optional(),
    upNextCategory: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  works: worksCollection,
};
