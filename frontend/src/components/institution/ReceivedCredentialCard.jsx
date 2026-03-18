import React, { useState } from 'react';
import { Eye, ShieldAlert, BadgeCheck, Timer, Building, FileKey } from 'lucide-react';

export default function ReceivedCredentialCard({ data, onRevoke }) {
  const [revoking, setRevoking] = useState(false);

  if (!data) return null;

  const handleRevoke = async () => {
    setRevoking(true);
    if (onRevoke) await onRevoke(data.id);
    setRevoking(false);
  };

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-5 sm:p-6 border border-white/70 shadow-sm transition-all duration-300 relative overflow-hidden group hover:shadow-md mb-4 last:mb-0">
      
      {/* Background Icon Watermark */}
      <BadgeCheck className="w-24 h-24 absolute -right-6 -bottom-6 text-emerald-100 opacity-20 pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 relative z-10">
        <div className="flex-1 min-w-0">
           <div className="flex items-center gap-2 mb-2">
             <h3 className="text-[16px] font-bold text-slate-800 leading-tight truncate">{data.credentialName}</h3>
             <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] uppercase font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/50 shadow-sm shrink-0">
               <BadgeCheck className="w-3 h-3" /> {data.verificationStatus}
             </span>
           </div>
           
           <div className="space-y-1.5 mt-3">
             <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-500 truncate">
               <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
               Institution: {data.institution}
             </div>
             <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-slate-400 truncate">
               <FileKey className="w-3.5 h-3.5 shrink-0" />
               DID: {data.userDid}
             </div>
           </div>
        </div>
        
        <div className="flex flex-col items-end gap-2 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-widest font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-sm mb-2 w-full justify-center sm:w-auto">
            <Timer className="w-3.5 h-3.5" />
            {data.remainingTime} Left
          </span>
          
          <div className="flex w-full sm:w-auto gap-2">
            <button className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 active:scale-95 transition-all text-[12px] font-bold shadow-sm">
              <Eye className="w-3.5 h-3.5" /> View
            </button>
            <button 
              onClick={handleRevoke}
              disabled={revoking}
              className="flex justify-center items-center gap-2 px-3 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/50 active:scale-95 transition-all text-[12px] font-bold shadow-sm disabled:opacity-50 disabled:active:scale-100"
              title="Revoke Token"
            >
              <ShieldAlert className={`w-4 h-4 ${revoking ? 'animate-pulse' : ''}`} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
