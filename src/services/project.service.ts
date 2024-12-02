import { instance } from '@/api/api';
import { Projects } from '@/types/project.type';
import { projectSchema } from '@/types/user.type';

import { ZodError } from 'zod';

class ProjectService {
  // тянем список проектов
  static async getListProjects() {
    const response = await instance.get<{ data: Projects }>(`/project`);
    try {
      const fetchedProjects = projectSchema.parse(response.data.data);

      return fetchedProjects;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error);
      }
      return error;
    }
  }

  // тянем проект по slug
  static async getProject(slug: string) {
    const response = await instance.get<{ data: Projects }>(`/project/${slug}`);
    try {
      console.log(response.data.data);
      const fetchedProjects = projectSchema.parse(response.data.data);

      return fetchedProjects;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error);
      }
      return error;
    }
  }
}

export default ProjectService;
