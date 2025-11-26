import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AdminManagement from './AdminManagement';
import UserManagement from './UserManagement';
import DashboardOverview from './DashboardOverview';
import { DashboardIcon, UsersIcon, UserIcon, SettingsIcon, LogoutIcon, ChevronLeftIcon, ChevronRightIcon, SunIcon, MoonIcon } from './Icons';

function SuperAdminDashboard() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/superadmin');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'admins', label: 'Admin Management', icon: UsersIcon },
    { id: 'users', label: 'User Management', icon: UserIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} ${
        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-900'
      } border-r transition-all duration-300 ease-in-out flex flex-col fixed h-full z-20 shadow-lg`}>
        {/* Logo/Brand */}
        <div className={`p-4 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'} bg-gray-900 dark:bg-slate-700`}>
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">SuperAdmin</h1>
                <p className="text-xs text-white/90 mt-0.5 font-normal">Control Panel</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-white/20 transition-colors text-white"
            >
              {sidebarOpen ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto bg-white dark:bg-slate-800">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-150 ${
                  isActive
                    ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-medium'
                    : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <IconComponent className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-slate-400'}`} />
                {sidebarOpen && (
                  <span className={`text-sm ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-slate-300'}`}>{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Section & Logout */}
        <div className={`p-4 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'} bg-white dark:bg-slate-800`}>
          <div className={`flex items-center space-x-3 mb-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-gray-700 dark:text-slate-300 text-xs ${
              isDark ? 'bg-slate-700' : 'bg-gray-200'
            }`}>
              SA
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">Super Admin</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">Administrator</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm"
          >
            <LogoutIcon className="w-4 h-4" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h2>
              </div>
              <div className="flex items-center space-x-3">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-600 dark:text-slate-400"
                  title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                </button>
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center font-medium text-gray-700 dark:text-slate-300 text-xs">
                  SA
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && <DashboardOverview />}
          {activeTab === 'admins' && <AdminManagement />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Settings</h3>
              <p className="text-gray-600 dark:text-slate-400">Settings panel coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
