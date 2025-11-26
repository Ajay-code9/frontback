import React from 'react';
import { ProjectsIcon, TasksIcon, TeamIcon } from '../Icons';
import { ChartIcon } from '../../superadmin/Icons';

function UserHome({ user }) {
  return (
    <div className="space-y-4">
      {/* Welcome Card */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Welcome back, {user.name || 'User'}</h1>
        <p className="text-gray-600 dark:text-slate-400 text-sm">Here's what's happening with your account today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Total Projects</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">12</p>
            </div>
            <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <ProjectsIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Active Tasks</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">8</p>
            </div>
            <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <TasksIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Completed</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">24</p>
            </div>
            <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <ChartIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Team Members</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">5</p>
            </div>
            <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <TeamIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition text-sm">
              Create New Project
            </button>
            <button className="w-full bg-white dark:bg-slate-800 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 py-2 rounded font-medium hover:bg-blue-50 dark:hover:bg-slate-700 transition text-sm">
              Add Task
            </button>
            <button className="w-full bg-white dark:bg-slate-800 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 py-2 rounded font-medium hover:bg-blue-50 dark:hover:bg-slate-700 transition text-sm">
              Schedule Meeting
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-3 p-2 rounded bg-blue-50 dark:bg-slate-700/50">
                <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-medium">
                  {item}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Activity {item}</p>
                  <p className="text-xs text-gray-600 dark:text-slate-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;

