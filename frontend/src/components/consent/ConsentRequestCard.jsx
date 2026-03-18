import React from 'react';
import { Building2, GraduationCap, HeartPulse, ShieldCheck, Briefcase, Eye, Check, X } from 'lucide-react';

const typeIcons = {
  Bank: Building2,
  University: GraduationCap,
  Hospital: HeartPulse,
  Employer: Briefcase
};

export default function ConsentRequestCard({ request, onReview, onApprove, onDeny }) {
  const Icon = typeIcons[request.institutionType] || ShieldCheck;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-600 border-amber-100/50';
      case 'Approved':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100/50';
      case 'Expiring Soon':
        return 'bg-rose-50 text-rose-600 border-rose-100/50';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100/50';
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-[1.5rem] p-5 sm:p-6 border border-white/70 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col relative group">
      
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[1.2rem] bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-800 leading-tight mb-0.5">{request.institution}</h3>
            <span className="text-[12px] font-semibold text-slate-400 block">{request.institutionType}</span>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border shadow-sm ${getStatusColor(request.status)}`}>
          {request.status}
        </span>
      </div>

      <div className="flex-1 space-y-3 mb-6">
        <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100/50">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Requested Credential</p>
          <p className="text-[13px] font-semibold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            {request.credential}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Purpose</p>
            <p className="text-[12px] font-medium text-slate-700 truncate" title={request.purpose}>{request.purpose}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</p>
            <p className="text-[12px] font-medium text-slate-700">{request.requestedDuration}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-auto border-t border-slate-200/50 pt-4">
        <button 
          onClick={() => onReview(request)}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 shadow-md transition-colors text-[12px] font-bold"
        >
          <Eye className="w-3.5 h-3.5" /> Review
        </button>
        <button 
          onClick={() => onApprove(request)}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 shadow-sm transition-colors text-[12px] font-bold"
        >
          <Check className="w-3.5 h-3.5" /> Approve
        </button>
        <button 
          onClick={() => onDeny(request)}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-rose-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 shadow-sm transition-colors text-[12px] font-bold"
        >
          <X className="w-3.5 h-3.5" /> Deny
        </button>
      </div>

    </div>
  );
}
