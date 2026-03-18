import React from 'react';
import { X, ShieldCheck, Share2, QrCode, Calendar, Lock } from 'lucide-react';

export default function CredentialDetailModal({ credential, onClose }) {
  if (!credential) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-[1.2rem] bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shrink-0">
             <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-slate-800 leading-tight">{credential.title}</h2>
            <p className="text-[13px] font-medium text-slate-500">{credential.issuer}</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 mb-8">
           <div className="bg-[#f4f7f9] p-4 rounded-2xl border border-slate-100 shadow-inner flex flex-col gap-3">
              <div className="flex justify-between items-center">
                 <span className="text-[12px] font-semibold text-slate-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Issued</span>
                 <span className="text-[13px] font-bold text-slate-800">{credential.issuedDate}</span>
              </div>
              <div className="w-full h-px bg-slate-200/60" />
              <div className="flex justify-between items-center">
                 <span className="text-[12px] font-semibold text-slate-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Expiry</span>
                 <span className="text-[13px] font-bold text-slate-800">{credential.expiryDate || 'Lifetime'}</span>
              </div>
              <div className="w-full h-px bg-slate-200/60" />
              <div className="flex justify-between items-center">
                 <span className="text-[12px] font-semibold text-slate-500 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Status</span>
                 <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    credential.status === 'Verified' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                    credential.status === 'Expiring Soon' ? "bg-rose-50 text-rose-500 border border-rose-100" :
                    "bg-blue-50 text-blue-600 border border-blue-100"
                 }`}>
                    {credential.status}
                 </span>
              </div>
           </div>
        </div>

        <div className="mb-8 pl-1">
           <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Linked Use Cases</h4>
           <div className="flex flex-wrap gap-2">
              {credential.useCases.map((uc, i) => (
                 <span key={i} className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200/60">
                    {uc}
                 </span>
              ))}
           </div>
        </div>

        <div className="flex items-center gap-3">
           <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-bold transition-colors shadow-[0_2px_15px_-3px_rgba(79,70,229,0.3)]">
             <Share2 className="w-4 h-4" /> Share Access
           </button>
           <button className="w-[52px] h-[52px] flex items-center justify-center rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors border border-slate-200/60 shrink-0">
             <QrCode className="w-5 h-5" />
           </button>
        </div>

      </div>
    </div>
  );
}
