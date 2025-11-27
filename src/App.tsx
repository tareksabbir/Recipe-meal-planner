import React, { useState } from 'react';
import type { Recipe } from './types';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import FeaturedRecipe from './components/featuredRecipe/FeaturedRecipe';
import Categories from './components/categories/Categories';
import RecipeGrid from './components/recipe/RecipeGrid';
import BookmarkNotification from './components/bookmark/BookmarkNotification';


const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All Recipes');
  const [showBookmarkNotification, setShowBookmarkNotification] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Initialize recipes with bookmarked state
  const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[]>([
    {
      id: 1,
      title: 'Udon with Chicken and Garlic Peanut Dressing',
      description: 'Prep faux bone broth, and them for days-on re-cuts toasties toast, cream...',
      time: '1 hr',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
      category: 'dinner',
      bookmarked: false
    },
    {
      id: 2,
      title: 'Boiled Eggs with Vegetable Sauce',
      description: 'A good breakfast recipe to energize you as you began your day.',
      time: '1 hr 30 mins',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      category: 'breakfast',
      bookmarked: false
    },
    {
      id: 3,
      title: 'Mashed Potatoes Breakfast Hash',
      description: 'Get out your biggest pot and invite the neighbors for a feast.',
      time: '45 mins',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
      category: 'breakfast',
      bookmarked: false
    },
    {
      id: 4,
      title: 'Avocado Sauce with Sliced Lime',
      description: 'This chilled ice frozen! Filipino treat is made by mixing cracked fruit...',
      time: '1 hr 15 mins',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      category: 'healthy',
      bookmarked: false
    }
  ]);

  // Toggle bookmark status for a recipe
  const toggleBookmark = (recipeId: number) => {
    setSuggestedRecipes(prevRecipes => 
      prevRecipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, bookmarked: !recipe.bookmarked }
          : recipe
      )
    );
    
    // Show bookmark notification when bookmarking
    const recipe = suggestedRecipes.find(r => r.id === recipeId);
    if (recipe && !recipe.bookmarked) {
      setShowBookmarkNotification(true);
      // Hide notification after 3 seconds
      setTimeout(() => setShowBookmarkNotification(false), 3000);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Header 
            onMenuClick={() => setSidebarOpen(true)} 
          />

          {/* Featured Recipe */}
          <FeaturedRecipe />

          {/* Categories */}
          <Categories 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Suggested Recipes */}
          <RecipeGrid 
            recipes={suggestedRecipes}
            onBookmarkToggle={toggleBookmark}
          />
        </div>
      </main>

      {/* Bookmark Notification */}
      <BookmarkNotification 
        show={showBookmarkNotification}
        onClose={() => setShowBookmarkNotification(false)}
      />
    </div>
  );
};

export default App;