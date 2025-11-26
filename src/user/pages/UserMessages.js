import React from 'react';
import { MessagesIcon } from '../Icons';

function UserMessages({ user }) {
  const messages = [
    { id: 1, sender: 'John Doe', message: 'Hey, can we schedule a meeting?', time: '2 hours ago', unread: true },
    { id: 2, sender: 'Jane Smith', message: 'The project proposal looks great!', time: '5 hours ago', unread: true },
    { id: 3, sender: 'Mike Johnson', message: 'Thanks for the update', time: '1 day ago', unread: false },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Messages</h1>
        <p className="text-sm text-gray-600 dark:text-slate-400">Stay connected with your team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700">
          <div className="p-3 border-b border-blue-200 dark:border-slate-700">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="divide-y divide-blue-200 dark:divide-slate-700">
            {messages.map((msg) => (
              <div key={msg.id} className={`p-3 hover:bg-blue-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors ${
                msg.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-semibold text-xs">
                    {msg.sender.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 dark:text-white truncate text-sm">{msg.sender}</h4>
                      {msg.unread && <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 ml-1"></span>}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-400 truncate">{msg.message}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5">{msg.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                <MessagesIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-400">Select a conversation to start messaging</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMessages;
