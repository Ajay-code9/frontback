import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useTheme } from '../context/ThemeContext';
import AdminUserManagement from './AdminUserManagement';
import AdminOverview from './AdminOverview';
import IbRebateManagement from './IbRebateManagement';
import IbMarketingTools from './IbMarketingTools';
import { DashboardIcon, UserIcon, LogoutIcon, ChevronLeftIcon, ChevronRightIcon, SunIcon, MoonIcon } from '../superadmin/Icons';

function AdminDashboard() {
  const { admin, logout } = useAdminAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!admin) {
    navigate('/admin');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const menuItems = [
    { id: 'dashboard', label: 'IB Dashboard', icon: DashboardIcon },
    { id: 'rebates', label: 'Rebates & Wallet', icon: DashboardIcon },
    { id: 'marketing', label: 'Marketing Tools', icon: DashboardIcon },
    { id: 'users', label: 'Referred Traders', icon: UserIcon },
  ];

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
        <div className={`p-4 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'} bg-purple-900 dark:bg-slate-700`}>
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">IB Partner Console</h1>
                <p className="text-xs text-white/90 mt-0.5 font-normal truncate">
                  {admin.name || admin.userId} ({admin.ibCode || 'IB-1042'})
                </p>
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
                    ? 'bg-purple-100 dark:bg-slate-700 text-purple-900 dark:text-white font-medium'
                    : 'text-gray-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <IconComponent className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-purple-900 dark:text-white' : 'text-gray-600 dark:text-slate-400'}`} />
                {sidebarOpen && (
                  <span className={`text-sm ${isActive ? 'text-purple-900 dark:text-white' : 'text-gray-700 dark:text-slate-300'}`}>{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Section & Logout */}
        <div className={`p-4 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'} bg-white dark:bg-slate-800`}>
          <div className={`flex items-center space-x-3 mb-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-white text-xs bg-purple-600">
              IB
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{admin.name || admin.userId}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">Introducing Broker</p>
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
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-600 dark:text-slate-400"
                  title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                </button>
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-medium text-xs">
                  IB
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && <AdminOverview admin={admin} />}
          {activeTab === 'rebates' && <IbRebateManagement admin={admin} />}
          {activeTab === 'marketing' && <IbMarketingTools admin={admin} />}
          {activeTab === 'users' && <AdminUserManagement admin={admin} />}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;

