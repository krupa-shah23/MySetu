import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, RefreshCcw, FileBadge } from 'lucide-react';
import { qrService } from '../../services/qrService';

export default function QRPreviewCard() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCred, setSelectedCred] = useState("Academic Transcript");

  const credentials = ["Academic Transcript", "Degree Certificate", "Employment Letter", "Identity Proof"];

  const generateNewQR = async () => {
    setLoading(true);
    try {
      // Simulate slight delay for the visual loading state
      await new Promise(resolve => setTimeout(resolve, 600)); 
      const rawPayload = await qrService.getQRPayload();
      // Overwrite the requested name merely for demonstration continuity
      rawPayload.credentialName = selectedCred; 
      
      setPayload(rawPayload);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initially load
  useEffect(() => {
    generateNewQR();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 border border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between">
      
      <div>
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-[18px] font-bold text-slate-800 tracking-tight flex items-center gap-2">
             <QrCode className="w-5 h-5 text-indigo-500" /> Verify Device
           </h2>
           <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-indigo-100/50 shadow-sm">
             Presenter Mode
           </span>
        </div>
        
        <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-6">
          Select a credential to generate an animated offline QR representation. Verifiers can scan this code to securely validate your claim cryptographically without internet.
        </p>

        <div className="space-y-2 mb-8">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1 flex items-center gap-1.5">
            <FileBadge className="w-3.5 h-3.5" /> Select Credential
          </label>
          <select 
            value={selectedCred}
            onChange={(e) => setSelectedCred(e.target.value)}
            className="w-full bg-white/70 border border-slate-200/60 rounded-xl px-4 py-3 text-[14px] font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all shadow-sm"
          >
            {credentials.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className={`p-4 bg-white rounded-[2rem] shadow-sm border border-slate-100 relative transition-opacity duration-300 ${loading ? 'opacity-30' : 'opacity-100'}`}>
          {payload ? (
            <QRCodeSVG 
              value={JSON.stringify(payload)}
              size={200}
              bgColor={"#ffffff"}
              fgColor={"#1e293b"}
              level={"M"}
              includeMargin={true}
              imageSettings={{
                src: "/vite.svg", // Generic fallback safe path if needed
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          ) : (
             <div className="w-[200px] h-[200px] flex items-center justify-center bg-slate-50 rounded-[1.5rem]">
               <QrCode className="w-10 h-10 text-slate-300" />
             </div>
          )}
          
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        <button 
          onClick={generateNewQR}
          disabled={loading}
          className="mt-6 flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 text-white hover:bg-slate-700 active:scale-95 transition-all text-[13px] font-semibold shadow-md disabled:opacity-50 disabled:active:scale-100"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> 
          Generate New Proof
        </button>
      </div>

    </div>
  );
}
