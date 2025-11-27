import React from "react";
import { WeeklyCalendar } from "./WeeklyCalendar";

export const MealPlanView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <WeeklyCalendar />
    </div>
  );
};
