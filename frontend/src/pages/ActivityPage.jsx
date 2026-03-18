import React, { useState, useEffect } from 'react';
import ActivityFilters from '../components/activity/ActivityFilters';
import ActivityLogCard from '../components/activity/ActivityLogCard';
import { activityService } from '../services/activityService';
import { Activity } from 'lucide-react';

export default function ActivityPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await activityService.fetchActivities();
        setActivities(data);
      } catch (error) {
        console.error("Failed to load activity log", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredActivities = activities.filter(act => {
    if (activeFilter === 'All') return true;
    return act.eventType === activeFilter;
  });

  return (
    <div className="animate-in fade-in duration-700 max-w-[1200px] h-full flex flex-col mx-auto px-2 sm:px-0">
      
      {/* Header Block */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-[26px] font-[600] text-slate-800 tracking-tight leading-none mb-2 flex items-center justify-center sm:justify-start gap-2">
          Activity Log <Activity className="w-6 h-6 text-indigo-500" />
        </h1>
        <p className="text-[13px] font-[500] text-slate-500 max-w-xl">
          Monitor all credential actions, access events, approvals, revocations, and verifications.
        </p>
      </div>

      <ActivityFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <div className="pb-12 h-full flex flex-col gap-6 relative min-h-[500px]">
        {loading ? (
           <div className="bg-white/20 backdrop-blur-xl rounded-[2.5rem] border border-white/40 h-64 flex items-center justify-center">
             <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin"></div>
           </div>
        ) : (
           <div className="animate-in slide-in-from-bottom-6 duration-500">
             <ActivityLogCard items={filteredActivities} />
           </div>
        )}
      </div>

    </div>
  );
}
