// interface User { id, email, name, role }

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN'; // Role-based access
    createdAt?: string;
    updatedAt?: string;
  }
  