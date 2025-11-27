import { useQuery } from "@tanstack/react-query";
import { recipeApi } from "../services/api";
import type { Recipe } from "../types";

// Helper functions for localStorage
const getCacheKey = (searchQuery: string, category: string) =>
  `recipes-${searchQuery}-${category}`;

const getCachedRecipes = (
  searchQuery: string,
  category: string
): Recipe[] | null => {
  try {
    const cacheKey = getCacheKey(searchQuery, category);
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

const cacheRecipes = (
  searchQuery: string,
  category: string,
  data: Recipe[]
) => {
  try {
    const cacheKey = getCacheKey(searchQuery, category);
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error writing to cache:", error);
  }
};

export const useRecipes = (searchQuery: string, category: string) => {
  return useQuery({
    queryKey: ["recipes", searchQuery, category],
    queryFn: async (): Promise<Recipe[]> => {
      // Check cache first
      const cachedData = getCachedRecipes(searchQuery, category);
      if (cachedData) {
        return cachedData;
      }

      let data;
      if (searchQuery.trim()) {
        data = await recipeApi.searchRecipes(searchQuery);
      } else if (category && category !== "all") {
        data = await recipeApi.filterByCategory(category);
      } else {
        data = await recipeApi.searchRecipes("a");
      }

      const recipes = data.meals || [];
      cacheRecipes(searchQuery, category, recipes);
      return recipes;
    },
    enabled: true,
    staleTime: 5 * 60 * 1000, 
  });
};