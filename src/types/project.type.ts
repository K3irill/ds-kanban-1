import { z } from 'zod';

export const ProjectDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  logo: z.string(),
  role: z.object({
    id: z.number(),
    name: z.string(),
  }),
  created_at: z.string(),
  updated_at: z.string(),
  user_count: z.number(),
  project_type: z.object({
    id: z.number(),
    name: z.string(),
  }),
  begin: z.string(),
  end: z.string(),
  is_favorite: z.boolean(),
});

export const ProjectSchema = z.object({
  data: z.array(ProjectDataSchema),
});
export type IProjectData = z.infer<typeof ProjectDataSchema>;
export type IProject = z.infer<typeof ProjectSchema>;
