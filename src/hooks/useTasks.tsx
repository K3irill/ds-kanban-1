import ProjectService from '@/services/project.service';
import TaskService from '@/services/task.service';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import ProjectService from '@/services/project.service';
import { useEffect } from 'react';

const useTasks = (projectSlug: string) => {
  useEffect(() => {
    console.log(projectSlug);
  }, [projectSlug]);
  const {
    data: listTasks,
    isError: isErrorTasks,
    isSuccess: isSuccessTasks,
    isLoading: isLoadingTasks,
  }: UseQueryResult<any, Error> = useQuery<any>({
    queryKey: ['tasks', projectSlug],
    queryFn: () => ProjectService.getListTasks(projectSlug || ''),
    enabled: !!projectSlug,
  });
  useEffect(() => {
    console.log(listTasks);
  }, [listTasks]);
  const {
    data: taskTypes,
    isError: isErrorTaskTypes,
    isSuccess: isSuccessTaskTypes,
    isLoading: isLoadingTaskTypes,
  }: UseQueryResult<any, Error> = useQuery<any>({
    queryKey: ['taskTypes'],
    queryFn: () => ProjectService.getTaskTypes(),
    enabled: !!projectSlug,
  });

  const {
    data: taskPriority,
    isError: isErrorTaskPriority,
    isSuccess: isSuccessTaskPriority,
    isLoading: isLoadingTaskPriority,
  }: UseQueryResult<any, Error> = useQuery<any>({
    queryKey: ['taskPriority'],
    queryFn: () => ProjectService.getTaskPriority(),
    enabled: !!projectSlug,
  });

  const {
    data: taskComponent,
    isError: isErrorTaskComponent,
    isSuccess: isSuccessTaskComponent,
    isLoading: isLoadingTaskComponent,
  }: UseQueryResult<any, Error> = useQuery<any>({
    queryKey: ['taskComponent'],
    queryFn: () => ProjectService.getTaskComponent(),
    enabled: !!projectSlug,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log('Запрос успешный');
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      console.log('Ошибка');
    }
  }, [isError]);

  return {
    listTasks,
    taskTypes,
    taskPriority,
    isLoadingTasks,
    isLoadingTaskTypes,
    isLoadingTaskPriority,
    isSuccessTasks,
    isSuccessTaskTypes,
    isSuccessTaskPriority,
    isErrorTasks,
    isErrorTaskTypes,
    isErrorTaskPriority,
    taskComponent,
    isErrorTaskComponent,
    isSuccessTaskComponent,
    isLoadingTaskComponent,
  };
};

export default useTasks;
