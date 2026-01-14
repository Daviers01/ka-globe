/**
 * Task filter and sort utilities
 */

import type { Task, Priority } from '@/types';
import { isOverdue } from './dateUtils';

export type TaskFilterType = 'all' | 'pending' | 'completed' | 'overdue';
export type TaskSortType = 'due-date' | 'created-recent' | 'title' | 'completed-first' | 'priority';

/**
 * Search tasks by title and description
 */
export function searchTasks(tasks: Task[], searchQuery: string): Task[] {
  if (!searchQuery.trim()) return tasks;
  
  const query = searchQuery.toLowerCase();
  return tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(query) ||
      (t.description && t.description.toLowerCase().includes(query)) ||
      t.tags.some(tag => tag.toLowerCase().includes(query))
  );
}

/**
 * Filter tasks based on filter type
 */
export function filterTasks(tasks: Task[], filterType: TaskFilterType): Task[] {
  switch (filterType) {
    case 'pending':
      return tasks.filter((t) => !t.completed);
    case 'completed':
      return tasks.filter((t) => t.completed);
    case 'overdue':
      return tasks.filter((t) => isOverdue(t.dueDate, t.completed));
    case 'all':
    default:
      return tasks;
  }
}

/**
 * Filter tasks by priority
 */
export function filterByPriority(tasks: Task[], priority: Priority | 'all'): Task[] {
  if (priority === 'all') return tasks;
  return tasks.filter((t) => t.priority === priority);
}

/**
 * Filter tasks by tags
 */
export function filterByTags(tasks: Task[], selectedTags: string[]): Task[] {
  if (selectedTags.length === 0) return tasks;
  return tasks.filter((t) =>
    selectedTags.some(tag => t.tags.includes(tag))
  );
}

/**
 * Sort tasks based on sort type
 */
export function sortTasks(tasks: Task[], sortType: TaskSortType): Task[] {
  const sorted = [...tasks];

  switch (sortType) {
    case 'priority': {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    case 'due-date':
      return sorted.sort((a, b) => {
        // Tasks without due dates go to the end
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });

    case 'created-recent':
      return sorted.sort((a, b) => {
        if (!a.createdAt && !b.createdAt) return 0;
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case 'completed-first':
      return sorted.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? -1 : 1;
      });

    default:
      return sorted;
  }
}

/**
 * Filter and sort tasks
 */
export function filterAndSortTasks(
  tasks: Task[],
  filterType: TaskFilterType,
  sortType: TaskSortType,
  searchQuery = '',
  priorityFilter: Priority | 'all' = 'all',
  tagFilters: string[] = [],
): Task[] {
  let filtered = searchTasks(tasks, searchQuery);
  filtered = filterTasks(filtered, filterType);
  filtered = filterByPriority(filtered, priorityFilter);
  filtered = filterByTags(filtered, tagFilters);
  return sortTasks(filtered, sortType);
}
