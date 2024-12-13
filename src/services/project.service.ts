import { instance } from '@/api/api';
import { ListProjects, listProjectsSchema, Project, projectSchema } from '@/types/project.type';

import { ZodError } from 'zod';

class ProjectService {
  // Получаем список проектов
  static async getListProjects(): Promise<ListProjects> {
    try {
      const response = await instance.get<{ data: ListProjects }>('/project');

      return response.data.data; // listProjectsSchema.parse(response.data.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Ошибка валидации данных проекта:', error.errors);
      } else {
        console.error('Ошибка при получении данных:', error);
      }
      throw error;
    }
  }

  // Получаем проект по slug
  static async getProject(slug: string): Promise<Project> {
    try {
      const response = await instance.get<{ data: Project }>(`/project/${slug}`);

      return response.data.data; // projectSchema.parse(response.data.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Ошибка валидации данных проекта:', error.errors);
      } else {
        console.error('Ошибка при получении данных:', error);
      }
      throw error;
    }
  }
  // добавляем проект в избранное

  static async getProjectUser(slug: string): Promise<Project> {
    try {
      const response = await instance.get<{ data: Project }>(`/project/${slug}/user`);

      return response.data.data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Ошибка валидации данных проекта:', error.errors);
      } else {
        console.error('Ошибка при получении данных:', error);
      }
      throw error;
    }
  }

  // добавляем проект в избранное
  static async addProjectToFavorite(id: number, type: string): Promise<Project> {
    try {
      const response = await instance.post<{ data: Project }>('/favorite', {
        id,
        type,
      });

      return response.data.data;
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
      throw error;
    }
  }

  // удаляем проект из избранного
  static async deleteProjectToFavorite(id: number, type: string): Promise<Project> {
    try {
      const response = await instance.delete<{ data: Project }>('/favorite', {
        data: { id, type },
      });

      return response.data.data;
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
      throw error;
    }
  }

  // Получаем список задач проекта
  static async getListTasks(slug: string): Promise<Project> {
    try {
      const response = await instance.get<{ data: Project }>(`/project/${slug}/task`);

      return response.data.data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Ошибка валидации данных проекта:', error.errors);
      } else {
        console.error('Ошибка при получении данных:', error);
      }
      throw error;
    }
  }

  // получаем типы задач
  static async getTaskTypes(): Promise<Project> {
    try {
      const response = await instance.get<{ data: Project }>(`/task_type`);

      return response.data.data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Ошибка валидации данных проекта:', error.errors);
      } else {
        console.error('Ошибка при получении данных:', error);
      }
      throw error;
    }
  }

  // получаем приоритеты задач
  static async getTaskPriority(): Promise<Project> {
    try {
      const response = await instance.get<{ data: Project }>(`/priority`);

      return response.data.data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Ошибка валидации данных проекта:', error.errors);
      } else {
        console.error('Ошибка при получении данных:', error);
      }
      throw error;
    }
  }

  // получаем компоненты задач getTaskComponent
  static async getTaskComponent(): Promise<Project> {
    try {
      const response = await instance.get<{ data: Project }>(`/component`);

      return response.data.data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Ошибка валидации данных проекта:', error.errors);
      } else {
        console.error('Ошибка при получении данных:', error);
      }
      throw error;
    }
  }

  // создание новой задачи
  static async createTask(slug: string, data: any): Promise<Project> {
    try {
      const response = await instance.post<{ data: Project }>(
        `/project/${slug}/task`,
        JSON.stringify(data)
      );

      return response.data.data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Ошибка валидации данных задачи:', error.errors);
      } else {
        console.error('Неизвестная ошибка:', error);
      }
      throw error;
    }
  }

  // обновление новой задачи
  static async updateTask(id: number, data: any): Promise<Project> {
    try {
      const response = await instance.patch<{ data: Project }>(`/task/${id}`, JSON.stringify(data));

      return response.data.data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Ошибка валидации данных задачи:', error.errors);
      } else {
        console.error('Неизвестная ошибка:', error);
      }
      throw error;
    }
  }
}

export default ProjectService;
