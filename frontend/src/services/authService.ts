// login(), register(), logout()

import api from './api';
import { LoginRequest, RegisterRequest, JwtResponse } from '../types/Auth';
import { User } from '../types/User';

// Send login credentials, receive token + user
export const loginUser = async (data: LoginRequest): Promise<JwtResponse> => {
  const response = await api.post('/v1/auth/login', data);
  return response.data;
};

// Register a new user account
export const registerUser = async (data: RegisterRequest): Promise<void> => {
  await api.post('/v1/auth/register', data);
};

// Get user information using token
export const getUserInfo = async (token: string): Promise<User> => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await api.get('/v1/auth/user');
  return response.data;
};
