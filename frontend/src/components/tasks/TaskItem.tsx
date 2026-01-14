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

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
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
    <Card className="p-4 flex items-start justify-between gap-4 hover:shadow-md transition-shadow dark:hover:shadow-gray-900/50">
      <div className="flex-1 flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="mt-1 w-5 h-5 cursor-pointer rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-blue-500"
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
                  task.completed ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-white'
                }`}
              >
                {task.title}
              </div>

              {task.description && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 break-words">{task.description}</div>
              )}

              {task.dueDate && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
                  <span>Due: {formatDate(task.dueDate)}</span>
                  {overdue && (
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded text-xs font-medium">
                      Overdue
                    </span>
                  )}
                </div>
              )}

              {/* Priority Badge */}
              <div className="mt-2 flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium border ${
                  task.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' :
                  task.priority === 'medium' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800' :
                  'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                }`}>
                  {task.priority === 'high' ? '🔴 High' :
                   task.priority === 'medium' ? '🟠 Medium' :
                   '🔵 Low'}
                </span>

                {/* Tags */}
                {task?.tags?.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {task?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
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
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      )}
    </Card>
  );
};
