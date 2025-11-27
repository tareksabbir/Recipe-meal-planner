import { useQuery } from "@tanstack/react-query";
import { recipeApi } from "../services/api";
import type { Category } from "../types";

// Helper functions for localStorage
const CATEGORIES_CACHE_KEY = "categories";

const getCachedCategories = (): Category[] | null => {
  try {
    const cached = localStorage.getItem(CATEGORIES_CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isValid = Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000;

    return isValid ? data : null;
  } catch (error) {
    console.error("Error reading from cache:", error);
    return null;
  }
};

const cacheCategories = (data: Category[]) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CATEGORIES_CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error writing to cache:", error);
  }
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const cachedData = getCachedCategories();
      if (cachedData) {
        return cachedData;
      }
      const response = await recipeApi.getCategories();
      const categories = response.categories || [];

      cacheCategories(categories);

      return categories;
    },
    enabled: true,
    staleTime: 7 * 24 * 60 * 60 * 1000, 
  });
};
