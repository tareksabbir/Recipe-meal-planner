import React from "react";
import type { RecipeDetail } from "../../types";
import { Trash2, Calendar } from "lucide-react";

interface DayCardProps {
  date: string;
  dayName: string;
  fullDate: string;
  recipe: RecipeDetail | null;
  onRemove: () => void;
}

export const DayCard: React.FC<DayCardProps> = ({
  dayName,
  fullDate,
  recipe,
  onRemove,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-200 hover:border-blue-300 transition-colors">
      {/* Day Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg">{dayName}</h3>
          <p className="text-sm text-gray-500">{fullDate}</p>
        </div>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>

      {/* Recipe Content */}
      {recipe ? (
        <div className="space-y-3">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-32 object-cover rounded-lg"
          />
          <div>
            <h4 className="font-semibold line-clamp-2 mb-1">
              {recipe.strMeal}
            </h4>
            <p className="text-xs text-gray-600">{recipe.strCategory}</p>
          </div>
          <button
            onClick={onRemove}
            className="w-full bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-400 text-sm">No meal planned</p>
        </div>
      )}
    </div>
  );
};
