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

  static async patchTask(id: number, task: any) {
    try {
      debugger;
      const response = await instance.patch(`/task/${id}`, task);
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
      debugger;
      const response = await instance.post(`/task/${id}/comment`, data);
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

  зф;
}

export default TaskService;
