import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function PasswordCell({ password }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <div className={`text-sm font-mono ${
        isDark ? 'text-slate-300' : 'text-gray-700'
      }`}>
        {showPassword ? password : '••••••••'}
      </div>
      <div className="flex space-x-1">
        <button
          onClick={() => setShowPassword(!showPassword)}
          className={`text-xs transition-colors ${
            isDark
              ? 'text-slate-400 hover:text-slate-300'
              : 'text-gray-400 hover:text-gray-600'
          }`}
          title={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(password)}
          className={`text-xs transition-colors ${
            isDark
              ? 'text-slate-400 hover:text-slate-300'
              : 'text-gray-400 hover:text-gray-600'
          }`}
          title="Copy password"
        >
          📋
        </button>
      </div>
    </div>
  );
}

export default PasswordCell;
