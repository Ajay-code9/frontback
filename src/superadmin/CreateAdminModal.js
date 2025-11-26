import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

function CreateAdminModal({ onClose, onCreate, countries, permissions }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    name: '',
    countries: [],
    permissions: []
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const generateCredentials = () => {
    // Generate username: admin_ + random 6 digit number
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const username = `admin_${randomNum}`;
    
    // Generate password: 8 characters with letters and numbers
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    setFormData(prev => ({
      ...prev,
      userId: username,
      password: password
    }));
  };

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
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCreate(formData);
      // Reset form after successful creation
      setFormData({
        userId: '',
        password: '',
        name: '',
        countries: [],
        permissions: []
      });
      setErrors({});
      setShowPassword(false);
    }
  };

  // Generate credentials when modal opens
  useEffect(() => {
    generateCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-slate-700">
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Admin</h2>
          <button
            onClick={onClose}
            className="text-2xl transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Auto-generated Username */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={`block text-sm font-medium ${
                isDark ? 'text-slate-300' : 'text-gray-700'
              }`}>
                Username (Auto-generated) <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={generateCredentials}
                  className="text-xs px-2 py-1 rounded transition-colors bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300"
                >
                  Regenerate
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(formData.userId)}
                  className="text-xs px-2 py-1 rounded transition-colors bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300"
                >
                  Copy
                </button>
              </div>
            </div>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all ${errors.userId ? 'border-red-500' : ''}`}
              placeholder="Username will be auto-generated"
            />
            {errors.userId && <p className="mt-1 text-sm text-red-500">{errors.userId}</p>}
          </div>

          {/* Auto-generated Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={`block text-sm font-medium ${
                isDark ? 'text-slate-300' : 'text-gray-700'
              }`}>
                Password (Auto-generated) <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={generateCredentials}
                  className="text-xs px-2 py-1 rounded transition-colors bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300"
                >
                  Regenerate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="text-xs px-2 py-1 rounded transition-colors bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(formData.password)}
                  className="text-xs px-2 py-1 rounded transition-colors bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300"
                >
                  Copy
                </button>
              </div>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Password will be auto-generated"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">These credentials will be used by the admin to login</p>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Name (Optional)
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all"
              placeholder="Enter admin name"
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
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAdminModal;
