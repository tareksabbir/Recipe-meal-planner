// src/components/bookmarks/BookmarksPage.tsx
import { useState } from "react";
import { ChevronLeft, ChevronRight, Bookmark } from "lucide-react";

import type { Recipe } from "../../types";
import RecipeCard from "../recipe/RecipeCard";

const RECIPES_PER_PAGE = 16;

interface BookmarksPageProps {
  bookmarkedRecipes: Recipe[];
  bookmarkedIds: Set<string>;
  onBookmarkToggle: (id: string) => void;
  onViewDetails: (id: string) => void;
  onBack: () => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  bookmarkedRecipes,
  bookmarkedIds,
  onBookmarkToggle,
  onViewDetails,
  onBack,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate pagination details
  const totalPages = Math.ceil(bookmarkedRecipes.length / RECIPES_PER_PAGE);
  const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
  const endIndex = startIndex + RECIPES_PER_PAGE;
  
  // Get the recipes for the current page
  const paginatedRecipes = bookmarkedRecipes.slice(startIndex, endIndex);
  
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-full hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-emerald-500" />
            My Bookmarks
          </h2>
        </div>
      </div>

      {/* Empty State */}
      {bookmarkedRecipes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookmarks yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start bookmarking your favorite recipes to see them here. Tap the bookmark icon on any recipe to save it.
          </p>
          <button
            onClick={onBack}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Discover Recipes
          </button>
        </div>
      )}

      {/* Recipe Grid */}
      {bookmarkedRecipes.length > 0 && (
        <>
          <div className="flex flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Your Saved Recipes
              </h3>
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="text-emerald-600 font-medium">
                  {paginatedRecipes.length}
                </span>{" "}
                of <span className="text-emerald-600 font-medium">{bookmarkedRecipes.length}</span> bookmarked recipes
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
                isBookmarked={bookmarkedIds.has(recipe.idMeal)}
                onBookmarkToggle={() => onBookmarkToggle(recipe.idMeal)}
                onViewDetails={() => onViewDetails(recipe.idMeal)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};