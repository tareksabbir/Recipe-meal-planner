import { Plus, Search, ShoppingBag, CalendarRange, Bookmark } from "lucide-react";
import SidebarFooter from "./SidebarFooter";

import type { View } from "../../types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: View;
  onViewChange: (view: View) => void;
}

const Sidebar = ({ isOpen, activeView, onViewChange }: SidebarProps) => {
  const menuItems = [
    {
      id: "discover",
      icon: Search,
      label: "Discover Recipes",
      view: "discover" as View,
    },
    {
      id: "bookmarks",
      icon: Bookmark,
      label: "Bookmarks",
      view: "bookmarks" as View,
    },
    {
      id: "mealplan",
      icon: CalendarRange,
      label: "Weekly Meal Plan",
      view: "mealplan" as View,
    },
    {
      id: "shopping",
      icon: ShoppingBag,
      label: "Shopping List",
      view: "shopping" as View,
    },
  ];

  return (
    <>
      {/* Mobile Sidebar - Fixed */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 md:w-64 bg-slate-900 text-white p-6 flex flex-col transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Meal<span className="text-emerald-400">Plan</span>
          </h1>
          <p className="text-sm text-gray-400">Make it easy, healthy life.</p>
        </div>

        <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg mb-8 flex items-center justify-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Create New</span>
        </button>

        <nav className="flex-1 overflow-y-auto">
          <p className="text-xs text-gray-500 uppercase mb-4">Menu</p>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.view === activeView;

              return (
                <li
                  key={item.id}
                  onClick={() => item.view && onViewChange(item.view)}
                  className={`flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors ${
                    isActive ? "bg-slate-800" : "hover:bg-slate-800"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </nav>

        <SidebarFooter />
      </aside>

      {/* Desktop Sidebar - Fixed */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white p-6 flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Meal<span className="text-emerald-400">Plan</span>
          </h1>
          <p className="text-sm text-gray-400">Make it easy, healthy life.</p>
        </div>

        <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg mb-8 flex items-center justify-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Create New</span>
        </button>

        <nav className="flex-1 overflow-y-auto">
          <p className="text-xs text-gray-500 uppercase mb-4">Menu</p>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.view === activeView;

              return (
                <li
                  key={item.id}
                  onClick={() => item.view && onViewChange(item.view)}
                  className={`flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors ${
                    isActive ? "bg-slate-800" : "hover:bg-slate-800"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </nav>
        <SidebarFooter />
      </aside>
    </>
  );
};

export default Sidebar;