import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { Filter, X } from 'lucide-react';

const FilterPanel: React.FC = () => {
  const { state, dispatch } = useTaskManager();

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'todo', label: 'Cần làm' },
    { value: 'doing', label: 'Đang làm' },
    { value: 'done', label: 'Hoàn thành' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'Tất cả độ ưu tiên' },
    { value: 'high', label: 'Cao' },
    { value: 'medium', label: 'Trung bình' },
    { value: 'low', label: 'Thấp' }
  ];

  const typeOptions = [
    { value: 'all', label: 'Tất cả loại' },
    { value: 'feature', label: 'Tính năng' },
    { value: 'bug', label: 'Lỗi' },
    { value: 'refactor', label: 'Tái cấu trúc' },
    { value: 'research', label: 'Nghiên cứu' }
  ];

  const hasActiveFilters = 
    state.filterStatus !== 'all' || 
    state.filterPriority !== 'all' || 
    state.filterType !== 'all' ||
    state.searchQuery !== '';

  const clearAllFilters = () => {
    dispatch({ type: 'SET_FILTER_STATUS', payload: 'all' });
    dispatch({ type: 'SET_FILTER_PRIORITY', payload: 'all' });
    dispatch({ type: 'SET_FILTER_TYPE', payload: 'all' });
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
  };

  return (
    <div className={`p-4 rounded-xl transition-colors duration-300 ${
      state.theme === 'dark'
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Bộ lọc nâng cao</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-900/20 rounded-lg transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            <span>Xóa bộ lọc</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Trạng thái</label>
          <select
            value={state.filterStatus}
            onChange={(e) => dispatch({ type: 'SET_FILTER_STATUS', payload: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
              state.theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
            } focus:ring-2 focus:ring-blue-200 focus:outline-none`}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Độ ưu tiên</label>
          <select
            value={state.filterPriority}
            onChange={(e) => dispatch({ type: 'SET_FILTER_PRIORITY', payload: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
              state.theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
            } focus:ring-2 focus:ring-blue-200 focus:outline-none`}
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Loại task</label>
          <select
            value={state.filterType}
            onChange={(e) => dispatch({ type: 'SET_FILTER_TYPE', payload: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
              state.theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
            } focus:ring-2 focus:ring-blue-200 focus:outline-none`}
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-current border-opacity-10">
          <div className="flex flex-wrap gap-2">
            {state.searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                Tìm: "{state.searchQuery}"
              </span>
            )}
            {state.filterStatus !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                {statusOptions.find(o => o.value === state.filterStatus)?.label}
              </span>
            )}
            {state.filterPriority !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300">
                {priorityOptions.find(o => o.value === state.filterPriority)?.label}
              </span>
            )}
            {state.filterType !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                {typeOptions.find(o => o.value === state.filterType)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;