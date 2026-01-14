/**
 * Date utility functions
 */

/**
 * Check if a task is overdue (due date is before today and not completed)
 */
export function isOverdue(dueDate: string | null | undefined, completed: boolean): boolean {
  if (!dueDate || completed) return false;

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return due < today;
}

/**
 * Format a date to a readable string
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get a date string in YYYY-MM-DD format (for input[type="date"])
 */
export function getDateInputValue(dateString?: string | null): string {
  if (!dateString) return '';
  return dateString.split('T')[0];
}
