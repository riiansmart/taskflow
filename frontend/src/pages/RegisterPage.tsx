// src/pages/RegisterPage.tsx
import React from 'react'
import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { RegisterRequest } from '../types/Auth';
import ErrorMessage from '../components/ErrorMessage';
import Navbar from '../components/Navbar';

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState<RegisterRequest>({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update form state on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new user registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await registerUser(form); // Register user via API
      navigate('/login?registered=true'); // Redirect to login with success param
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo">TaskFlow</div>
            <p className="welcome-description">Manage your tasks seamlessly. Please create an account to continue.</p>
          </div>
          
          <div className="auth-tabs">
            <Link 
              to="/login" 
              className={`auth-tab${location.pathname === '/login' ? ' active' : ''}`}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className={`auth-tab${location.pathname === '/register' ? ' active' : ''}`}
            >
              Register
            </Link>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <i className="fas fa-user input-icon"></i>
              <input
                className="auth-input"
                name="name"
                placeholder="e.g. John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <i className="fas fa-envelope input-icon"></i>
              <input
                className="auth-input"
                name="email"
                type="email"
                placeholder="e.g. john.doe@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <i className="fas fa-lock input-icon"></i>
              <input
                className="auth-input"
                name="password"
                type="password"
                placeholder="Your password (min 6 chars)"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
            
            <button 
              type="submit" 
              className="auth-button glow-effect" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Processing...
                </>
              ) : (
                'Register'
              )}
            </button>
            
            {error && <ErrorMessage message={error} />}
            {/* Link back to landing */}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Link to="/" className="nav-link">Back to Home</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}