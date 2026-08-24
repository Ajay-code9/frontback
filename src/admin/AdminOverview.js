import React, { useState, useEffect } from 'react';
import { UsersIcon, UserIcon, ChartIcon } from '../superadmin/Icons';

function AdminOverview({ admin }) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    assignedCountries: 0,
    totalPermissions: 0
  });

  useEffect(() => {
    const loadStats = () => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Filter users by admin's assigned countries
        const assignedCountries = admin.countries || [];
        const filteredUsers = users.filter(user => 
          assignedCountries.includes(user.country)
        );

        setStats({
          totalUsers: filteredUsers.length,
          assignedCountries: assignedCountries.length,
          totalPermissions: admin.permissions ? admin.permissions.length : 0
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
  }, [admin]);

  const statCards = [
    {
      title: 'Users in My Countries',
      value: stats.totalUsers,
      icon: UserIcon,
    },
    {
      title: 'Assigned Countries',
      value: stats.assignedCountries,
      icon: ChartIcon,
    },
    {
      title: 'My Permissions',
      value: stats.totalPermissions,
      icon: UsersIcon,
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
          Welcome, {admin.name || admin.userId}!
        </h2>
        <p className="text-gray-600 dark:text-slate-400">
          You have access to manage users in your assigned countries with your granted permissions.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-600 dark:text-slate-400">{stat.title}</p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-slate-700">
                  <IconComponent className="w-6 h-6 text-gray-600 dark:text-slate-400" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assigned Countries */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Your Assigned Countries
        </h3>
        <div className="flex flex-wrap gap-2">
          {admin.countries && admin.countries.length > 0 ? (
            admin.countries.map((country, idx) => (
              <span key={idx} className="px-3 py-2 rounded-lg text-sm border bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-600">
                {country}
              </span>
            ))
          ) : (
            <p className="text-gray-500 dark:text-slate-400">
              No countries assigned
            </p>
          )}
        </div>
      </div>

      {/* Permissions */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Your Permissions
        </h3>
        <div className="flex flex-wrap gap-2">
          {admin.permissions && admin.permissions.length > 0 ? (
            admin.permissions.map((permission, idx) => (
              <span key={idx} className="px-3 py-2 rounded-lg text-sm border bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-600">
                {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            ))
          ) : (
            <p className="text-gray-500 dark:text-slate-400">
              No permissions assigned
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOverview;

