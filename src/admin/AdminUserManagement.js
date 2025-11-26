import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAdminAuth } from '../context/AdminAuthContext';

function AdminUserManagement({ admin }) {
  const { theme } = useTheme();
  const { admin: currentAdmin } = useAdminAuth();
  const isDark = theme === 'dark';
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');

  useEffect(() => {
    // Load users from localStorage
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Filter users by admin's assigned countries
    const assignedCountries = admin.countries || [];
    const filteredUsers = allUsers.filter(user => 
      assignedCountries.includes(user.country)
    );
    
    setUsers(filteredUsers);
  }, [admin]);

  // Get available countries from admin's assigned countries
  const availableCountries = admin.countries || [];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !filterCountry || user.country === filterCountry;
    return matchesSearch && matchesCountry;
  });

  // Check permissions
  const canEditUsers = currentAdmin?.permissions?.includes('edit_users');
  const canDeleteUsers = currentAdmin?.permissions?.includes('delete_users');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            User Management
          </h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Users from your assigned countries only
          </p>
        </div>
        <div className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
          Total Users: <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {filteredUsers.length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none backdrop-blur-sm ${
              isDark
                ? 'bg-slate-800/40 border-slate-700/50 text-white placeholder-slate-400 focus:ring-slate-500 focus:border-slate-600'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
        </div>
        {availableCountries.length > 0 && (
          <div className="w-full sm:w-64">
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none backdrop-blur-sm ${
                isDark
                  ? 'bg-slate-800/40 border-slate-700/50 text-white focus:ring-slate-500 focus:border-slate-600'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
              }`}
            >
              <option value="" className={isDark ? 'bg-slate-800' : 'bg-white'}>All Countries</option>
              {availableCountries.map(country => (
                <option key={country} value={country} className={isDark ? 'bg-slate-800' : 'bg-white'}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-8 text-center">
          <p className="text-lg text-gray-500 dark:text-slate-400">
            {users.length === 0 
              ? 'No users found in your assigned countries.' 
              : 'No users match your search criteria.'}
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700/50">
              <thead className="bg-gray-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-slate-300">
                    User ID
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    Name
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    Email
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    Country
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    Created
                  </th>
                  {(canEditUsers || canDeleteUsers) && (
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-slate-300' : 'text-gray-700'
                    }`}>
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-slate-300">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-slate-300">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded text-xs border bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-600">
                        {user.country}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-slate-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    {(canEditUsers || canDeleteUsers) && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {canEditUsers && (
                          <button
                            className="mr-4 transition-colors text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"
                            onClick={() => alert('Edit functionality coming soon')}
                          >
                            Edit
                          </button>
                        )}
                        {canDeleteUsers && (
                          <button
                            className="transition-colors text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this user?')) {
                                const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
                                const updatedUsers = allUsers.filter(u => u.id !== user.id);
                                localStorage.setItem('users', JSON.stringify(updatedUsers));
                                setUsers(users.filter(u => u.id !== user.id));
                              }
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
          <div className="text-sm mb-1 text-gray-600 dark:text-slate-400">
            Total Users
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {users.length}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
          <div className="text-sm mb-1 text-gray-600 dark:text-slate-400">
            Countries
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {availableCountries.length}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
          <div className="text-sm mb-1 text-gray-600 dark:text-slate-400">
            Filtered Results
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {filteredUsers.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserManagement;

