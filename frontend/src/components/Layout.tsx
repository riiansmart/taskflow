import { useTheme } from '../context/ThemeContext';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../cyberpunk.css';
import Diamond3D from './Diamond3D';
import './Navbar.css';

export function Layout() {
  const { toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isNewTaskPage = location.pathname === '/tasks/new';
  const isProfilePage = location.pathname === '/profile';
  const isDashboardLink = isNewTaskPage || isProfilePage;
  const navLinkPath = isDashboardLink ? '/dashboard' : '/profile';
  const navLinkText = isDashboardLink ? 'Dashboard' : 'Profile';
  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container">
      <header className="header">
        <div className="logo-wrapper">
          <Link to="/">
            <Diamond3D />
          </Link>
          <div className="logo">TaskFlow</div>
        </div>
        <div className="user-section">
          <Link to="/" className="nav-link">Home</Link>
          <Link to={navLinkPath} className="nav-link">{navLinkText}</Link>
          <button onClick={logout} className="nav-link">Logout</button>
          <div className="theme-toggle" onClick={toggleTheme}></div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}