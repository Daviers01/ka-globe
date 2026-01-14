/**
 * Search input component for tasks
 */

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TaskSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const TaskSearch: React.FC<TaskSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <Input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
