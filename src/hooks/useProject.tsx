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

  const { data: projectUsers, isLoading: isLoadingUsers }: UseQueryResult<any, Error> =
    useQuery<any>({
      queryKey: ['projectUser'],
      queryFn: () => ProjectService.getProjectUser(projectSlug),
      enabled: !!projectSlug,
    });

  useEffect(() => {
    if (isSuccess) {
      console.log('Запрос успешный');
    }
  }, [isSuccess, project]);

  useEffect(() => {}, [isError]);

  return { project, isLoading, error, isSuccess, isError, projectUsers, isLoadingUsers };
};

export default useProject;
