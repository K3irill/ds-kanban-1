import TaskService from '@/services/task.service';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useEffect } from 'react';

const useTask = (taskSlug: string) => {
  const {
    data: task,
    isError,
    isSuccess,
    isLoading,
  }: UseQueryResult<any, Error> = useQuery<any>({
    queryKey: ['task', taskSlug],
    queryFn: () => TaskService.getTask(taskSlug),
    enabled: !!taskSlug,
  });

  useEffect(() => {}, [isError]);

  return { task, isLoading, isSuccess, isError };
};

export default useTask;
