import React from 'react';
import { Clock, Star } from 'lucide-react';

const FeaturedRecipe: React.FC = () => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="relative mb-6 md:mb-8 rounded-xl md:rounded-2xl overflow-hidden h-48 md:h-64 group">
      <img
        src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&h=400&fit=crop"
        alt="Featured recipe"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/70 to-transparent flex items-center">
        <div className="text-white p-4 md:p-8 max-w-md">
          <span className="bg-emerald-500 px-3 py-1 rounded text-sm font-medium">RECIPE</span>
          <h3 className="text-xl md:text-3xl font-bold mt-2 md:mt-4 mb-1 md:mb-2">Vegan: Chicken & Chips with Pancakes</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>25 min</span>
            </div>
            <div className="flex gap-1">
              {renderStars(5)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRecipe;