import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { useTheme } from '../context/ThemeContext';

function UserLogin() {
  const { login } = useUserAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Initialize users if they don't exist or update existing users with passwords
  React.useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // If no users exist, create sample users
    if (existingUsers.length === 0) {
      const sampleUsers = [
        { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123', country: 'United States', createdAt: new Date().toISOString() },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123', country: 'United Kingdom', createdAt: new Date().toISOString() },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', password: 'password123', country: 'Canada', createdAt: new Date().toISOString() },
        { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', password: 'password123', country: 'Australia', createdAt: new Date().toISOString() },
        { id: '5', name: 'David Brown', email: 'david@example.com', password: 'password123', country: 'Germany', createdAt: new Date().toISOString() }
      ];
      localStorage.setItem('users', JSON.stringify(sampleUsers));
    } else {
      // Update existing users to ensure they have passwords
      const updatedUsers = existingUsers.map(user => {
        if (!user.password) {
          return { ...user, password: 'password123' };
        }
        return user;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Debug: Log users to console (remove in production)
    console.log('All users:', users);
    console.log('Login attempt:', { email: email.trim().toLowerCase(), password });
    
    // Find user with matching credentials (case-insensitive email)
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    
    const user = users.find(
      u => {
        const userEmail = (u.email || '').toLowerCase().trim();
        const inputEmail = trimmedEmail.toLowerCase();
        const emailMatch = userEmail === inputEmail;
        const passwordMatch = (u.password || '').trim() === trimmedPassword;
        
        return emailMatch && passwordMatch;
      }
    );

    if (user) {
      // Login successful - store user data
      login(user);
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-blue-50 dark:bg-slate-900">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow p-6 border border-blue-200 dark:border-slate-700">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
            <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Welcome Back</h1>
          <p className="text-sm text-gray-600 dark:text-slate-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-blue-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-blue-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0L9.88 9.88m-3.59-3.59l3.59 3.59M12 12l.01.01M21 12a9.97 9.97 0 01-1.563 3.029m-1.858-1.858A3 3 0 1115.243 8.243M12 12l3.29 3.29m0 0L21 21M15.29 15.29L12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-blue-300" />
              <span className="ml-2 text-gray-600 dark:text-slate-400">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-slate-400">
          <p>Demo: mike@example.com / password123</p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;

