import React from 'react';
import { ShieldCheck, ShieldAlert, FileKey, CheckCircle2, AlertCircle } from 'lucide-react';

export default function VerificationStatusCard({ result }) {
  if (!result) return null;

  const isVerified = result.result === 'Verified';

  const StatusRow = ({ label, isValid }) => (
    <div className="flex items-center justify-between py-2 border-b border-white/40 last:border-0">
      <span className="text-[13px] font-semibold text-slate-500">{label}</span>
      {isValid ? (
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100/50 shadow-sm">
           <CheckCircle2 className="w-3.5 h-3.5" /> Valid
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100/50 shadow-sm">
           <AlertCircle className="w-3.5 h-3.5" /> Invalid
        </span>
      )}
    </div>
  );

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 border border-white/70 shadow-sm animate-in slide-in-from-bottom-6 duration-500 mt-6 relative overflow-hidden">
      
      {/* Background Icon */}
      {isVerified ? (
        <ShieldCheck className="w-32 h-32 absolute -right-6 -bottom-6 text-emerald-100 opacity-30" />
      ) : (
        <ShieldAlert className="w-32 h-32 absolute -right-6 -bottom-6 text-rose-100 opacity-30" />
      )}

      <div className="relative z-10 flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-bold text-slate-800 tracking-tight">Verification Output</h3>
        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold shadow-sm ${
          isVerified ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-rose-600 text-white shadow-rose-200'
        }`}>
          {isVerified ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
          {result.result}
        </span>
      </div>

      <div className="relative z-10 bg-slate-50/50 p-4 rounded-xl border border-slate-100 mb-5">
         <h4 className="text-[14px] font-bold text-slate-800 leading-tight mb-1 flex items-center gap-2">
            <FileKey className="w-4 h-4 text-slate-400" /> {result.credentialName}
         </h4>
         <p className="text-[12px] font-semibold text-slate-500">{result.issuer}</p>
         <p className="text-[10px] font-bold text-slate-400 mt-2">Verified at: {new Date(result.timestamp).toLocaleTimeString()}</p>
      </div>

      <div className="relative z-10 grid gap-1">
         <StatusRow label="Cryptographic Signature" isValid={result.signatureValid} />
         <StatusRow label="Issuer DID Resolution" isValid={result.issuerRecognized} />
         <StatusRow label="Payload Integrity Hash" isValid={result.hashMatch} />
      </div>

    </div>
  );
}
