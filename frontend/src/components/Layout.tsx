import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../cyberpunk.css';

export function Layout() {
  const { toggleTheme } = useTheme();
  const { logout } = useAuth();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  return (
    <div className="container">
      <header className="header">
        <div className="logo">TaskFlow</div>
        <div className="user-section">
          <Link to={isProfilePage ? "/dashboard" : "/profile"} className="nav-link">
            {isProfilePage ? "Dashboard" : "Profile"}
          </Link>
          <button onClick={logout} className="nav-link">Logout</button>
          <div className="theme-toggle" onClick={toggleTheme}></div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}