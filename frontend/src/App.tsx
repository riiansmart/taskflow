// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { Layout } from './components/Layout';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={!user ? <LandingPage /> : <Navigate to="/dashboard" replace />}
      />
      {/* Public routes */}
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/register"
        element={!user ? <RegisterPage /> : <Navigate to="/dashboard" replace />}
      />
      
      {/* Protected routes */}
      <Route
        element={user ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;