import React from 'react';
import { TeamIcon } from '../Icons';

function UserTeam({ user }) {
  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Designer', status: 'online' },
    { id: 2, name: 'Jane Smith', role: 'Developer', status: 'online' },
    { id: 3, name: 'Mike Johnson', role: 'Manager', status: 'away' },
    { id: 4, name: 'Sarah Williams', role: 'Analyst', status: 'offline' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Team</h1>
        <p className="text-sm text-gray-600 dark:text-slate-400">Collaborate with your team members</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700 text-center">
            <div className="relative inline-block mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 font-semibold text-sm">
                {member.name.charAt(0)}
              </div>
              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-800 ${
                member.status === 'online' ? 'bg-green-500' :
                member.status === 'away' ? 'bg-yellow-500' :
                'bg-gray-400'
              }`}></span>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white text-sm">{member.name}</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{member.role}</p>
            <button className="mt-2 w-full bg-blue-600 dark:bg-blue-500 text-white py-1.5 rounded font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-xs">
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserTeam;
