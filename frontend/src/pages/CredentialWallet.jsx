import React, { useEffect, useState } from 'react';
import { walletService } from '../services/walletService';
import CredentialCard from '../components/wallet/CredentialCard';
import WalletFilters from '../components/wallet/WalletFilters';
import CredentialDetailModal from '../components/wallet/CredentialDetailModal';

export default function CredentialWallet() {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const data = await walletService.getCredentials();
        setCredentials(data);
      } catch (error) {
        console.error("Failed to fetch credentials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCredentials();
  }, []);

  const handleView = (credential) => {
    setSelectedCredential(credential);
    setIsModalOpen(true);
  };

  const filteredCredentials = credentials.filter((cred) => {
    const matchesSearch = cred.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cred.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || cred.domain === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="animate-in fade-in duration-700 max-w-[1200px] h-full flex flex-col">
      {/* Header Block */}
      <div className="mb-8 px-2">
        <h1 className="text-[26px] font-[600] text-slate-800 tracking-tight leading-none mb-1.5">Credential Wallet</h1>
        <p className="text-[13px] font-[500] text-slate-500">Manage verified credentials across education, employment, finance, and healthcare.</p>
      </div>

      <WalletFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
          </div>
        ) : filteredCredentials.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/60">
            <p className="text-slate-500 font-medium">No credentials found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCredentials.map((cred) => (
              <CredentialCard key={cred.id} credential={cred} onView={handleView} />
            ))}
          </div>
        )}
      </div>

      <CredentialDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        credential={selectedCredential} 
      />
    </div>
  );
}
