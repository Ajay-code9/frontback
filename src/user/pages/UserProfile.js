import React from 'react';

function UserProfile({ user }) {
  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-lg font-semibold text-blue-700 dark:text-blue-400">
            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name || 'User'}</h1>
            <p className="text-sm text-gray-600 dark:text-slate-400">{user.email}</p>
            <p className="text-xs text-gray-500 dark:text-slate-500">{user.country || 'No location set'}</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 block">Full Name</label>
              <input
                type="text"
                defaultValue={user.name || ''}
                className="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 block">Email</label>
              <input
                type="email"
                defaultValue={user.email || ''}
                className="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 block">Country</label>
              <input
                type="text"
                defaultValue={user.country || ''}
                className="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter your country"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Account Statistics</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-slate-700/50 rounded border border-blue-200 dark:border-slate-600">
              <span className="text-sm text-gray-600 dark:text-slate-400">Member Since</span>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-slate-700/50 rounded border border-blue-200 dark:border-slate-600">
              <span className="text-sm text-gray-600 dark:text-slate-400">Total Projects</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-slate-700/50 rounded border border-blue-200 dark:border-slate-600">
              <span className="text-sm text-gray-600 dark:text-slate-400">Tasks Completed</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">24</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Bio</h3>
        <textarea
          className="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          rows="4"
          placeholder="Tell us about yourself..."
        />
        <button className="mt-3 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default UserProfile;

