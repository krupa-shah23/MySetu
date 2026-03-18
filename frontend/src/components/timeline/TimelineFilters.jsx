import React from 'react';

export default function TimelineFilters({ activeFilter, setActiveFilter }) {
  const filters = ['All', 'Education', 'Employment', 'Finance', 'Healthcare', 'Shared', 'Verified'];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
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
  );
}
