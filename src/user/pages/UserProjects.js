import React from 'react';
import { ProjectsIcon } from '../Icons';

function UserProjects({ user }) {
  const projects = [
    { id: 1, name: 'Website Redesign', status: 'In Progress', progress: 65 },
    { id: 2, name: 'Mobile App', status: 'Planning', progress: 30 },
    { id: 3, name: 'Marketing Campaign', status: 'Completed', progress: 100 },
    { id: 4, name: 'Data Migration', status: 'In Progress', progress: 80 },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">My Projects</h1>
        <p className="text-sm text-gray-600 dark:text-slate-400">Manage and track all your projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <ProjectsIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{project.name}</h3>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                project.status === 'Completed' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                project.status === 'In Progress' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300'
              }`}>
                {project.status}
              </span>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-600 dark:text-slate-400 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-blue-100 dark:bg-slate-700 rounded-full h-1.5">
                <div className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>
            <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm">
              View Details
            </button>
          </div>
        ))}
      </div>

      <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm">
        Create New Project
      </button>
    </div>
  );
}

export default UserProjects;
