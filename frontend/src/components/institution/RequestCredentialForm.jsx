import React, { useState } from 'react';
import { Send, Building, User, FileBadge, Clock, Briefcase } from 'lucide-react';

export default function RequestCredentialForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    institution: '',
    type: 'Bank',
    userDid: '',
    credentialType: 'Identity Proof',
    purpose: '',
    duration: '24 hours'
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    // Reset basic fields
    setFormData(prev => ({ ...prev, userDid: '', purpose: '' }));
  };

  const inputClass = "w-full bg-white/70 border border-slate-200/60 rounded-xl px-4 py-3 sm:py-2.5 text-[13px] font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all shadow-sm";
  const labelClass = "text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1.5 flex items-center gap-1.5";

  return (
    <div className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 border border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative z-10 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Send className="w-5 h-5 text-indigo-500" /> Request Access
        </h2>
      </div>

      <form onSubmit={handleSend} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}><Building className="w-3.5 h-3.5"/> Institution Name</label>
            <input required type="text" placeholder="e.g. HDFC Bank" className={inputClass}
                   value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} />
          </div>
          <div>
            <label className={labelClass}><Briefcase className="w-3.5 h-3.5"/> Type</label>
            <select className={inputClass} value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option>Bank</option>
              <option>Employer</option>
              <option>Hospital</option>
              <option>University</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}><User className="w-3.5 h-3.5"/> Target User DID</label>
          <input required type="text" placeholder="did:key:z6Mkha..." className={inputClass}
                 value={formData.userDid} onChange={e => setFormData({...formData, userDid: e.target.value})} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}><FileBadge className="w-3.5 h-3.5"/> Credential Required</label>
            <select className={inputClass} value={formData.credentialType} onChange={e => setFormData({...formData, credentialType: e.target.value})}>
              <option>Identity Proof</option>
              <option>Salary Slip</option>
              <option>Employment Letter</option>
              <option>Degree Certificate</option>
              <option>Medical History</option>
            </select>
          </div>
          <div>
            <label className={labelClass}><Clock className="w-3.5 h-3.5"/> Duration</label>
            <select className={inputClass} value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})}>
              <option>10 mins</option>
              <option>1 hour</option>
              <option>24 hours</option>
            </select>
          </div>
        </div>

        <div className="pb-2">
          <label className={labelClass}>Purpose</label>
          <input required type="text" placeholder="e.g. KYC Verification for Loan" className={inputClass}
                 value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} />
        </div>

        <div className="pt-2">
          <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 rounded-2xl bg-slate-800 text-white hover:bg-slate-700 active:scale-95 transition-all text-[13px] font-semibold shadow-md">
            <Send className="w-4 h-4" /> Send DID Request
          </button>
        </div>
      </form>
    </div>
  );
}
