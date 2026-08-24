import React, { useState } from 'react';

function RiskManagement() {
  const [positions] = useState([
    { id: 'POS-8901', accountNo: '8841920', trader: 'Mike Johnson', symbol: 'XAUUSD', type: 'BUY', volume: '5.00 Lots', openPrice: '2642.50', currentPrice: '2651.10', pnl: '+4,300.00', marginLevel: '340%' },
    { id: 'POS-8902', accountNo: '7721049', trader: 'John Doe', symbol: 'EURUSD', type: 'SELL', volume: '10.00 Lots', openPrice: '1.0850', currentPrice: '1.0820', pnl: '+3,000.00', marginLevel: '210%' },
    { id: 'POS-8903', accountNo: '6610293', trader: 'Jane Smith', symbol: 'BTCUSD', type: 'BUY', volume: '1.50 Lots', openPrice: '94,500.00', currentPrice: '93,100.00', pnl: '-2,100.00', marginLevel: '48%' }
  ]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 text-white p-6 rounded-xl border border-red-900/50 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">
                Risk Engine Live
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                1 Account Margin Warning
              </span>
            </div>
            <h1 className="text-2xl font-bold">Broker Risk & Exposure Control</h1>
            <p className="text-slate-400 text-sm mt-1">Real-time open positions, margin calls, and leverage exposure monitoring</p>
          </div>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm border-l-4 border-emerald-500">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Total Open Volume</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">16.50 Lots</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">3 Active Positions</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm border-l-4 border-emerald-500">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Unrealized Floating P&L</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">+$5,200.00</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Net Broker Floating</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm border-l-4 border-amber-500">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Margin Call Alerts</p>
          <p className="text-2xl font-bold text-amber-500 mt-2">1 Account</p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Margin Level &lt; 50%</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm border-l-4 border-purple-500">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Max Leverage Exposure</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">1:500</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Maximum allowed limit</p>
        </div>
      </div>

      {/* Live Open Positions Feed */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Live Positions & Margin Exposure Feed</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs text-gray-500 dark:text-slate-400 uppercase">
              <tr>
                <th className="p-3">Position ID</th>
                <th className="p-3">Trader / Account</th>
                <th className="p-3">Symbol</th>
                <th className="p-3">Type</th>
                <th className="p-3">Volume</th>
                <th className="p-3">Open Price</th>
                <th className="p-3">Current Price</th>
                <th className="p-3">Floating P&L</th>
                <th className="p-3">Margin Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {positions.map(pos => (
                <tr key={pos.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                  <td className="p-3 font-mono text-xs font-bold text-gray-700 dark:text-slate-300">{pos.id}</td>
                  <td className="p-3">
                    <p className="font-semibold text-gray-900 dark:text-white">{pos.trader}</p>
                    <p className="text-xs font-mono text-blue-600 dark:text-blue-400">#{pos.accountNo}</p>
                  </td>
                  <td className="p-3 font-bold text-gray-900 dark:text-white">{pos.symbol}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      pos.type === 'BUY' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'
                    }`}>
                      {pos.type}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-gray-900 dark:text-white">{pos.volume}</td>
                  <td className="p-3 font-mono text-xs">{pos.openPrice}</td>
                  <td className="p-3 font-mono text-xs">{pos.currentPrice}</td>
                  <td className={`p-3 font-bold ${pos.pnl.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {pos.pnl}
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      parseInt(pos.marginLevel) < 50 ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 animate-pulse' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                    }`}>
                      {pos.marginLevel}
                    </span>
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

export default RiskManagement;
