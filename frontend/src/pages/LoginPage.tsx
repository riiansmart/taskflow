// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Navigation } from '../components/navigation/Navigation';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { ErrorMessage } from '../components/ui/CommonComponents';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await loginUser(form);
      
      if (response.data && response.data.token) {
        const user = response.data.user || {
          id: 0,
          name: form.email.split('@')[0],
          email: form.email,
          role: 'USER'
        };
        
        login(response.data.token, user);
        navigate('/dashboard');
      } else {
        setError(response.data?.message || 'Server returned an unexpected response format');
      }
    } catch (err) {
      let errorMessage = 'Invalid credentials or server error.';
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isCurrentPath = (path: string) => location.pathname === path || (path === '/login' && location.pathname === '/');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="logo">TaskFlow</h1>
            <p className="description">Manage your tasks seamlessly. Please login or register to continue.</p>
          </div>
            
          <div className="auth-tabs">
            <Link 
              to="/login" 
              className={`auth-tab ${isCurrentPath('/login') ? 'active' : ''}`}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className={`auth-tab ${isCurrentPath('/register') ? 'active' : ''}`}
            >
              Register
            </Link>
          </div>
            
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <span className="input-icon"><i className="fas fa-envelope"></i></span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email (e.g., user@example.com)"
                className="auth-input"
                required
                aria-label="Email Address"
              />
            </div>
            <div className="form-group">
               <span className="input-icon"><i className="fas fa-lock"></i></span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password (e.g., Pa$$w0rd)"
                className="auth-input"
                required
                aria-label="Password"
              />
            </div>
            
            {error && <ErrorMessage message={error} />}
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="or-container">
             <span className="or-text">OR</span>
          </div>

          <div className="oauth-buttons">
            <button 
              onClick={() => { window.location.href = 'http://localhost:8081/oauth2/authorization/github' }}
              className="github-button"
              aria-label="Continue with GitHub"
            >
              <i className="fab fa-github"></i>
              Continue with GitHub
            </button>
          </div>
            
          <div className="back-home-container">
            <Link to="/" className="back-home-link">Back to Home</Link>
          </div>
        </div>
      </main>
    </div>
  );
}