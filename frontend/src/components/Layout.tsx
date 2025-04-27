import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../cyberpunk.css';

export function Layout() {
  const { toggleTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <div className="container">
      <header className="header">
        <div className="logo">TaskFlow</div>
        <div className="user-section">
          <Link to="/profile" className="nav-link">Profile</Link>
          <button onClick={logout} className="nav-link">Logout</button>
          <div className="theme-toggle" onClick={toggleTheme}></div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}