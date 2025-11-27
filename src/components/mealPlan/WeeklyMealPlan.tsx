import { useMealPlan } from "../../hooks/useMealPlan";
import { Calendar, Trash2, Plus, ChevronLeft } from "lucide-react"; // <-- Import ChevronLeft

interface WeeklyMealPlanProps {
  onNavigateToDiscover: () => void;
}

export const WeeklyMealPlan = ({
  onNavigateToDiscover,
}: WeeklyMealPlanProps) => {
  const { mealPlan, weekDates, removeMeal, clearPlan } = useMealPlan();

  const hasAnyMeals = Object.keys(mealPlan).length > 0;

  return (
    <div className="space-y-6 container mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onNavigateToDiscover}
            className="p-2 rounded-full hover:bg-white transition-colors"
            title="Back to Discover"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Weekly Meal Plan
            </h2>
            <p className="text-gray-600 mt-1">
              Plan your meals for the week ahead
            </p>
          </div>
        </div>

        {hasAnyMeals && (
          <button
            onClick={clearPlan}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        )}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10 md:mt-0">
        {weekDates.map((day) => {
          const recipe = mealPlan[day.date];

          return (
            <div
              key={day.date}
              className="bg-white rounded-xl shadow-sm border-2 border-gray-100 hover:border-emerald-300 transition-all overflow-hidden"
            >
              {/* Day Header */}
              <div className="bg-linear-to-r from-emerald-500 to-emerald-600 text-white p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{day.dayName}</h3>
                    <p className="text-xs text-emerald-100">{day.fullDate}</p>
                  </div>
                  <Calendar className="w-5 h-5 text-emerald-100" />
                </div>
              </div>

              {/* Recipe Content */}
              <div className="p-4">
                {recipe ? (
                  <div className="space-y-3">
                    <div className="relative h-32 rounded-lg overflow-hidden">
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                        {recipe.strMeal}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {recipe.strCategory} • {recipe.strArea}
                      </p>
                    </div>
                    <button
                      onClick={() => removeMeal(day.date)}
                      className="w-full bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <Plus className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-gray-400 text-sm text-center px-2">
                      No meal planned
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Add from recipes
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {!hasAnyMeals && (
        <div className="text-center py-16 bg-white rounded-xl">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No meals planned yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start planning by searching for recipes and adding them to your week
          </p>
          <button
            onClick={onNavigateToDiscover}
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            Discover Recipes
          </button>
        </div>
      )}

      {/* Info Card */}
      {hasAnyMeals && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Your meal plan is ready!
              </h4>
              <p className="text-sm text-gray-600">
                You have {Object.keys(mealPlan).length} meal
                {Object.keys(mealPlan).length !== 1 ? "s" : ""} planned this
                week. Check your shopping list to see what ingredients you need.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
