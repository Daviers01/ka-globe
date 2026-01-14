import * as React from 'react'
import { cn } from '@/lib/utils'

export const Alert = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700', className)}>{children}</div>
}
