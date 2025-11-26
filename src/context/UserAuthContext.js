import React, { createContext, useContext, useState, useEffect } from 'react';

const UserAuthContext = createContext();

export function UserAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user_authenticated');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('user_authenticated') !== null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user_authenticated', JSON.stringify(user));
    } else {
      localStorage.removeItem('user_authenticated');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user_authenticated', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user_authenticated');
  };

  return (
    <UserAuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within UserAuthProvider');
  }
  return context;
}

