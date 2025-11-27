

// src/components/recipe/RecipeGrid.tsx - UPDATED VERSION
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Recipe } from '../../types';
import RecipeCard from './RecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
  bookmarkedRecipes: Set<string>;
  onBookmarkToggle: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const RecipeGrid = ({ 
  recipes, 
  bookmarkedRecipes, 
  onBookmarkToggle,
  onViewDetails 
}: RecipeGridProps) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <div>
          <h3 className="text-lg md:text-xl font-semibold">
            Recipes for you
          </h3>
          <p className="text-sm text-gray-500">
            Showing <span className="text-emerald-600 font-medium">{recipes.length}</span> recipes
          </p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal} 
            recipe={recipe}
            isBookmarked={bookmarkedRecipes.has(recipe.idMeal)}
            onBookmarkToggle={() => onBookmarkToggle(recipe.idMeal)}
            onViewDetails={() => onViewDetails(recipe.idMeal)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;