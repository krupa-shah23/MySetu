import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserCircle2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await login('alex@mysetu.demo', 'demo123');
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to login as demo user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#edf2f7] flex items-center justify-center p-4 font-sans selection:bg-slate-200">
      
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 sm:p-12 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Soft decorative blur */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#1e293b] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <span className="text-white font-bold text-3xl tracking-tighter">M</span>
            </div>
            <h1 className="text-2xl font-[700] text-slate-800 tracking-tight mb-2">Welcome Back</h1>
            <p className="text-[14px] text-slate-500 font-medium">Access your secure digital continuity workspace</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-600 border border-rose-100/50 text-sm font-medium text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-[600] text-slate-700 ml-1">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-slate-200/60 rounded-xl text-[14px] font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                placeholder="alex@mysetu.demo"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-[600] text-slate-700 ml-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-slate-200/60 rounded-xl text-[14px] font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-[14px] font-[600] tracking-wide transition-all shadow-md hover:shadow-lg disabled:opacity-70 mt-6"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200/60"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">or</span>
              <div className="flex-grow border-t border-slate-200/60"></div>
            </div>
            
            <button 
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-700 rounded-xl text-[14px] font-[600] tracking-wide transition-all shadow-sm mt-4"
            >
              <UserCircle2 className="w-5 h-5 text-indigo-500" />
              Continue as Demo User
            </button>
          </div>

          <p className="text-center text-[13.5px] font-medium mt-8 text-slate-500">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
