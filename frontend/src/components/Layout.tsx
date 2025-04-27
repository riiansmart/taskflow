import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { Outlet } from 'react-router-dom'
import '../cyberpunk.css';

// Layout with header and theme toggle, renders nested pages via Outlet
export function Layout() {
  const { toggleTheme } = useTheme()

  return (
    <div className="container">
      <header className="header">
        <div className="logo">TaskFlow</div>
        <div className="user-section">
          <div className="theme-toggle" onClick={toggleTheme}></div>
        </div>
      </header>
      <Outlet />
    </div>
  )
} 