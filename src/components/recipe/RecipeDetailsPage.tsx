import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  ChefHat,
  Utensils,
  Star,
  Heart,
  Bookmark,
  Share2,
  Play,
  Info,
} from "lucide-react";
import { useRecipeDetails } from "../../hooks/useRecipeDetails";
import { useMealPlan } from "../../hooks/useMealPlan";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";

interface RecipeDetailsPageProps {
  recipeId: string;
  onBack: () => void;
  onMealAdded?: () => void; 
}

export const RecipeDetailsPage: React.FC<RecipeDetailsPageProps> = ({
  recipeId,
  onBack,
  onMealAdded, 
}) => {
  const {
    data: recipe,
    isLoading,
    error,
    refetch,
  } = useRecipeDetails(recipeId);
  const { weekDates, addMeal } = useMealPlan();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToMealPlan = (date: string) => {
    if (recipe) {
      addMeal(date, recipe);
      setSuccessMessage("Added to meal plan!");
      setShowDatePicker(false);
      setTimeout(() => setSuccessMessage(""), 3000);

      if (onMealAdded) {
        onMealAdded();
      }
    }
  };

  // Rest of the component remains the same...
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would also call an API to save the bookmark
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // Here you would also call an API to save the like
  };

  const shareRecipe = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe?.strMeal,
        text: `Check out this amazing recipe: ${recipe?.strMeal}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Recipe link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Recipe Details</h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={toggleLike}
            className={`p-2 rounded-full transition-colors ${
              isLiked
                ? "text-red-500 bg-red-50"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked
                ? "text-emerald-500 bg-emerald-50"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            <Bookmark
              className={`w-6 h-6 ${isBookmarked ? "fill-current" : ""}`}
            />
          </button>
          <button
            onClick={shareRecipe}
            className="p-2 rounded-full text-gray-600 hover:bg-white transition-colors"
          >
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isLoading && <LoadingSpinner />}

        {error && (
          <ErrorMessage
            message="Failed to load recipe details"
            onRetry={() => refetch()}
          />
        )}

        {recipe && (
          <>
            {/* Success Message */}
            {successMessage && (
              <div className="fixed top-4 right-4 z-50 bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 animate-pulse">
                {successMessage}
              </div>
            )}

            {/* Recipe Image with Overlay */}
            <div className="relative h-64 md:h-80 lg:h-96">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

              {/* Recipe Title and Tags Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  {recipe.strMeal}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {recipe.strCategory}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {recipe.strArea}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Recipe Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-emerald-50 rounded-lg p-4 flex flex-col items-center justify-center">
                  <Clock className="w-8 h-8 text-emerald-500 mb-2" />
                  <span className="text-sm text-gray-600">Cook Time</span>
                  <span className="font-semibold">45 min</span>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 flex flex-col items-center justify-center">
                  <Users className="w-8 h-8 text-emerald-500 mb-2" />
                  <span className="text-sm text-gray-600">Servings</span>
                  <span className="font-semibold">4 people</span>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 flex flex-col items-center justify-center">
                  <ChefHat className="w-8 h-8 text-emerald-500 mb-2" />
                  <span className="text-sm text-gray-600">Difficulty</span>
                  <span className="font-semibold">Medium</span>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 flex flex-col items-center justify-center">
                  <Star className="w-8 h-8 text-emerald-500 mb-2" />
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <span className="font-semibold mr-1">4.5</span>
                    <span className="text-gray-500">(23)</span>
                  </div>
                </div>
              </div>

              {/* Add to Meal Plan Button */}
              <div className="mb-8">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-5 h-5" />
                  Add to Meal Plan
                </button>

                {/* Date Picker Dropdown */}
                {showDatePicker && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-semibold mb-3 text-gray-700">
                      Select a day:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {weekDates.map((day) => (
                        <button
                          key={day.date}
                          onClick={() => handleAddToMealPlan(day.date)}
                          className="bg-white border border-gray-300 px-3 py-2 rounded hover:bg-emerald-50 hover:border-emerald-500 transition-colors text-sm shadow-sm"
                        >
                          <div className="font-semibold">{day.dayName}</div>
                          <div className="text-xs text-gray-600">
                            {day.fullDate}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tabs for Ingredients and Instructions */}
              <div className="mb-8">
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8">
                    <button className="py-2 px-1 border-b-2 font-medium text-sm border-emerald-500 text-emerald-600">
                      Ingredients
                    </button>
                    <button className="py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
                      Instructions
                    </button>
                    <button className="py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
                      Nutrition
                    </button>
                  </nav>
                </div>

                {/* Ingredients */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4 flex items-center">
                    <Utensils className="w-5 h-5 mr-2 text-emerald-500" />
                    Ingredients
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium">{ingredient.name}</span>
                        <span className="text-gray-600 bg-white px-3 py-1 rounded-md shadow-sm">
                          {ingredient.measure}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4 flex items-center">
                    <ChefHat className="w-5 h-5 mr-2 text-emerald-500" />
                    Instructions
                  </h4>
                  <div className="space-y-4">
                    {recipe.strInstructions.split("\n").map(
                      (paragraph, index) =>
                        paragraph.trim() && (
                          <div key={index} className="flex">
                            <div className="shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 leading-relaxed flex-1">
                              {paragraph}
                            </p>
                          </div>
                        )
                    )}
                  </div>
                </div>

                {/* Nutrition Information */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-emerald-500" />
                    Nutrition Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          320
                        </div>
                        <div className="text-sm text-gray-600">Calories</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          15g
                        </div>
                        <div className="text-sm text-gray-600">Protein</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          42g
                        </div>
                        <div className="text-sm text-gray-600">Carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          12g
                        </div>
                        <div className="text-sm text-gray-600">Fat</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* YouTube Link */}
              {recipe.strYoutube && (
                <div className="mt-8 bg-emerald-50 rounded-lg p-6">
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-medium"
                  >
                    <Play className="w-5 h-5" />
                    Watch Video Tutorial
                  </a>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
