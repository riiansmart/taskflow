// interface Task { id, title, dueDate, ... }

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string; // Format: YYYY-MM-DD
  priority: Priority;
  completed: boolean;
  userId: number;
  categoryId?: number;
  createdAt?: string;
  updatedAt?: string;
}