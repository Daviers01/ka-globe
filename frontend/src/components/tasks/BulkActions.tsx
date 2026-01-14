/**
 * Bulk operations toolbar for tasks
 */

import React from 'react';
import { Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BulkActionsProps {
  selectedCount: number;
  onSelectAll: (all: boolean) => void;
  onBulkDelete: () => void;
  onBulkComplete: () => void;
  totalCount: number;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onSelectAll,
  onBulkDelete,
  onBulkComplete,
  totalCount,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium text-gray-900">
          {selectedCount} task{selectedCount !== 1 ? 's' : ''} selected
        </div>
        <button
          onClick={() => onSelectAll(selectedCount < totalCount)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {selectedCount < totalCount ? 'Select all' : 'Deselect all'}
        </button>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBulkComplete}
          className="text-green-600 hover:text-green-700 gap-2"
        >
          <CheckCircle size={18} />
          Mark Complete
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBulkDelete}
          className="text-red-600 hover:text-red-700 gap-2"
        >
          <Trash2 size={18} />
          Delete
        </Button>
      </div>
    </div>
  );
};
