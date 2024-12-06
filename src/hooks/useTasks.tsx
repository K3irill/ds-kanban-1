import TaskService from '@/services/task.service';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useEffect } from 'react';

const useTasks = (projectSlug: string) => {
  const {
    data: tasks,
    isError,
    isSuccess,
    isLoading,
  }: UseQueryResult<any, Error> = useQuery<any>({
    queryKey: ['tasks', projectSlug],
    queryFn: () => TaskService.getTasks(projectSlug || ''),
    enabled: !!projectSlug,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log('Запрос успешный');
    }
  }, [isSuccess, tasks]);
  useEffect(() => {
    if (isError) {
      console.log('Ошибка');
    }
  }, [isError]);

  return { tasks, isLoading, isSuccess, isError };
};

export default useTasks;
