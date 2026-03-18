import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#edf2f7] flex items-center justify-center p-4 font-sans selection:bg-slate-200">
      
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 sm:p-12 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Soft decorative blur */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-[700] text-slate-800 tracking-tight mb-2">Create Your MySetu Account</h1>
            <p className="text-[14px] text-slate-500 font-medium">Start managing your credentials, consent, and digital continuity</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-600 border border-rose-100/50 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[13px] font-[600] text-slate-700 ml-1">Full Name</label>
              <input 
                name="name"
                type="text" 
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 border border-slate-200/60 rounded-xl text-[14px] font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                placeholder="Alex Sterling"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-[600] text-slate-700 ml-1">Email Address</label>
              <input 
                name="email"
                type="email" 
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 border border-slate-200/60 rounded-xl text-[14px] font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                placeholder="alex@mysetu.demo"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-[600] text-slate-700 ml-1">Password</label>
              <input 
                name="password"
                type="password" 
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 border border-slate-200/60 rounded-xl text-[14px] font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-[600] text-slate-700 ml-1">Confirm Password</label>
              <input 
                name="confirmPassword"
                type="password" 
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 border border-slate-200/60 rounded-xl text-[14px] font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-[14px] font-[600] tracking-wide transition-all shadow-md hover:shadow-lg disabled:opacity-70 mt-6"
            >
              <UserPlus className="w-4 h-4" />
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-[13.5px] font-medium mt-8 text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
              Log In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
