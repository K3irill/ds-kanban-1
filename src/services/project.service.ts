import { instance } from '@/api/api';
import { Projects, Project } from '@/types/project.type';
import { ZodError } from 'zod';

class ProjectService {
  // Получаем список проектов
  static async getListProjects(): Promise<Projects> {
    try {
      const response = await instance.get<{ data: Projects }>('/project');
      console.log(response.data.data);

      return response.data.data; //! пока отключил валидацию--------------!
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
      console.log(response.data.data);
      return response.data.data; //! пока отключил валидацию--------------!
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Ошибка валидации данных проекта:', error.errors);
      } else {
        console.error('Ошибка при получении данных:', error);
      }
      throw error;
    }
  }

  static async addProjectToFavorite(id: number, type: string): Promise<Project> {
    try {
      const response = await instance.post<{ data: Project }>(
        '/favorite',
        {
          id,
          type,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
        }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
      throw error;
    }
  }

  static async deleteProjectToFavorite(id: number, type: string): Promise<Project> {
    try {
      const response = await instance.delete<{ data: Project }>('/favorite', {
        data: { id, type },
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      });
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
      throw error;
    }
  }
}

export default ProjectService;
