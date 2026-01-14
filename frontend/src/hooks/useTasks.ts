import { useState, useEffect } from 'react';
import type { Task, TaskInput } from '@/types';
import { taskService } from '@/services/taskService';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.fetchTasks();
      setTasks(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tasks';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function createTask(input: TaskInput): Promise<Task | null> {
    try {
      const newTask = await taskService.createTask(input);
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create task';
      setError(message);
      throw new Error(message);
    }
  }

  async function updateTask(
    id: string,
    data: Partial<TaskInput> & { completed?: boolean },
  ): Promise<Task | null> {
    try {
      const updated = await taskService.updateTask(id, data);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      return updated;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update task';
      setError(message);
      throw new Error(message);
    }
  }

  async function deleteTask(id: string): Promise<void> {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete task';
      setError(message);
      throw new Error(message);
    }
  }

  return { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask };
}
