import React, { useState } from 'react';
import { Camera, ImageUp, ScanLine, AlertTriangle } from 'lucide-react';
import { qrService } from '../../services/qrService';

export default function QRScannerPanel({ onVerify }) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);

  // Future-proof placeholder for HTML5-QRCode integration
  const simulateScan = async () => {
    setScanning(true);
    setError(null);
    try {
      // Fake scanning delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // We assume a successful read, we post our dummy payload to backend
      const rawPayload = await qrService.getQRPayload();
      const verificationResponse = await qrService.verifyQR(rawPayload);
      
      // Pass the response up to the page
      onVerify(verificationResponse);
    } catch (err) {
      setError("Failed to initialize camera or read QR code.");
    } finally {
      setScanning(false);
    }
  };

  const simulateInvalidScan = async () => {
    setScanning(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Force an invalid response locally
      onVerify({
        signatureValid: false,
        issuerRecognized: false,
        hashMatch: false,
        result: "Tampered",
        credentialName: "Unknown Source",
        issuer: "Unrecognized Entity",
        timestamp: new Date().toISOString()
      });
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 border border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative">
      <div className="flex items-center justify-between mb-6">
         <h2 className="text-[18px] font-bold text-slate-800 tracking-tight flex items-center gap-2">
           <Camera className="w-5 h-5 text-emerald-500" /> Scanner Optics
         </h2>
         <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-emerald-100/50 shadow-sm">
           Verifier Mode
         </span>
      </div>

      {/* Simulated Scanner Viewfinder */}
      <div className="relative w-full aspect-square max-h-[300px] mx-auto bg-slate-900 rounded-[2rem] overflow-hidden shadow-inner border-[6px] border-slate-100 mb-6">
        
        {/* Placeholder UI */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
           {scanning ? (
             <ScanLine className="w-16 h-16 text-emerald-400 mb-4 animate-pulse" />
           ) : (
             <Camera className="w-16 h-16 text-slate-600 mb-4 opacity-50" />
           )}
           <p className="text-[13px] font-semibold text-slate-400">
             {scanning ? "Focusing & reading payload..." : "Position the QR code inside the frame to verify."}
           </p>
           {error && (
             <p className="text-[12px] font-bold text-rose-500 mt-2 flex items-center gap-1 bg-rose-500/10 px-3 py-1 rounded-full">
               <AlertTriangle className="w-3.5 h-3.5" /> {error}
             </p>
           )}
        </div>

        {/* Scanning Animation Line */}
        {scanning && (
          <div className="absolute inset-x-0 top-0 h-1 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,1)] z-20 animate-scan"></div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button 
          onClick={simulateScan}
          disabled={scanning}
          className="flex flex-col items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          <Camera className="w-5 h-5" />
          <span className="text-[12px] font-bold">Simulate Scan</span>
        </button>
        
        <button 
          onClick={simulateInvalidScan}
          disabled={scanning}
          className="flex flex-col items-center justify-center gap-2 py-4 rounded-2xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          <ImageUp className="w-5 h-5" />
          <span className="text-[12px] font-bold">Upload Tampered</span>
        </button>
      </div>

    </div>
  );
}
