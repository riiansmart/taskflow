// Registration form + validation

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { RegisterRequest } from '../types/Auth';
import ErrorMessage from '../components/ErrorMessage';

const RegisterPage = () => {
  const navigate = useNavigate();
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
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit">Register</button>
      <ErrorMessage message={error} />
    </form>
  );
};

export default RegisterPage;