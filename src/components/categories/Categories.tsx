import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { Category } from '../../types';


interface CategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ activeCategory, onCategoryChange }) => {
  const categories: Category[] = [
    { name: 'All Recipes', icon: '🍽️' },
    { name: 'Appetizers & Snacks', icon: '🥟' },
    { name: 'Baking', icon: '🧁' },
    { name: 'Beef', icon: '🥩' },
    { name: 'Breakfast', icon: '🍳' },
    { name: 'Chicken', icon: '🍗' },
    { name: 'Desserts', icon: '🍰' },
    { name: 'Drinks', icon: '🥤' },
  ];

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg md:text-xl font-semibold">Categories</h3>
        <button className="text-emerald-500 flex items-center gap-1 hover:underline text-sm">
          See All <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 md:gap-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategoryChange(category.name)}
            className={`p-3 md:p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
              activeCategory === category.name
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            <span className="text-xl md:text-2xl">{category.icon}</span>
            <span className="text-xs text-center font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;