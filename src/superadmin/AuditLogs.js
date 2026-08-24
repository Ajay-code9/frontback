import React, { useState } from 'react';

function AuditLogs() {
  const [logs] = useState([
    { id: 'LOG-501', event: 'Superadmin Login', actor: 'superadmin', ip: '192.168.1.104', timestamp: '2026-08-24 16:04:12', status: 'Success' },
    { id: 'LOG-502', event: 'Approved Deposit TX-901 ($5,000)', actor: 'superadmin', ip: '192.168.1.104', timestamp: '2026-08-24 16:02:40', status: 'Success' },
    { id: 'LOG-503', event: 'IB Commission Payout Authorized', actor: 'admin1', ip: '104.28.192.11', timestamp: '2026-08-24 15:45:00', status: 'Success' },
    { id: 'LOG-504', event: 'MT5 Trading Account Created #8841920', actor: 'mike@example.com', ip: '72.14.201.88', timestamp: '2026-08-24 14:20:15', status: 'Success' },
    { id: 'LOG-505', event: 'Failed Password Attempt (Admin Login)', actor: 'unknown_user', ip: '185.220.101.5', timestamp: '2026-08-24 13:10:05', status: 'Warning' }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">System Security & Audit Logs</h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Real-time security audit trails, IP login history, and admin actions</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs text-gray-500 dark:text-slate-400 uppercase">
              <tr>
                <th className="p-3">Log ID</th>
                <th className="p-3">Event Action</th>
                <th className="p-3">User / Actor</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                  <td className="p-3 font-mono text-xs font-bold text-gray-700 dark:text-slate-300">{log.id}</td>
                  <td className="p-3 font-semibold text-gray-900 dark:text-white">{log.event}</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-mono text-xs">{log.actor}</td>
                  <td className="p-3 text-gray-600 dark:text-slate-300 font-mono text-xs">{log.ip}</td>
                  <td className="p-3 text-gray-500 dark:text-slate-400 text-xs">{log.timestamp}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      log.status === 'Success' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {log.status}
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

export default AuditLogs;
