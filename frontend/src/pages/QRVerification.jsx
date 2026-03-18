import React, { useState } from 'react';
import QRPreviewCard from '../components/qr/QRPreviewCard';
import QRScannerPanel from '../components/qr/QRScannerPanel';
import VerificationStatusCard from '../components/qr/VerificationStatusCard';

export default function QRVerification() {
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerify = (result) => {
    setVerificationResult(result);
  };

  return (
    <div className="animate-in fade-in duration-700 max-w-[1200px] h-full flex flex-col mx-auto">
      
      {/* Header Block */}
      <div className="mb-6 px-2 text-center sm:text-left">
        <h1 className="text-[26px] font-[600] text-slate-800 tracking-tight leading-none mb-2">Offline QR Verification</h1>
        <p className="text-[13px] font-[500] text-slate-500 max-w-xl">
          Generate and validate signed credential proofs even when connectivity is limited. Built for zero-trust environments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        {/* Left Column: Generator */}
        <div className="h-full min-h-[500px]">
          <QRPreviewCard />
        </div>

        {/* Right Column: Verifier & Status */}
        <div className="flex flex-col">
          <QRScannerPanel onVerify={handleVerify} />
          <VerificationStatusCard result={verificationResult} />
        </div>
      </div>

    </div>
  );
}
