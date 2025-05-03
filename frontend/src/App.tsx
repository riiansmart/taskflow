// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { OAuthRedirectPage } from './pages/OAuthRedirectPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { Layout } from './components/Layout';
import { TaskFlowDashboard } from './components/TaskFlowDashboard';

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
      {/* OAuth Callback Route - public, handles redirect */}
      <Route path="/oauth/redirect" element={<OAuthRedirectPage />} />

      {/* Protected routes - All inside Layout */}
      <Route
        element={user ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route path="/dashboard" element={<TaskFlowDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;