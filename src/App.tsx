/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import FeaturedRecipe from "./components/featuredRecipe/FeaturedRecipe";
import Categories from "./components/categories/Categories";
import RecipeGrid from "./components/recipe/RecipeGrid";
import { ShoppingList } from "./components/shoppingList/ShoppingList";
import { useRecipes } from "./hooks/useRecipes";
import { ErrorMessage } from "./components/common/ErrorMessage";
import { WeeklyMealPlan } from "./components/mealPlan/WeeklyMealPlan";
import { RecipeDetailsPage } from "./components/recipe/RecipeDetailsPage";
import { BookmarksPage } from "./components/bookmark/BookmarksPage";
import BookmarkNotification from "./components/bookmark/BookmarkNotification";
import type { View, Recipe } from "./types";
import RecipeCardSkeleton from "./components/common/RecipeCardSkeleton";

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

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedRecipes");
    if (savedBookmarks) {
      try {
        const parsedBookmarks = JSON.parse(savedBookmarks);
        setBookmarkedRecipes(new Set(parsedBookmarks));
      } catch (error) {
        console.error("Error loading bookmarks:", error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        "bookmarkedRecipes",
        JSON.stringify(Array.from(bookmarkedRecipes))
      );
    } catch (error) {
      console.error("Error saving bookmarks:", error);
    }
  }, [bookmarkedRecipes]);

  // Reset to page 1 whenever search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  // Reset category to "all" when a search query is entered
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
        setTimeout(() => setShowBookmarkNotification(false), 5000);
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

  const handleBackToBookmarks = () => {
    setActiveView("bookmarks");
  };

  const handleMealAdded = () => {
    setActiveView("mealplan");
  };

  // Filter recipes to get only bookmarked ones
  const getBookmarkedRecipes = (): Recipe[] => {
    if (!recipes) return [];
    return recipes.filter((recipe) => bookmarkedRecipes.has(recipe.idMeal));
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
              <Header
                onMenuClick={() => setSidebarOpen(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <FeaturedRecipe />
              <Categories
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              {isLoading && <RecipeCardSkeleton />}
              {error && (
                <ErrorMessage
                  message="Failed to load recipes. Please try again."
                  onRetry={() => refetch()}
                />
              )}
              {recipes && recipes.length > 0 && (
                <RecipeGrid
                  recipes={recipes}
                  bookmarkedRecipes={bookmarkedRecipes}
                  onBookmarkToggle={toggleBookmark}
                  onViewDetails={handleViewRecipeDetails}
                  activeCategory={activeCategory}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  searchQuery={searchQuery}
                />
              )}
              {recipes && recipes.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No recipes found. Try a different search or category!
                  </p>
                </div>
              )}
            </>
          )}
          {activeView === "mealplan" && (
            <WeeklyMealPlan onNavigateToDiscover={handleBackToDiscover} />
          )}
          {activeView === "shopping" && (
            <ShoppingList onNavigateToDiscover={handleBackToDiscover} />
          )}
          {activeView === "bookmarks" && (
            <BookmarksPage
              bookmarkedRecipes={getBookmarkedRecipes()}
              bookmarkedIds={bookmarkedRecipes}
              onBookmarkToggle={toggleBookmark}
              onViewDetails={handleViewRecipeDetails}
              onBack={handleBackToDiscover}
            />
          )}
          {activeView === "recipe-details" && selectedRecipeId && (
            <RecipeDetailsPage
              recipeId={selectedRecipeId}
              onBack={
                window.history.state?.from === "bookmarks"
                  ? handleBackToBookmarks
                  : handleBackToDiscover
              }
              onMealAdded={handleMealAdded}
              isBookmarked={bookmarkedRecipes.has(selectedRecipeId)}
              onBookmarkToggle={toggleBookmark}
            />
          )}
        </div>
      </main>

      <BookmarkNotification
        show={showBookmarkNotification}
        onClose={() => setShowBookmarkNotification(false)}
        onNavigate={() => {
          setActiveView("bookmarks");
          setShowBookmarkNotification(false);
        }}
      />
    </div>
  );
};

export default App;
