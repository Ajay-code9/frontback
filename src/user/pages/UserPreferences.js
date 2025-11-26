import React from 'react';
import { PreferencesIcon } from '../Icons';

function UserPreferences({ user }) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Preferences</h1>
        <p className="text-sm text-gray-600 dark:text-slate-400">Customize your experience</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">General Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900 dark:text-white text-sm">Email Notifications</label>
              <p className="text-xs text-gray-600 dark:text-slate-400">Receive email updates</p>
            </div>
            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-blue-300" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900 dark:text-white text-sm">Push Notifications</label>
              <p className="text-xs text-gray-600 dark:text-slate-400">Receive push notifications</p>
            </div>
            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-blue-300" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900 dark:text-white text-sm">Dark Mode</label>
              <p className="text-xs text-gray-600 dark:text-slate-400">Use dark theme</p>
            </div>
            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-blue-300" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Language & Region</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Language</label>
            <select className="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Time Zone</label>
            <select className="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option>UTC</option>
              <option>EST</option>
              <option>PST</option>
            </select>
          </div>
        </div>
      </div>

      <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm">
        Save Preferences
      </button>
    </div>
  );
}

export default UserPreferences;
