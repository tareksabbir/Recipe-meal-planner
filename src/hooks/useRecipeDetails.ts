import { useQuery } from "@tanstack/react-query";
import { recipeApi } from "../services/api";
import type { RecipeDetail } from "../types";

// Helper functions for localStorage
const getRecipeCacheKey = (id: string) => `recipe-${id}`;

const getCachedRecipeDetails = (id: string): RecipeDetail | null => {
  try {
    const cacheKey = getRecipeCacheKey(id);
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isValid = Date.now() - timestamp < 24 * 60 * 60 * 1000;

    return isValid ? data : null;
  } catch (error) {
    console.error("Error reading from cache:", error);
    return null;
  }
};

const cacheRecipeDetails = (id: string, data: RecipeDetail) => {
  try {
    const cacheKey = getRecipeCacheKey(id);
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error writing to cache:", error);
  }
};

export const useRecipeDetails = (id: string | null) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: async (): Promise<RecipeDetail | null> => {
      if (!id) throw new Error("No recipe ID provided");

      // First, check if we have cached data
      const cachedData = getCachedRecipeDetails(id);
      if (cachedData) {
        return cachedData;
      }

      // If no cache, fetch from API
      const data = await recipeApi.getRecipeDetails(id);

      // Cache the fetched data
      if (data) {
        cacheRecipeDetails(id, data);
      }

      return data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, 
  });
};
