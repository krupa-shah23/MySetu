import React from 'react';
import { ShieldCheck, Share2, QrCode, Book, Briefcase, Landmark, HeartPulse, GraduationCap, FileText, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const domainIcons = {
  Education: GraduationCap,
  Employment: Briefcase,
  Finance: Landmark,
  Healthcare: HeartPulse,
  Government: Book,
  default: FileText
};

export default function CredentialCard({ credential, onView }) {
  const Icon = domainIcons[credential.domain] || domainIcons.default;

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-5 border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:bg-white transition-all cursor-pointer group flex flex-col justify-between min-h-[160px]">
      
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[1rem] bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-slate-800 leading-tight mb-0.5">{credential.title}</h4>
            <p className="text-[12px] font-medium text-slate-500">{credential.issuer}</p>
          </div>
        </div>
        <div className={cn(
          "px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide border",
          credential.status === 'Verified' ? "bg-emerald-50 text-emerald-600 border-emerald-100/50" : 
          credential.status === 'Shared' ? "bg-blue-50 text-blue-600 border-blue-100/50" :
          "bg-rose-50 text-rose-500 border-rose-100/50"
        )}>
          {credential.status}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
         <span className="text-[11px] font-semibold text-slate-400 capitalize tracking-wider">{credential.domain}</span>
         
         <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-8 h-8 rounded-full bg-slate-50 hover:bg-indigo-50 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors">
               <QrCode className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full bg-slate-50 hover:bg-indigo-50 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors">
               <Share2 className="w-4 h-4" />
            </button>
            <button 
               onClick={() => onView(credential)}
               className="flex items-center gap-1 pl-3 pr-2 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-[12px] font-bold transition-colors ml-1"
            >
               View <ChevronRight className="w-3.5 h-3.5" />
            </button>
         </div>
      </div>
    </div>
  );
}
