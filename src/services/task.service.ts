import { instance } from '@/api/api';
import { ZodError } from 'zod';

class TaskService {
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
}

export default TaskService;
