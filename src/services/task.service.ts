import { instance } from '@/api/api';
import { IUserCommit } from '@/types/task.type';
import { ZodError } from 'zod';

class TaskService {
  // поулчить задчу
  static async getTask(slug: string) {
    try {
      const response = await instance.get(`/task/${slug}`);
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

  static async patchFileCommit(slug: string, file: any) {
    try {
      const response = await instance.patch(`/task/${slug}/file/${file[0].name}`, { file });
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

  static async postCommit(id: string, data: IUserCommit) {
    try {
      const response = await instance.post(`/task/${id}/comment`, {
        content: data.content,
        files: data.files[0],
      });
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

  // получить комментарии
  static async getCommits(id: string) {
    try {
      debugger;
      const response = await instance.get(`/task/${id}/comment`);
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
}

export default TaskService;
