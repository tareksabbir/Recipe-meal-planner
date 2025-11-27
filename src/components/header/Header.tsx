import React from 'react';
import { Search, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button 
          className="p-2 rounded-lg bg-white shadow md:hidden"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Discover Recipes</h2>
      </div>
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for Recipes, Ingredients and Tags"
          className="pl-10 pr-4 py-2 w-full sm:w-64 md:w-96 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
};

export default Header;