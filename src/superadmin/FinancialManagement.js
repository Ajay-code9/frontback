import React, { useState, useEffect } from 'react';

function FinancialManagement() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('All');

  const loadTransactions = () => {
    const tx = JSON.parse(localStorage.getItem('transactions') || '[]');
    setTransactions(tx);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleAction = (txId, newStatus) => {
    const allTx = JSON.parse(localStorage.getItem('transactions') || '[]');
    const targetTx = allTx.find(t => t.id === txId);

    if (targetTx) {
      targetTx.status = newStatus;
      localStorage.setItem('transactions', JSON.stringify(allTx));

      // Update trader balance if approved
      if (newStatus === 'Approved') {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.id === targetTx.userId || u.email === targetTx.userEmail);
        if (user) {
          if (targetTx.type === 'Deposit') {
            user.walletBalance = (user.walletBalance || 0) + Number(targetTx.amount);
          } else if (targetTx.type === 'Withdrawal') {
            user.walletBalance = Math.max(0, (user.walletBalance || 0) - Number(targetTx.amount));
          }
          localStorage.setItem('users', JSON.stringify(users));
        }
      }
      loadTransactions();
    }
  };

  const filteredTx = filter === 'All' ? transactions : transactions.filter(t => t.status === filter || t.type === filter);

  const totalDeposits = transactions.filter(t => t.type === 'Deposit' && t.status === 'Approved').reduce((acc, t) => acc + Number(t.amount), 0);
  const totalWithdrawals = transactions.filter(t => t.type === 'Withdrawal' && t.status === 'Approved').reduce((acc, t) => acc + Number(t.amount), 0);
  const pendingCount = transactions.filter(t => t.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Approved Deposits</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">${totalDeposits.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Approved Withdrawals</p>
          <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-2">${totalWithdrawals.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Pending Approvals Queue</p>
          <p className="text-2xl font-bold text-amber-500 mt-2">{pendingCount} Requests</p>
        </div>
      </div>

      {/* Transactions Queue */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Deposit & Withdrawal Queue</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">Review and authorize trader financial funding requests</p>
          </div>
          <div className="flex gap-2">
            {['All', 'Pending', 'Approved', 'Deposit', 'Withdrawal'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  filter === f 
                    ? 'bg-gray-900 text-white dark:bg-slate-700' 
                    : 'bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-slate-300 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs text-gray-500 dark:text-slate-400 uppercase">
              <tr>
                <th className="p-3">Tx ID</th>
                <th className="p-3">Trader</th>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredTx.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500 dark:text-slate-400">No transactions found</td>
                </tr>
              ) : (
                filteredTx.map(tx => (
                  <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                    <td className="p-3 font-mono text-xs font-bold text-gray-700 dark:text-slate-300">{tx.id}</td>
                    <td className="p-3">
                      <p className="font-semibold text-gray-900 dark:text-white">{tx.userName}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{tx.userEmail}</p>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        tx.type === 'Deposit' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-gray-900 dark:text-white">${Number(tx.amount).toLocaleString()}</td>
                    <td className="p-3 text-gray-600 dark:text-slate-300">{tx.method}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        tx.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        tx.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {tx.status === 'Pending' ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleAction(tx.id, 'Approved')}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded transition shadow-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(tx.id, 'Rejected')}
                            className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded transition shadow-sm"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-slate-500">Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FinancialManagement;
