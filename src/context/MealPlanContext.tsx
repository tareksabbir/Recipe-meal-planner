/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { MealPlan, RecipeDetail } from "../types";
import { mealPlanReducer } from "./mealPlanReducer";

interface MealPlanContextType {
  mealPlan: MealPlan;
  addMeal: (date: string, recipe: RecipeDetail) => void;
  removeMeal: (date: string) => void;
  clearPlan: () => void;
}

const MealPlanContext = createContext<MealPlanContextType | undefined>(
  undefined
);

const STORAGE_KEY = "meal-plan";

export const MealPlanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mealPlan, dispatch] = useReducer(mealPlanReducer, {}, () => {
    // Load from localStorage on init
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  // Save to localStorage whenever mealPlan changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mealPlan));
  }, [mealPlan]);

  const addMeal = (date: string, recipe: RecipeDetail) => {
    dispatch({ type: "ADD_MEAL", payload: { date, recipe } });
  };

  const removeMeal = (date: string) => {
    dispatch({ type: "REMOVE_MEAL", payload: { date } });
  };

  const clearPlan = () => {
    dispatch({ type: "CLEAR_PLAN" });
  };

  return (
    <MealPlanContext.Provider
      value={{ mealPlan, addMeal, removeMeal, clearPlan }}
    >
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlanContext = () => {
  const context = useContext(MealPlanContext);
  if (!context) {
    throw new Error("useMealPlanContext must be used within MealPlanProvider");
  }
  return context;
};
