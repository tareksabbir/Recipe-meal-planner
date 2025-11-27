/* eslint-disable react-hooks/set-state-in-effect */
// src/App.tsx

import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import FeaturedRecipe from "./components/featuredRecipe/FeaturedRecipe";
import Categories from "./components/categories/Categories";
import RecipeGrid from "./components/recipe/RecipeGrid";
import { ShoppingList } from "./components/shoppingList/ShoppingList";
import { useRecipes } from "./hooks/useRecipes";
import { LoadingSpinner } from "./components/common/LoadingSpinner";
import { ErrorMessage } from "./components/common/ErrorMessage";
import { WeeklyMealPlan } from "./components/mealPlan/WeeklyMealPlan";
import { RecipeDetailsPage } from "./components/recipe/RecipeDetailsPage";
import BookmarkNotification from "./components/bookmark/BookmarkNotification";

type View = "discover" | "mealplan" | "shopping" | "recipe-details";

const App = () => {
  const [activeView, setActiveView] = useState<View>("discover");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookmarkNotification, setShowBookmarkNotification] =
    useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<Set<string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: recipes,
    isLoading,
    error,
    refetch,
  } = useRecipes(searchQuery, activeCategory);

  // Reset to page 1 whenever search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  // NEW: Reset category to "all" when a search query is entered
  useEffect(() => {
    if (searchQuery.trim()) {
      setActiveCategory("all");
    }
  }, [searchQuery]);

  const toggleBookmark = (recipeId: string) => {
    setBookmarkedRecipes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
      } else {
        newSet.add(recipeId);
        setShowBookmarkNotification(true);
        setTimeout(() => setShowBookmarkNotification(false), 3000);
      }
      return newSet;
    });
  };

  const handleViewRecipeDetails = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
    setActiveView("recipe-details");
  };

  const handleBackToDiscover = () => {
    setActiveView("discover");
  };

  const handleMealAdded = () => {
    setActiveView("mealplan");
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed Position */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeView={activeView}
        onViewChange={setActiveView}
      />

      {/* Main Content - with left margin for desktop */}
      <main className="min-h-screen lg:ml-64">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {/* Conditional Content Based on Active View */}
          {activeView === "discover" && (
            <>
              {/* Header */}
              <Header
                onMenuClick={() => setSidebarOpen(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              {/* Featured Recipe */}
              <FeaturedRecipe />
              {/* Categories */}
              <Categories
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              {/* Loading State */}
              {isLoading && <LoadingSpinner />}
              {/* Error State */}
              {error && (
                <ErrorMessage
                  message="Failed to load recipes. Please try again."
                  onRetry={() => refetch()}
                />
              )}
              {/* Recipe Grid */}
              {recipes && recipes.length > 0 && (
                <RecipeGrid
                  recipes={recipes}
                  bookmarkedRecipes={bookmarkedRecipes}
                  onBookmarkToggle={toggleBookmark}
                  onViewDetails={handleViewRecipeDetails}
                  activeCategory={activeCategory}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  // NEW: Pass searchQuery for title display
                  searchQuery={searchQuery}
                />
              )}
              {/* Empty State */}
              {recipes && recipes.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No recipes found. Try a different search or category!
                  </p>
                </div>
              )}
            </>
          )}
          {activeView === "mealplan" && <WeeklyMealPlan />}
          {activeView === "shopping" && <ShoppingList />}
          {activeView === "recipe-details" && selectedRecipeId && (
            <RecipeDetailsPage
              recipeId={selectedRecipeId}
              onBack={handleBackToDiscover}
              onMealAdded={handleMealAdded}
            />
          )}
        </div>
      </main>

      <BookmarkNotification
        show={showBookmarkNotification}
        onClose={() => setShowBookmarkNotification(false)}
      />
    </div>
  );
};

export default App;