import React from 'react';
import { History, Clock, CheckCircle2 } from 'lucide-react';

export default function RequestedCredentialTable({ requests }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-emerald-600 bg-emerald-50 border-emerald-100/50';
      case 'Pending': return 'text-amber-600 bg-amber-50 border-amber-100/50';
      case 'Rejected': return 'text-rose-600 bg-rose-50 border-rose-100/50';
      default: return 'text-slate-600 bg-slate-50 border-slate-100/50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <CheckCircle2 className="w-3 h-3" />;
      case 'Pending': return <Clock className="w-3 h-3" />;
      default: return null;
    }
  };

  if (!requests || requests.length === 0) return null;

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-6 border border-white/70 shadow-sm w-full overflow-hidden mt-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[16px] font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <History className="w-4 h-4 text-slate-400" /> Outbound History
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/40">
              <th className="pb-3 px-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest items-center">Institution</th>
              <th className="pb-3 px-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">Credential</th>
              <th className="pb-3 px-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/30">
            {requests.map((req) => (
              <tr key={req.id} className="group hover:bg-white/40 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-slate-800">{req.institution}</span>
                    <span className="text-[11px] font-semibold text-slate-500 max-w-[120px] sm:max-w-xs truncate" title={req.purpose}>{req.purpose}</span>
                    {/* Inline fallback for mobile view */}
                    <span className="text-[11px] font-medium text-slate-400 mt-0.5 sm:hidden">{req.credential}</span>
                  </div>
                </td>
                <td className="py-3 px-2 hidden sm:table-cell">
                  <span className="text-[13px] font-semibold text-slate-600">{req.credential}</span>
                </td>
                <td className="py-3 px-2 text-right sm:text-left">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border shadow-sm ${getStatusColor(req.status)}`}>
                    {getStatusIcon(req.status)}
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
