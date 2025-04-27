// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import NewTaskPage from './pages/NewTaskPage';
import EditTaskPage from './pages/EditTaskPage';
import { Layout } from './components/Layout';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public landing page always available */}
      <Route path="/" element={<LandingPage />} />
      {/* Public routes */}
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/register"
        element={!user ? <RegisterPage /> : <Navigate to="/dashboard" replace />}
      />
      
      {/* Protected routes under Layout */}
      <Route
        element={user ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tasks/new" element={<NewTaskPage />} />
        <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
        
        {/* 404 page for protected routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Catch-all redirects to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;