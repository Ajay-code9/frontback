import React from 'react';
import { ActivityIcon } from '../Icons';

function UserActivity({ user }) {
  const activities = [
    { id: 1, action: 'Created new project', target: 'Website Redesign', time: '2 hours ago' },
    { id: 2, action: 'Completed task', target: 'Design Review', time: '5 hours ago' },
    { id: 3, action: 'Uploaded document', target: 'Project Proposal.pdf', time: '1 day ago' },
    { id: 4, action: 'Joined team', target: 'Marketing Team', time: '2 days ago' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Activity Log</h1>
        <p className="text-sm text-gray-600 dark:text-slate-400">Track all your recent activities</p>
      </div>

      <div className="space-y-2">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-blue-200 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <ActivityIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white font-medium text-sm">
                  {activity.action} <span className="text-gray-600 dark:text-slate-400 font-normal">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserActivity;
