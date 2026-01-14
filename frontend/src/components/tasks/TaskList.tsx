import React from 'react';
import { TaskItem } from '@/components/tasks/TaskItem';
import { TaskItemSkeleton } from '@/components/ui/skeleton';
import type { Task, TaskInput } from '@/types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (id: string, data: TaskInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggleComplete: (task: Task) => Promise<void>;
  isLoading?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <TaskItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};
