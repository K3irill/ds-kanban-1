import ProjectService from '@/services/project.service';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

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
