import React from 'react';
import { Target, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ReadinessMeter({ data }) {
  if (!data) return null;

  const { readinessScore, availableCount, missingCount, summary } = data;

  // Determine color theme based on score
  const getScoreTheme = () => {
    if (readinessScore >= 80) return 'text-emerald-500 stroke-emerald-500';
    if (readinessScore >= 50) return 'text-amber-500 stroke-amber-500';
    return 'text-rose-500 stroke-rose-500';
  };

  const getScoreBg = () => {
    if (readinessScore >= 80) return 'bg-emerald-50';
    if (readinessScore >= 50) return 'bg-amber-50';
    return 'bg-rose-50';
  };

  const strokeDashoffset = 283 - (283 * readinessScore) / 100;

  return (
    <div className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-7 border border-white shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
      
      <div className="w-full flex items-center justify-between mb-8">
         <h3 className="text-[16px] font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-500" /> Bundle Readiness
         </h3>
      </div>

      {/* Circular Progress Indicator */}
      <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-slate-100"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            className={`${getScoreTheme()} transition-all duration-1000 ease-in-out`}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
           <span className={`text-[36px] font-black tracking-tighter leading-none ${getScoreTheme().split(' ')[0]}`}>
             {readinessScore}
           </span>
           <span className="text-[12px] font-bold text-slate-400 mt-1">/ 100</span>
        </div>
      </div>

      {/* Stats Breakdown */}
      <div className="w-full grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
           <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
           <span className="text-[20px] font-bold text-slate-800 leading-none mb-1">{availableCount}</span>
           <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Available</span>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
           <AlertCircle className="w-5 h-5 text-rose-500 mb-2" />
           <span className="text-[20px] font-bold text-slate-800 leading-none mb-1">{missingCount}</span>
           <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Missing</span>
        </div>
      </div>

      {/* Summary Box */}
      <div className={`w-full p-4 rounded-2xl border ${getScoreBg()} border-white/50 relative overflow-hidden`}>
         <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10"></div>
         <p className="text-[13px] font-semibold text-slate-700 leading-relaxed relative z-10 text-center">
           {summary}
         </p>
      </div>

    </div>
  );
}
