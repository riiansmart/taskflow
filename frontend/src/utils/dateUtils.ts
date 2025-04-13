// formatDate(), isOverdue(), etc.

// Format a date string (YYYY-MM-DD) into a more readable form
export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Check if a task is overdue
  export const isOverdue = (dateStr: string): boolean => {
    const dueDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day
    return dueDate < today;
  };