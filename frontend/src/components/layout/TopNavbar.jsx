import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function TopNavbar() {
  const location = useLocation();

  return (
    <header className="w-full px-6 sm:px-8 pt-6 pb-2 flex items-center justify-between transition-all duration-300">
      
      {/* Search / Placeholder context */}
      <div className="flex-1 max-w-sm hidden md:flex">
         <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search workspace..." 
            className="w-full pl-10 pr-4 py-2 bg-white/40 border border-[#e2e8f0]/60 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-slate-300 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-5 ml-auto">
        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5 stroke-[2px]" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-rose-400 border-[1.5px] border-[#edf2f7]" />
        </button>
        
        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shadow-sm cursor-pointer border border-[#e2e8f0]">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}
