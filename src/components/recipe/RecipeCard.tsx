import { Clock, Bookmark, Star } from "lucide-react";
import type { Recipe } from "../../types";

interface RecipeCardProps {
  recipe: Recipe;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onViewDetails: () => void;
  selectedCategory?: string;
}

const RecipeCard = ({
  recipe,
  isBookmarked,
  onBookmarkToggle,
  onViewDetails,
  selectedCategory,
}: RecipeCardProps) => {
  const renderStars = (rating: number = 4) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }
      />
    ));
  };

  // Use selectedCategory as fallback if recipe.strCategory is not available
  const displayCategory = recipe.strCategory || selectedCategory || "Recipe";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer">
      <div
        className="relative h-40 md:h-48 overflow-hidden"
        onClick={onViewDetails}
      >
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkToggle();
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-emerald-50 z-10"
        >
          <Bookmark
            size={18}
            className={
              isBookmarked
                ? "fill-emerald-500 text-emerald-500"
                : "text-gray-600"
            }
          />
        </button>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {displayCategory}
          </span>
        </div>
      </div>

      <div className="p-4" onClick={onViewDetails}>
        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {recipe.strMeal}
        </h4>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {recipe.strArea} Cuisine
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock size={16} />
            <span>30 mins</span>
          </div>
          <div className="flex gap-1">{renderStars(4)}</div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
