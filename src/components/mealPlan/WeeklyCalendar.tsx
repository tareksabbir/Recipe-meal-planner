import React from "react";
import { useMealPlan } from "../../hooks/useMealPlan";
import { DayCard } from "./DayCard";
import { Calendar } from "lucide-react";

export const WeeklyCalendar: React.FC = () => {
  const { mealPlan, weekDates, removeMeal, clearPlan } = useMealPlan();

  const hasAnyMeals = Object.keys(mealPlan).length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Weekly Meal Plan</h2>
          <p className="text-gray-600">Plan your meals for the week</p>
        </div>
        {hasAnyMeals && (
          <button
            onClick={clearPlan}
            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {weekDates.map((day) => (
          <DayCard
            key={day.date}
            date={day.date}
            dayName={day.dayName}
            fullDate={day.fullDate}
            recipe={mealPlan[day.date] || null}
            onRemove={() => removeMeal(day.date)}
          />
        ))}
      </div>

      {/* Empty State */}
      {!hasAnyMeals && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No meals planned yet
          </h3>
          <p className="text-gray-500">
            Search for recipes and add them to your weekly plan
          </p>
        </div>
      )}
    </div>
  );
};
