import ProjectService from '@/services/project.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useFavoriteMutation = () => {
  const queryClient = useQueryClient();

  const addToFavorite = useMutation({
    mutationFn: (id: number) => ProjectService.addProjectToFavorite(id, 'project'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.error('Ошибка при добавлении в избранное:', error);
    },
  });

  const removeFromFavorite = useMutation({
    mutationFn: (id: number) => ProjectService.deleteProjectToFavorite(id, 'project'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.error('Ошибка при удалении из избранного:', error);
    },
  });
  const isLoadingFavorite =
    addToFavorite.status === 'pending' || removeFromFavorite.status === 'pending';

  return {
    addToFavorite,
    removeFromFavorite,
    isLoadingFavorite,
  };
};

export default useFavoriteMutation;
