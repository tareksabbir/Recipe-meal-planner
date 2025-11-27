import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/common/ErrorBoundary.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MealPlanProvider } from "./context/MealPlanContext.tsx";
import { ShoppingListProvider } from "./context/ShoppingListContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <MealPlanProvider>
          <ShoppingListProvider>
            <App />
          </ShoppingListProvider>
        </MealPlanProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
