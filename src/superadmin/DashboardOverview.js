import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

function DashboardOverview() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [stats, setStats] = useState({
    totalAum: 0,
    netDeposits: 0,
    totalLots: 0,
    activeAccounts: 0,
    totalIbs: 0,
    totalTraders: 0
  });

  useEffect(() => {
    const loadStats = () => {
      try {
        const admins = JSON.parse(localStorage.getItem('admins') || '[]');
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const tx = JSON.parse(localStorage.getItem('transactions') || '[]');

        let totalEquity = 0;
        let accountsCount = 0;
        users.forEach(u => {
          totalEquity += Number(u.equity || u.walletBalance || 0);
          if (u.tradingAccounts) accountsCount += u.tradingAccounts.length;
        });

        const deposits = tx.filter(t => t.type === 'Deposit' && t.status === 'Approved').reduce((a, t) => a + Number(t.amount), 0);
        const withdrawals = tx.filter(t => t.type === 'Withdrawal' && t.status === 'Approved').reduce((a, t) => a + Number(t.amount), 0);
        const lots = admins.reduce((a, ib) => a + Number(ib.totalLotsTraded || 0), 615.5);

        setStats({
          totalAum: totalEquity || 34700.50,
          netDeposits: deposits - withdrawals || 11800.00,
          totalLots: lots,
          activeAccounts: accountsCount || 7,
          totalIbs: admins.length,
          totalTraders: users.length
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    { title: 'Assets Under Mgmt (AUM)', value: `$${stats.totalAum.toLocaleString()}`, color: 'border-l-4 border-blue-500', trend: '+14.2% this month' },
    { title: 'Net Broker Deposits', value: `$${stats.netDeposits.toLocaleString()}`, color: 'border-l-4 border-emerald-500', trend: 'Live Deposits - Withdrawals' },
    { title: 'Traded Volume (Lots)', value: `${stats.totalLots.toLocaleString()} Lots`, color: 'border-l-4 border-purple-500', trend: 'MT4 / MT5 Server Feed' },
    { title: 'Active Trading Accounts', value: stats.activeAccounts, color: 'border-l-4 border-amber-500', trend: `${stats.totalTraders} Verified Traders` }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white p-6 rounded-xl shadow-lg border border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Broker System Operational
            </span>
            <h1 className="text-2xl font-bold mt-2">Broker Master Command Center</h1>
            <p className="text-slate-400 text-sm mt-1">Multi-asset Forex & Crypto Trading CRM Management</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700 text-right">
              <p className="text-xs text-slate-400">MT4/MT5 Server Latency</p>
              <p className="text-emerald-400 font-bold text-sm">12ms (Optimal)</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => (
          <div key={idx} className={`bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 ${card.color}`}>
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">{card.title}</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{card.value}</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">{card.trend}</p>
          </div>
        ))}
      </div>

      {/* Platform Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IB Overview */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Top Introducing Brokers (IBs)</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/40 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Apex Capital Partners (IB-1042)</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Rebate Rate: $5.00/lot • 14 Active Traders</p>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">420.5 Lots</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/40 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Titan Trading Network (IB-2088)</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Rebate Rate: $7.00/lot • 8 Active Traders</p>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">195.0 Lots</span>
            </div>
          </div>
        </div>

        {/* Live MT5 Server Feeds */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Trading Infrastructure Status</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-700">
              <span className="text-gray-600 dark:text-slate-300">MetaTrader 5 Live-01</span>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-full text-xs font-medium">Online (99.99%)</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-700">
              <span className="text-gray-600 dark:text-slate-300">MetaTrader 4 Demo-01</span>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-full text-xs font-medium">Online (99.98%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-slate-300">USDT Payment Gateway (TRC20)</span>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-full text-xs font-medium">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
