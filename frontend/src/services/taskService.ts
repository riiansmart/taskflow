// getTasks(), createTask(), updateTask(), deleteTask()

import api from './api';
import { Task } from '../types/Task';

// Fetch all tasks for the current user
export const getTasks = async (token: string): Promise<Task[]> => {
  const response = await api.get('/tasks', {
    headers: { Authorization: `Bearer ${token}` }, // Add token if not globally set
  });
  return response.data;
};

// Get a single task by ID
export const getTaskById = async (id: number, token: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Create a new task
export const createTask = async (task: Partial<Task>, token: string): Promise<Task> => {
  const response = await api.post('/tasks', task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update an existing task
export const updateTask = async (id: number, task: Partial<Task>, token: string): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a task
export const deleteTask = async (id: number, token: string): Promise<void> => {
  await api.delete(`/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
