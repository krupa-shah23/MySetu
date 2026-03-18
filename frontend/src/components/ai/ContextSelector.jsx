import React from 'react';
import { Home, Briefcase, HeartPulse, GraduationCap } from 'lucide-react';

const contexts = [
  { id: 'Home Loan', label: 'Home Loan', icon: Home },
  { id: 'Job Application', label: 'Job Application', icon: Briefcase },
  { id: 'Insurance', label: 'Insurance', icon: HeartPulse },
  { id: 'University Verification', label: 'University Verification', icon: GraduationCap },
];

export default function ContextSelector({ activeContext, setActiveContext }) {
  return (
    <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-8">
      {contexts.map((ctx) => {
        const Icon = ctx.icon;
        const isActive = activeContext === ctx.id;
        
        return (
          <button
            key={ctx.id}
            onClick={() => setActiveContext(ctx.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[13px] font-semibold transition-all duration-300 ${
              isActive
                ? 'bg-slate-800 text-white shadow-md'
                : 'bg-white/40 text-slate-500 hover:bg-white/80 hover:text-slate-800 border border-white/40 shadow-sm'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
            {ctx.label}
          </button>
        );
      })}
    </div>
  );
}
