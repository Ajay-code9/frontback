import React from 'react';
import { AnalyticsIcon, TeamIcon } from '../Icons';
import { ChartIcon } from '../../superadmin/Icons';

function UserAnalytics({ user }) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Analytics Dashboard</h1>
        <p className="text-sm text-gray-600 dark:text-slate-400">Track your performance and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-gray-600 dark:text-slate-400">Page Views</h3>
            <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <ChartIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">1,234</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">↑ 12% from last month</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-gray-600 dark:text-slate-400">Active Users</h3>
            <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <TeamIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">856</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">↑ 8% from last month</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-gray-600 dark:text-slate-400">Conversion Rate</h3>
            <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <AnalyticsIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">3.2%</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">↑ 2.1% from last month</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Performance Chart</h3>
        <div className="h-48 bg-blue-50 dark:bg-slate-700/50 rounded flex items-center justify-center border border-blue-200 dark:border-slate-600">
          <p className="text-sm text-gray-600 dark:text-slate-400">Chart visualization would go here</p>
        </div>
      </div>
    </div>
  );
}

export default UserAnalytics;

