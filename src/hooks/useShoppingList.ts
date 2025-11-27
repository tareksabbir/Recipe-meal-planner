import { useShoppingListContext } from "../context/ShoppingListContext";
import { useMemo } from "react";
import type { ShoppingListItem } from "../types";

export const useShoppingList = () => {
  const {
    shoppingList,
    purchasedItems,
    addItem,
    removeItem,
    updateItem,
    togglePurchased,
    clearPurchased,
    clearList,
  } = useShoppingListContext();

  // Calculate statistics
  const stats = useMemo(() => {
    const purchasedCount = shoppingList.filter((item) =>
      purchasedItems.has(item.id)
    ).length;
    const totalCount = shoppingList.length;
    const progressPercentage =
      totalCount > 0 ? (purchasedCount / totalCount) * 100 : 0;

    return {
      purchasedCount,
      totalCount,
      progressPercentage,
    };
  }, [shoppingList, purchasedItems]);

  // Add or update multiple items at once
  const addOrUpdateItems = (items: ShoppingListItem[]) => {
    items.forEach((item) => addItem(item));
  };

  return {
    shoppingList,
    purchasedItems,
    addItem,
    removeItem,
    updateItem,
    togglePurchased,
    clearPurchased,
    clearList,
    addOrUpdateItems,
    stats,
  };
};
