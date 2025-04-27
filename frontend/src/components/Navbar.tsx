// Top nav bar, links, logout

import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import React from 'react';
<<<<<<< HEAD
=======
import Diamond3D from './Diamond3D';
import './Navbar.css';
>>>>>>> O-Dev

export function Navbar() {
  const { toggleTheme } = useTheme();
  const location = useLocation();
  const hideAuthLinks = location.pathname === '/login' || location.pathname === '/register';
  return (
    <header className="header container">
<<<<<<< HEAD
      <div className="logo">TaskFlow</div>
=======
      <div className="logo-wrapper">
        <Diamond3D />
        <div className="logo">TaskFlow</div>
      </div>
>>>>>>> O-Dev
      <div className="user-section">
        {!hideAuthLinks && (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
        <div className="theme-toggle" id="theme-toggle" onClick={toggleTheme}></div>
      </div>
    </header>
  );
}

export default Navbar;