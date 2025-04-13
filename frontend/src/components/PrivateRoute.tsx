// Wrapper for protected routes

import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Access auth context
import { JSX } from 'react';

interface Props {
  children: JSX.Element; // Route component to render
}

const PrivateRoute = ({ children }: Props) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />; // Redirect if not logged in
};

export default PrivateRoute;