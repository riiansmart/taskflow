// interface Category { id, name }

export interface Category {
    id: number;
    name: string;
    // Optional metadata
    description?: string;
    color?: string;
    icon?: string;
    isDefault?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }