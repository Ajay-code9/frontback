import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { useTheme } from '../context/ThemeContext';
import { HomeIcon, ProfileIcon, AnalyticsIcon, ProjectsIcon, TasksIcon, CalendarIcon, MessagesIcon, NotificationsIcon, DocumentsIcon, TeamIcon, ActivityIcon, PreferencesIcon, BillingIcon, HelpIcon, SettingsIcon, LogoutIcon } from './Icons';
import { SunIcon, MoonIcon, ChevronLeftIcon, ChevronRightIcon } from '../superadmin/Icons';
import UserHome from './pages/UserHome';
import UserProfile from './pages/UserProfile';
import UserSettings from './pages/UserSettings';
import UserNotifications from './pages/UserNotifications';
import UserMessages from './pages/UserMessages';
import UserAnalytics from './pages/UserAnalytics';
import UserDocuments from './pages/UserDocuments';
import UserCalendar from './pages/UserCalendar';
import UserTasks from './pages/UserTasks';
import UserProjects from './pages/UserProjects';
import UserTeam from './pages/UserTeam';
import UserHelp from './pages/UserHelp';
import UserActivity from './pages/UserActivity';
import UserPreferences from './pages/UserPreferences';
import UserBilling from './pages/UserBilling';

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
    { id: 'home', label: 'Home', icon: HomeIcon, color: '#4285F4', activeColor: 'bg-[#4285F4]' },
    { id: 'profile', label: 'Profile', icon: ProfileIcon, color: '#EA4335', activeColor: 'bg-[#EA4335]' },
    { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon, color: '#34A853', activeColor: 'bg-[#34A853]' },
    { id: 'projects', label: 'Projects', icon: ProjectsIcon, color: '#FBBC05', activeColor: 'bg-[#FBBC05]' },
    { id: 'tasks', label: 'Tasks', icon: TasksIcon, color: '#4285F4', activeColor: 'bg-[#4285F4]' },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon, color: '#EA4335', activeColor: 'bg-[#EA4335]' },
    { id: 'messages', label: 'Messages', icon: MessagesIcon, color: '#34A853', activeColor: 'bg-[#34A853]' },
    { id: 'notifications', label: 'Notifications', icon: NotificationsIcon, color: '#FBBC05', activeColor: 'bg-[#FBBC05]' },
    { id: 'documents', label: 'Documents', icon: DocumentsIcon, color: '#4285F4', activeColor: 'bg-[#4285F4]' },
    { id: 'team', label: 'Team', icon: TeamIcon, color: '#EA4335', activeColor: 'bg-[#EA4335]' },
    { id: 'activity', label: 'Activity', icon: ActivityIcon, color: '#34A853', activeColor: 'bg-[#34A853]' },
    { id: 'preferences', label: 'Preferences', icon: PreferencesIcon, color: '#FBBC05', activeColor: 'bg-[#FBBC05]' },
    { id: 'billing', label: 'Billing', icon: BillingIcon, color: '#4285F4', activeColor: 'bg-[#4285F4]' },
    { id: 'help', label: 'Help & Support', icon: HelpIcon, color: '#EA4335', activeColor: 'bg-[#EA4335]' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, color: '#34A853', activeColor: 'bg-[#34A853]' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <UserHome user={user} />;
      case 'profile': return <UserProfile user={user} />;
      case 'analytics': return <UserAnalytics user={user} />;
      case 'projects': return <UserProjects user={user} />;
      case 'tasks': return <UserTasks user={user} />;
      case 'calendar': return <UserCalendar user={user} />;
      case 'messages': return <UserMessages user={user} />;
      case 'notifications': return <UserNotifications user={user} />;
      case 'documents': return <UserDocuments user={user} />;
      case 'team': return <UserTeam user={user} />;
      case 'activity': return <UserActivity user={user} />;
      case 'preferences': return <UserPreferences user={user} />;
      case 'billing': return <UserBilling user={user} />;
      case 'help': return <UserHelp user={user} />;
      case 'settings': return <UserSettings user={user} />;
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
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">
                  {user.name || 'User'}
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

