/**
 * Task filter and sort controls component (clean dropdowns)
 */

import React from 'react';
import type { TaskFilterType, TaskSortType } from '@/utils/taskFilters';

interface TaskControlsProps {
  filterType: TaskFilterType;
  sortType: TaskSortType;
  onFilterChange: (filter: TaskFilterType) => void;
  onSortChange: (sort: TaskSortType) => void;
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
  { value: 'title', label: 'Title (A-Z)' },
  { value: 'completed-first', label: 'Completed First' },
];

export const TaskControls: React.FC<TaskControlsProps> = ({
  filterType,
  sortType,
  onFilterChange,
  onSortChange,
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-3">
      {/* Filter Dropdown */}
      <div className="flex-1">
        <label htmlFor="filter-select" className="block text-xs font-semibold text-gray-700 mb-2">
          Filter
        </label>
        <select
          id="filter-select"
          value={filterType}
          onChange={(e) => onFilterChange(e.target.value as TaskFilterType)}
          className="w-full px-3 py-2.5 text-sm font-medium bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400 cursor-pointer"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Dropdown */}
      <div className="flex-1">
        <label htmlFor="sort-select" className="block text-xs font-semibold text-gray-700 mb-2">
          Sort by
        </label>
        <select
          id="sort-select"
          value={sortType}
          onChange={(e) => onSortChange(e.target.value as TaskSortType)}
          className="w-full px-3 py-2.5 text-sm font-medium bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400 cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

