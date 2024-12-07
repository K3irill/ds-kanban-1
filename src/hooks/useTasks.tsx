import ProjectService from '@/services/project.service';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useEffect } from 'react';

const useTasks = (projectSlug: string) => {
  const {
    data: listTasks,
    isError,
    isSuccess,
    isLoading: isLoadingTasks,
  }: UseQueryResult<any, Error> = useQuery<any>({
    queryKey: ['tasks', projectSlug],
    queryFn: () => ProjectService.getListTasks(projectSlug || ''),
    enabled: !!projectSlug,
  });

  useEffect(() => {}, [isSuccess]);
  useEffect(() => {}, [isError]);

  return { listTasks, isLoadingTasks, isSuccess, isError };
};

export default useTasks;
