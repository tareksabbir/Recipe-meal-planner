import { useMemo, useEffect } from "react";
import { useMealPlan } from "../../hooks/useMealPlan";
import { useQuery } from "@tanstack/react-query";
import { recipeApi } from "../../services/api";
import { useShoppingList } from "../../hooks/useShoppingList";
import type { ShoppingListItem as ShoppingListItemType } from "../../types";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import {
  ShoppingCart,
  Trash2,
  Check,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import {
  parseQuantity,
  normalizeUnit,
  convertUnit,
  formatQuantity,
} from "../../utils/ingredientUtils";

interface ShoppingListProps {
  onNavigateToDiscover: () => void;
}

export const ShoppingList = ({ onNavigateToDiscover }: ShoppingListProps) => {
  const { recipeIds } = useMealPlan();
  const {
    shoppingList,
    purchasedItems,
    addOrUpdateItems,
    togglePurchased,
    clearPurchased,
    stats,
  } = useShoppingList();

  // Parallel fetch all recipe details using Promise.all
  const {
    data: recipes,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["shopping-list", recipeIds],
    queryFn: () => recipeApi.getMultipleRecipeDetails(recipeIds),
    enabled: recipeIds.length > 0,
  });

  // Generate shopping list with consolidated ingredients
  const generatedShoppingList = useMemo(() => {
    if (!recipes) return [];

    const ingredientMap = new Map<string, ShoppingListItemType>();

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const key = ingredient.name.toLowerCase();

        if (ingredientMap.has(key)) {
          const existing = ingredientMap.get(key)!;
          existing.recipeIds.push(recipe.idMeal);
          const existingMeasure = parseQuantity(existing.measure);
          const newMeasure = parseQuantity(ingredient.measure);

          // Normalize units
          const existingUnit = normalizeUnit(existingMeasure.unit);
          const newUnit = normalizeUnit(newMeasure.unit);

          // If units are the same, just add quantities
          if (existingUnit === newUnit) {
            const totalQuantity =
              existingMeasure.quantity + newMeasure.quantity;
            existing.measure = formatQuantity(totalQuantity, existingUnit);
          } else {
            // Try to convert to a more common unit (or existing unit)
            const convertedQuantity = convertUnit(
              newMeasure.quantity,
              newUnit,
              existingUnit
            );
            if (convertedQuantity !== newMeasure.quantity) {
              const totalQuantity =
                existingMeasure.quantity + convertedQuantity;
              existing.measure = formatQuantity(totalQuantity, existingUnit);
            } else {
              existing.measure = `${existing.measure} + ${ingredient.measure}`;
            }
          }
        } else {
          ingredientMap.set(key, {
            id: key,
            name: ingredient.name,
            measure: ingredient.measure,
            purchased: purchasedItems.has(key),
            recipeIds: [recipe.idMeal],
          });
        }
      });
    });

    return Array.from(ingredientMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [recipes, purchasedItems]);

  useEffect(() => {
    addOrUpdateItems(generatedShoppingList);
  }, [generatedShoppingList, addOrUpdateItems]);

  if (recipeIds.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Shopping List Yet
        </h3>
        <p className="text-gray-500 mb-6">
          Add meals to your weekly plan to generate a shopping list
        </p>
        <button
          onClick={onNavigateToDiscover}
          className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
        >
          Discover Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 ">
          <button
            onClick={onNavigateToDiscover}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Back to Discover"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Shoping List
            </h2>
            <p className="text-gray-600 mt-1">
              {stats.totalCount} items • {stats.purchasedCount} purchased
            </p>
          </div>
          {stats.purchasedCount > 0 && (
            <div className="flex items-center justify-end">
              <button
                onClick={clearPurchased}
                className="text-red-600 hover:text-red-800 text-sm flex items-center gap-2 font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Clear Purchased
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && <LoadingSpinner />}

      {/* Error State */}
      {error && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <ErrorMessage
            message="Failed to generate shopping list"
            onRetry={() => refetch()}
          />
        </div>
      )}

      {/* Shopping List */}
      {shoppingList.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Progress Bar */}
          {stats.totalCount > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Shopping Progress
                </span>
                <span className="text-sm font-semibold text-emerald-600">
                  {Math.round(stats.progressPercentage)}%
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-linear-to-r from-emerald-500 to-emerald-600 h-full transition-all duration-300 ease-out"
                  style={{ width: `${stats.progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            {shoppingList.map((item) => (
              <div
                key={item.id}
                onClick={() => togglePurchased(item.id)}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                  purchasedItems.has(item.id)
                    ? "bg-emerald-50 border-emerald-200 opacity-60"
                    : "bg-white border-gray-200 hover:border-emerald-300"
                }`}
              >
                <button
                  className={`shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                    purchasedItems.has(item.id)
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-gray-300 hover:border-emerald-500"
                  }`}
                >
                  {purchasedItems.has(item.id) && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </button>

                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      purchasedItems.has(item.id)
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-sm text-gray-500">{item.measure}</p>
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-emerald-600 font-medium">
                      {item.recipeIds.length} recipe
                      {item.recipeIds.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {purchasedItems.has(item.id) && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion Message */}
      {stats.totalCount > 0 && stats.purchasedCount === stats.totalCount && (
        <div className="bg-linear-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Shopping Complete! 🎉</h3>
              <p className="text-emerald-100">
                You've checked off all items on your list. Happy cooking!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
