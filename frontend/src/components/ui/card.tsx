import * as React from 'react';
import { cn } from '@/lib/utils';

export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('rounded-md border bg-card p-6', className)}>{children}</div>;
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <h3 className={cn('text-lg font-semibold', className)}>{children}</h3>;

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>;
