// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { LoginRequest } from '../types/Auth';
import ErrorMessage from '../components/ErrorMessage';

const LoginPage = () => {
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
      const response = await loginUser(form); // API call
      login(response.token, response.user);   // Store session
      navigate('/dashboard');                 // Redirect on success
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">TaskFlow</div>
          <p className="description">Manage your tasks seamlessly. Please login or register to continue.</p>
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
              placeholder="Email"
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
              placeholder="Password"
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
  );
};

export default LoginPage;