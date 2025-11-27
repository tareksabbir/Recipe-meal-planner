import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '../services/api';

export const useRecipeDetails = (id: string | null) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => {
      if (!id) throw new Error('No recipe ID provided');
      return recipeApi.getRecipeDetails(id);
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};