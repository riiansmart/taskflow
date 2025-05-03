import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getCurrentUser } from '../services/userService'; // Assuming you have a service to fetch user details

export function OAuthRedirectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const errorParam = params.get('error');

    if (errorParam) {
      console.error("OAuth Error:", errorParam);
      setError(`Authentication failed: ${errorParam}`);
      setIsLoading(false);
      return;
    }

    if (!token) {
      console.error("OAuth Error: Token not found in redirect URL");
      setError('Authentication failed: Token missing.');
      setIsLoading(false);
      return;
    }

    console.log("Received token:", token);

    const fetchUserAndLogin = async () => {
      try {
        localStorage.setItem('token', token);
        const userResponse = await getCurrentUser();
        console.log("Fetched user data:", userResponse);

        if (userResponse && userResponse.data) {
          login(token, userResponse.data);
          console.log("Login successful via OAuth, navigating to dashboard...");
          navigate('/dashboard');
        } else {
          throw new Error('Failed to fetch user details after OAuth login.');
        }

      } catch (err) {
        // Handle error more specifically
        let errorMessage = 'Failed to retrieve user details after login. Please try logging in again.';
        if (err instanceof Error) {
            errorMessage = err.message;
            console.error("Error fetching user data after OAuth:", err);
        } else {
             console.error("Unknown error fetching user data after OAuth:", err);
        }
        setError(errorMessage);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndLogin();

  }, [location, navigate, login]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      {isLoading && <p>Processing authentication...</p>}
      {error && (
        <div style={{ color: 'red' }}>
          <h2>Authentication Failed</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/login')}>Return to Login</button>
        </div>
      )}
    </div>
  );
} 