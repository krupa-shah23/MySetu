import React, { useEffect, useState } from 'react';
import { ShieldCheck, Calendar as CalendarIcon, Wallet, Lock, History, ChevronRight, User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { dashboardData } from '../utils/mockData';
import SuggestedCredentialsCard from '../components/dashboard/SuggestedCredentialsCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import { dashboardService } from '../services/dashboardService';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dashboardService.getDashboardSummary();
        setData(result);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const profile = data.profile;
  const navItems = [
    { label: 'Profile', icon: User, count: null },
    { label: 'Verified Credentials', icon: Wallet, count: data.stats.totalCredentials },
    { label: 'Active Shares', icon: ShieldCheck, count: data.stats.activeShares },
    { label: 'Recent Events', icon: History, count: data.recentActivity.length }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-700 max-w-[1200px]">
      
      {/* LEFT COLUMN: 58% (approx 7 cols) */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        
        {/* Title Block */}
        <div className="px-2">
          <h1 className="text-[26px] font-[600] text-slate-800 tracking-tight leading-none mb-1.5">Digital Continuity</h1>
          <p className="text-[13px] font-[500] text-slate-500">Manage credentials, consent, and lifecycle events.</p>
        </div>

        {/* Vertical Mini Navigation Card */}
        <div className="bg-white/40 backdrop-blur-xl rounded-[1.5rem] p-2 border border-white/60 shadow-sm">
          <div className="flex flex-col gap-0.5">
            {navItems.map((item, idx) => (
              <button key={idx} className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/60 text-slate-600 hover:text-slate-800 transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  <span className="text-[13px] font-medium">{item.label}</span>
                </div>
                {item.count !== null && (
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Identity Card */}
        <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-5 sm:p-6 border border-white/70 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between mb-5 relative z-10">
            <div className="w-12 h-12 rounded-[1rem] bg-white border border-slate-100 shadow-sm overflow-hidden p-[2px]">
               <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt={profile.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/60 backdrop-blur-md shadow-sm border border-white/80 text-[11px] font-bold text-slate-600">
               <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
               <span className="text-emerald-600">{profile.trustScore}</span> Trust
            </div>
          </div>
          <div className="relative z-10">
            <h2 className="text-[20px] font-semibold text-slate-800 tracking-tight leading-tight mb-1">{profile.name}</h2>
            <p className="text-[13px] font-medium text-slate-500 mb-4">{profile.role}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/50 text-slate-500 text-[11px] font-mono border border-slate-200/50 shadow-sm">
              <Lock className="w-3 h-3" />
              {profile.did}
            </div>
          </div>
        </div>

        {/* Upcoming Soft Card */}
        <div className="bg-[#e2e8f0]/40 rounded-[1.5rem] p-5 border border-slate-200/50">
           <div className="flex items-center justify-between mb-2">
             <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
               <CalendarIcon className="w-3.5 h-3.5" /> Upcoming
             </h4>
           </div>
           <p className="text-[13px] text-slate-500 leading-relaxed font-medium">No expiring credentials or forced revocations in the next 14 days. Workspace is clear.</p>
        </div>

      </div>


      {/* RIGHT COLUMN: 42% (approx 5 cols) */}
      <div className="lg:col-span-5 h-fit">
        <div className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-7 border border-white shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative">
           
           <h3 className="text-[16px] font-semibold text-slate-800 mb-6 tracking-tight">Workspace</h3>

           <div className="flex flex-col gap-6 relative">
              
              {/* Vertical connecting line for the planner feel */}
              <div className="absolute left-[5px] top-6 bottom-4 w-[1.5px] bg-[#edf2f7] -z-10" />

              {/* Action Required (Consent) */}
              <div className="relative bg-white/50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                 <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Action Required</h4>
                    <span className="px-2 py-0.5 rounded-md bg-rose-50 border border-rose-100/50 text-rose-500 text-[10px] font-bold">{data.stats.pendingRequests} New</span>
                 </div>
                 <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all group cursor-pointer">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                             <span className="text-slate-500 font-bold text-[11px]">AX</span>
                          </div>
                          <div>
                             <h5 className="text-[13px] font-semibold text-slate-800 leading-tight">Axis Bank</h5>
                             <p className="text-[11px] font-medium text-slate-500 mt-0.5">Needs: Academic Transcript</p>
                          </div>
                       </div>
                       <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-slate-800 transition-colors">
                          <ChevronRight className="w-3.5 h-3.5" />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Suggestions Planner Style */}
              <div className="relative pl-3">
                 <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-3">Suggestions</h4>
                 <SuggestedCredentialsCard suggestions={data.suggestedCredentials} />
              </div>

              {/* Timeline Planner Style */}
              <div className="relative pl-3">
                 <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-3">Timeline</h4>
                 <RecentActivityCard activities={data.recentActivity} />
              </div>

           </div>

        </div>
      </div>

    </div>
  );
}
