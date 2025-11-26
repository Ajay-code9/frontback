import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChartIcon, UsersIcon, UserIcon, InfoIcon, DocumentIcon } from './Icons';

function DashboardOverview() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [stats, setStats] = useState({
    totalAdmins: 0,
    totalUsers: 0,
    totalCountries: 0,
    activeAdmins: 0
  });

  useEffect(() => {
    // Load stats from localStorage
    const loadStats = () => {
      try {
        const admins = JSON.parse(localStorage.getItem('admins') || '[]');
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        const countries = new Set();
        admins.forEach(admin => {
          if (admin && admin.countries) {
            admin.countries.forEach(country => countries.add(country));
          }
        });

        setStats({
          totalAdmins: admins.length,
          totalUsers: users.length,
          totalCountries: countries.size,
          activeAdmins: admins.length
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
    
    // Listen for storage changes to update stats in real-time
    const handleStorageChange = () => {
      loadStats();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const statCards = [
    {
      title: 'Total Admins',
      value: stats.totalAdmins,
      icon: UsersIcon,
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: UserIcon,
    },
    {
      title: 'Countries',
      value: stats.totalCountries,
      icon: ChartIcon,
    },
    {
      title: 'Active Admins',
      value: stats.activeAdmins,
      icon: UsersIcon,
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admins */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
            <DocumentIcon className="w-5 h-5 mr-2 text-gray-600 dark:text-slate-400" />
            Recent Admins
          </h3>
          <div className="space-y-3">
            {(() => {
              try {
                const admins = JSON.parse(localStorage.getItem('admins') || '[]');
                const recentAdmins = admins.slice(-5).reverse();
                
                if (recentAdmins.length === 0) {
                  return (
                    <p className="text-center py-4 text-gray-500 dark:text-slate-400">No admins created yet</p>
                  );
                }

                return recentAdmins.map((admin) => (
                <div
                  key={admin.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 border border-gray-200 dark:border-slate-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center border bg-gray-200 dark:bg-slate-700 border-gray-300 dark:border-slate-600">
                      <span className="font-semibold text-sm text-gray-700 dark:text-slate-300">
                        {admin.name ? admin.name.charAt(0).toUpperCase() : admin.userId.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">{admin.userId}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        {admin.name || 'No name'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 dark:text-slate-500">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                ));
              } catch (error) {
                return (
                  <p className="text-center py-4 text-gray-500 dark:text-slate-400">Error loading admins</p>
                );
              }
            })()}
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
            <InfoIcon className="w-5 h-5 mr-2 text-gray-600 dark:text-slate-400" />
            System Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700">
              <span className="font-medium text-sm text-gray-700 dark:text-slate-300">System Status</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50">
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700">
              <span className="font-medium text-sm text-gray-700 dark:text-slate-300">Last Updated</span>
              <span className="text-sm text-gray-600 dark:text-slate-400">{new Date().toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700">
              <span className="font-medium text-sm text-gray-700 dark:text-slate-300">Version</span>
              <span className="text-sm text-gray-600 dark:text-slate-400">v1.0.0</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700">
              <span className="font-medium text-sm text-gray-700 dark:text-slate-300">Storage</span>
              <span className="text-sm text-gray-600 dark:text-slate-400">LocalStorage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
          <ChartIcon className="w-5 h-5 mr-2 text-gray-600 dark:text-slate-400" />
          Quick Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700">
            <p className="text-sm font-medium mb-1 text-gray-600 dark:text-slate-400">Admins with Permissions</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {(() => {
                try {
                  const admins = JSON.parse(localStorage.getItem('admins') || '[]');
                  return admins.filter(a => a && a.permissions && a.permissions.length > 0).length;
                } catch {
                  return 0;
                }
              })()}
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700">
            <p className="text-sm font-medium mb-1 text-gray-600 dark:text-slate-400">Admins with Countries</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {(() => {
                try {
                  const admins = JSON.parse(localStorage.getItem('admins') || '[]');
                  return admins.filter(a => a && a.countries && a.countries.length > 0).length;
                } catch {
                  return 0;
                }
              })()}
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700">
            <p className="text-sm font-medium mb-1 text-gray-600 dark:text-slate-400">Total Permissions</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {(() => {
                try {
                  const admins = JSON.parse(localStorage.getItem('admins') || '[]');
                  return admins.reduce((acc, admin) => acc + (admin && admin.permissions ? admin.permissions.length : 0), 0);
                } catch {
                  return 0;
                }
              })()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
