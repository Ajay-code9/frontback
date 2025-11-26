import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

function EditAdminModal({ admin, onClose, onUpdate, countries, permissions }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    userId: admin.userId || '',
    password: '',
    name: admin.name || '',
    countries: admin.countries || [],
    permissions: admin.permissions || []
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (admin) {
      setFormData({
        userId: admin.userId || '',
        password: '',
        name: admin.name || '',
        countries: admin.countries || [],
        permissions: admin.permissions || []
      });
      setErrors({});
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCountryToggle = (country) => {
    setFormData(prev => ({
      ...prev,
      countries: prev.countries.includes(country)
        ? prev.countries.filter(c => c !== country)
        : [...prev.countries, country]
    }));
  };

  const handlePermissionToggle = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.userId.trim()) newErrors.userId = 'User ID is required';
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password; // Don't update password if not changed
      }
      onUpdate(updateData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-slate-700">
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Admin</h2>
          <button
            onClick={onClose}
            className="text-2xl transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              User ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all ${errors.userId ? 'border-red-500' : ''}`}
            />
            {errors.userId && <p className="mt-1 text-sm text-red-500">{errors.userId}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              New Password (leave blank to keep current)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Enter new password (optional)"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none backdrop-blur-sm ${
                isDark
                  ? 'bg-slate-900/40 border-slate-700/50 text-white placeholder-slate-400 focus:ring-slate-500 focus:border-slate-600'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Assign Countries
            </label>
            <div className="border border-gray-300 dark:border-slate-600 rounded-lg p-4 max-h-48 overflow-y-auto bg-gray-50 dark:bg-slate-900/50">
              <div className="grid grid-cols-2 gap-2">
                {countries.map((country) => (
                  <label key={country} className="flex items-center space-x-2 cursor-pointer p-2 rounded transition-colors hover:bg-gray-100 dark:hover:bg-slate-800/40">
                    <input
                      type="checkbox"
                      checked={formData.countries.includes(country)}
                      onChange={() => handleCountryToggle(country)}
                      className="w-4 h-4 rounded text-gray-600 dark:text-slate-400 focus:ring-gray-500 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                    />
                    <span className="text-sm text-gray-700 dark:text-slate-300">{country}</span>
                  </label>
                ))}
              </div>
            </div>
            {formData.countries.length > 0 && (
              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                Selected: {formData.countries.length} country(ies)
              </p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Assign Permissions
            </label>
            <div className={`border rounded-lg backdrop-blur-sm p-4 ${
              isDark
                ? 'border-slate-700/50 bg-slate-900/20'
                : 'border-gray-300 bg-gray-50'
            }`}>
              <div className="space-y-2">
                {permissions.map((permission) => (
                  <label key={permission.id} className="flex items-center space-x-2 cursor-pointer p-2 rounded transition-colors hover:bg-gray-100 dark:hover:bg-slate-800/40">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission.id)}
                      onChange={() => handlePermissionToggle(permission.id)}
                      className="w-4 h-4 rounded text-gray-600 dark:text-slate-400 focus:ring-gray-500 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                    />
                    <span className="text-sm text-gray-700 dark:text-slate-300">{permission.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {formData.permissions.length > 0 && (
              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                Selected: {formData.permissions.length} permission(s)
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gray-900 dark:bg-slate-700 text-white hover:bg-gray-800 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium"
            >
              Update Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAdminModal;

