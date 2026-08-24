import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function SuperAdminLogin() {
  const [username, setUsername] = useState('superadmin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const SUPERADMIN_USERNAME = 'superadmin';
  const SUPERADMIN_PASSWORD = 'admin123';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === SUPERADMIN_USERNAME && password === SUPERADMIN_PASSWORD) {
      login();
      navigate('/superadmin/dashboard');
    } else {
      setError('Invalid username or password credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950 text-white font-sans overflow-x-hidden relative">
      {/* Ambient Background Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Theme Switcher Floating Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 backdrop-blur-md transition shadow-lg flex items-center gap-2 text-xs font-semibold"
      >
        {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Left Column: Hero Visual & Live Market Feeds */}
      <div className="lg:w-7/12 p-8 lg:p-16 flex flex-col justify-between relative z-10 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 border-r border-slate-800/60">
        <div>
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                NEXTGEN TRADING CRM
              </h1>
              <p className="text-xs text-cyan-400 font-semibold tracking-wider uppercase">Institutional Brokerage Platform</p>
            </div>
          </div>

          {/* Hero Heading */}
          <div className="max-w-xl space-y-4 mb-10">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
              ⚡ Multi-Asset Liquidity & Risk Management
            </span>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight text-white">
              Empowering Global Brokers & Traders.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Institutional grade risk control, automated IB rebate engines, MT4/MT5 server integration, and ultra-fast trader cabinet operations.
            </p>
          </div>

          {/* Live Market Ticker Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>EUR/USD</span>
                <span className="text-emerald-400 font-bold">▲ +0.45%</span>
              </div>
              <p className="text-lg font-mono font-bold text-white">1.08520</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>XAU/USD (Gold)</span>
                <span className="text-emerald-400 font-bold">▲ +1.20%</span>
              </div>
              <p className="text-lg font-mono font-bold text-white">2,642.50</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>BTC/USD</span>
                <span className="text-emerald-400 font-bold">▲ +2.15%</span>
              </div>
              <p className="text-lg font-mono font-bold text-white">94,520.00</p>
            </div>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xl font-black text-white">$142M+</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Daily Volume</p>
          </div>
          <div>
            <p className="text-xl font-black text-emerald-400">12ms</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Execution Speed</p>
          </div>
          <div>
            <p className="text-xl font-black text-purple-400">99.99%</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Server Uptime</p>
          </div>
        </div>
      </div>

      {/* Right Column: Portal Login Form */}
      <div className="lg:w-5/12 p-8 lg:p-12 flex items-center justify-center relative z-10 bg-slate-950">
        <div className="max-w-md w-full space-y-8 bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-2xl shadow-blue-900/20">
          
          {/* Portal Switcher Header Tabs */}
          <div>
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 mb-6">
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md transition"
              >
                Superadmin
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="flex-1 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
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

            <h2 className="text-2xl font-bold text-white tracking-tight">Superadmin Console</h2>
            <p className="text-xs text-slate-400 mt-1">Enter credentials to access master broker management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-3 rounded-xl text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter superadmin username"
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
                  className="w-full px-4 py-3 pr-10 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-blue-600/30 active:scale-[0.98]"
            >
              Sign In to Superadmin Console
            </button>
          </form>

          {/* Quick Demo Credentials Footer */}
          <div className="pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400 mb-3 font-medium">Quick Demo One-Click Portals:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate('/admin')}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-800/40 rounded-lg text-xs font-semibold transition"
              >
                Login as IB Admin
              </button>
              <button
                onClick={() => navigate('/user')}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-800/40 rounded-lg text-xs font-semibold transition"
              >
                Login as Trader
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-mono">Prefilled: superadmin / admin123</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SuperAdminLogin;
