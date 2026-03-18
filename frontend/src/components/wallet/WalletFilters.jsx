import React from 'react';
import { Search } from 'lucide-react';

const filters = ['All', 'Education', 'Employment', 'Finance', 'Healthcare', 'Government'];

export default function WalletFilters({ activeFilter, setActiveFilter, searchQuery, setSearchQuery }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between w-full mb-8">
      {/* Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-all duration-300 ${
              activeFilter === filter 
                ? 'bg-white text-slate-800 shadow-sm border border-slate-200/80' 
                : 'bg-transparent text-slate-500 hover:text-slate-700 hover:bg-white/40'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-64 shrink-0">
         <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
         </div>
         <input 
            type="text" 
            placeholder="Search wallet..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/50 border border-slate-200/60 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-slate-300 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.01)] backdrop-blur-sm"
         />
      </div>
    </div>
  );
}
