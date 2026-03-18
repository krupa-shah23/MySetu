import React from 'react';
import { Share2, CheckCircle2, ShieldAlert, BadgeCheck, FileBadge, Eye } from 'lucide-react';

const typeIcons = {
  Issue: BadgeCheck,
  Share: Share2,
  Verify: CheckCircle2,
  Revoke: ShieldAlert,
  Scan: Eye,
  Request: FileBadge
};

export default function TimelineEventCard({ event, isLast }) {
  const Icon = typeIcons[event.type] || FileBadge;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Issued':
        return 'bg-blue-50 text-blue-600 border-blue-100/50';
      case 'Shared':
        return 'bg-purple-50 text-purple-600 border-purple-100/50';
      case 'Verified':
      case 'Scanned':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100/50';
      case 'Revoked':
        return 'bg-rose-50 text-rose-600 border-rose-100/50';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100/50';
    }
  };

  const formattedTime = new Date(event.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  const formattedDate = new Date(event.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="flex relative group">
      
      {/* Timeline Axis */}
      <div className="w-16 shrink-0 flex flex-col items-center mr-4">
        <div className="text-[11px] font-bold text-slate-400 mb-2 truncate group-hover:text-slate-600 transition-colors">
          {formattedDate}
        </div>
        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
          <Icon className="w-4 h-4 text-slate-500 group-hover:text-slate-800 transition-colors" />
        </div>
        {!isLast && (
          <div className="flex-1 w-[2px] bg-slate-200/50 my-1 group-hover:bg-slate-300 transition-colors"></div>
        )}
      </div>

      {/* Event Details Card */}
      <div className="flex-1 bg-white/60 backdrop-blur-xl rounded-[1.5rem] p-5 mb-6 border border-white/70 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-300">
        
        <div className="flex items-start justify-between mb-2">
          <div>
             <h3 className="text-[15px] font-bold text-slate-800 leading-tight mb-1">{event.title}</h3>
             <p className="text-[12px] font-semibold text-slate-400">{event.institution} • {event.domain}</p>
          </div>
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border shadow-sm ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100/50">
           <div className="text-[11px] font-semibold text-slate-400 bg-white/50 px-2 py-1 rounded-md border border-slate-100">
             {formattedTime}
           </div>
           <p className="text-[13px] font-medium text-slate-600">{event.description}</p>
        </div>
        
      </div>

    </div>
  );
}
