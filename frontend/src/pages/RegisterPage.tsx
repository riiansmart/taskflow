// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { RegisterRequest } from '../types/Auth';
import ErrorMessage from '../components/ErrorMessage';

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState<RegisterRequest>({ name: '', email: '', password: '' });
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
      await registerUser(form);
      navigate('/login?registered=true');
    } catch (err) {
      let errorMessage = 'Registration failed. Please try again.';
       if (typeof err === 'object' && err !== null && 'response' in err) {
         const axiosError = err as { response?: { data?: { message?: string } } };
         errorMessage = axiosError.response?.data?.message || errorMessage;
       }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isCurrentPath = (path: string) => location.pathname === path;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="logo">TaskFlow</h1>
            <p className="description">Create an account to manage your tasks.</p>
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
               <span className="input-icon"><i className="fas fa-user"></i></span>
              <input
                className="auth-input"
                name="name"
                placeholder="Full Name (e.g., John Doe)"
                value={form.name}
                onChange={handleChange}
                required
                aria-label="Full Name"
              />
            </div>
              
            <div className="form-group">
              <span className="input-icon"><i className="fas fa-envelope"></i></span>
              <input
                className="auth-input"
                name="email"
                type="email"
                placeholder="Email (e.g., john.doe@example.com)"
                value={form.email}
                onChange={handleChange}
                required
                aria-label="Email Address"
              />
            </div>
              
            <div className="form-group">
              <span className="input-icon"><i className="fas fa-lock"></i></span>
              <input
                className="auth-input"
                name="password"
                type="password"
                placeholder="Password (min 6 characters)"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
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
                  Processing...
                </>
              ) : (
                'Register'
              )}
            </button>
              
            <div className="back-home-container">
              <Link to="/" className="back-home-link">Back to Home</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}