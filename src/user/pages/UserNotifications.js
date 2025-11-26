import React from 'react';
import { NotificationsIcon } from '../Icons';

function UserNotifications({ user }) {
  const notifications = [
    { id: 1, title: 'New project assigned', message: 'You have been assigned to a new project', time: '5 minutes ago', read: false, type: 'info' },
    { id: 2, title: 'Task completed', message: 'Your task has been marked as completed', time: '1 hour ago', read: false, type: 'success' },
    { id: 3, title: 'Team update', message: 'New team member joined', time: '3 hours ago', read: true, type: 'warning' },
    { id: 4, title: 'Meeting reminder', message: 'You have a meeting in 30 minutes', time: '5 hours ago', read: true, type: 'info' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Notifications</h1>
        <p className="text-sm text-gray-600 dark:text-slate-400">Stay updated with all activities</p>
      </div>

      <div className="space-y-2">
        {notifications.map((notif) => (
          <div key={notif.id} className={`bg-white dark:bg-slate-800 rounded-lg p-3 border border-blue-200 dark:border-slate-700 ${
            !notif.read ? 'border-l-4 border-l-blue-600' : ''
          }`}>
            <div className="flex items-start space-x-2">
              <div className={`w-8 h-8 rounded flex items-center justify-center ${
                notif.type === 'success' ? 'bg-green-50 dark:bg-green-900/20' :
                notif.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                'bg-blue-50 dark:bg-blue-900/20'
              }`}>
                <NotificationsIcon className={`w-4 h-4 ${
                  notif.type === 'success' ? 'text-green-600 dark:text-green-400' : 
                  notif.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : 
                  'text-blue-600 dark:text-blue-400'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">{notif.title}</h3>
                  {!notif.read && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>}
                </div>
                <p className="text-gray-600 dark:text-slate-400 mt-0.5 text-xs">{notif.message}</p>
                <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5">{notif.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserNotifications;
