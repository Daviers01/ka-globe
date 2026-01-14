/**
 * Task summary statistics card
 */

import React from 'react';
import { Card } from '@/components/ui/card';
import type { TaskSummary as TaskSummaryType } from '@/types';

interface TaskSummaryProps {
  summary: TaskSummaryType;
}

interface SummaryCardProps {
  label: string;
  value: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, variant = 'default' }) => {
  const variants = {
    default: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200',
  };

  return (
    <Card className={`p-4 border ${variants[variant]} flex flex-col items-center`}>
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </Card>
  );
};

export const TaskSummary: React.FC<TaskSummaryProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <SummaryCard label="Total" value={summary.total} variant="default" />
      <SummaryCard label="Completed" value={summary.completed} variant="success" />
      <SummaryCard label="Pending" value={summary.pending} variant="warning" />
      <SummaryCard label="Overdue" value={summary.overdue} variant="error" />
    </div>
  );
};
