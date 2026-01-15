/**
 * Shared types for the application
 */

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  priority: Priority;
  tags: string[];
  dueDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  dueDate?: string;
  completed?: boolean;
  priority?: Priority;
  tags?: string[];
}

export interface AuthResponse {
  token: string;
}

export interface TaskSummary {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
}

export interface ApiErrorResponse {
  error: string;
}
