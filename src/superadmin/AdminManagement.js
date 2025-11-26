import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import CreateAdminModal from './CreateAdminModal';
import EditAdminModal from './EditAdminModal';
import PasswordCell from './PasswordCell';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Italy', 'Spain', 'India', 'Japan', 'China', 'Brazil',
  'Mexico', 'Russia', 'South Korea', 'Netherlands', 'Sweden', 'Norway'
];

const PERMISSIONS = [
  { id: 'view_users', label: 'View Users' },
  { id: 'edit_users', label: 'Edit Users' },
  { id: 'delete_users', label: 'Delete Users' },
  { id: 'view_reports', label: 'View Reports' },
  { id: 'manage_content', label: 'Manage Content' },
  { id: 'manage_settings', label: 'Manage Settings' }
];

function AdminManagement() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [admins, setAdmins] = useState(() => {
    const saved = localStorage.getItem('admins');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (admins.length >= 0) {
      localStorage.setItem('admins', JSON.stringify(admins));
    }
  }, [admins]);

  const handleCreateAdmin = (adminData) => {
    try {
      const newAdmin = {
        id: Date.now().toString(),
        ...adminData,
        createdAt: new Date().toISOString()
      };
      setAdmins(prevAdmins => [...prevAdmins, newAdmin]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Failed to create admin. Please try again.');
    }
  };

  const handleUpdateAdmin = (adminData) => {
    try {
      setAdmins(prevAdmins => prevAdmins.map(admin => 
        admin.id === editingAdmin.id ? { ...admin, ...adminData } : admin
      ));
      setEditingAdmin(null);
    } catch (error) {
      console.error('Error updating admin:', error);
      alert('Failed to update admin. Please try again.');
    }
  };

  const handleDeleteAdmin = (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(admin => admin.id !== id));
    }
  };

  const filteredAdmins = admins.filter(admin =>
    admin.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Admin Management</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-slate-700 text-white hover:bg-gray-800 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium text-sm"
        >
          + Create New Admin
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by User ID or Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all"
        />
      </div>

      {/* Admins List */}
      {filteredAdmins.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-8 text-center">
          <p className="text-lg text-gray-500 dark:text-slate-400">No admins found. Create your first admin to get started.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700/50">
              <thead className="bg-gray-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-slate-300">
                    Username
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    Password
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-slate-300">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-slate-300">
                    Countries
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-slate-300">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-slate-300">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                {filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{admin.userId}</div>
                        <button
                          onClick={() => navigator.clipboard.writeText(admin.userId)}
                          className="text-xs transition-colors text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-300"
                          title="Copy username"
                        >
                          📋
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PasswordCell password={admin.password} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-slate-300">{admin.name || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {admin.countries && admin.countries.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {admin.countries.slice(0, 2).map((country, idx) => (
                              <span key={idx} className="px-2 py-1 rounded text-xs border bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-600">
                                {country}
                              </span>
                            ))}
                            {admin.countries.length > 2 && (
                              <span className="px-2 py-1 rounded text-xs border bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400 border-gray-200 dark:border-slate-600">
                                +{admin.countries.length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className={isDark ? 'text-slate-500' : 'text-gray-400'}>No countries assigned</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {admin.permissions && admin.permissions.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {admin.permissions.slice(0, 2).map((perm, idx) => (
                              <span key={idx} className="px-2 py-1 rounded text-xs border bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-600">
                                {perm}
                              </span>
                            ))}
                            {admin.permissions.length > 2 && (
                              <span className="px-2 py-1 rounded text-xs border bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400 border-gray-200 dark:border-slate-600">
                                +{admin.permissions.length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className={isDark ? 'text-slate-500' : 'text-gray-400'}>No permissions</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-slate-400">
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setEditingAdmin(admin)}
                        className="mr-4 transition-colors text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="transition-colors text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <CreateAdminModal
          key={isCreateModalOpen ? 'create-modal' : 'closed'}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateAdmin}
          countries={COUNTRIES}
          permissions={PERMISSIONS}
        />
      )}

      {editingAdmin && (
        <EditAdminModal
          admin={editingAdmin}
          onClose={() => setEditingAdmin(null)}
          onUpdate={handleUpdateAdmin}
          countries={COUNTRIES}
          permissions={PERMISSIONS}
        />
      )}
    </div>
  );
}

export default AdminManagement;
