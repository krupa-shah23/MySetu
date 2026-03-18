import React from 'react';

export default function ActivityFilters({ activeFilter, setActiveFilter }) {
  const filters = ['All', 'Shared', 'Verified', 'Revoked', 'Requests', 'Scanned'];

  return (
    <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 rounded-[1rem] text-[13px] font-semibold transition-all duration-300 ${
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
