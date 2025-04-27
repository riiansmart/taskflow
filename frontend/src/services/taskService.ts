// getTasks(), createTask(), updateTask(), deleteTask()

import api from './api';
import { Task } from '../types/Task';

// Fetch all tasks for the current user
export const getTasks = async () => {
  const token = localStorage.getItem('token')

  const response = await api.get('/v1/tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  console.log('Raw tasks response:', response);
  
  // Handle paginated response with content array
  if (response.data && response.data.content) {
    return response.data.content;
  }
  
  // Fallback for other response formats
  return response.data && response.data.data ? response.data.data : response.data;
}

// Get a single task by ID
export const getTaskById = async (id: number): Promise<Task> => {
  const token = localStorage.getItem('token')
  const response = await api.get(`/v1/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Create a new task
export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const token = localStorage.getItem('token')
  const response = await api.post('/v1/tasks', task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update an existing task
export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  const token = localStorage.getItem('token')
  const response = await api.put(`/v1/tasks/${id}`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a task
export const deleteTask = async (id: number): Promise<void> => {
  const token = localStorage.getItem('token')
  await api.delete(`/v1/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
