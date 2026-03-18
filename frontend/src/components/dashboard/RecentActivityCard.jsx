import React from 'react';

export default function RecentActivityCard({ activities }) {
  if (!activities) return null;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        {activities.map((event) => (
          <div key={event.id} className="flex items-center justify-between py-2 border-b border-slate-100/60 last:border-0 group cursor-pointer transition-colors">
            <div className="flex flex-col">
              <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-800 transition-colors leading-snug">{event.action}</span>
              <span className="text-[11px] font-medium text-slate-400 mt-0.5">{event.time}</span>
            </div>
            <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold capitalize tracking-wide border ${
               event.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' : 
               event.status === 'verified'  ? 'bg-blue-50 text-blue-600 border-blue-100/50' :
               event.status === 'revoked'   ? 'bg-rose-50 text-rose-500 border-rose-100/50' :
               'bg-slate-50 text-slate-500 border-slate-200/50'
            }`}>
              {event.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
