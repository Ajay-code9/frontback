import React, { useState } from 'react';

function CopyTradingMarketplace() {
  const [copiedMasters, setCopiedMasters] = useState([]);
  const masters = [
    { id: 'MAS-101', name: 'Alpha Quant Forex AI', trader: 'Alex Vance', roi: '+312.4%', winRate: '78.2%', followers: 142, fee: '20%', riskScore: 'Low (3/10)' },
    { id: 'MAS-102', name: 'Gold Scalper Pro', trader: 'Elena Rostova', roi: '+194.0%', winRate: '82.5%', followers: 98, fee: '15%', riskScore: 'Medium (5/10)' },
    { id: 'MAS-103', name: 'Crypto Momentum Elite', trader: 'Marcus Chen', roi: '+145.8%', winRate: '65.0%', followers: 64, fee: '25%', riskScore: 'High (7/10)' }
  ];

  const toggleCopy = (id) => {
    if (copiedMasters.includes(id)) {
      setCopiedMasters(copiedMasters.filter(mId => mId !== id));
    } else {
      setCopiedMasters([...copiedMasters, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-6 rounded-xl border border-indigo-800 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="bg-blue-400/20 text-blue-300 border border-blue-400/30 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">
              1-Click Copy Trading
            </span>
            <h1 className="text-2xl font-bold mt-2">Copy Master Traders Marketplace</h1>
            <p className="text-blue-200 text-sm mt-1">Automatically copy proven trading strategies from verified top traders</p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {masters.map(m => {
          const isFollowing = copiedMasters.includes(m.id);
          return (
            <div key={m.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{m.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400">By {m.trader}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full">
                    {m.roi} ROI
                  </span>
                </div>

                <div className="space-y-2 text-xs text-gray-600 dark:text-slate-300 py-3 border-y border-gray-100 dark:border-slate-700 my-4">
                  <div className="flex justify-between">
                    <span>Win Rate</span>
                    <span className="font-bold text-gray-900 dark:text-white">{m.winRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Copiers</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{m.followers} Traders</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance Fee</span>
                    <span className="font-bold text-gray-900 dark:text-white">{m.fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Level</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{m.riskScore}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleCopy(m.id)}
                className={`w-full py-2.5 rounded-lg font-bold text-xs transition shadow-sm ${
                  isFollowing 
                    ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isFollowing ? '✓ Copying Strategy (Click to Stop)' : '+ Copy Strategy'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CopyTradingMarketplace;
