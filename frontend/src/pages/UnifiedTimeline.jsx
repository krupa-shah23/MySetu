import React, { useEffect, useState } from 'react';
import { timelineService } from '../services/timelineService';
import TimelineFilters from '../components/timeline/TimelineFilters';
import TimelineEventCard from '../components/timeline/TimelineEventCard';
import { CalendarDays } from 'lucide-react';

export default function UnifiedTimeline() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const data = await timelineService.getTimeline();
        // Sort descending by date
        const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setEvents(sortedData);
      } catch (error) {
        console.error("Failed to fetch timeline:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  const filteredEvents = events.filter((evt) => {
    if (activeFilter === 'All') return true;
    if (['Education', 'Employment', 'Finance', 'Healthcare'].includes(activeFilter)) {
      return evt.domain === activeFilter;
    }
    if (['Shared', 'Verified'].includes(activeFilter)) {
      return evt.status === activeFilter;
    }
    return true;
  });

  // Group events by Month-Year Example: "August 2025"
  const groupedEvents = filteredEvents.reduce((acc, evt) => {
    const date = new Date(evt.timestamp);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(evt);
    return acc;
  }, {});

  return (
    <div className="animate-in fade-in duration-700 max-w-[1000px] h-full flex flex-col mx-auto">
      
      {/* Header Block */}
      <div className="mb-6 px-2 text-center sm:text-left">
        <h1 className="text-[26px] font-[600] text-slate-800 tracking-tight leading-none mb-2">Unified Life Timeline</h1>
        <p className="text-[13px] font-[500] text-slate-500 max-w-xl">
          Track how your verified credentials are issued, shared, verified, and accessed across domains.
        </p>
      </div>

      <TimelineFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      {/* Main Content Area */}
      <div className="flex-1 bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-10 border border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative min-h-[500px]">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <CalendarDays className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium text-[15px]">No events found for {activeFilter}.</p>
          </div>
        ) : (
          <div className="space-y-8 pl-2 sm:pl-4">
            {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
              <div key={monthYear} className="relative">
                {/* Month Group Label */}
                <div className="sticky top-0 z-20 bg-[#edf2f7]/90 backdrop-blur-md px-4 py-1.5 rounded-xl inline-block text-[12px] font-bold text-slate-600 uppercase tracking-widest shadow-sm border border-slate-200 mb-6">
                  {monthYear}
                </div>
                
                <div className="ml-2 sm:ml-4">
                  {monthEvents.map((evt, idx) => (
                    <TimelineEventCard 
                      key={evt.id} 
                      event={evt} 
                      isLast={idx === monthEvents.length - 1} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
