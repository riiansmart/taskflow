// getCategories()

import api from './api';
import { Category } from '../types/Category';

// Fetch all available task categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data;
};