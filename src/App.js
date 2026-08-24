import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SuperAdminLogin from './superadmin/SuperAdminLogin';
import SuperAdminDashboard from './superadmin/SuperAdminDashboard';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import UserLogin from './user/UserLogin';
import UserDashboard from './user/UserDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { UserAuthProvider, useUserAuth } from './context/UserAuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <UserAuthProvider>
              <Routes>
                {/* Superadmin Routes - Default Root */}
                <Route path="/" element={<SuperAdminLogin />} />
                <Route path="/superadmin" element={<SuperAdminLogin />} />
                <Route path="/superadmin/dashboard" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />

                {/* User Routes */}
                <Route path="/user" element={<UserLogin />} />
                <Route path="/dashboard" element={<UserProtectedRoute><UserDashboard /></UserProtectedRoute>} />
              </Routes>
            </UserAuthProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/superadmin" replace />;
}

function AdminProtectedRoute({ children }) {
  const { isAuthenticated } = useAdminAuth();
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
}

function UserProtectedRoute({ children }) {
  const { isAuthenticated } = useUserAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default App;

