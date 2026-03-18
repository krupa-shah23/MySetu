import React from 'react';
import { Share2, CheckCircle2, AlertTriangle, ShieldAlert, Scan, Activity, ArrowRight, Building } from 'lucide-react';

const formatTimeAgo = (dateString) => {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const getEventIcon = (type) => {
  switch (type) {
    case 'Shared': return <Share2 className="w-4 h-4 text-blue-500" />;
    case 'Verified': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case 'Revoked': return <ShieldAlert className="w-4 h-4 text-rose-500" />;
    case 'Requests': return <Activity className="w-4 h-4 text-amber-500" />;
    case 'Scanned': return <Scan className="w-4 h-4 text-indigo-500" />;
    default: return <Activity className="w-4 h-4 text-slate-500" />;
  }
};

const getStatusBadge = (status) => {
  if (status === 'Success') return 'bg-emerald-50 border-emerald-100 text-emerald-600';
  if (status === 'Pending') return 'bg-amber-50 border-amber-100 text-amber-600';
  return 'bg-slate-50 border-slate-100 text-slate-600';
};

export default function ActivityLogCard({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/70 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
         <Activity className="w-12 h-12 text-slate-300 mb-4" />
         <p className="text-[14px] font-semibold text-slate-500">No activity recorded for this filter.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/70 shadow-[0_4px_30px_rgba(0,0,0,0.02)] overflow-hidden">
      <div className="flex flex-col">
        {items.map((item, idx) => (
          <div 
            key={item.id} 
            className={`group flex items-start sm:items-center p-5 transition-colors duration-200 hover:bg-white/50 ${idx !== items.length - 1 ? 'border-b border-slate-100/50' : ''}`}
          >
            {/* Left Desktop Layout (Time & Icon) */}
            <div className="hidden sm:flex items-center w-32 shrink-0 pr-4 border-r border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 font-mono tracking-tight drop-shadow-sm w-16 text-right mr-3">
                {formatTimeAgo(item.timestamp)}
              </span>
              <div className="w-8 h-8 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
                {getEventIcon(item.eventType)}
              </div>
            </div>

            {/* Mobile Left Column (Just Icon) */}
            <div className="sm:hidden flex flex-col items-center mr-4">
              <div className="w-8 h-8 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 mb-1">
                {getEventIcon(item.eventType)}
              </div>
              <span className="text-[10px] font-bold text-slate-400 font-mono text-center">
                {formatTimeAgo(item.timestamp)}
              </span>
            </div>

            {/* Main Content Body */}
            <div className="flex-1 min-w-0 sm:px-4">
               <div className="flex items-center gap-2 mb-1">
                 <h4 className="text-[14px] font-bold text-slate-800 leading-tight truncate">{item.title}</h4>
               </div>
               
               <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2">
                 <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600 bg-white/60 px-2 py-0.5 rounded border border-slate-100 shadow-sm">
                   <Building className="w-3 h-3 text-slate-400" /> {item.institution}
                 </span>
                 <ArrowRight className="w-3 h-3 text-slate-300 hidden sm:block" />
                 <span className="text-[12px] font-semibold text-slate-500 truncate max-w-[150px] sm:max-w-xs block">
                   {item.credential}
                 </span>
               </div>

               <p className="text-[12px] font-medium text-slate-400 mt-2 truncate w-full group-hover:text-slate-500 transition-colors">
                 {item.description}
               </p>
            </div>

            {/* Right Side Placements */}
            <div className="ml-4 flex flex-col items-end shrink-0 gap-2">
               <span className="px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-widest font-bold bg-slate-100/50 text-slate-500 border border-slate-200/50 shadow-sm hidden sm:inline-block">
                 {item.eventType}
               </span>
               <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold border shadow-sm ${getStatusBadge(item.status)}`}>
                 {item.status}
               </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
