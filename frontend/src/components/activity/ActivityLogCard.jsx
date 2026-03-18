import React from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Share2, 
  ScanLine, 
  FileText, 
  History,
  Building2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function getEventIcon(eventType) {
  switch (eventType) {
    case 'Shared':
      return <Share2 className="w-5 h-5 text-blue-500" />;
    case 'Verified':
      return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    case 'Revoked':
      return <ShieldAlert className="w-5 h-5 text-rose-500" />;
    case 'Scanned':
      return <ScanLine className="w-5 h-5 text-purple-500" />;
    case 'Requests':
      return <History className="w-5 h-5 text-amber-500" />;
    case 'Added':
      return <FileText className="w-5 h-5 text-indigo-500" />;
    default:
      return <History className="w-5 h-5 text-slate-500" />;
  }
}

function getEventColor(eventType) {
  switch (eventType) {
    case 'Shared': return "bg-blue-100/50 text-blue-700 ring-blue-500/20";
    case 'Verified': return "bg-emerald-100/50 text-emerald-700 ring-emerald-500/20";
    case 'Revoked': return "bg-rose-100/50 text-rose-700 ring-rose-500/20";
    case 'Scanned': return "bg-purple-100/50 text-purple-700 ring-purple-500/20";
    case 'Requests': return "bg-amber-100/50 text-amber-700 ring-amber-500/20";
    case 'Added': return "bg-indigo-100/50 text-indigo-700 ring-indigo-500/20";
    default: return "bg-slate-100 text-slate-700 ring-slate-500/20";
  }
}

function getStatusBadge(status) {
  switch (status) {
    case 'Success':
    case 'Approved':
      return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{status}</span>;
    case 'Active':
      return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-100 text-blue-700 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>{status}</span>;
    case 'Revoked':
      return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-rose-100 text-rose-700 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>{status}</span>;
    case 'Pending':
      return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-100 text-amber-700 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>{status}</span>;
    default:
      return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>{status}</span>;
  }
}

function formatTime(isoString) {
  const date = new Date(isoString);
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    'day'
  );
  // Alternatively simplify format for feed
}

export default function ActivityLogCard({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-12 text-center text-slate-500">
        No activity found for this filter.
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      <div className="flex flex-col">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const displayTime = new Date(item.timestamp).toLocaleDateString() + ' • ' + new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          return (
            <div 
              key={item.id} 
              className={cn(
                "p-5 sm:p-6 hover:bg-white/40 transition-colors duration-200 group relative",
                !isLast && "border-b border-slate-200/50"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Icon Column */}
                <div className="shrink-0 mt-1">
                  <div className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm ring-1 ring-inset",
                    getEventColor(item.eventType)
                  )}>
                    {getEventIcon(item.eventType)}
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                    <div>
                      <h4 className="text-[15px] font-[600] text-slate-800 tracking-tight flex items-center gap-2 flex-wrap">
                        {item.title}
                        {getStatusBadge(item.status)}
                      </h4>
                      <p className="text-[13.5px] text-slate-600 mt-1">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-slate-400 text-[12px] font-medium shrink-0 mt-1 sm:mt-0">
                      <Clock className="w-3.5 h-3.5" />
                      {displayTime}
                    </div>
                  </div>

                  {/* Badges/Tags Row */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/50 border border-slate-200/60 shadow-sm text-slate-600 text-[12px] font-medium">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[120px]">{item.institution}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-300" />
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/50 border border-slate-200/60 shadow-sm text-slate-600 text-[12px] font-medium">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[120px]">{item.credential}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
