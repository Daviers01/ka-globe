import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { TaskList, TaskSummary, TaskControls } from '@/components/tasks';
import { TaskForm } from '@/components/forms/TaskForm';
import { useTasks } from '@/hooks/useTasks';
import { taskService } from '@/services/taskService';
import { filterAndSortTasks } from '@/utils/taskFilters';
import type { TaskInput } from '@/types';
import type { TaskFilterType, TaskSortType } from '@/utils/taskFilters';

export default function Dashboard() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<TaskFilterType>('all');
  const [sortType, setSortType] = useState<TaskSortType>('created-recent');

  const filteredAndSortedTasks = useMemo(
    () => filterAndSortTasks(tasks, filterType, sortType),
    [tasks, filterType, sortType]
  );

  const summary = taskService.calculateSummary(tasks);

  const handleCreateTask = async (data: TaskInput) => {
    setCreateError(null);
    try {
      await createTask(data);
      setIsCreating(false);
    } catch (err: any) {
      setCreateError(err.message || 'Failed to create task');
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
    try {
      await deleteTask(id);
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task.id, { completed: !task.completed });
    } catch (err) {
      console.error('Failed to toggle task', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          + New Task
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      <TaskSummary summary={summary} />

      <TaskControls
        filterType={filterType}
        sortType={sortType}
        onFilterChange={setFilterType}
        onSortChange={setSortType}
      />

      <TaskList
        tasks={filteredAndSortedTasks}
        onEdit={handleUpdateTask}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
        isLoading={loading}
      />

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
    </div>
  );
}