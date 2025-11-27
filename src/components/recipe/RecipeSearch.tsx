import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface RecipeSearchProps {
  onSearchChange: (query: string) => void;
}

export const RecipeSearch: React.FC<RecipeSearchProps> = ({
  onSearchChange,
}) => {
  const [searchInput, setSearchInput] = useState("");

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, onSearchChange]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};