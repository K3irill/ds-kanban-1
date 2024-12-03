import { z } from 'zod';

export const projectsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    logo: z.union([z.object({ id: z.number(), link: z.string() }), z.null()]),
    is_favorite: z.boolean(),
    user_count: z.number(),
    is_archived: z.number(),
    begin: z.null(),
    end: z.null(),
  })
);

export const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  wiki_link: z.string().nullable(),
  slug: z.string(),
  perm_manager_is_admin: z.boolean(),
  perm_user_create_task: z.boolean(),
  perm_user_self_assign: z.boolean(),
  capabilities: z.array(z.string()).optional(),
  flow: z
    .object({
      name: z.string(),
      slug: z.string(),
      visibleTaskFields: z.array(z.string()).optional(),
      possibleProjectComponents: z
        .array(
          z.object({
            id: z.number(),
            name: z.string(),
            color: z.string(),
          })
        )
        .optional(),
      possibleProjectStages: z
        .array(
          z.object({
            id: z.number(),
            name: z.string(),
          })
        )
        .optional(),
    })
    .optional(),
  logo: z
    .object({
      id: z.number(),
      original_name: z.string(),
      link: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    })
    .nullable()
    .optional(),
  role: z.object({
    id: z.number(),
    name: z.string(),
  }),
  created_at: z.string(),
  updated_at: z.string(),
  begin: z.string().nullable().optional(),
  end: z.string().nullable().optional(),
  estimated_end: z.string().nullable().optional(),
  project_planning: z
    .object({
      estimated: z.number().nullable().optional(),
      planned: z.number().nullable().optional(),
      planned_percent: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
  project_cost: z
    .object({
      summary: z.object({
        estimated_h: z.number(),
        fact_h: z.number(),
        estimated_total: z.number(),
        fact_total: z.number(),
        profit: z.number(),
        profitability: z.number(),
      }),
      items: z
        .array(
          z.object({
            role: z.object({
              id: z.number(),
              name: z.string(),
            }),
            estimated_h: z.number(),
            fact_h: z.number(),
            rate: z.number(),
            estimated_total: z.number(),
            fact_total: z.number(),
            deviation: z.number(),
            is_overtime: z.boolean(),
            is_warranty: z.boolean(),
          })
        )
        .optional(),
    })
    .nullable()
    .optional(),
  project_completion: z
    .object({
      estimated: z.number().nullable().optional(),
      completed: z.number().nullable().optional(),
      completed_percent: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
});

export type Projects = z.infer<typeof projectsSchema>;
export type Project = z.infer<typeof projectSchema>;
