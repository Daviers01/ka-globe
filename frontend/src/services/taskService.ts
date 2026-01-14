/**
 * Task API service
 */

import api from '@/lib/api';
import type { Task, TaskInput, TaskSummary } from '@/types';

export const taskService = {
  async fetchTasks(): Promise<Task[]> {
    const res = await api.get('/api/tasks');
    return res.data;
  },

  async getTask(id: string): Promise<Task> {
    const res = await api.get(`/api/tasks/${id}`);
    return res.data;
  },

  async createTask(data: TaskInput): Promise<Task> {
    const res = await api.post('/api/tasks', data);
    return res.data;
  },

  async updateTask(id: string, data: Partial<TaskInput> & { completed?: boolean }): Promise<Task> {
    const res = await api.put(`/api/tasks/${id}`, data);
    return res.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/api/tasks/${id}`);
  },

  /**
   * Calculate task summary statistics
   */
  calculateSummary(tasks: Task[]): TaskSummary {
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
      overdue: tasks.filter((t) => {
        if (!t.dueDate || t.completed) return false;
        const due = new Date(t.dueDate);
        due.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return due < today;
      }).length,
    };
  },
};
