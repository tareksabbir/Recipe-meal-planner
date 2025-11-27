import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Recipe } from "../../types";
import RecipeCard from "./RecipeCard";

const RECIPES_PER_PAGE = 16;

interface RecipeGridProps {
  recipes: Recipe[];
  bookmarkedRecipes: Set<string>;
  onBookmarkToggle: (id: string) => void;
  onViewDetails: (id: string) => void;
  activeCategory?: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
}

const RecipeGrid = ({
  recipes,
  bookmarkedRecipes,
  onBookmarkToggle,
  onViewDetails,
  activeCategory,
  currentPage,
  onPageChange,
  searchQuery,
}: RecipeGridProps) => {
  const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);
  const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
  const endIndex = startIndex + RECIPES_PER_PAGE;
  const paginatedRecipes = recipes.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <div>
          <h3 className="text-lg md:text-xl font-semibold">
            {searchQuery.trim()
              ? `Search results for "${searchQuery}"`
              : activeCategory && activeCategory !== "all"
              ? `${activeCategory} Recipes`
              : "Recipes for you"}
          </h3>
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="text-emerald-600 font-medium">
              {paginatedRecipes.length}
            </span>{" "}
            of{" "}
            <span className="text-emerald-600 font-medium">
              {recipes.length}
            </span>{" "}
            recipes
          </p>
        </div>
        {totalPages > 1 && (
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {paginatedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            isBookmarked={bookmarkedRecipes.has(recipe.idMeal)}
            onBookmarkToggle={() => onBookmarkToggle(recipe.idMeal)}
            onViewDetails={() => onViewDetails(recipe.idMeal)}
            selectedCategory={
              activeCategory && activeCategory !== "all"
                ? activeCategory
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
