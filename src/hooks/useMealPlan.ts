import { useMealPlanContext } from '../context/MealPlanContext';
import { useMemo } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';

export const useMealPlan = () => {
  const { mealPlan, addMeal, removeMeal, clearPlan } = useMealPlanContext();

  // Generate dates for the current week (Mon-Sun)
  const weekDates = useMemo(() => {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(start, i);
      return {
        date: format(date, 'yyyy-MM-dd'),
        dayName: format(date, 'EEE'),
        fullDate: format(date, 'MMM dd'),
      };
    });
  }, []);

  // Get all recipe IDs in the meal plan
  const recipeIds = useMemo(() => {
    return Object.values(mealPlan)
      .filter(recipe => recipe !== null)
      .map(recipe => recipe!.idMeal);
  }, [mealPlan]);

  return {
    mealPlan,
    addMeal,
    removeMeal,
    clearPlan,
    weekDates,
    recipeIds,
  };
};