import React, { useState, useMemo } from 'react';
import { List, LayoutGrid } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { TaskList, TaskSummary, TaskControls, TaskKanban } from '@/components/tasks';
import { TaskForm } from '@/components/forms/TaskForm';
import { useTasks } from '@/hooks/useTasks';
import { taskService } from '@/services/taskService';
import { filterAndSortTasks } from '@/utils/taskFilters';
import type { TaskInput } from '@/types';
import type { TaskFilterType, TaskSortType } from '@/utils/taskFilters';

type ViewType = 'list' | 'kanban';

export default function Dashboard() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<TaskFilterType>('all');
  const [sortType, setSortType] = useState<TaskSortType>('created-recent');
  const [viewType, setViewType] = useState<ViewType>('list');
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const filteredAndSortedTasks = useMemo(
    () => filterAndSortTasks(tasks, filterType, sortType),
    [tasks, filterType, sortType],
  );

  const summary = taskService.calculateSummary(tasks);

  const handleCreateTask = async (data: TaskInput) => {
    setCreateError(null);
    try {
      await createTask(data);
      setIsCreating(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create task';
      setCreateError(message);
    }
  };

  const handleUpdateTask = async (id: string, data: TaskInput) => {
    try {
      await updateTask(id, data);
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    setDeletingTaskId(id);
  };

  const confirmDelete = async () => {
    if (!deletingTaskId) return;
    
    try {
      await deleteTask(deletingTaskId);
      setDeletingTaskId(null);
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleToggleComplete = async (task) => {
    const wasCompleted = task.completed;
    try {
      await updateTask(task.id, { completed: !task.completed });
      
      // Trigger confetti when task is marked as completed
      if (!wasCompleted) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
        });
      }
    } catch (err) {
      console.error('Failed to toggle task', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            + New Task
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">{error}</div>
      )}

      <TaskSummary summary={summary} />

      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setViewType('list')}
            title="List View"
            className={`p-2.5 rounded-lg transition-all ${
              viewType === 'list'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewType('kanban')}
            title="Kanban View"
            className={`p-2.5 rounded-lg transition-all ${
              viewType === 'kanban'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid size={18} />
          </button>
        </div>

        {viewType === 'list' && (
          <TaskControls
            filterType={filterType}
            sortType={sortType}
            onFilterChange={setFilterType}
            onSortChange={setSortType}
          />
        )}
      </div>

      {viewType === 'list' && (
        <TaskList
          tasks={filteredAndSortedTasks}
          onEdit={handleUpdateTask}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          isLoading={loading}
        />
      )}

      {viewType === 'kanban' && (
        <TaskKanban
          tasks={tasks}
          onEdit={handleUpdateTask}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      )}

      <Modal
        open={isCreating}
        onClose={() => {
          setIsCreating(false);
          setCreateError(null);
        }}
        title="Create New Task"
      >
        {createError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {createError}
          </div>
        )}
        <TaskForm onSubmit={handleCreateTask} onCancel={() => setIsCreating(false)} />
      </Modal>

      <Modal
        open={!!deletingTaskId}
        onClose={() => setDeletingTaskId(null)}
        title="Delete Task"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setDeletingTaskId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
