// Top nav bar, links, logout

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Diamond3D from './Diamond3D';
import './Navbar.css'; // Re-added CSS import
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { toggleTheme } = useTheme(); // Reverted useTheme usage
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isOnAuthPage = location.pathname === '/login' || location.pathname === '/register'; // Renamed for clarity: Are we on an authentication page?

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // Reverted to original structure and class names
    <header className="header container">
      <div className="logo-wrapper">
        <Link to="/">
          {/* Removed width/height props from Diamond3D */}
          <Diamond3D />
        </Link>
        <div className="logo">TaskFlow</div>
      </div>
      <div className="user-section">
        {/* Always show Home link */}
        <Link to="/" className="nav-link">Home</Link>
        
        {user ? (
          // If user is logged in
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
          </>
        ) : (
          // If user is not logged in
          // Show Login/Register only if NOT on an auth page
          !isOnAuthPage && (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )
        )}
        
        {/* Theme toggle */}
        <button
          type="button"
          aria-label="Toggle theme"
          className="theme-toggle"
          onClick={toggleTheme}
        />
      </div>
    </header>
  );
}

// Re-added default export (optional, but was there originally)
export default Navbar;