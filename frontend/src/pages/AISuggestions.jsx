import React, { useState, useEffect } from 'react';
import ContextSelector from '../components/ai/ContextSelector';
import SuggestionCard from '../components/ai/SuggestionCard';
import ReadinessMeter from '../components/ai/ReadinessMeter';
import { aiService } from '../services/aiService';
import { Sparkles } from 'lucide-react';

export default function AISuggestions() {
  const [activeContext, setActiveContext] = useState('Home Loan');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responseData = await aiService.getSuggestions(activeContext);
        setData(responseData);
      } catch (error) {
        console.error("Failed to load AI suggestions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeContext]);

  return (
    <div className="animate-in fade-in duration-700 max-w-[1200px] h-full flex flex-col mx-auto">
      
      {/* Header Block */}
      <div className="mb-6 px-2 text-center sm:text-left">
        <h1 className="text-[26px] font-[600] text-slate-800 tracking-tight leading-none mb-2 flex items-center justify-center sm:justify-start gap-2">
          AI Credential Suggestions <Sparkles className="w-6 h-6 text-indigo-500" />
        </h1>
        <p className="text-[13px] font-[500] text-slate-500 max-w-xl">
          Get context-aware logic and priority-based recommendations for which verified credentials to share next.
        </p>
      </div>

      <ContextSelector activeContext={activeContext} setActiveContext={setActiveContext} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        
        {/* Left Column: Suggestion List */}
        <div className="lg:col-span-8 space-y-4 relative min-h-[400px]">
          {loading ? (
             <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-xl rounded-[2.5rem] border border-white/40">
               <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin"></div>
             </div>
          ) : (
            data?.items?.map((item) => (
              <SuggestionCard key={item.id} item={item} />
            ))
          )}
        </div>

        {/* Right Column: Readiness Meter */}
        <div className="lg:col-span-4 relative">
           <div className="sticky top-6">
             {loading ? (
               <div className="h-[400px] flex items-center justify-center bg-white/20 backdrop-blur-xl rounded-[2.5rem] border border-white/40">
                  <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-400 rounded-full animate-spin"></div>
               </div>
             ) : (
               <ReadinessMeter data={data} />
             )}
           </div>
        </div>

      </div>

    </div>
  );
}
