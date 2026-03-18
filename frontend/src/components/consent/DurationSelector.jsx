import React from 'react';

export default function DurationSelector({ options, selected, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-300 ${
            selected === option
              ? 'bg-slate-800 text-white shadow-md'
              : 'bg-white/50 text-slate-500 hover:bg-white/80 hover:text-slate-800 border border-white/40 shadow-sm'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
