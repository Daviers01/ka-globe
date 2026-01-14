/**
 * Task item row component with inline edit
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TaskForm } from '@/components/forms/TaskForm';
import { isOverdue, formatDate } from '@/utils/dateUtils';
import type { Task, TaskInput } from '@/types';

interface TaskItemProps {
  task: Task;
  onEdit: (id: string, data: TaskInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggleComplete: (task: Task) => Promise<void>;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Delete this task?')) return;
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggle = async () => {
    await onToggleComplete(task);
  };

  const handleSave = async (data: TaskInput) => {
    await onEdit(task.id, data);
    setIsEditing(false);
  };

  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <Card className="p-4 flex items-start justify-between gap-4 hover:shadow-md transition-shadow">
      <div className="flex-1 flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="mt-1 w-5 h-5 cursor-pointer rounded border-gray-300"
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <TaskForm
              initialTask={task}
              onSubmit={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <div
                className={`font-medium text-base break-words ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.title}
              </div>

              {task.description && (
                <div className="text-sm text-gray-600 mt-1 break-words">
                  {task.description}
                </div>
              )}

              {task.dueDate && (
                <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                  <span>Due: {formatDate(task.dueDate)}</span>
                  {overdue && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                      Overdue
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      )}
    </Card>
  );
};
