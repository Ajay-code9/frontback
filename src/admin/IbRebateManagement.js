import React, { useState } from 'react';

function IbRebateManagement({ admin }) {
  const [payoutRequested, setPayoutRequested] = useState(false);

  const rebateRate = admin?.rebateRate || 5.00;
  const lots = admin?.totalLotsTraded || 420.5;
  const balance = admin?.walletBalance || 1450.00;

  const handleRequestPayout = () => {
    setPayoutRequested(true);
    setTimeout(() => setPayoutRequested(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* IB Rebate Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-purple-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">My IB Referral Code</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2 font-mono">{admin?.ibCode || 'IB-1042'}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Share code with new traders</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-purple-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Commission Rebate Rate</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">${rebateRate.toFixed(2)} / Lot</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Earned on every traded lot</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-purple-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Rebate Wallet Balance</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">${balance.toLocaleString()}</p>
          <button
            onClick={handleRequestPayout}
            disabled={payoutRequested}
            className="mt-3 px-4 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition shadow-sm"
          >
            {payoutRequested ? '✓ Payout Requested' : 'Withdraw Rebates'}
          </button>
        </div>
      </div>

      {/* Referred Traders Volume Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-purple-200 dark:border-slate-700 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Referred Traders & Lot Volume</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-purple-50 dark:bg-slate-700/50 text-xs text-gray-500 dark:text-slate-400 uppercase">
              <tr>
                <th className="p-3">Trader Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">MT4/MT5 Account</th>
                <th className="p-3">Volume Traded</th>
                <th className="p-3">Rebates Generated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                <td className="p-3 font-semibold text-gray-900 dark:text-white">Mike Johnson</td>
                <td className="p-3 text-gray-600 dark:text-slate-300">mike@example.com</td>
                <td className="p-3 font-mono text-xs text-purple-600 dark:text-purple-400">MT5 #8841920</td>
                <td className="p-3 font-bold text-gray-900 dark:text-white">240.0 Lots</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">$1,200.00</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                <td className="p-3 font-semibold text-gray-900 dark:text-white">John Doe</td>
                <td className="p-3 text-gray-600 dark:text-slate-300">john@example.com</td>
                <td className="p-3 font-mono text-xs text-purple-600 dark:text-purple-400">MT5 #7721049</td>
                <td className="p-3 font-bold text-gray-900 dark:text-white">180.5 Lots</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">$902.50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IbRebateManagement;
