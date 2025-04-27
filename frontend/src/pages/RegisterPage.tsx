// Registration form + validation

import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { RegisterRequest } from '../types/Auth';
import ErrorMessage from '../components/ErrorMessage';

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState<RegisterRequest>({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  // Update form state on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new user registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(form); // Register user via API
      navigate('/');            // Redirect to login
    } catch {
      setError('Registration failed');
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
          <Link to="/login" className={`auth-tab${location.pathname === '/login' ? ' active' : ''}`}>Login</Link>
          <Link to="/register" className={`auth-tab${location.pathname === '/register' ? ' active' : ''}`}>Register</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-button">
            Register
          </button>
          <ErrorMessage message={error} />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;