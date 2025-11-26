// ekhane type gulo k meal db er api rsponse er key gulor name er sathe miliye likha hoise like recipi jokhon check kortesilam tokhon recipi er josn response aschee tar sathe miliye rakhar chesta korsi jate gol mal pakiye na feli 

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
}

export interface RecipeDetail extends Recipe {
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealPlan {
  [date: string]: RecipeDetail | null;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  measure: string;
  purchased: boolean;
  recipeIds: string[];
}

// API Response types
export interface RecipesResponse {
  meals: Recipe[] | null;
}

export interface RecipeDetailResponse {
  meals: Recipe[] | null;
}

export interface CategoriesResponse {
  categories: Category[];
}