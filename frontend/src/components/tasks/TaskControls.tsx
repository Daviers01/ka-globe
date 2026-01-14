/**
 * Task filter and sort controls component
 */

import React from 'react';
import type { TaskFilterType, TaskSortType } from '@/utils/taskFilters';
import type { Priority } from '@/types';

interface TaskControlsProps {
  filterType: TaskFilterType;
  sortType: TaskSortType;
  priorityFilter: Priority | 'all';
  onFilterChange: (filter: TaskFilterType) => void;
  onSortChange: (sort: TaskSortType) => void;
  onPriorityChange: (priority: Priority | 'all') => void;
}

const filterOptions: { value: TaskFilterType; label: string }[] = [
  { value: 'all', label: 'All Tasks' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'overdue', label: 'Overdue' },
];

const sortOptions: { value: TaskSortType; label: string }[] = [
  { value: 'created-recent', label: 'Newest First' },
  { value: 'due-date', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title (A-Z)' },
  { value: 'completed-first', label: 'Completed First' },
];

const priorityOptions: { value: Priority | 'all'; label: string }[] = [
  { value: 'all', label: 'All Priorities' },
  { value: 'high', label: 'High Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'low', label: 'Low Priority' },
];

export const TaskControls: React.FC<TaskControlsProps> = ({
  filterType,
  sortType,
  priorityFilter,
  onFilterChange,
  onSortChange,
  onPriorityChange,
}) => {
  return (
    <div className="flex gap-3">
      {/* Filter Dropdown */}
      <select
        value={filterType}
        onChange={(e) => onFilterChange(e.target.value as TaskFilterType)}
        className="px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400 cursor-pointer"
      >
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Priority Filter */}
      <select
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value as Priority | 'all')}
        className="px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400 cursor-pointer"
      >
        {priorityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Sort Dropdown */}
      <select
        value={sortType}
        onChange={(e) => onSortChange(e.target.value as TaskSortType)}
        className="px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400 cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
