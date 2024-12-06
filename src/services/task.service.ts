import { instance } from '@/api/api';

import { ZodError } from 'zod';

class TaskService {
  // Получаем список проектов

  // Получаем проект по slug
  static async getTasks(slug: string): Promise<any> {
    try {
      const response = await instance.get<{ data: any }>(`/project/${slug}/task`);
      debugger;
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
}

export default TaskService;
