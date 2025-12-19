import { defineCollection, z } from 'astro:content';

const annonces = defineCollection({
  type: 'content',
  schema: z.object({
    titre: z.string(),
    prix: z.number(),
    echelle: z.string(),
    systeme: z.string(),
    etat: z.string(),
    images: z.array(z.string()).optional(),
  }),
});

export const collections = {
  annonces,
};
