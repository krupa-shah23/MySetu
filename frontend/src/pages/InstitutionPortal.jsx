import React, { useState, useEffect } from 'react';
import RequestCredentialForm from '../components/institution/RequestCredentialForm';
import RequestedCredentialTable from '../components/institution/RequestedCredentialTable';
import ReceivedCredentialCard from '../components/institution/ReceivedCredentialCard';
import { institutionService } from '../services/institutionService';
import { Building2, Inbox } from 'lucide-react';

export default function InstitutionPortal() {
  const [requests, setRequests] = useState([]);
  const [received, setReceived] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [reqData, rcvData] = await Promise.all([
        institutionService.fetchRequests(),
        institutionService.fetchReceived()
      ]);
      setRequests(reqData);
      setReceived(rcvData);
    } catch (error) {
      console.error("Failed to load institution portal data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSendRequest = async (payload) => {
    try {
      await institutionService.sendRequest(payload);
      // Re-fetch to update table naturally
      await fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRevoke = async (id) => {
    try {
      await institutionService.revokeAccess(id);
      // Remove from list locally for immediate feedback
      setReceived(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 max-w-[1200px] h-full flex flex-col mx-auto">
      
      {/* Header Block */}
      <div className="mb-6 px-2 text-center sm:text-left">
        <h1 className="text-[26px] font-[600] text-slate-800 tracking-tight leading-none mb-2 flex items-center justify-center sm:justify-start gap-2">
          Institution Portal <Building2 className="w-6 h-6 text-indigo-500" />
        </h1>
        <p className="text-[13px] font-[500] text-slate-500 max-w-xl">
          Request, receive, and validate temporary credential access from verified users across the network.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 items-start">
        
        {/* Left Column: Form & Table */}
        <div className="lg:col-span-7 flex flex-col min-w-0">
          <RequestCredentialForm onSubmit={handleSendRequest} />
          
          {loading ? (
             <div className="mt-6 bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-6 h-32 flex items-center justify-center border border-white/60">
                <div className="w-6 h-6 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin"></div>
             </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <RequestedCredentialTable requests={requests} />
            </div>
          )}
        </div>

        {/* Right Column: Received Inbox */}
        <div className="lg:col-span-5 bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-6 lg:p-8 border border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)] min-h-[500px]">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-[16px] font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <Inbox className="w-5 h-5 text-emerald-500" /> Active Payloads
             </h3>
             <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 font-bold text-[10px] rounded-md border border-emerald-100 shadow-sm">
                {received.length} Active
             </span>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-3">
                 <div className="w-8 h-8 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
              </div>
            ) : received.length > 0 ? (
              received.map(record => (
                <ReceivedCredentialCard key={record.id} data={record} onRevoke={handleRevoke} />
              ))
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-slate-400 gap-3 bg-white/30 rounded-[1.5rem] border border-white/50 border-dashed">
                <Inbox className="w-10 h-10 opacity-30" />
                <span className="text-[13px] font-medium">No active credential sessions.</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
