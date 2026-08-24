import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { useTheme } from '../context/ThemeContext';
import { HomeIcon, ProfileIcon, AnalyticsIcon, BillingIcon, SettingsIcon, LogoutIcon } from './Icons';
import { SunIcon, MoonIcon, ChevronLeftIcon, ChevronRightIcon } from '../superadmin/Icons';
import UserHome from './pages/UserHome';
import UserProfile from './pages/UserProfile';
import UserBilling from './pages/UserBilling';
import UserAnalytics from './pages/UserAnalytics';
import TradingAccounts from './pages/TradingAccounts';

import CopyTradingMarketplace from './pages/CopyTradingMarketplace';

function UserDashboard() {
  const { user, logout } = useUserAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'home', label: 'Overview', icon: HomeIcon },
    { id: 'accounts', label: 'Trading Accounts', icon: ProfileIcon },
    { id: 'copy', label: 'Copy Trading Hub', icon: AnalyticsIcon },
    { id: 'billing', label: 'Deposit & Withdraw', icon: BillingIcon },
    { id: 'profile', label: 'KYC & Profile', icon: SettingsIcon },
    { id: 'analytics', label: 'Trade Performance', icon: AnalyticsIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <UserHome user={user} />;
      case 'accounts': return <TradingAccounts user={user} />;
      case 'copy': return <CopyTradingMarketplace user={user} />;
      case 'billing': return <UserBilling user={user} />;
      case 'profile': return <UserProfile user={user} />;
      case 'analytics': return <UserAnalytics user={user} />;
      default: return <UserHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-slate-800 border-r border-blue-200 dark:border-slate-700 transition-all duration-300 flex flex-col fixed h-full z-20`}>
        {/* Logo/Brand */}
        <div className="p-4 border-b border-blue-200 dark:border-slate-700 bg-blue-100 dark:bg-blue-900/30">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  Trader Cabinet
                </h1>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                  {user.name || 'Trader'}
                </p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded hover:bg-blue-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-400"
            >
              {sidebarOpen ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto bg-white dark:bg-slate-800">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                    : 'text-gray-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700'
                }`}
              >
                <IconComponent className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-slate-400'}`} />
                {sidebarOpen && (
                  <span className={`text-sm ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-slate-300'}`}>{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Section & Logout */}
        <div className="p-4 border-t border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className={`flex items-center space-x-2 mb-2 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-medium text-blue-700 dark:text-blue-400 text-xs">
              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  {user.name || 'User'}
                </p>
                <p className="text-xs text-gray-600 dark:text-slate-400 truncate">{user.email}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded text-gray-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 text-sm"
          >
            <LogoutIcon className="w-4 h-4" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-blue-200 dark:border-slate-700 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {menuItems.find(item => item.id === activeTab)?.label || 'Home'}
                </h2>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 transition"
                >
                  {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                </button>
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-medium text-blue-700 dark:text-blue-400 text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;

