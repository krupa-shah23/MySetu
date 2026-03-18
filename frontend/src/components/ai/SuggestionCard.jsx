import React from 'react';
import { Share2, PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SuggestionCard({ item }) {
  const isAvailable = item.status === "Available";

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-rose-600 bg-rose-50 border-rose-100/50';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100/50';
      default: return 'text-slate-600 bg-slate-50 border-slate-100/50';
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 border border-white/70 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-300 group">
      
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div>
           <div className="flex items-center gap-2 mb-1.5">
             <h3 className="text-[16px] font-bold text-slate-800 leading-tight">{item.credentialName}</h3>
             {isAvailable ? (
               <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                 <CheckCircle2 className="w-3 h-3" /> Available
               </span>
             ) : (
               <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200/50">
                 <AlertCircle className="w-3 h-3" /> Missing
               </span>
             )}
           </div>
           
           <p className="text-[13px] font-medium text-slate-500 leading-snug max-w-lg">
             {item.reason}
           </p>
        </div>
        
        <span className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-widest font-bold border shadow-sm ${getPriorityColor(item.priority)}`}>
          {item.priority} Priority
        </span>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100/50">
        {isAvailable ? (
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 shadow-sm transition-colors text-[12px] font-bold">
            <Share2 className="w-3.5 h-3.5" /> Share Now
          </button>
        ) : (
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/50 shadow-sm transition-colors text-[12px] font-bold">
            <PlusCircle className="w-3.5 h-3.5" /> Prepare
          </button>
        )}
      </div>

    </div>
  );
}
