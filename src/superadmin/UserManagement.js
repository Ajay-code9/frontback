import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

function UserManagement() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');

  useEffect(() => {
    try {
      if (users && users.length >= 0) {
        localStorage.setItem('users', JSON.stringify(users));
      }
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }, [users]);

  // Sample users for demonstration (in production, this would come from an API)
  useEffect(() => {
    if (users.length === 0) {
      const sampleUsers = [
        { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123', country: 'United States', createdAt: new Date().toISOString() },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123', country: 'United Kingdom', createdAt: new Date().toISOString() },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', password: 'password123', country: 'Canada', createdAt: new Date().toISOString() },
        { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', password: 'password123', country: 'Australia', createdAt: new Date().toISOString() },
        { id: '5', name: 'David Brown', email: 'david@example.com', password: 'password123', country: 'Germany', createdAt: new Date().toISOString() }
      ];
      setUsers(sampleUsers);
    }
  }, []);

  const countries = [...new Set(users.map(u => u.country))].sort();

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !filterCountry || user.country === filterCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>User Management</h2>
        <div className={`text-sm ${
          isDark ? 'text-slate-300' : 'text-gray-600'
        }`}>
          Total Users: <span className={`font-semibold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>{users.length}</span>
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
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all"
          />
        </div>
        <div className="w-full sm:w-64">
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all"
          >
            <option value="" className={isDark ? 'bg-slate-800' : 'bg-white'}>All Countries</option>
            {countries.map(country => (
              <option key={country} value={country} className={isDark ? 'bg-slate-800' : 'bg-white'}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-8 text-center">
          <p className="text-lg text-gray-500 dark:text-slate-400">No users found.</p>
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
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-slate-300">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-slate-300">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-slate-300">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-slate-300">
                    Created
                  </th>
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
          <div className="text-sm mb-1 text-gray-600 dark:text-slate-400">Total Users</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{users.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
          <div className="text-sm mb-1 text-gray-600 dark:text-slate-400">Countries</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{countries.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
          <div className="text-sm mb-1 text-gray-600 dark:text-slate-400">Filtered Results</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{filteredUsers.length}</div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
