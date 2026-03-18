import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function TopNavbar() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <header className="w-full px-6 sm:px-8 pt-6 pb-2 flex items-center justify-between transition-all duration-300">
      
      <div className="flex-1 max-w-sm hidden md:flex">
         <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center group/search z-10 w-10 cursor-help" aria-label="Search">
            <Search className="w-4 h-4 text-slate-400" />
            {/* Tooltip */}
            <div className="absolute top-[calc(100%+8px)] left-2 px-3 py-1.5 bg-slate-800 text-white text-[12px] font-medium rounded-lg opacity-0 invisible group-hover/search:opacity-100 group-hover/search:visible transition-all duration-200 shadow-xl whitespace-nowrap z-[100] flex flex-col items-center pointer-events-none">
               <div className="absolute -top-1 left-4 w-2 h-2 bg-slate-800 rotate-45" />
               Search
            </div>
          </div>
          <input 
            type="text" 
            placeholder="Search workspace..." 
            className="w-full pl-10 pr-4 py-2 bg-white/40 border border-[#e2e8f0]/60 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-slate-300 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-5 ml-auto">
        <div className="relative group">
          <button className="relative text-slate-400 hover:text-slate-600 transition-colors" aria-label="Notifications">
            <Bell className="w-5 h-5 stroke-[2px]" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-rose-400 border-[1.5px] border-[#edf2f7]" />
          </button>
          {/* Tooltip */}
          <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-800 text-white text-[12px] font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl whitespace-nowrap z-[100] flex flex-col items-center pointer-events-none">
             <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" />
             Notifications
          </div>
        </div>
        
        <div className="relative group" aria-label="Profile">
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shadow-sm cursor-pointer border border-[#e2e8f0]">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt={user?.name || "Profile"} className="w-full h-full object-cover" />
          </div>
          {/* Tooltip */}
          <div className="absolute top-[calc(100%+10px)] right-0 px-3 py-1.5 bg-slate-800 text-white text-[12px] font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl whitespace-nowrap z-[100] flex flex-col items-center pointer-events-none">
             <div className="absolute -top-1 right-3 w-2 h-2 bg-slate-800 rotate-45" />
             {user?.name || "Profile"}
          </div>
        </div>
      </div>
    </header>
  );
}
