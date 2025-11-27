import React from 'react';
import { Clock, Bookmark, Star } from 'lucide-react';
import type { Recipe } from '../../types';


interface RecipeCardProps {
  recipe: Recipe;
  onBookmarkToggle: (id: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onBookmarkToggle }) => {
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
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
      <div className="relative h-40 md:h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button 
          onClick={() => onBookmarkToggle(recipe.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-emerald-50"
        >
          <Bookmark 
            size={18} 
            className={recipe.bookmarked ? "fill-emerald-500 text-emerald-500" : "text-gray-600"} 
          />
        </button>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{recipe.title}</h4>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{recipe.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock size={16} />
            <span>{recipe.time}</span>
          </div>
          <div className="flex gap-1">
            {renderStars(recipe.rating)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;