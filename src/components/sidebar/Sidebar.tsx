// src/components/sidebar/Sidebar.tsx - UPDATED VERSION
import { 
  Plus, 
  BarChart3, 
  Search, 
  CheckSquare, 
  MessageSquare, 
  User, 
  HelpCircle, 
  LogOut, 
  ShoppingBag,
  CalendarRange,
} from 'lucide-react';

type View = 'discover' | 'mealplan' | 'shopping';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: View;
  onViewChange: (view: View) => void;
}

const Sidebar = ({ isOpen, activeView, onViewChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', view: null },
    { id: 'discover', icon: Search, label: 'Discover Recipes', view: 'discover' as View },
    { id: 'mealplan', icon: CalendarRange, label: 'Weekly Meal Plan', view: 'mealplan' as View },
    { id: 'shopping', icon: ShoppingBag, label: 'Shopping List', view: 'shopping' as View },
    { id: 'checkins', icon: CheckSquare, label: 'Check-ins', view: null },
    { id: 'messages', icon: MessageSquare, label: 'Messages', view: null, badge: 3 },
  ];

  return (
    <aside 
      className={`fixed lg:static inset-y-0 left-0 z-30 w-72 md:w-64 bg-slate-900 text-white p-6 flex flex-col transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
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

      <nav className="flex-1">
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
                  isActive ? 'bg-slate-800' : 'hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto space-y-2 pt-6 border-t border-slate-800">
        <p className="text-xs text-gray-500 uppercase mb-2">Your Account</p>
        <div className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer transition-colors">
          <User size={20} />
          <span>Account</span>
        </div>
        <div className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer transition-colors">
          <HelpCircle size={20} />
          <span>Help & Support</span>
        </div>
        <div className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer transition-colors">
          <LogOut size={20} />
          <span>Log Out</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;