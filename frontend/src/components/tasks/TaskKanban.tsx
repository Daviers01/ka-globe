/**
 * Kanban board component for tasks
 */

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Modal from '@/components/ui/modal';
import { TaskForm } from '@/components/forms/TaskForm';
import type { Task, TaskInput } from '@/types';
import { isOverdue, formatDate } from '@/utils/dateUtils';

interface TaskKanbanProps {
  tasks: Task[];
  onEdit: (id: string, data: TaskInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggleComplete: (task: Task) => Promise<void>;
}

const KanbanCard: React.FC<{
  task: Task;
  onEditClick: (task: Task) => void;
  onDelete: (id: string) => Promise<void>;
  onToggleComplete: (task: Task) => Promise<void>;
}> = ({ task, onEditClick, onDelete, onToggleComplete }) => {
  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <Card className="p-3 mb-2 hover:shadow-md transition-shadow bg-white border-l-4 border-l-blue-400">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div
            className={`font-medium text-sm break-words ${task.completed ? 'line-through text-gray-500' : ''}`}
          >
            {task.title}
          </div>
          {task.description && (
            <div className="text-xs text-gray-600 mt-1 line-clamp-2">{task.description}</div>
          )}
          {task.dueDate && (
            <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
              <span>{formatDate(task.dueDate)}</span>
              {overdue && <span className="text-xs font-medium text-red-600">Overdue</span>}
            </div>
          )}

          {/* Priority Badge */}
          <div className="mt-2 flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              task.priority === 'high' ? 'bg-red-100 text-red-700' :
              task.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
              'bg-blue-100 text-blue-700'
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
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {task?.tags?.length > 2 && (
                  <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                    +{task?.tags?.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100">
        <button
          onClick={() => onToggleComplete(task)}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          {task.completed ? 'Undo' : 'Done'}
        </button>
        <button
          onClick={() => onEditClick(task)}
          className="text-xs text-gray-600 hover:text-gray-700 font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-red-600 hover:text-red-700 font-medium ml-auto"
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
      <div className={`${bgColor} rounded-lg p-4 h-full`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-xs font-bold text-gray-700">
            {count}
          </span>
        </div>

        <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
          {tasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500">No tasks</p>
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
}) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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
          bgColor="bg-yellow-50"
          onEditClick={handleEditClick}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
        <KanbanColumn
          title="Overdue"
          count={overdueTasks.length}
          tasks={overdueTasks}
          bgColor="bg-red-50"
          onEditClick={handleEditClick}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
        <KanbanColumn
          title="Completed"
          count={completedTasks.length}
          tasks={completedTasks}
          bgColor="bg-green-50"
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
