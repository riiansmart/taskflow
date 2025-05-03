import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../hooks/useAuth'
import Diamond3D from './Diamond3D'
import '../styles/MainNav.css'

export function MainNav() {
  const { toggleTheme } = useTheme()
  const { user } = useAuth()
  const location = useLocation()
  const hideAuthLinks = location.pathname === '/login' || location.pathname === '/register'

  return (
    <nav className="main-nav">
      {/* Top TaskFlow Navigation */}
      <div className="top-nav">
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
          <button
            type="button"
            aria-label="Toggle theme"
            className="theme-toggle"
            onClick={toggleTheme}
          />
        </div>
      </div>

      {/* VSCode-style Menu Bar */}
      <div className="menu-bar">
        <div className="menu-item">File</div>
        <div className="menu-item">Edit</div>
        <div className="menu-item">Selection</div>
        <div className="menu-item">View</div>
        <div className="menu-item">Timeline</div>
        <div className="menu-item">Home</div>
      </div>
    </nav>
  )
}

export default MainNav 