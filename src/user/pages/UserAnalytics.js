import React from 'react';

function UserAnalytics({ user }) {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trading Performance Analytics</h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Detailed breakdown of win rate, profit factor, and trade distribution</p>
      </div>

      {/* KPI Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Win Rate</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{user?.winRate || '68.5%'}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">142 Win / 65 Loss</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Profit Factor</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">2.14</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Gross Win / Gross Loss</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Avg Risk/Reward</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">1 : 2.5</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Target ratio maintained</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Total Traded Lots</p>
          <p className="text-2xl font-bold text-amber-500 mt-2">240.0 Lots</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">EURUSD, XAUUSD, BTCUSD</p>
        </div>
      </div>

      {/* Equity & P&L Curve */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Equity & Cumulative Growth Curve</h3>
        <div className="h-56 bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-slate-900/10 dark:from-slate-700/30 dark:to-slate-800/30 rounded-xl flex items-center justify-center border border-dashed border-gray-300 dark:border-slate-600 p-4">
          <div className="text-center">
            <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/40 rounded-full text-blue-600 dark:text-blue-400 mb-2">
              📈
            </div>
            <p className="font-bold text-gray-900 dark:text-white text-sm">Equity Growth Curve Active</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">+38.4% Net Return since account inception</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAnalytics;
