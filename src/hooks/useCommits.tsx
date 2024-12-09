import TaskService from '@/services/task.service';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const useCommits = (id: string) => {
  const {
    data: commits,
    isError,
    isSuccess,
    isLoading,
  }: UseQueryResult<any, Error> = useQuery<any>({
    queryKey: ['commits', id],
    queryFn: () => TaskService.getCommits(id),
    enabled: !!id,
  });

  return { commits, isLoading, isSuccess, isError };
};

export default useCommits;
