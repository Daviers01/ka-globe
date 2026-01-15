/**
 * Statistics dashboard component
 */

import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { SummaryCardSkeleton } from '@/components/ui/skeleton';
import type { Task, TaskSummary } from '@/types';

interface StatisticsDashboardProps {
  tasks: Task[];
  summary: TaskSummary;
  isLoading?: boolean;
}

export const StatisticsDashboard: React.FC<StatisticsDashboardProps> = ({ tasks, summary, isLoading = false }) => {
  const stats = useMemo(() => {
    const completionRate = summary.total > 0 ? Math.round((summary.completed / summary.total) * 100) : 0;
    
    // Tasks by priority completion
    const highPriorityTasks = tasks.filter(t => t.priority === 'high');
    const mediumPriorityTasks = tasks.filter(t => t.priority === 'medium');
    const lowPriorityTasks = tasks.filter(t => t.priority === 'low');

    const highCompleted = highPriorityTasks.filter(t => t.completed).length;
    const mediumCompleted = mediumPriorityTasks.filter(t => t.completed).length;
    const lowCompleted = lowPriorityTasks.filter(t => t.completed).length;

    return {
      completionRate,
      highCompletionRate: highPriorityTasks.length > 0 ? Math.round((highCompleted / highPriorityTasks.length) * 100) : 0,
      mediumCompletionRate: mediumPriorityTasks.length > 0 ? Math.round((mediumCompleted / mediumPriorityTasks.length) * 100) : 0,
      lowCompletionRate: lowPriorityTasks.length > 0 ? Math.round((lowCompleted / lowPriorityTasks.length) * 100) : 0,
      avgTasksPerDay: tasks.length > 0 ? (tasks.length / Math.max(1, 7)).toFixed(1) : 0,
      overduePct: summary.total > 0 ? Math.round((summary.overdue / summary.total) * 100) : 0,
    };
  }, [tasks, summary]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Statistics</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SummaryCardSkeleton key={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <SummaryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const StatCard: React.FC<{ label: string; value: string | number; subtext?: string; bgColor: string }> = ({
    label,
    value,
    subtext,
    bgColor,
  }) => (
    <Card className={`p-4 ${bgColor} flex flex-col items-center justify-center`}>
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</div>
      <div className="text-3xl font-bold mt-2">{value}</div>
      {subtext && <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtext}</div>}
    </Card>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Statistics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Completion Rate"
          value={`${stats.completionRate}%`}
          subtext={`${summary.completed}/${summary.total} tasks`}
          bgColor="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
        />
        <StatCard
          label="High Priority Rate"
          value={`${stats.highCompletionRate}%`}
          subtext={`${summary.byPriority.high} tasks`}
          bgColor="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
        />
        <StatCard
          label="Medium Priority Rate"
          value={`${stats.mediumCompletionRate}%`}
          subtext={`${summary.byPriority.medium} tasks`}
          bgColor="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
        />
        <StatCard
          label="Low Priority Rate"
          value={`${stats.lowCompletionRate}%`}
          subtext={`${summary.byPriority.low} tasks`}
          bgColor="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          label="Overdue Tasks"
          value={summary.overdue}
          subtext={`${stats.overduePct}% of total`}
          bgColor="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
        />
        <StatCard
          label="Avg Tasks/Week"
          value={stats.avgTasksPerDay}
          subtext="Based on total tasks"
          bgColor="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
        />
      </div>
    </div>
  );
};
