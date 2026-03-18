import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const filterOptions = [
  'All',
  'Shared',
  'Verified',
  'Revoked',
  'Requests',
  'Scanned'
];

export default function ActivityFilters({ activeFilter, setActiveFilter }) {
  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide shrink-0">
      {filterOptions.map(option => (
        <button
          key={option}
          onClick={() => setActiveFilter(option)}
          className={cn(
            "px-5 py-2.5 rounded-full text-[13px] font-[600] tracking-wide transition-all duration-300 whitespace-nowrap shadow-sm border",
            activeFilter === option
              ? "bg-[#1e293b] text-white border-transparent shadow-[0_4px_12px_rgba(30,41,59,0.15)] ring-2 ring-indigo-500/20"
              : "bg-white/80 backdrop-blur-md text-slate-600 border-white/60 hover:bg-white hover:text-slate-900 hover:shadow-md hover:border-white"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
