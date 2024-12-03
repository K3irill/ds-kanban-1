import { z } from 'zod';
import { avatarSchema, genderSchema, roleSchema } from './user.type';

export const logoSchema = z.object({
  id: z.number(),
  original_name: z.string(),
  link: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const possibleProjectComponentsShema = z.array(
  z.object({ id: z.number(), name: z.string(), color: z.string() })
);

export const possibleProjectStagesShema = z.array(z.object({ id: z.number(), name: z.string() }));

export const projectStagesFilterValuesShema = z.array(
  z.object({ id: z.number(), name: z.string() })
);

export const taskTypeFieldsMapShema = z.array(
  z.object({ task_type_id: z.number(), fields: z.array(z.string()) })
);

export const flowSchema = z.object({
  slug: z.string(),
  name: z.string(),
  possibleProjectComponents: possibleProjectComponentsShema,
  possibleProjectStages: possibleProjectStagesShema,
  projectStagesFilterValues: projectStagesFilterValuesShema,
  task_type_fields_map: taskTypeFieldsMapShema,
});

export const usersProjectSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    surname: z.string(),
    patronymic: z.string(),
    position: z.string(),
    is_active: z.boolean(),
    is_admin: z.boolean(),
    is_manager: z.boolean(),
    email: z.string(),
    role: roleSchema,
    gender: genderSchema,
    avatar: z.nullable(avatarSchema),
    telegram: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    grade: z.null(),
    can_grade: z.boolean(),
    nota_email: z.nullable(z.any()),
  })
);

export const projectPlanningShema = z.object({
  project_planning: z.object({
    estimated: z.number(),
    planned: z.number(),
    planned_percent: z.number(),
  }),
});

export const projectCompletionShema = z.object({
  project_completion: z.object({
    estimated: z.number(),
    completed: z.number(),
    completed_percent: z.number(),
  }),
});

export const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  flow: flowSchema,
  users: usersProjectSchema,
  logo: z.nullable(logoSchema),
  created_at: z.string(),
  updated_at: z.string(),
  capabilities: z.array(z.string()),
  perm_user_self_assign: z.boolean(),
  perm_user_create_task: z.boolean(),
  perm_manager_is_admin: z.boolean(),
  is_favorite: z.boolean(),
  is_archived: z.number(),
  project_type: z.object({ id: z.number(), name: z.string() }),
  begin: z.nullable(z.string()),
  end: z.nullable(z.string()),
  estimated_end: z.nullable(z.string()),
  project_planning: z.nullable(projectPlanningShema),
  project_completion: z.nullable(projectCompletionShema),
  project_costs: z.nullable(z.any()),
  perm_user_to_rft: z.boolean(),
  wiki_link: z.nullable(z.string()),
});

export const listProjectsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    logo: z.nullable(logoSchema),
    is_favorite: z.boolean(),
    user_count: z.number(),
    is_archived: z.number(),
    begin: z.nullable(z.string()),
    end: z.nullable(z.string()),
  })
);

export type ListProjects = z.infer<typeof listProjectsSchema>;
export type Project = z.infer<typeof projectSchema>;
