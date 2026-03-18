import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  ShieldCheck, 
  Calendar, 
  Activity,
  Settings,
  LogOut
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Wallet, label: 'Wallet', path: '/wallet' },
  { icon: ShieldCheck, label: 'Consent', path: '/consent' },
  { icon: Calendar, label: 'Timeline', path: '/timeline' },
  { icon: Activity, label: 'Activity', path: '/activity' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-[72px] py-6 flex flex-col items-center bg-[#edf2f7] z-50 border-r border-[#e2e8f0]/60">
      
      {/* Logo */}
      <div className="w-10 h-10 rounded-xl bg-[#1e293b] flex items-center justify-center shadow-sm mb-10 shrink-0">
        <span className="text-white font-bold text-lg tracking-tighter">M</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 w-full px-3 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "w-full aspect-square rounded-2xl flex items-center justify-center transition-colors duration-200",
                isActive 
                  ? "bg-white text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.04)]" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
              )}
              title={item.label}
            >
              <Icon className={cn("w-[20px] h-[20px]", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="w-full px-3 mt-auto">
        <button
          className="w-full aspect-square rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-white/50 transition-colors duration-200"
          title="Logout"
        >
          <LogOut className="w-[20px] h-[20px] stroke-[2px]" />
        </button>
      </div>

    </aside>
  );
}
