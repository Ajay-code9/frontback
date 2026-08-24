import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useTheme } from '../context/ThemeContext';

function AdminLogin() {
  const { login } = useAdminAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin1');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Initialize sample IB admins if none exist
  useEffect(() => {
    const existingAdmins = JSON.parse(localStorage.getItem('admins') || '[]');
    if (existingAdmins.length === 0 || !existingAdmins[0].ibCode) {
      const sampleIBs = [
        { 
          id: '1', 
          userId: 'admin1', 
          ibCode: 'IB-1042',
          name: 'Apex Capital Partners (IB)', 
          email: 'admin1@example.com', 
          password: 'password123', 
          status: 'Active', 
          rebateRate: 5.00, 
          clientsCount: 14,
          totalLotsTraded: 420.5,
          earnedRebates: 2102.50,
          walletBalance: 1450.00,
          createdAt: new Date().toISOString() 
        },
        { 
          id: '2', 
          userId: 'admin2', 
          ibCode: 'IB-2088',
          name: 'Titan Trading Network (IB)', 
          email: 'admin2@example.com', 
          password: 'password123', 
          status: 'Active', 
          rebateRate: 7.00, 
          clientsCount: 8,
          totalLotsTraded: 195.0,
          earnedRebates: 1365.00,
          walletBalance: 920.00,
          createdAt: new Date().toISOString() 
        }
      ];
      localStorage.setItem('admins', JSON.stringify(sampleIBs));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    const admin = admins.find(
      a => (a.userId === username || a.email === username) && a.password === password
    );

    if (admin) {
      login(admin);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid IB username or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950 text-white font-sans overflow-x-hidden relative">
      {/* Ambient Background Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Theme Switcher Floating Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 backdrop-blur-md transition shadow-lg flex items-center gap-2 text-xs font-semibold"
      >
        {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Left Column: Hero Visual & IB Commission Highlights */}
      <div className="lg:w-7/12 p-8 lg:p-16 flex flex-col justify-between relative z-10 bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 border-r border-slate-800/60">
        <div>
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-200 to-slate-300 bg-clip-text text-transparent">
                IB PARTNER PORTAL
              </h1>
              <p className="text-xs text-purple-400 font-semibold tracking-wider uppercase">Introducing Broker Ecosystem</p>
            </div>
          </div>

          {/* Hero Heading */}
          <div className="max-w-xl space-y-4 mb-10">
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider">
              🤝 High Yield Volume Rebates ($7.00/Lot)
            </span>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight text-white">
              Expand Your Trading Network.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Track referred traders in real-time, view lot volume performance, request instant rebate payouts, and access promotional marketing packs.
            </p>
          </div>

          {/* IB Performance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <p className="text-xs text-slate-400 mb-1">Max Rebate Rate</p>
              <p className="text-lg font-bold text-emerald-400">$7.00 / Lot</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <p className="text-xs text-slate-400 mb-1">Payout Processing</p>
              <p className="text-lg font-bold text-purple-400">Instant USDT</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <p className="text-xs text-slate-400 mb-1">Active Partners</p>
              <p className="text-lg font-bold text-white">1,450+ IBs</p>
            </div>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xl font-black text-white">$2.4M+</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Rebates Paid</p>
          </div>
          <div>
            <p className="text-xl font-black text-purple-400">Tier-3</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Sub-IB Hierarchy</p>
          </div>
          <div>
            <p className="text-xl font-black text-emerald-400">24/7</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Partner Support</p>
          </div>
        </div>
      </div>

      {/* Right Column: IB Login Form */}
      <div className="lg:w-5/12 p-8 lg:p-12 flex items-center justify-center relative z-10 bg-slate-950">
        <div className="max-w-md w-full space-y-8 bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-2xl shadow-purple-900/20">
          
          {/* Portal Switcher Header Tabs */}
          <div>
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 mb-6">
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                Superadmin
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="flex-1 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md transition"
              >
                IB Partner
              </button>
              <button
                onClick={() => navigate('/user')}
                className="flex-1 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                Trader
              </button>
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight">IB Partner Login</h2>
            <p className="text-xs text-slate-400 mt-1">Access your IB rebate dashboard and referred traders</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-3 rounded-xl text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                IB Username / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                  placeholder="Enter IB username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-purple-600/30 active:scale-[0.98]"
            >
              Sign In to IB Console
            </button>
          </form>

          {/* Quick Demo Credentials Footer */}
          <div className="pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400 mb-3 font-medium">Quick Demo One-Click Portals:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate('/')}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-gray-300 border border-gray-700 rounded-lg text-xs font-semibold transition"
              >
                Login as Superadmin
              </button>
              <button
                onClick={() => navigate('/user')}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-800/40 rounded-lg text-xs font-semibold transition"
              >
                Login as Trader
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-mono">Prefilled: admin1 / password123</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
