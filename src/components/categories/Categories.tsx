// src/components/categories/Categories.tsx - UPDATED VERSION
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

interface CategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

// Category icons mapping
const categoryIcons: Record<string, string> = {
  'all': '🍽️',
  'Beef': '🥩',
  'Chicken': '🍗',
  'Dessert': '🍰',
  'Lamb': '🐑',
  'Miscellaneous': '🍴',
  'Pasta': '🍝',
  'Pork': '🥓',
  'Seafood': '🦐',
  'Side': '🥗',
  'Starter': '🥟',
  'Vegan': '🌱',
  'Vegetarian': '🥬',
  'Breakfast': '🍳',
  'Goat': '🐐',
};

const Categories = ({ activeCategory, onCategoryChange }: CategoriesProps) => {
  // State to track whether to show all categories
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  // Fetch categories from API with localStorage caching
  const { data: categories, isLoading, error, refetch } = useCategories();

  // Create categories array with "All Recipes" at the start
  const allCategories = [
    { strCategory: 'all', icon: categoryIcons['all'] },
    ...(categories?.map(cat => ({
      strCategory: cat.strCategory,
      icon: categoryIcons[cat.strCategory] || '🍽️'
    })) || [])
  ];

  // Display either all categories or just the first 7
  const displayedCategories = showAllCategories 
    ? allCategories 
    : [
        { strCategory: 'all', icon: categoryIcons['all'] },
        ...(categories?.slice(0, 7).map(cat => ({
          strCategory: cat.strCategory,
          icon: categoryIcons[cat.strCategory] || '🍽️'
        })) || [])
      ];

  // Handle "See All" button click
  const handleSeeAllClick = () => {
    setShowAllCategories(!showAllCategories);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="mb-6 md:mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg md:text-xl font-semibold">Categories</h3>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mb-6 md:mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg md:text-xl font-semibold">Categories</h3>
        </div>
        <ErrorMessage
          message="Failed to load categories. Please try again."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg md:text-xl font-semibold">Categories</h3>
        <button 
          onClick={handleSeeAllClick}
          className="text-emerald-500 flex items-center gap-1 hover:underline text-sm"
        >
          {showAllCategories ? 'Show Less' : 'See All'} <ChevronRight size={16} className={showAllCategories ? 'rotate-90' : ''} />
        </button>
      </div>
      <div className={`grid gap-2 md:gap-4 ${showAllCategories ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7' : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-8'}`}>
        {displayedCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategoryChange(category.strCategory)}
            className={`p-3 md:p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
              activeCategory === category.strCategory
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            <span className="text-xl md:text-2xl">{category.icon}</span>
            <span className="text-xs text-center font-medium">
              {category.strCategory === 'all' ? 'All Recipes' : category.strCategory}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;