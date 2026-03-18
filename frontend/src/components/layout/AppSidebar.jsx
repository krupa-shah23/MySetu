import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Wallet, 
  ShieldCheck, 
  Calendar, 
  Activity,
  Settings,
  LogOut,
  Network,
  QrCode,
  Sparkles,
  Building2
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
  { icon: Network, label: 'Career Graph', path: '/career-graph' },
  { icon: QrCode, label: 'QR Verify', path: '/qr-verify' },
  { icon: Sparkles, label: 'AI Suggestions', path: '/ai-suggestions' },
  { icon: Building2, label: 'Institution', path: '/institution' },
  { icon: Activity, label: 'Activity', path: '/activity' },
];

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      alert("Logged out successfully");
      navigate('/login');
    }
  };

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
                "group relative w-full aspect-square rounded-2xl flex items-center justify-center transition-colors duration-200",
                isActive 
                  ? "bg-white text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.04)]" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
              )}
              aria-label={item.label}
            >
              <Icon className={cn("w-[20px] h-[20px]", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              
              {/* Tooltip */}
              <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 text-white text-[12px] font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl whitespace-nowrap z-[100] flex items-center pointer-events-none">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45" />
                {item.label}
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="w-full px-3 mt-auto">
        <button
          onClick={handleLogout}
          className="group relative w-full aspect-square rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-white/50 transition-colors duration-200"
          aria-label="Logout"
        >
          <LogOut className="w-[20px] h-[20px] stroke-[2px]" />
          
          {/* Tooltip */}
          <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 text-white text-[12px] font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl whitespace-nowrap z-[100] flex items-center pointer-events-none">
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45" />
            Logout
          </div>
        </button>
      </div>

    </aside>
  );
}
