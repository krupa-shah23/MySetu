import React from 'react';
import { Search } from 'lucide-react';

export default function WalletFilters({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter
}) {
  const filters = ['All', 'Education', 'Employment', 'Finance', 'Healthcare'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
      {/* Search Input */}
      <div className="relative w-full sm:w-[320px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search credentials..."
          className="block w-full pl-10 pr-3 py-2.5 border border-white/60 rounded-2xl leading-5 bg-white/60 backdrop-blur-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20 focus:border-slate-400 transition-all duration-300 shadow-sm text-[13px] font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-xl text-[12px] font-semibold transition-all duration-300 ${
              activeFilter === filter
                ? 'bg-slate-800 text-white shadow-md'
                : 'bg-white/40 text-slate-500 hover:bg-white/80 hover:text-slate-800 border border-white/40 shadow-sm'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
