import { z } from 'zod';

export const iLoginDataShema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Нужно заполнить' })
    .email({ message: 'Введите электронную почту' }),
  password: z
    .string()
    .nonempty({ message: 'Нужно заполнить' })
    .min(8, { message: 'Пароль должна содержать не менее 8 символов' }),
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

export const iProjectSchema = z.object({
  id: z.number(),
  capabilities: z.array(z.string()),
  role: roleSchema,
});

export const avatarSchema = z.object({
  id: z.number(),
  original_name: z.string(),
  link: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
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
  projects: z.array(iProjectSchema),
  gender: genderSchema,
  avatar: z.nullable(avatarSchema),
  telegram: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  can_grade: z.boolean(),
  nota_email: z.nullable(z.any()),
});
export type IUser = z.infer<typeof UserSchema>;
export type IProject = z.infer<typeof iProjectSchema>;
export type ILoginData = z.infer<typeof iLoginDataShema>;
export type TypeAccessToken = z.infer<typeof accessTokenShema>;
export type Avatar = z.infer<typeof avatarSchema>;
