/**
 * Task form component (used in modal for create and edit)
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Task, TaskInput } from '@/types';
import { getDateInputValue } from '@/utils/dateUtils';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional().default(''),
  dueDate: z.string().optional().default(''),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (data: TaskInput) => Promise<void>;
  isLoading?: boolean;
  onCancel?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  onSubmit,
  isLoading = false,
  onCancel,
}) => {
  const { register, handleSubmit, formState } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialTask?.title || '',
      description: initialTask?.description || '',
      dueDate: getDateInputValue(initialTask?.dueDate),
    },
  });

  const onFormSubmit = handleSubmit(async (data) => {
    await onSubmit({
      title: data.title,
      description: data.description || undefined,
      dueDate: data.dueDate || undefined,
    });
  });

  return (
    <form onSubmit={onFormSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Task title"
          {...register('title')}
          aria-invalid={!!formState.errors.title}
          disabled={isLoading}
        />
        {formState.errors.title && (
          <p className="text-sm text-red-600 mt-1">{formState.errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description (optional)</Label>
        <Input
          id="description"
          placeholder="Task description"
          {...register('description')}
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="dueDate">Due Date (optional)</Label>
        <Input
          id="dueDate"
          type="date"
          {...register('dueDate')}
          disabled={isLoading}
        />
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading || formState.isSubmitting}>
          {isLoading || formState.isSubmitting ? 'Saving...' : initialTask ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};
