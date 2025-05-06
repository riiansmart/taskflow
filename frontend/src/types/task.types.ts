/**
 * task.types.ts
 * Type definitions for tasks and related enums.
 */

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface Task {
  id: string
  title: string
  description?: string
  dueDate: string
  status: TaskStatus
  priority: TaskPriority
  completed: boolean
  userId: number
  categoryId?: number
  createdAt?: string
  updatedAt?: string
}
