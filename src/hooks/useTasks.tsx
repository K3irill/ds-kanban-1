import { useQuery, UseQueryResult } from '@tanstack/react-query';
import ProjectService from '@/services/project.service';
import { useEffect } from 'react';

const useTasks = (projectSlug: string) => {
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

  useEffect(() => {
    if (isSuccessTasks) {
      console.log('Задачи загружены');
    }
    if (isSuccessTaskTypes) {
      console.log('Типы задач загружены');
    }
    if (isSuccessTaskPriority) {
      console.log('Приоритеты задач загружены');
    }
  }, [isSuccessTasks, isSuccessTaskTypes, isSuccessTaskPriority]);

  useEffect(() => {
    if (isErrorTasks) {
      console.log('Ошибка при загрузке задач');
    }
    if (isErrorTaskTypes) {
      console.log('Ошибка при загрузке типов задач');
    }
    if (isErrorTaskPriority) {
      console.log('Ошибка при загрузке приоритетов задач');
    }
  }, [isErrorTasks, isErrorTaskTypes, isErrorTaskPriority]);

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
  };
};

export default useTasks;
