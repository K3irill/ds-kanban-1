import TaskService from '@/services/task.service';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useEffect } from 'react';

const useTask = (taskSlug: string) => {
  const {
    data: task,
    isError,
    isSuccess,

    isFetching,
  }: UseQueryResult<any, Error> = useQuery<any>({
    queryKey: ['task', taskSlug],
    queryFn: () => TaskService.getTask(taskSlug),
    enabled: !!taskSlug,
  });

  useEffect(() => {
    console.log('task', task);
  }, [isSuccess]);
  useEffect(() => {}, [isError]);

  return { task, isFetching, isSuccess, isError };
};

export default useTask;
