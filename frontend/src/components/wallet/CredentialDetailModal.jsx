import React from 'react';
import { X, Share2, QrCode, FileBadge } from 'lucide-react';

export default function CredentialDetailModal({ isOpen, onClose, credential }) {
  if (!isOpen || !credential) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white/90 backdrop-blur-3xl rounded-[2rem] w-full max-w-lg shadow-2xl border border-white p-6 sm:p-8 transform transition-all animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100/50 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-[1.2rem] bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
            <FileBadge className="w-7 h-7 text-slate-600" />
          </div>
          <div>
            <h2 className="text-[22px] font-bold text-slate-800 leading-tight mb-1 pr-8">{credential.title}</h2>
            <span className="inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/50 shadow-sm">
              {credential.status}
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Issuer</p>
                <p className="text-[14px] font-semibold text-slate-800">{credential.issuer}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Domain</p>
                <p className="text-[14px] font-semibold text-slate-800">{credential.domain}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Issued Date</p>
                <p className="text-[14px] font-semibold text-slate-800">
                  {new Date(credential.issuedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Expiry Date</p>
                <p className="text-[14px] font-semibold text-slate-800">
                  {credential.expiryDate ? new Date(credential.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Never'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-800 text-white hover:bg-slate-700 shadow-md transition-colors text-[13px] font-semibold">
            <Share2 className="w-4 h-4" /> Share Credential
          </button>
          <button className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm transition-colors text-[13px] font-semibold">
            <QrCode className="w-4 h-4" /> Generate QR
          </button>
        </div>
        
      </div>
    </div>
  );
}
