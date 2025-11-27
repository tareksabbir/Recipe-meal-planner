// src/services/api.ts

import type {
  RecipesResponse,
  CategoriesResponse,
  RecipeDetail,
  Ingredient,
  RawMealResponse,
} from "../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const parseIngredients = (meal: RawMealResponse): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof RawMealResponse;
    const measureKey = `strMeasure${i}` as keyof RawMealResponse;

    const ingredient = meal[ingredientKey];
    const measure = meal[measureKey];

    if (ingredient && typeof ingredient === "string" && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: typeof measure === "string" ? measure.trim() : "",
      });
    }
  }
  return ingredients;
};

export const recipeApi = {
  searchRecipes: async (query: string): Promise<RecipesResponse> => {
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
    if (!response.ok) throw new Error("Failed to search recipes");
    return response.json();
  },

  getRecipeDetails: async (id: string): Promise<RecipeDetail | null> => {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) throw new Error("Failed to fetch recipe details");
    const data: { meals: RawMealResponse[] | null } = await response.json();

    if (!data.meals || data.meals.length === 0) return null;

    const meal = data.meals[0];
    return {
      ...meal,
      ingredients: parseIngredients(meal),
    };
  },

  getCategories: async (): Promise<CategoriesResponse> => {
    const response = await fetch(`${BASE_URL}/categories.php`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  },

  filterByCategory: async (category: string): Promise<RecipesResponse> => {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    if (!response.ok) throw new Error("Failed to filter by category");
    return response.json();
  },

  getMultipleRecipeDetails: async (ids: string[]): Promise<RecipeDetail[]> => {
    const promises = ids.map((id) => recipeApi.getRecipeDetails(id));
    const results = await Promise.all(promises);
    return results.filter((recipe): recipe is RecipeDetail => recipe !== null);
  },

  /**
   * NEW: Fetches all available recipes by querying each letter of the alphabet.
   * This is the most reliable way to get a full list of meals from TheMealDB.
   */
  getAllRecipes: async (): Promise<RecipesResponse> => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    
    // Create an array of promises, one for each letter
    const promises = alphabet.map(letter =>
      fetch(`${BASE_URL}/filter.php?a=${letter}`)
        .then(res => {
          if (!res.ok) {
            console.error(`Failed to fetch recipes for letter: ${letter}`);
            return { meals: [] }; // Return empty array on failure to not break Promise.all
          }
          return res.json() as Promise<RecipesResponse>;
        })
    );

    // Wait for all 26 requests to complete
    const results = await Promise.all(promises);

    // Combine all the meal arrays into a single array
    const allMeals = results.flatMap(result => result.meals || []);

    // Deduplicate recipes by their unique ID
    const uniqueMeals = Array.from(
      new Map(allMeals.map(meal => [meal.idMeal, meal])).values()
    );

    return { meals: uniqueMeals };
  },
};
