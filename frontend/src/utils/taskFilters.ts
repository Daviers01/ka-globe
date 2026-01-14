/**
 * Task filter and sort utilities
 */

import type { Task } from '@/types';
import { isOverdue } from './dateUtils';

export type TaskFilterType = 'all' | 'pending' | 'completed' | 'overdue';
export type TaskSortType = 'due-date' | 'created-recent' | 'title' | 'completed-first';

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
 * Sort tasks based on sort type
 */
export function sortTasks(tasks: Task[], sortType: TaskSortType): Task[] {
  const sorted = [...tasks];

  switch (sortType) {
    case 'due-date':
      return sorted.sort((a, b) => {
        // Tasks without due dates go to the end
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });

    case 'created-recent':
      // Since we don't have createdAt, we'll use ID which typically correlates to creation order
      return sorted.reverse();

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
  sortType: TaskSortType
): Task[] {
  const filtered = filterTasks(tasks, filterType);
  return sortTasks(filtered, sortType);
}
