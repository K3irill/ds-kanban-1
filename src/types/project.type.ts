import { z } from 'zod';

export const projectsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    logo: z.null(),
    is_favorite: z.boolean(),
    user_count: z.number(),
    is_archived: z.number(),
    begin: z.null(),
    end: z.null(),
  })
);

export type Projects = z.infer<typeof projectsSchema>;
