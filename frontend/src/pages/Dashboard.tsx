import React, { useState, useMemo, useEffect } from 'react';
import { List, LayoutGrid, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { TaskList, TaskSummary, TaskControls, TaskKanban, TaskSearch, StatisticsDashboard, Pagination } from '@/components/tasks';
import { TaskForm } from '@/components/forms/TaskForm';
import { useTasks } from '@/hooks/useTasks';
import { taskService } from '@/services/taskService';
import { filterAndSortTasks } from '@/utils/taskFilters';
import type { Task, TaskInput, Priority } from '@/types';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [showStats, setShowStats] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [actionError, setActionError] = useState<string | null>(null);

  const filteredAndSortedTasks = useMemo(
    () => filterAndSortTasks(tasks, filterType, sortType, searchQuery, priorityFilter),
    [tasks, filterType, sortType, searchQuery, priorityFilter],
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedTasks.length / itemsPerPage);
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedTasks.slice(startIndex, endIndex);
  }, [filteredAndSortedTasks, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, sortType, searchQuery, priorityFilter]);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

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
    setActionError(null);
    try {
      await updateTask(id, data);
    } catch {
      setActionError('Could not update the task. Please try again.');
    }
  };

  const handleDeleteTask = async (id: string) => {
    setDeletingTaskId(id);
  };

  const confirmDelete = async () => {
    if (!deletingTaskId) return;
    setActionError(null);

    try {
      await deleteTask(deletingTaskId);
      setDeletingTaskId(null);
    } catch {
      setActionError('Could not delete the task. Please try again.');
    }
  };

  const handleToggleComplete = async (task: Task) => {
    const wasCompleted = task.completed;
    setActionError(null);
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
    } catch {
      setActionError('Could not update task status. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            + New Task
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-400">{error}</div>
      )}

      {actionError && (
        <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200 text-sm">{actionError}</div>
      )}

      <TaskSummary summary={summary} isLoading={loading} />

      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setViewType('list')}
            title="List View"
            className={`p-2.5 rounded-lg transition-all ${
              viewType === 'list'
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewType('kanban')}
            title="Kanban View"
            className={`p-2.5 rounded-lg transition-all ${
              viewType === 'kanban'
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <LayoutGrid size={18} />
          </button>
        </div>

        {viewType === 'list' && (
          <div className="flex gap-3 items-center">
            <TaskSearch value={searchQuery} onChange={setSearchQuery} />
            <TaskControls
              filterType={filterType}
              sortType={sortType}
              priorityFilter={priorityFilter}
              onFilterChange={setFilterType}
              onSortChange={setSortType}
              onPriorityChange={setPriorityFilter}
            />
          </div>
        )}
      </div>

      {viewType === 'list' && (
        <>
          <TaskList
            tasks={paginatedTasks}
            onEdit={handleUpdateTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
            isLoading={loading}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredAndSortedTasks.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}

      {viewType === 'kanban' && (
        <TaskKanban
          tasks={tasks}
          onEdit={handleUpdateTask}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          isLoading={loading}
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
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-400 text-sm">
            {createError}
          </div>
        )}
        <TaskForm onSubmit={handleCreateTask} onCancel={() => setIsCreating(false)} />
      </Modal>
      {/* Statistics Section */}
      <div className="mt-8 border-t pt-8">
        <button
          onClick={() => setShowStats(!showStats)}
          className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 hover:text-blue-600 dark:hover:text-blue-400"
        >
          {showStats ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          {showStats ? 'Hide Statistics' : 'Show Statistics'}
        </button>
        {showStats && <StatisticsDashboard tasks={tasks} summary={summary} isLoading={loading} />}
      </div>

      <Modal
        open={!!deletingTaskId}
        onClose={() => setDeletingTaskId(null)}
        title="Delete Task"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setDeletingTaskId(null)}
              className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
