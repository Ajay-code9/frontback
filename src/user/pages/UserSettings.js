import React from 'react';
import { SettingsIcon } from '../Icons';

function UserSettings({ user }) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Settings</h1>
        <p className="text-sm text-gray-600 dark:text-slate-400">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Account Security</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Current Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter new password"
              />
            </div>
            <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm">
              Update Password
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Privacy Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white text-sm">Profile Visibility</label>
                <p className="text-xs text-gray-600 dark:text-slate-400">Make your profile public</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-blue-300" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white text-sm">Activity Status</label>
                <p className="text-xs text-gray-600 dark:text-slate-400">Show when you're online</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-blue-300" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white text-sm">Data Sharing</label>
                <p className="text-xs text-gray-600 dark:text-slate-400">Allow data sharing for analytics</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-blue-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Danger Zone</h3>
        <div className="space-y-2">
          <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition text-sm">
            Delete Account
          </button>
          <p className="text-xs text-gray-600 dark:text-slate-400">Once you delete your account, there is no going back. Please be certain.</p>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
