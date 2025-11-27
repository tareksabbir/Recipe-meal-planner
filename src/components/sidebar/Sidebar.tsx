import React from 'react';
import { 
  Plus, 
  BarChart3, 
  Search, 
  BookOpen, 
  Users, 
  CheckSquare, 
  MessageSquare, 
  User, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-72 md:62 bg-slate-900 text-white p-6 flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Meal<span className="text-emerald-400">Plan</span></h1>
        <p className="text-sm text-gray-400">Make it easy, healthy life.</p>
      </div>
      
      <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg mb-8 flex items-center justify-center gap-2">
        <Plus className="text-xl" />
        <span>Create New</span>
      </button>

      <nav className="flex-1">
        <p className="text-xs text-gray-500 uppercase mb-4">Menu</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer">
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center gap-3 py-2 px-3 rounded bg-slate-800 cursor-pointer">
            <Search size={20} />
            <span>Discover Recipes</span>
          </li>
          <li className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer">
            <BookOpen size={20} />
            <span>My Recipes</span>
          </li>
          <li className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer">
            <Users size={20} />
            <span>Clients</span>
          </li>
          <li className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer">
            <CheckSquare size={20} />
            <span>Check-ins</span>
          </li>
          <li className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer relative">
            <MessageSquare size={20} />
            <span>Messages</span>
            <span className="absolute right-3 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
          </li>
        </ul>
      </nav>

      <div className="mt-auto space-y-2 pt-6 border-t border-slate-800">
        <p className="text-xs text-gray-500 uppercase mb-2">Your Account</p>
        <div className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer">
          <User size={20} />
          <span>Account</span>
        </div>
        <div className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer">
          <HelpCircle size={20} />
          <span>Help & Support</span>
        </div>
        <div className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer">
          <LogOut size={20} />
          <span>Log Out</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;