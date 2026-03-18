import React from 'react';
import { X, Share2, Eye, ShieldCheck, ShieldAlert, BadgeCheck } from 'lucide-react';

export default function NodeDetailPanel({ node, onClose }) {
  if (!node) return null;

  return (
    <div className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-7 border border-white shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative h-full flex flex-col animate-in slide-in-from-right-8 duration-500">
      
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100/50 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors z-10"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="mb-6 pr-8">
        <h3 className="text-[20px] font-bold text-slate-800 leading-tight mb-1">{node.title}</h3>
        <p className="text-[14px] font-semibold text-slate-500">{node.organization}</p>
      </div>

      <div className="flex items-center gap-2 mb-8">
        <span className="px-3 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200/50">
          {node.type}
        </span>
        {node.verified ? (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/50 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified
          </span>
        ) : (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100/50 shadow-sm">
            <ShieldAlert className="w-3.5 h-3.5" /> Unverified
          </span>
        )}
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 relative overflow-hidden group">
          <BadgeCheck className="w-24 h-24 text-slate-200 absolute -right-6 -bottom-6 opacity-50 group-hover:scale-110 transition-transform duration-500" />
          <div className="relative z-10">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date Range</p>
            <p className="text-[14px] font-semibold text-slate-800">{node.dateRange}</p>
          </div>
        </div>

        <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Linked Credentials</p>
          <div className="flex items-center gap-2 mt-1">
             <div className="w-8 h-8 rounded-full bg-slate-200/50 flex items-center justify-center text-slate-600 font-bold text-[12px]">
               {node.linkedCredentials}
             </div>
             <span className="text-[13px] font-medium text-slate-600">Items securely attached</span>
          </div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-800 text-white hover:bg-slate-700 shadow-md transition-colors text-[13px] font-semibold w-full">
          <Share2 className="w-4 h-4" /> Share Path
        </button>
        <button className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm transition-colors text-[13px] font-semibold w-full">
          <Eye className="w-4 h-4" /> View Creds
        </button>
      </div>

    </div>
  );
}
