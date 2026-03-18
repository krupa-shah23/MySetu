import React from 'react';
import { Plus } from 'lucide-react';

export default function SuggestedCredentialsCard({ suggestions }) {
  if (!suggestions) return null;

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2.5">
        {suggestions.map((item) => (
          <div 
            key={item.id}
            className="flex items-center gap-3 p-2 pr-4 rounded-xl bg-white/60 border border-slate-200/60 hover:bg-white hover:shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-[0.4rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-600 transition-colors shadow-sm">
               <Plus className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-[12px] font-bold text-slate-700 leading-tight mb-0.5">{item.title}</h4>
              <p className="text-[11px] font-medium text-slate-400">{item.useCase}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
