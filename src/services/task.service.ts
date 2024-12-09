import { instance } from '@/api/api';
import { ZodError } from 'zod';

class TaskService {
  // поулчить задчу
  static async getTask(slug: string) {
    try {
      const response = await instance.get<{ data: any }>(`/task/${slug}`);
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

  // поулчить задчу
  static async patchFileTask(slug: string, file: any) {
    try {
      debugger;
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
}

export default TaskService;
