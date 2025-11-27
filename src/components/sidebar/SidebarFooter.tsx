import { HelpCircle, LogOut, User } from 'lucide-react'


const SidebarFooter = () => {
  return (
      <div className="mt-auto space-y-2 pt-6 border-t border-slate-800">
          <p className="text-xs text-gray-500 uppercase mb-2">Your Account</p>
          <div className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer transition-colors">
            <User size={18} />
            <span className="text-sm">Account</span>
          </div>
          <div className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer transition-colors">
            <HelpCircle size={18} />
            <span className="text-sm">Help & Support</span>
          </div>
          <div className="flex items-center gap-3 py-2 px-3 rounded hover:bg-slate-800 cursor-pointer transition-colors">
            <LogOut size={18} />
            <span className="text-sm">Log Out</span>
          </div>
        </div>
  )
}

export default SidebarFooter
