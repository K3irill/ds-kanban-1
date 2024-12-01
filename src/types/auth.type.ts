import { z } from 'zod';

export const iLoginDataShema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(25),
});

export const accessTokenShema = z.object({
  token: z.string(),
});

export const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const genderSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const projectSchema = z.object({
  id: z.number(),
  capabilities: z.array(z.any()),
  role: roleSchema,
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  surname: z.string(),
  patronymic: z.string(),
  position: z.string(),
  is_active: z.boolean(),
  is_admin: z.boolean(),
  is_manager: z.boolean(),
  email: z.string(),
  projects: z.array(projectSchema),
  gender: genderSchema,
  avatar: z.any(),
  telegram: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  can_grade: z.boolean(),
  nota_email: z.any(),
});
export type IUser = z.infer<typeof UserSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ILoginData = z.infer<typeof iLoginDataShema>;
export type TypeAccessToken = z.infer<typeof accessTokenShema>;
