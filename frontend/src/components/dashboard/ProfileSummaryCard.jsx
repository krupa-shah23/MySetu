import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function ProfileSummaryCard({ profile }) {
  if (!profile) return null;

  return (
    <div className="p-6 sm:p-8 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg relative overflow-hidden h-full flex flex-col justify-between group">
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-900/20 rounded-full blur-[40px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div className="w-16 h-16 rounded-[1.25rem] bg-white/20 backdrop-blur-md border border-white/30 p-1 shadow-inner">
             <div className="w-full h-full bg-slate-900 rounded-xl overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt={profile.name} className="w-full h-full object-cover opacity-90" />
             </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold shadow-sm">
               <ShieldCheck className="w-4 h-4 text-emerald-300" />
               Trust Score: {profile.trustScore}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-[800] tracking-tight mb-1">{profile.name}</h2>
          <p className="text-indigo-100 font-medium text-sm mb-4">{profile.role}</p>
          <div className="inline-block px-3 py-1.5 rounded-lg bg-black/20 text-indigo-100 text-[11px] font-mono tracking-wider border border-white/10">
            {profile.did}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 pt-6 border-t border-white/20">
        <button className="flex items-center justify-between w-full text-sm font-bold text-white group/btn">
          View Full Identity Profile
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover/btn:translate-x-1">
             <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

    </div>
  );
}
