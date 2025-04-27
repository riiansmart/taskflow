// Top nav bar, links, logout

import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Diamond3D from './Diamond3D';
import './Navbar.css';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const hideAuthLinks = location.pathname === '/login' || location.pathname === '/register';
  return (
    <header className="header container">
      <div className="logo-wrapper">
        <Link to="/">
          <Diamond3D />
        </Link>
        <div className="logo">TaskFlow</div>
      </div>
      <div className="user-section">
        {user ? (
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        ) : !hideAuthLinks && (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
        <div className="theme-toggle" id="theme-toggle" onClick={toggleTheme}></div>
      </div>
    </header>
  );
}

export default Navbar;