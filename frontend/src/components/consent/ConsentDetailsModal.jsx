import React, { useState } from 'react';
import { X, Check, EyeOff, ShieldCheck, Clock } from 'lucide-react';
import DurationSelector from './DurationSelector';

export default function ConsentDetailsModal({ isOpen, onClose, request, onApprove, onDeny }) {
  const [selectedDuration, setSelectedDuration] = useState(request?.requestedDuration || '1 hour');
  
  if (!isOpen || !request) return null;

  const durationOptions = ['10 mins', '1 hour', '24 hours', 'Custom'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white/95 backdrop-blur-3xl rounded-[2rem] w-full max-w-lg shadow-2xl border border-white p-6 sm:p-8 transform transition-all animate-in fade-in zoom-in-95 duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100/50 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col mb-6">
          <h2 className="text-[22px] font-bold text-slate-800 leading-tight pr-8">{request.institution}</h2>
          <span className="text-[13px] font-medium text-slate-500 mt-1">is requesting temporary access</span>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-start gap-4 mb-4">
               <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                 <ShieldCheck className="w-5 h-5 text-blue-500" />
               </div>
               <div>
                 <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Requested Credential</p>
                 <p className="text-[15px] font-bold text-slate-800">{request.credential}</p>
                 <p className="text-[12px] text-slate-500 mt-1">Purpose: {request.purpose}</p>
               </div>
            </div>
            
            <div className="border-t border-slate-200/60 pt-4 mt-4">
               <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                 <Clock className="w-3.5 h-3.5" /> Update Access Duration
               </p>
               <DurationSelector 
                 options={durationOptions} 
                 selected={selectedDuration} 
                 onChange={setSelectedDuration} 
               />
               <p className="text-[11px] text-slate-400 mt-2 font-medium">Access will be automatically revoked after this period.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onApprove(request.id, selectedDuration)}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20 transition-all text-[13px] font-bold"
          >
            <Check className="w-4 h-4 text-emerald-100" /> Approve Access
          </button>
          <button 
            onClick={() => onDeny(request.id)}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white text-rose-500 hover:bg-rose-50 border border-slate-200 shadow-sm transition-colors text-[13px] font-bold"
          >
            <EyeOff className="w-4 h-4" /> Deny Request
          </button>
        </div>
        
      </div>
    </div>
  );
}
