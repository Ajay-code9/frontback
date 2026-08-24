import React from 'react';

function UserHome({ user }) {
  const walletBalance = user?.walletBalance || 4500.00;
  const equity = user?.equity || 15820.50;
  const pnl = user?.totalPnl || +2840.25;
  const winRate = user?.winRate || '68.5%';
  const accounts = user?.tradingAccounts || [
    { id: 'acc-1', accountNo: '8841920', platform: 'MT5', type: 'Real', leverage: '1:500', balance: 10000.00, server: 'Broker-Live-01' },
    { id: 'acc-2', accountNo: '1092831', platform: 'MT4', type: 'Demo', leverage: '1:100', balance: 4500.00, server: 'Broker-Demo-01' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-xl border border-blue-800 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase">
                Trader Cabinet
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                user?.kycStatus === 'Verified' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                KYC: {user?.kycStatus || 'Verified'}
              </span>
            </div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name || 'Trader'}!</h1>
            <p className="text-blue-200 text-sm mt-1">Live Trading Account Overview & Performance Summary</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-right">
              <p className="text-xs text-blue-200">Total Account Equity</p>
              <p className="text-xl font-extrabold text-emerald-400 mt-0.5">${equity.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Financial KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Wallet Balance</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">Available for Transfer</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Total Trading Equity</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">${equity.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">Across all accounts</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Net Realized P&L</p>
          <p className={`text-2xl font-bold mt-2 ${pnl >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {pnl >= 0 ? `+$${pnl.toLocaleString()}` : `-$${Math.abs(pnl).toLocaleString()}`}
          </p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">Overall Trading Profit</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Win Rate Ratio</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{winRate}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">Winning Trades %</p>
        </div>
      </div>

      {/* Active Trading Accounts Overview */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">My Connected MT4/MT5 Accounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map(acc => (
            <div key={acc.id} className="p-4 rounded-lg bg-gray-50 dark:bg-slate-700/40 border border-gray-200 dark:border-slate-600 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-base">#{acc.accountNo}</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded text-xs font-bold">{acc.platform}</span>
                  <span className="px-2 py-0.5 bg-gray-200 text-gray-700 dark:bg-slate-600 dark:text-slate-300 rounded text-xs font-semibold">{acc.type}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Leverage {acc.leverage} • {acc.server}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-slate-400">Balance</p>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">${Number(acc.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserHome;
