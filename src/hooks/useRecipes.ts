import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '../services/api';
import type { Recipe } from '../types';

export const useRecipes = (searchQuery: string, category: string) => {
  return useQuery({
    queryKey: ['recipes', searchQuery, category],
    queryFn: async (): Promise<Recipe[]> => {
      // If category is selected, filter by category
      if (category && category !== 'all') {
        const data = await recipeApi.filterByCategory(category);
        return data.meals || [];
      }
      
      // Otherwise search by query
      if (searchQuery.trim()) {
        const data = await recipeApi.searchRecipes(searchQuery);
        return data.meals || [];
      }
      
      // Default: search for empty string to get some results
      const data = await recipeApi.searchRecipes('');
      return data.meals || [];
    },
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};