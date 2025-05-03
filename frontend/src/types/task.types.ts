// frontend/src/types/task.types.ts

export interface Task {
  id: string;
  title: string;
  type: 'feature' | 'bug' | 'improvement'; // Example types
  status: 'todo' | 'in-progress' | 'review' | 'done'; // Example statuses
  priority: 'low' | 'medium' | 'high'; // Example priorities
  dueDate: string; // Consider using Date object if time is important
  assignee: string;
  storyPoints?: number; // Optional field
  description: string;
  createdAt: string; // ISO 8601 string format
  updatedAt: string; // ISO 8601 string format

  /**
   * Array of acceptance criteria strings associated with the task.
   * Optional because not every task will define them.
   */
  acceptanceCriteria?: string[]

  /**
   * Labels/tags assigned to the task for filtering or grouping.
   */
  labels?: string[]

  /**
   * Activity feed items (comments, status changes, etc.)
   */
  activity?: Array<{
    id: string
    user: string
    /** ISO string */
    date: string
    comment: string
  }>
}
