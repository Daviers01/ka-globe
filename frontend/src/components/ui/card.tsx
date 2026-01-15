import * as React from 'react';
import { cn } from '@/lib/utils';

export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm', className)}>{children}</div>;
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <h3 className={cn('text-lg font-semibold text-gray-900 dark:text-white', className)}>{children}</h3>;

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={cn('text-sm text-gray-600 dark:text-gray-400', className)}>{children}</p>;
