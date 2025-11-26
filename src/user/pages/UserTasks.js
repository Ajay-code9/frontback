import React from 'react';
import { TasksIcon } from '../Icons';

function UserTasks({ user }) {
  const tasks = [
    { id: 1, title: 'Complete project proposal', priority: 'High', dueDate: '2024-01-15', completed: false },
    { id: 2, title: 'Review design mockups', priority: 'Medium', dueDate: '2024-01-16', completed: false },
    { id: 3, title: 'Team meeting preparation', priority: 'Low', dueDate: '2024-01-17', completed: true },
    { id: 4, title: 'Update documentation', priority: 'High', dueDate: '2024-01-18', completed: false },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">My Tasks</h1>
        <p className="text-sm text-gray-600 dark:text-slate-400">Stay organized and productive</p>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className={`bg-white dark:bg-slate-800 rounded-lg p-3 border border-blue-200 dark:border-slate-700 ${
            task.completed ? 'opacity-50' : ''
          }`}>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-blue-300"
              />
              <div className="flex-1">
                <h3 className={`text-sm font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                  {task.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    task.priority === 'High' ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                    task.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-slate-400">Due: {task.dueDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm">
        Add New Task
      </button>
    </div>
  );
}

export default UserTasks;
