// src/utils/dateUtils.ts

// Format a date string (YYYY-MM-DD) into a more readable form
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return 'No due date';
  
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Check if a task is overdue
export const isOverdue = (dateStr: string): boolean => {
  if (!dateStr) return false;
  
  const dueDate = new Date(dateStr);
  const today = new Date();
  
  // Reset today's time to start of day for fair comparison
  today.setHours(0, 0, 0, 0);
  
  return dueDate < today;
};

// Get relative time description (e.g., "Today", "Tomorrow", "2 days ago")
export const getRelativeTime = (dateStr: string): string => {
  if (!dateStr) return 'No date';
  
  const date = new Date(dateStr);
  const now = new Date();
  
  // Reset time parts for fair comparison of days
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Format date without time
  const comparableDate = new Date(date);
  comparableDate.setHours(0, 0, 0, 0);
  
  // Calculate difference in days
  const diffTime = comparableDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  if (comparableDate.getTime() === today.getTime()) return 'Today';
  if (comparableDate.getTime() === tomorrow.getTime()) return 'Tomorrow';
  if (comparableDate.getTime() === yesterday.getTime()) return 'Yesterday';
  
  if (diffDays > 0) {
    return `In ${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
  }
  
  return `${Math.abs(diffDays)} ${Math.abs(diffDays) === 1 ? 'day' : 'days'} ago`;
};