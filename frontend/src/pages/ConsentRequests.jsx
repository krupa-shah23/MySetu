import React, { useEffect, useState } from 'react';
import { consentService } from '../services/consentService';
import ConsentRequestCard from '../components/consent/ConsentRequestCard';
import ConsentDetailsModal from '../components/consent/ConsentDetailsModal';
import { ShieldAlert, X } from 'lucide-react';

export default function ConsentRequests() {
  const [requests, setRequests] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [reqData, sessData] = await Promise.all([
        consentService.getRequests(),
        consentService.getActiveSessions()
      ]);
      setRequests(reqData);
      setActiveSessions(sessData);
    } catch (error) {
      console.error("Failed to load consent data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleApprove = async (id, duration = '1 hour') => {
    await consentService.approveRequest(id, duration);
    setIsModalOpen(false);
    // Optimistic UI update
    setRequests(prev => prev.filter(r => r.id !== id));
    // In a real app we might refetch or add to activeSessions
  };

  const handleDeny = async (id) => {
    await consentService.denyRequest(id);
    setIsModalOpen(false);
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-700 max-w-[1200px] h-full">
      
      {/* LEFT COLUMN: Main Requests */}
      <div className="lg:col-span-8 flex flex-col h-full">
        {/* Header Block */}
        <div className="mb-6 px-2">
          <h1 className="text-[26px] font-[600] text-slate-800 tracking-tight leading-none mb-1.5">Consent Requests</h1>
          <p className="text-[13px] font-[500] text-slate-500">Review and manage temporary access requests from trusted institutions.</p>
        </div>

        {/* Summary Strip */}
        <div className="flex bg-white/40 backdrop-blur-xl rounded-[1.5rem] p-4 border border-white/60 shadow-sm mb-6 gap-6 sm:gap-12">
          <div className="flex flex-col">
            <span className="text-[24px] font-bold text-slate-800 leading-none mb-1">{requests.length}</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pending</span>
          </div>
          <div className="w-[1px] bg-slate-200/60" />
          <div className="flex flex-col">
             <span className="text-[24px] font-bold text-slate-800 leading-none mb-1">2</span>
             <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Approved Today</span>
          </div>
          <div className="w-[1px] bg-slate-200/60" />
          <div className="flex flex-col">
             <span className="text-[24px] font-bold text-rose-500 leading-none mb-1">0</span>
             <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Expiring Soon</span>
          </div>
        </div>

        {/* List of Requests */}
        <div className="flex-1 space-y-4">
          {loading ? (
             <div className="flex justify-center items-center h-32">
               <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
             </div>
          ) : requests.length === 0 ? (
             <div className="flex flex-col items-center justify-center p-8 bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/60">
               <ShieldAlert className="w-12 h-12 text-slate-300 mb-3" />
               <p className="text-slate-500 font-medium text-[14px]">No pending requests.</p>
             </div>
          ) : (
             requests.map(req => (
               <ConsentRequestCard 
                 key={req.id} 
                 request={req} 
                 onReview={handleReview}
                 onApprove={(r) => handleApprove(r.id, r.requestedDuration)}
                 onDeny={(r) => handleDeny(r.id)}
               />
             ))
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Active Sessions */}
      <div className="lg:col-span-4 h-fit sticky top-6">
         <div className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-7 border border-white shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative">
            <h3 className="text-[16px] font-semibold text-slate-800 mb-6 tracking-tight">Active Access Sessions</h3>
            
            <div className="flex flex-col gap-4">
              {activeSessions.length === 0 && !loading && (
                 <p className="text-[13px] text-slate-500 font-medium">No active shares currently.</p>
              )}
              {activeSessions.map(session => (
                 <div key={session.id} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 shadow-sm relative group transition-all hover:bg-white hover:shadow-md">
                   <button className="absolute top-3 right-3 text-slate-400 w-7 h-7 flex items-center justify-center bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity border border-slate-100 shadow-sm hover:text-rose-500" title="Revoke">
                     <X className="w-3.5 h-3.5" />
                   </button>
                   <p className="text-[14px] font-bold text-slate-800 mb-1 leading-tight pr-6">{session.institution}</p>
                   <p className="text-[12px] font-semibold text-slate-500 mb-3">{session.credential}</p>
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                     <span className="text-[11px] font-bold text-slate-600">{session.remainingTime} left</span>
                   </div>
                 </div>
              ))}
            </div>
         </div>
      </div>

      <ConsentDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        request={selectedRequest}
        onApprove={handleApprove}
        onDeny={handleDeny}
      />
    </div>
  );
}
