import React, { useState } from 'react';

function CopyTradingManagement() {
  const [masters, setMasters] = useState([
    { id: 'MAS-101', name: 'Alpha Quant Forex AI', trader: 'Alex Vance', roi: '+312.4%', winRate: '78.2%', followers: 142, aum: 185000, status: 'Active', fee: '20%' },
    { id: 'MAS-102', name: 'Gold Scalper Pro', trader: 'Elena Rostova', roi: '+194.0%', winRate: '82.5%', followers: 98, aum: 120000, status: 'Active', fee: '15%' },
    { id: 'MAS-103', name: 'Crypto Momentum Elite', trader: 'Marcus Chen', roi: '+145.8%', winRate: '65.0%', followers: 64, aum: 85000, status: 'Active', fee: '25%' }
  ]);

  const toggleStatus = (id) => {
    setMasters(masters.map(m => m.id === id ? { ...m, status: m.status === 'Active' ? 'Paused' : 'Active' } : m));
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-900 text-white p-6 rounded-xl border border-purple-900/50 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">
              Copy Trading Hub
            </span>
            <h1 className="text-2xl font-bold mt-2">PAMM & Copy Trading Strategy Console</h1>
            <p className="text-slate-400 text-sm mt-1">Manage Strategy Providers, Master Trader performance, and follower allocation</p>
          </div>
          <div className="bg-purple-900/40 border border-purple-700/50 px-4 py-2 rounded-lg text-right">
            <p className="text-xs text-purple-200">Total Copy AUM</p>
            <p className="text-xl font-extrabold text-purple-300">$390,000.00</p>
          </div>
        </div>
      </div>

      {/* Master Providers Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Master Strategy Providers Leaderboard</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs text-gray-500 dark:text-slate-400 uppercase">
              <tr>
                <th className="p-3">Strategy Name</th>
                <th className="p-3">Master Trader</th>
                <th className="p-3">All-Time ROI</th>
                <th className="p-3">Win Rate</th>
                <th className="p-3">Followers</th>
                <th className="p-3">Managed AUM</th>
                <th className="p-3">Performance Fee</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {masters.map(m => (
                <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                  <td className="p-3 font-bold text-gray-900 dark:text-white">{m.name}</td>
                  <td className="p-3 text-gray-600 dark:text-slate-300">{m.trader}</td>
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">{m.roi}</td>
                  <td className="p-3 font-semibold text-gray-900 dark:text-white">{m.winRate}</td>
                  <td className="p-3 font-bold text-purple-600 dark:text-purple-400">{m.followers} Traders</td>
                  <td className="p-3 font-bold text-gray-900 dark:text-white">${m.aum.toLocaleString()}</td>
                  <td className="p-3 text-gray-600 dark:text-slate-300 font-semibold">{m.fee}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      m.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => toggleStatus(m.id)}
                      className={`px-3 py-1 text-xs font-semibold rounded transition shadow-sm text-white ${
                        m.status === 'Active' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
                      }`}
                    >
                      {m.status === 'Active' ? 'Pause Strategy' : 'Activate Strategy'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CopyTradingManagement;
