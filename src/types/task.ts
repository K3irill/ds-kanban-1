import { z } from 'zod';
import { Project } from './project.type';

export const TaskSchema = z.object({
  id: z.number(),
  name: z.string(),
  date_start: z.string().optional(),
  date_end: z.string().optional(),
  task_type: z.number(),
  component: z.number(),
  stage: z.number(),
  users: z.array(z.number()).optional(),
  epic_name: z.string().optional(),
  priority: z.number(),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const StageSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const TaskTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const TaskComponentSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;
export type User = z.infer<typeof UserSchema>;
export type Stage = z.infer<typeof StageSchema>;
export type TaskType = z.infer<typeof TaskTypeSchema>;
export type TaskComponent = z.infer<typeof TaskComponentSchema>;
export interface UseProjectReturn {
  project: Project | null;
  isLoading: boolean;
  error: Error | null;
  projectUsers: User[] | null;
  isLoadingUsers: boolean;
}

export interface UseTasksReturn {
  listTasks: Task[];
  taskTypes: TaskType[];
  taskPriority: { id: number; label: string }[];
  taskComponent: TaskComponent[];
  isLoadingTasks: boolean;
}

export interface UseAuthStoreReturn {
  user: User;
}
