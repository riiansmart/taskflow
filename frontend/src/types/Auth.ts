// interface LoginRequest, JwtResponse, etc.

import { User } from "./User";

// Login request payload
export interface LoginRequest {
    email: string;
    password: string;
  }
  
  // Register request payload
  export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
  }
  
  // JWT response payload from backend
  export interface JwtResponse {
    token: string;
    user: User;
  }
  
  
  // src/types/ApiResponse.ts
  
  // Generic API response shape
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
  }