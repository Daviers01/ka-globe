/**
 * Skeleton loading component
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
        className,
      )}
    />
  );
};

/**
 * Task item skeleton loader
 */
export const TaskItemSkeleton: React.FC = () => {
  return (
    <div className="p-4 flex items-start justify-between gap-4 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex-1 flex items-start gap-3">
        <Skeleton className="w-5 h-5 rounded" />
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-1/2" />
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <Skeleton className="h-8 w-12" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
};

/**
 * Summary card skeleton loader
 */
export const SummaryCardSkeleton: React.FC = () => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col items-center">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-12 mt-2" />
    </div>
  );
};

/**
 * Kanban card skeleton loader
 */
export const KanbanCardSkeleton: React.FC = () => {
  return (
    <div className="p-3 mb-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 border-l-4 border-l-blue-400">
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex gap-2 mt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-14" />
        </div>
        <div className="flex gap-2 mt-3 pt-2">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-12 ml-auto" />
        </div>
      </div>
    </div>
  );
};

/**
 * Kanban column skeleton loader
 */
export const KanbanColumnSkeleton: React.FC = () => {
  return (
    <div className="flex-1 min-w-[300px]">
      <div className="rounded-lg p-4 h-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <KanbanCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
