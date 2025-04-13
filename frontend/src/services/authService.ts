// login(), register(), logout()

import api from './api';
import { LoginRequest, RegisterRequest, JwtResponse } from '../types/Auth';

// Send login credentials, receive token + user
export const loginUser = async (data: LoginRequest): Promise<JwtResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

// Register a new user account
export const registerUser = async (data: RegisterRequest): Promise<void> => {
  await api.post('/auth/register', data);
};
