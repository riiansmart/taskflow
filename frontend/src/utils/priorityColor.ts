// Maps priorities to CSS class or color

// Map priority levels to UI colors or classes
export const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'HIGH':
        return 'text-red-600';
      case 'MEDIUM':
        return 'text-yellow-500';
      case 'LOW':
        return 'text-green-600';
      default:
        return 'text-gray-400';
    }
  };