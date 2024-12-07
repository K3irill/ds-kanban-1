import ProjectService from '@/services/project.service';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useEffect } from 'react';

// const fetchProjectBySlug = async (slug: string): Promise<Project> =>
// 	ProjectService.getProject(slug);

const useProject = (projectSlug: string) => {
  const {
    data: project,
    isLoading,
    error,
    isSuccess,
    isError,
  }: UseQueryResult<any, Error> = useQuery<any>({
    queryKey: ['project', projectSlug],
    queryFn: () => ProjectService.getProject(projectSlug),
    enabled: !!projectSlug,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log('Запрос успешный');
    }
  }, [isSuccess, project]);

  useEffect(() => {
    if (isError) {
      console.log('Ошибка');
    }
  }, [isError]);

  return { project, isLoading, error, isSuccess, isError };
};

export default useProject;
