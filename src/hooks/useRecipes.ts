// src/hooks/useRecipes.ts

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
    // Check if cache is still valid (e.g., 24 hours)
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
  const isInitialLoad = !searchQuery.trim() && (!category || category === "all");

  return useQuery({
    queryKey: ["recipes", searchQuery, category],
    queryFn: async (): Promise<Recipe[]> => {
      // --- LOGIC: If no search and no category, get ALL recipes ---
      if (isInitialLoad) {
        // Check cache for the "all recipes" case
        const cachedData = getCachedRecipes("", "all");
        if (cachedData) {
          return cachedData;
        }
        const data = await recipeApi.getAllRecipes();
        const recipes = data.meals || [];
        cacheRecipes("", "all", recipes);
        return recipes;
      }

      // --- PRIORITY LOGIC: Search takes precedence over category ---
      let data;
      if (searchQuery.trim()) {
        // PRIORITY 1: If there's a search query, perform a search.
        data = await recipeApi.searchRecipes(searchQuery);
      } else if (category && category !== "all") {
        // PRIORITY 2: If no search query, but a category is selected, filter by category.
        data = await recipeApi.filterByCategory(category);
      } else {
        // Fallback: This case should ideally not be hit due to the initial load check,
        // but it's a safe fallback to get all recipes.
        data = await recipeApi.getAllRecipes();
      }

      const recipes = data.meals || [];
      cacheRecipes(searchQuery, category, recipes);
      return recipes;
    },
    enabled: true,
    // Use a longer stale time for the initial "all recipes" load, as it's a large, infrequently changing dataset.
    staleTime: isInitialLoad ? 60 * 60 * 1000 : 5 * 60 * 1000, // 1 hour for all, 5 mins for others
  });
};
// import { useQuery } from "@tanstack/react-query";
// import { recipeApi } from "../services/api";
// import type { Recipe } from "../types";

// // Helper functions for localStorage
// const getCacheKey = (searchQuery: string, category: string) =>
//   `recipes-${searchQuery}-${category}`;

// const getCachedRecipes = (
//   searchQuery: string,
//   category: string
// ): Recipe[] | null => {
//   try {
//     const cacheKey = getCacheKey(searchQuery, category);
//     const cached = localStorage.getItem(cacheKey);
//     if (!cached) return null;

//     const { data, timestamp } = JSON.parse(cached);
//     // Check if cache is still valid (e.g., 24 hours)
//     const isValid = Date.now() - timestamp < 24 * 60 * 60 * 1000;

//     return isValid ? data : null;
//   } catch (error) {
//     console.error("Error reading from cache:", error);
//     return null;
//   }
// };

// const cacheRecipes = (
//   searchQuery: string,
//   category: string,
//   data: Recipe[]
// ) => {
//   try {
//     const cacheKey = getCacheKey(searchQuery, category);
//     const cacheData = {
//       data,
//       timestamp: Date.now(),
//     };
//     localStorage.setItem(cacheKey, JSON.stringify(cacheData));
//   } catch (error) {
//     console.error("Error writing to cache:", error);
//   }
// };

// export const useRecipes = (searchQuery: string, category: string) => {
//   return useQuery({
//     queryKey: ["recipes", searchQuery, category],
//     queryFn: async (): Promise<Recipe[]> => {
//       // First, check if we have cached data
//       const cachedData = getCachedRecipes(searchQuery, category);
//       if (cachedData) {
//         return cachedData;
//       }

//       // If no cache, fetch from API
//       let data;
//       if (category && category !== "all") {
//         data = await recipeApi.filterByCategory(category);
//       } else if (searchQuery.trim()) {
//         data = await recipeApi.searchRecipes(searchQuery);
//       } else {
//         data = await recipeApi.searchRecipes("");
//       }

//       const recipes = data.meals || [];

//       // Cache the fetched data
//       cacheRecipes(searchQuery, category, recipes);

//       return recipes;
//     },
//     enabled: true,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };
