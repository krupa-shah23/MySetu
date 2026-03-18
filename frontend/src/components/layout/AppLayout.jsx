import React from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import TopNavbar from './TopNavbar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#edf2f7] text-slate-700 font-sans selection:bg-slate-200">
      <AppSidebar />
      <div className="pl-[72px] flex flex-col min-h-screen transition-all duration-300">
        <TopNavbar />
        <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
