/**
 * Task summary statistics card
 */

import React from 'react';
import { Card } from '@/components/ui/card';
import { SummaryCardSkeleton } from '@/components/ui/skeleton';
import type { TaskSummary as TaskSummaryType } from '@/types';

interface TaskSummaryProps {
  summary: TaskSummaryType;
  isLoading?: boolean;
}

interface SummaryCardProps {
  label: string;
  value: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, variant = 'default' }) => {
  const variants = {
    default: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  };

  return (
    <Card className={`p-4 border ${variants[variant]} flex flex-col items-center`}>
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</div>
      <div className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{value}</div>
    </Card>
  );
};

export const TaskSummary: React.FC<TaskSummaryProps> = ({ summary, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <SummaryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
      <SummaryCard label="Total" value={summary.total} variant="default" />
      <SummaryCard label="Completed" value={summary.completed} variant="success" />
      <SummaryCard label="Pending" value={summary.pending} variant="warning" />
      <SummaryCard label="Overdue" value={summary.overdue} variant="error" />
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 flex flex-col items-center">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">High Priority</div>
        <div className="text-2xl font-bold mt-2 text-purple-600 dark:text-purple-400">{summary.byPriority.high}</div>
      </div>
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 flex flex-col items-center">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Medium Priority</div>
        <div className="text-2xl font-bold mt-2 text-orange-600 dark:text-orange-400">{summary.byPriority.medium}</div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Priority</div>
        <div className="text-2xl font-bold mt-2 text-gray-600 dark:text-gray-400">{summary.byPriority.low}</div>
      </div>
    </div>
  );
};
