import React, { useState, useEffect } from 'react';
import { walletService } from '../services/walletService';
import CredentialCard from '../components/wallet/CredentialCard';
import WalletFilters from '../components/wallet/WalletFilters';
import CredentialDetailModal from '../components/wallet/CredentialDetailModal';

export default function CredentialWallet() {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCredential, setSelectedCredential] = useState(null);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const data = await walletService.getCredentials();
        setCredentials(data);
      } catch (error) {
        console.error("Failed to load credentials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCredentials();
  }, []);

  const filteredCredentials = credentials.filter(cred => {
    const matchesFilter = activeFilter === 'All' || cred.domain === activeFilter;
    const matchesSearch = cred.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cred.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 max-w-[1400px]">
      
      {/* Title Block */}
      <div className="mb-10 px-2 lg:w-2/3">
        <h1 className="text-[26px] font-[600] text-slate-800 tracking-tight leading-none mb-2">Credential Wallet</h1>
        <p className="text-[14px] font-[500] text-slate-500 leading-relaxed">Manage your verified credentials across education, employment, finance, and healthcare securely in one place.</p>
      </div>

      {/* Main Workspace Panel */}
      <div className="bg-white/70 backdrop-blur-3xl rounded-[3rem] p-6 sm:p-8 lg:p-10 border border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.03)] min-h-[60vh] relative">
         
         <WalletFilters 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
         />

         {filteredCredentials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-8">
               {filteredCredentials.map(cred => (
                  <CredentialCard 
                     key={cred.id} 
                     credential={cred} 
                     onView={setSelectedCredential}
                  />
               ))}
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
               <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 border border-slate-200/60">
                  <Search className="w-6 h-6" />
               </div>
               <h3 className="text-[16px] font-bold text-slate-700 mb-1">No credentials found</h3>
               <p className="text-[13px] font-medium text-slate-500">Try adjusting your filters or search query.</p>
            </div>
         )}

      </div>

      {/* Detail Modal */}
      {selectedCredential && (
         <CredentialDetailModal 
            credential={selectedCredential} 
            onClose={() => setSelectedCredential(null)} 
         />
      )}

    </div>
  );
}
