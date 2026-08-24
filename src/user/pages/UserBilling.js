import React, { useState, useEffect } from 'react';

function UserBilling({ user }) {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Crypto USDT (TRC20)');
  const [successMsg, setSuccessMsg] = useState('');

  const loadTx = () => {
    const all = JSON.parse(localStorage.getItem('transactions') || '[]');
    const myTx = all.filter(t => t.userId === user?.id || t.userEmail === user?.email);
    setTransactions(myTx);
  };

  useEffect(() => {
    loadTx();
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    const newTx = {
      id: `TX-${Math.floor(100 + Math.random() * 900)}`,
      userId: user?.id || '1',
      userName: user?.name || 'Mike Johnson',
      userEmail: user?.email || 'mike@example.com',
      type: activeTab === 'deposit' ? 'Deposit' : 'Withdrawal',
      amount: Number(amount),
      method,
      status: 'Pending',
      date: new Date().toISOString()
    };

    const all = JSON.parse(localStorage.getItem('transactions') || '[]');
    const updated = [newTx, ...all];
    localStorage.setItem('transactions', JSON.stringify(updated));

    setSuccessMsg(`${newTx.type} request of $${newTx.amount} submitted successfully! Status: Pending Approval`);
    setAmount('');
    loadTx();

    setTimeout(() => setSuccessMsg(''), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Funds Management (Deposit & Withdrawal)</h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Deposit funds to your wallet or request account withdrawals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="flex rounded-lg bg-gray-100 dark:bg-slate-700 p-1 mb-6">
            <button
              onClick={() => setActiveTab('deposit')}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition ${
                activeTab === 'deposit' ? 'bg-emerald-600 text-white shadow' : 'text-gray-600 dark:text-slate-300'
              }`}
            >
              Deposit Funds
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition ${
                activeTab === 'withdraw' ? 'bg-rose-600 text-white shadow' : 'text-gray-600 dark:text-slate-300'
              }`}
            >
              Withdraw Funds
            </button>
          </div>

          {successMsg && (
            <div className="mb-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 p-3 rounded-lg text-xs font-semibold">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">
                Amount (USD)
              </label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="e.g. 500"
                min="10"
                className="w-full p-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">
                Payment Method
              </label>
              <select
                value={method}
                onChange={e => setMethod(e.target.value)}
                className="w-full p-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="Crypto USDT (TRC20)">Crypto USDT (TRC20)</option>
                <option value="Crypto USDT (ERC20)">Crypto USDT (ERC20)</option>
                <option value="Credit / Debit Card">Credit / Debit Card (Visa/Mastercard)</option>
                <option value="Wire Bank Transfer">International Wire Bank Transfer</option>
              </select>
            </div>

            {method.startsWith('Crypto USDT') && activeTab === 'deposit' && (
              <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600 text-center space-y-2">
                <p className="text-xs font-bold text-gray-700 dark:text-slate-200">Scan QR Code or Copy Address</p>
                <div className="w-28 h-28 mx-auto bg-white p-2 rounded-lg border flex items-center justify-center font-bold text-xs text-gray-800 shadow-inner">
                  [USDT QR CODE]
                </div>
                <div className="p-2 bg-white dark:bg-slate-800 rounded border font-mono text-[11px] text-emerald-600 dark:text-emerald-400 truncate">
                  T9xZpL82vNqW4kM1sR7uY3bA5cE8dF2gH1
                </div>
                <p className="text-[10px] text-gray-400">Send exact amount in USDT to this address</p>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-bold text-white text-sm transition shadow-md ${
                activeTab === 'deposit' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              {activeTab === 'deposit' ? 'Submit Deposit Request' : 'Submit Withdrawal Request'}
            </button>
          </form>
        </div>

        {/* Transaction History Column */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Funding & Withdrawal History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs text-gray-500 dark:text-slate-400 uppercase">
                <tr>
                  <th className="p-3">Tx ID</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-400">No transactions recorded yet</td>
                  </tr>
                ) : (
                  transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                      <td className="p-3 font-mono text-xs font-bold text-gray-700 dark:text-slate-300">{tx.id}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          tx.type === 'Deposit' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-gray-900 dark:text-white">${Number(tx.amount).toLocaleString()}</td>
                      <td className="p-3 text-gray-600 dark:text-slate-300 text-xs">{tx.method}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          tx.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          tx.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBilling;
