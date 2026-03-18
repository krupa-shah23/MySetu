import React from 'react';
import { Share2, Shield, History, QrCode } from 'lucide-react';

const iconMap = {
  share: Share2,
  shield: Shield,
  history: History,
  qrcode: QrCode
};

export default function QuickActionsPanel({ actions }) {
  if (!actions) return null;

  return (
    <div className="flex flex-col h-full bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/80 p-6 sm:p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.03)]">
      <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {actions.map((action) => {
          const Icon = iconMap[action.icon] || Share2;
          return (
            <button 
              key={action.id}
              className="flex flex-col items-center justify-center gap-3 p-4 rounded-3xl bg-slate-50 border border-slate-100/80 text-slate-600 shadow-sm hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-slate-100 group-hover:bg-indigo-100 group-hover:border-indigo-200 transition-colors">
                 <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-center leading-tight px-2">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
