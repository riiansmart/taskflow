// src/pages/LoginPage.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { LoginRequest } from '../types/Auth';
import ErrorMessage from '../components/ErrorMessage';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState<LoginRequest>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update form state on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Attempt to log in and update auth context
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Attempting login with:', form);
      const response = await loginUser(form); // API call
      console.log('Login response:', response);
      
      // Check if response has the expected structure
      if (response.data && response.data.token) {
        // Create a basic user object if user is null
        const user = response.data.user || {
          id: 0,
          name: form.email.split('@')[0], // Use email username as name
          email: form.email,
          role: 'USER'
        };
        
        login(response.data.token, user);   // Store session
        console.log('Auth context updated, navigating to dashboard');
        navigate('/dashboard');                 // Redirect on success
      } else {
        console.error('Unexpected response format:', response);
        setError('Server returned an unexpected response format');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
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
            <p className="welcome-description">Manage your tasks seamlessly. Please login or register to continue.</p>
          </div>
          
          <div className="auth-tabs">
            <Link 
              to="/login" 
              className={`auth-tab${location.pathname === '/login' || location.pathname === '/' ? ' active' : ''}`}
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
                'Login'
              )}
            </button>
            
            {error && <ErrorMessage message={error} />}
          </form>
        </div>
      </div>
    </>
  );
}