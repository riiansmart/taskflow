// Axios instance with auth header

import axios from 'axios';

// Create Axios instance with base config
const api = axios.create({
  baseURL: '/api', // Proxy handles full URL
});

// Attach token to headers for authenticated requests
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;