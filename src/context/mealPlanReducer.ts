// src/context/mealPlanReducer.ts
import type { MealPlan, RecipeDetail } from "../types";

export type MealPlanAction =
  | { type: "ADD_MEAL"; payload: { date: string; recipe: RecipeDetail } }
  | { type: "REMOVE_MEAL"; payload: { date: string } }
  | { type: "CLEAR_PLAN" }
  | { type: "LOAD_PLAN"; payload: MealPlan };

export const mealPlanReducer = (
  state: MealPlan,
  action: MealPlanAction
): MealPlan => {
  switch (action.type) {
    case "ADD_MEAL":
      return {
        ...state,
        [action.payload.date]: action.payload.recipe,
      };

    case "REMOVE_MEAL": {
      const newState = { ...state };
      delete newState[action.payload.date];
      return newState;
    }

    case "CLEAR_PLAN":
      return {};

    case "LOAD_PLAN":
      return action.payload;

    default:
      return state;
  }
};
