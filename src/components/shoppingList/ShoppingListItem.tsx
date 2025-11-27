import React from "react";
import type { ShoppingListItem as ShoppingListItemType } from "../../types";
import { Check } from "lucide-react";

interface ShoppingListItemProps {
  item: ShoppingListItemType;
  onToggle: (id: string) => void;
}

export const ShoppingListItem: React.FC<ShoppingListItemProps> = ({
  item,
  onToggle,
}) => {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
        item.purchased
          ? "bg-emerald-50 border-emerald-200 opacity-60"
          : "bg-white border-gray-200 hover:border-emerald-300"
      }`}
    >
      <button
        onClick={() => onToggle(item.id)}
        className={`shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
          item.purchased
            ? "bg-emerald-500 border-emerald-500"
            : "border-gray-300 hover:border-emerald-500"
        }`}
      >
        {item.purchased && <Check className="w-4 h-4 text-white" />}
      </button>

      <div className="flex-1">
        <p
          className={`font-medium ${
            item.purchased ? "line-through text-gray-500" : "text-gray-900"
          }`}
        >
          {item.name}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <p className="text-sm text-gray-500">{item.measure}</p>
          <span className="text-xs text-gray-400">•</span>
          <p className="text-xs text-emerald-600 font-medium">
            {item.recipeIds.length} recipe{item.recipeIds.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
