import React from 'react';
import { CalendarIcon } from '../Icons';

function UserCalendar({ user }) {
  const events = [
    { id: 1, title: 'Team Meeting', time: '10:00 AM', date: '2024-01-15' },
    { id: 2, title: 'Project Review', time: '2:00 PM', date: '2024-01-15' },
    { id: 3, title: 'Client Call', time: '4:00 PM', date: '2024-01-16' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Calendar</h1>
        <p className="text-sm text-gray-600 dark:text-slate-400">Manage your schedule and events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Calendar View</h3>
          <div className="h-64 bg-blue-50 dark:bg-slate-700/50 rounded flex items-center justify-center border border-blue-200 dark:border-slate-600">
            <p className="text-sm text-gray-600 dark:text-slate-400">Calendar widget would go here</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Upcoming Events</h3>
          <div className="space-y-2">
            {events.map((event) => (
              <div key={event.id} className="p-3 bg-blue-50 dark:bg-slate-700/50 rounded border border-blue-200 dark:border-slate-600">
                <div className="flex items-center space-x-2 mb-1">
                  <CalendarIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{event.title}</h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-slate-400 font-medium">{event.time}</p>
                <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5">{event.date}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 bg-blue-600 dark:bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm">
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCalendar;
