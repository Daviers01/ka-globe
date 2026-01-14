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
  completed: z.boolean().optional().default(false),
  priority: z.enum(['low', 'medium', 'high']).optional().default('medium'),
  tags: z.string().optional().default(''),
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
      completed: initialTask?.completed || false,
      priority: initialTask?.priority || 'medium',
      tags: initialTask?.tags?.join(', ') || '',
    },
  });

  const onFormSubmit = handleSubmit(async (data) => {
    const tags = data.tags
      ? data.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];
    await onSubmit({
      title: data.title,
      description: data.description || undefined,
      dueDate: data.dueDate || undefined,
      completed: data.completed,
      priority: data.priority,
      tags,
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
        <Input id="dueDate" type="date" {...register('dueDate')} disabled={isLoading} />
      </div>

      <div>
        <Label htmlFor="priority">Priority</Label>
        <select
          id="priority"
          {...register('priority')}
          disabled={isLoading}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          placeholder="work, urgent, personal"
          {...register('tags')}
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="completed"
          type="checkbox"
          {...register('completed')}
          disabled={isLoading}
          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />
        <Label htmlFor="completed" className="cursor-pointer">
          Mark as completed
        </Label>
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
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
