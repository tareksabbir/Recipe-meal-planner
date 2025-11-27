import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import type { ShoppingListItem } from "../types";

interface ShoppingListContextType {
  shoppingList: ShoppingListItem[];
  purchasedItems: Set<string>;
  addItem: (item: ShoppingListItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Partial<ShoppingListItem>) => void;
  togglePurchased: (id: string) => void;
  clearPurchased: () => void;
  clearList: () => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

const SHOPPING_LIST_KEY = "shopping-list";
const PURCHASED_ITEMS_KEY = "purchased-items";

// Initial state function to load from localStorage
const loadInitialShoppingList = (): ShoppingListItem[] => {
  try {
    const stored = localStorage.getItem(SHOPPING_LIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse shopping list from localStorage", error);
    return [];
  }
};

// Initial state function to load purchased items from localStorage
const loadInitialPurchasedItems = (): Set<string> => {
  try {
    const purchased = localStorage.getItem(PURCHASED_ITEMS_KEY);
    return purchased ? new Set(JSON.parse(purchased)) : new Set();
  } catch (error) {
    console.error("Failed to parse purchased items from localStorage", error);
    return new Set();
  }
};

export const ShoppingListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [shoppingList, setShoppingList] = React.useState<ShoppingListItem[]>(
    loadInitialShoppingList
  );
  const [purchasedItems, setPurchasedItems] = React.useState<Set<string>>(
    loadInitialPurchasedItems
  );

  // Save shopping list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Save purchased items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      PURCHASED_ITEMS_KEY,
      JSON.stringify(Array.from(purchasedItems))
    );
  }, [purchasedItems]);

  const addItem = useCallback((item: ShoppingListItem) => {
    setShoppingList((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex >= 0) {
        // Update existing item
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], ...item };
        return updated;
      }
      // Add new item
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateItem = useCallback(
    (id: string, updates: Partial<ShoppingListItem>) => {
      setShoppingList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
      );
    },
    []
  );

  const togglePurchased = useCallback((id: string) => {
    setPurchasedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const clearPurchased = useCallback(() => {
    setPurchasedItems(new Set());
  }, []);

  const clearList = useCallback(() => {
    setShoppingList([]);
    setPurchasedItems(new Set());
  }, []);

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        purchasedItems,
        addItem,
        removeItem,
        updateItem,
        togglePurchased,
        clearPurchased,
        clearList,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useShoppingListContext = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error(
      "useShoppingListContext must be used within ShoppingListProvider"
    );
  }
  return context;
};
