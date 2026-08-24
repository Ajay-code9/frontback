import React, { useState } from 'react';

function TradingAccounts({ user }) {
  const [accounts, setAccounts] = useState(user?.tradingAccounts || [
    { id: 'acc-1', accountNo: '8841920', platform: 'MT5', type: 'Real', leverage: '1:500', balance: 10000.00, server: 'Broker-Live-01', currency: 'USD' },
    { id: 'acc-2', accountNo: '1092831', platform: 'MT4', type: 'Demo', leverage: '1:100', balance: 4500.00, server: 'Broker-Demo-01', currency: 'USD' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [platform, setPlatform] = useState('MT5');
  const [type, setType] = useState('Real');
  const [leverage, setLeverage] = useState('1:500');

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const newAcc = {
      id: `acc-${Date.now()}`,
      accountNo: Math.floor(1000000 + Math.random() * 9000000).toString(),
      platform,
      type,
      leverage,
      balance: type === 'Demo' ? 10000.00 : 0.00,
      server: type === 'Real' ? 'Broker-Live-01' : 'Broker-Demo-01',
      currency: 'USD'
    };

    const updated = [newAcc, ...accounts];
    setAccounts(updated);

    // Save to users in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find(u => u.id === user.id || u.email === user.email);
    if (currentUser) {
      currentUser.tradingAccounts = updated;
      localStorage.setItem('users', JSON.stringify(users));
    }

    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trading Accounts (MT4 / MT5)</h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Manage your Live and Demo trading accounts</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition shadow-md flex items-center justify-center gap-2"
        >
          <span>+ Create New Account</span>
        </button>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {accounts.map(acc => (
          <div key={acc.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-blue-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  acc.platform === 'MT5' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
                }`}>
                  {acc.platform}
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  acc.type === 'Real' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  {acc.type} Account
                </span>
              </div>
              <span className="text-xs font-mono text-gray-400 dark:text-slate-500">{acc.server}</span>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 dark:text-slate-400">Account Number</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono mt-0.5">#{acc.accountNo}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-slate-700 text-sm">
              <div>
                <p className="text-xs text-gray-500 dark:text-slate-400">Account Balance</p>
                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">${Number(acc.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-slate-400">Leverage</p>
                <p className="font-semibold text-gray-900 dark:text-white mt-1">{acc.leverage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full border border-gray-200 dark:border-slate-700 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Open New Trading Account</h3>
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Trading Platform</label>
                <select
                  value={platform}
                  onChange={e => setPlatform(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="MT5">MetaTrader 5 (MT5)</option>
                  <option value="MT4">MetaTrader 4 (MT4)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Account Type</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="Real">Live Real Account</option>
                  <option value="Demo">Demo Practice Account ($10,000)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Select Leverage</label>
                <select
                  value={leverage}
                  onChange={e => setLeverage(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="1:100">1:100</option>
                  <option value="1:200">1:200</option>
                  <option value="1:500">1:500 (Recommended)</option>
                  <option value="1:1000">1:1000</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow"
                >
                  Confirm & Open Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TradingAccounts;
