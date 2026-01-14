/**
 * Shared types for the application
 */

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  dueDate?: string | null;
}

export interface TaskInput {
  title: string;
  description?: string;
  dueDate?: string;
}

export interface AuthResponse {
  token: string;
}

export interface TaskSummary {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
}

export interface ApiErrorResponse {
  error: string;
}
