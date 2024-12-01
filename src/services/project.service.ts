import { instance } from '@/api/axios';

class ProjectService {
  static async getProjects() {
    try {
      const response = await instance.get<{ data: unknown }>(`/project`);
      const fetchedProjects = await response.data.data;

      return fetchedProjects;
    } catch (error) {
      console.error('Network or server error:', error);
      return null;
    }
  }
}

export default ProjectService;
