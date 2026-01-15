/**
 * Kanban board component for tasks
 */

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Modal from '@/components/ui/modal';
import { TaskForm } from '@/components/forms/TaskForm';
import { KanbanColumnSkeleton } from '@/components/ui/skeleton';
import type { Task, TaskInput } from '@/types';
import { isOverdue, formatDate } from '@/utils/dateUtils';

interface TaskKanbanProps {
  tasks: Task[];
  onEdit: (id: string, data: TaskInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggleComplete: (task: Task) => Promise<void>;
  isLoading?: boolean;
}

const KanbanCard: React.FC<{
  task: Task;
  onEditClick: (task: Task) => void;
  onDelete: (id: string) => Promise<void>;
  onToggleComplete: (task: Task) => Promise<void>;
}> = ({ task, onEditClick, onDelete, onToggleComplete }) => {
  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <Card className="p-3 mb-2 hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-l-4 border-l-blue-400 dark:border-l-blue-500">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div
            className={`font-medium text-sm break-words ${task.completed ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}
          >
            {task.title}
          </div>
          {task.description && (
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{task.description}</div>
          )}
          {task.dueDate && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center justify-between">
              <span>{formatDate(task.dueDate)}</span>
              {overdue && <span className="text-xs font-medium text-red-600 dark:text-red-400">Overdue</span>}
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
              <div className="flex gap-1">
                {task?.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {task?.tags?.length > 2 && (
                  <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    +{task?.tags?.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={() => onToggleComplete(task)}
          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          {task.completed ? 'Undo' : 'Done'}
        </button>
        <button
          onClick={() => onEditClick(task)}
          className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium ml-auto"
        >
          Delete
        </button>
      </div>
    </Card>
  );
};

const KanbanColumn: React.FC<{
  title: string;
  count: number;
  tasks: Task[];
  bgColor: string;
  onEditClick: (task: Task) => void;
  onDelete: (id: string) => Promise<void>;
  onToggleComplete: (task: Task) => Promise<void>;
}> = ({ title, count, tasks, bgColor, onEditClick, onDelete, onToggleComplete }) => {
  return (
    <div className="flex-1 min-w-[300px]">
      <div className={`${bgColor} rounded-lg p-4 h-full border border-gray-200 dark:border-gray-700`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
            {count}
          </span>
        </div>

        <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
          {tasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">No tasks</p>
            </div>
          ) : (
            tasks.map((task) => (
              <KanbanCard
                key={task.id}
                task={task}
                onEditClick={onEditClick}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const TaskKanban: React.FC<TaskKanbanProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
  isLoading = false,
}) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3].map((i) => (
          <KanbanColumnSkeleton key={i} />
        ))}
      </div>
    );
  }

  const pendingTasks = tasks.filter((t) => !t.completed && !isOverdue(t.dueDate, t.completed));
  const overdueTasks = tasks.filter((t) => isOverdue(t.dueDate, t.completed));
  const completedTasks = tasks.filter((t) => t.completed);

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
  };

  const handleEditSubmit = async (data: TaskInput) => {
    if (editingTask) {
      await onEdit(editingTask.id, data);
      setEditingTask(null);
    }
  };

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4">
        <KanbanColumn
          title="Pending"
          count={pendingTasks.length}
          tasks={pendingTasks}
          bgColor="bg-yellow-50 dark:bg-yellow-900/10"
          onEditClick={handleEditClick}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
        <KanbanColumn
          title="Overdue"
          count={overdueTasks.length}
          tasks={overdueTasks}
          bgColor="bg-red-50 dark:bg-red-900/10"
          onEditClick={handleEditClick}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
        <KanbanColumn
          title="Completed"
          count={completedTasks.length}
          tasks={completedTasks}
          bgColor="bg-green-50 dark:bg-green-900/10"
          onEditClick={handleEditClick}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      </div>

      <Modal
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
      >
        {editingTask && (
          <TaskForm
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingTask(null)}
            initialTask={editingTask}
          />
        )}
      </Modal>
    </>
  );
};
