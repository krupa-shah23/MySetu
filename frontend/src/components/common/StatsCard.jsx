import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function StatsCard({ title, value, icon: Icon, colorClass, trend }) {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full group">
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "w-12 h-12 rounded-[1rem] flex items-center justify-center shrink-0 border border-white shadow-sm transition-transform duration-300 group-hover:scale-110",
          colorClass
        )}>
          {Icon && <Icon className="w-5 h-5 stroke-[2.5px]" />}
        </div>
        {trend && (
          <div className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[11px] font-bold border border-emerald-100 flex items-center gap-1">
            {trend}
          </div>
        )}
      </div>
      <div className="mt-auto">
        <h3 className="text-[2rem] font-[800] text-slate-800 leading-none tracking-tight mb-1">{value}</h3>
        <p className="text-[13px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
      </div>
    </div>
  );
}
