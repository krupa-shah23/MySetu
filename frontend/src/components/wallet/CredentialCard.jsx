import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  HeartPulse, 
  FileBadge,
  Eye,
  Share2,
  QrCode
} from 'lucide-react';

const domainIcons = {
  Education: GraduationCap,
  Employment: Briefcase,
  Finance: Landmark,
  Healthcare: HeartPulse,
  Identity: FileBadge,
};

export default function CredentialCard({ credential, onView }) {
  const Icon = domainIcons[credential.domain] || FileBadge;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Verified':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100/50';
      case 'Shared':
        return 'bg-blue-50 text-blue-600 border-blue-100/50';
      case 'Expiring Soon':
        return 'bg-amber-50 text-amber-600 border-amber-100/50';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100/50';
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-[1.5rem] p-5 border border-white/70 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col relative group">
      
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-[1rem] bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-slate-600" />
        </div>
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border shadow-sm ${getStatusColor(credential.status)}`}>
          {credential.status}
        </span>
      </div>

      <div className="flex-1 mb-5">
        <h3 className="text-[16px] font-bold text-slate-800 leading-tight mb-1 truncate" title={credential.title}>
          {credential.title}
        </h3>
        <p className="text-[12px] font-semibold text-slate-400 mb-2">{credential.domain}</p>
        
        <div className="space-y-1 mt-3">
          <div className="flex items-center text-[12px]">
            <span className="text-slate-400 w-16">Issuer:</span>
            <span className="text-slate-700 font-medium truncate">{credential.issuer}</span>
          </div>
          <div className="flex items-center text-[12px]">
            <span className="text-slate-400 w-16">Issued:</span>
            <span className="text-slate-700 font-medium">{new Date(credential.issuedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-auto border-t border-slate-200/50 pt-4">
        <button 
          onClick={() => onView(credential)}
          className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-100 shadow-sm transition-colors text-[11px] font-bold"
        >
          <Eye className="w-3.5 h-3.5" /> View
        </button>
        <button className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-100 shadow-sm transition-colors text-[11px] font-bold">
          <Share2 className="w-3.5 h-3.5" /> Share
        </button>
        <button className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-100 shadow-sm transition-colors text-[11px] font-bold">
          <QrCode className="w-3.5 h-3.5" /> QR
        </button>
      </div>

    </div>
  );
}
