import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { useTheme } from '../context/ThemeContext';

function UserLogin() {
  const { login } = useUserAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('mike@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Initialize traders if they don't exist
  React.useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.length === 0 || !existingUsers[0].tradingAccounts) {
      const sampleTraders = [
        { 
          id: '1', 
          name: 'Mike Johnson', 
          email: 'mike@example.com', 
          password: 'password123', 
          country: 'Canada', 
          kycStatus: 'Verified',
          walletBalance: 4500.00,
          equity: 15820.50,
          totalPnl: +2840.25,
          winRate: '68.5%',
          ibCode: 'IB-1042',
          tradingAccounts: [
            { id: 'acc-1', accountNo: '8841920', platform: 'MT5', type: 'Real', leverage: '1:500', balance: 10000.00, server: 'Broker-Live-01', currency: 'USD' },
            { id: 'acc-2', accountNo: '1092831', platform: 'MT4', type: 'Demo', leverage: '1:100', balance: 4500.00, server: 'Broker-Demo-01', currency: 'USD' }
          ],
          createdAt: new Date().toISOString() 
        },
        { 
          id: '2', 
          name: 'John Doe', 
          email: 'john@example.com', 
          password: 'password123', 
          country: 'United States', 
          kycStatus: 'Verified',
          walletBalance: 2150.00,
          equity: 8200.00,
          totalPnl: +1240.00,
          winRate: '62.0%',
          ibCode: 'IB-1042',
          tradingAccounts: [
            { id: 'acc-3', accountNo: '7721049', platform: 'MT5', type: 'Real', leverage: '1:200', balance: 6050.00, server: 'Broker-Live-01', currency: 'USD' }
          ],
          createdAt: new Date().toISOString() 
        }
      ];
      localStorage.setItem('users', JSON.stringify(sampleTraders));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    
    const user = users.find(
      u => (u.email || '').toLowerCase().trim() === trimmedEmail && (u.password || '').trim() === trimmedPassword
    );

    if (user) {
      login(user);
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950 text-white font-sans overflow-x-hidden relative">
      {/* Ambient Background Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Theme Switcher Floating Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 backdrop-blur-md transition shadow-lg flex items-center gap-2 text-xs font-semibold"
      >
        {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Left Column: Hero Visual & Trader Features */}
      <div className="lg:w-7/12 p-8 lg:p-16 flex flex-col justify-between relative z-10 bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950 border-r border-slate-800/60">
        <div>
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-slate-300 bg-clip-text text-transparent">
                TRADER CLIENT CABINET
              </h1>
              <p className="text-xs text-blue-400 font-semibold tracking-wider uppercase">MetaTrader 4/5 Trading Portal</p>
            </div>
          </div>

          {/* Hero Heading */}
          <div className="max-w-xl space-y-4 mb-10">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              ⚡ Ultra-Low Spreads & 1-Click Copy Trading
            </span>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight text-white">
              Trade Global Markets with Confidence.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Instant USDT crypto deposits, MT4/MT5 live account management, 1-click strategy copy trading, and fast automated withdrawals.
            </p>
          </div>

          {/* Trader Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <p className="text-xs text-slate-400 mb-1">Leverage Up To</p>
              <p className="text-lg font-bold text-cyan-400">1:1000</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <p className="text-xs text-slate-400 mb-1">Instant Funding</p>
              <p className="text-lg font-bold text-emerald-400">USDT TRC20</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <p className="text-xs text-slate-400 mb-1">Copy Trading ROI</p>
              <p className="text-lg font-bold text-purple-400">Up to +312%</p>
            </div>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xl font-black text-white">0.0 Pip</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Raw Spreads</p>
          </div>
          <div>
            <p className="text-xl font-black text-blue-400">MT4 & MT5</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Platforms Supported</p>
          </div>
          <div>
            <p className="text-xl font-black text-emerald-400">Instant</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Automated Deposits</p>
          </div>
        </div>
      </div>

      {/* Right Column: Trader Login Form */}
      <div className="lg:w-5/12 p-8 lg:p-12 flex items-center justify-center relative z-10 bg-slate-950">
        <div className="max-w-md w-full space-y-8 bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-2xl shadow-blue-900/20">
          
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
                className="flex-1 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                IB Partner
              </button>
              <button
                onClick={() => navigate('/user')}
                className="flex-1 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md transition"
              >
                Trader
              </button>
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight">Trader Cabinet Login</h2>
            <p className="text-xs text-slate-400 mt-1">Sign in to manage your trading accounts & funds</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-3 rounded-xl text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter email address"
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
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-blue-600/30 active:scale-[0.98]"
            >
              Sign In to Trader Cabinet
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
                onClick={() => navigate('/admin')}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-800/40 rounded-lg text-xs font-semibold transition"
              >
                Login as IB Admin
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-mono">Prefilled: mike@example.com / password123</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UserLogin;
