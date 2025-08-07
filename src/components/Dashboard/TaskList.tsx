import React, { useMemo } from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Circle, 
  Play,
  Calendar,
  User,
  Tag
} from 'lucide-react';

const TaskList: React.FC = () => {
  const { state, dispatch } = useTaskManager();

  // Filter tasks based on search and filters
  const filteredTasks = useMemo(() => {
    let filtered = state.tasks;

    // Search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (state.filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === state.filterStatus);
    }

    // Priority filter
    if (state.filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === state.filterPriority);
    }

    // Type filter
    if (state.filterType !== 'all') {
      filtered = filtered.filter(task => task.type === state.filterType);
    }

    // Sort by priority and due date
    return filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];

      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }

      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }

      return 0;
    });
  }, [state.tasks, state.searchQuery, state.filterStatus, state.filterPriority, state.filterType]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'doing':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'feature':
        return '🚀';
      case 'bug':
        return '🐛';
      case 'refactor':
        return '🔧';
      case 'research':
        return '🔍';
      default:
        return '📝';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Cao';
      case 'medium':
        return 'Trung bình';
      case 'low':
        return 'Thấp';
      default:
        return priority;
    }
  };

  const formatDueDate = (dueDate?: string) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return <span className="text-red-600 font-medium">Quá hạn {Math.abs(diffDays)} ngày</span>;
    } else if (diffDays === 0) {
      return <span className="text-orange-600 font-medium">Hết hạn hôm nay</span>;
    } else if (diffDays === 1) {
      return <span className="text-yellow-600 font-medium">Hết hạn ngày mai</span>;
    } else if (diffDays <= 7) {
      return <span className="text-blue-600">Còn {diffDays} ngày</span>;
    } else {
      return <span className="text-gray-600">{date.toLocaleDateString('vi-VN')}</span>;
    }
  };

  const handleTaskStatusChange = (taskId: string, newStatus: 'todo' | 'doing' | 'done') => {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = {
        ...task,
        status: newStatus,
        updatedAt: new Date().toISOString()
      };
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });

      // Add activity
      const statusLabels = { todo: 'chuyển về Todo', doing: 'bắt đầu làm', done: 'hoàn thành' };
      dispatch({
        type: 'ADD_ACTIVITY',
        payload: {
          id: Date.now().toString(),
          type: newStatus === 'done' ? 'task_completed' : 'task_updated',
          description: `${statusLabels[newStatus]} "${task.title}"`,
          timestamp: new Date().toISOString(),
          taskId: task.id
        }
      });
    }
  };

  return (
    <div className={`rounded-xl transition-colors duration-300 ${
      state.theme === 'dark'
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      <div className="p-6 border-b border-current border-opacity-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center">
            📋 Danh sách Task
          </h3>
          <span className="text-sm text-gray-500">
            {filteredTasks.length} / {state.tasks.length} task
          </span>
        </div>
      </div>

      <div className="divide-y divide-current divide-opacity-10 max-h-96 overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Circle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Không có task nào phù hợp với bộ lọc</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 hover:bg-opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => {
                    const nextStatus = task.status === 'todo' ? 'doing' : task.status === 'doing' ? 'done' : 'todo';
                    handleTaskStatusChange(task.id, nextStatus);
                  }}
                  className="mt-1 hover:scale-110 transition-transform duration-200"
                >
                  {getStatusIcon(task.status)}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{getTypeEmoji(task.type)}</span>
                    <h4 className={`font-medium ${
                      task.status === 'done' ? 'line-through text-gray-500' : ''
                    }`}>
                      {task.title}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                      {getPriorityLabel(task.priority)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {task.description}
                  </p>

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    {task.dueDate && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        {formatDueDate(task.dueDate)}
                      </div>
                    )}

                    {task.estimatedHours && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Ước tính: {task.estimatedHours}h</span>
                      </div>
                    )}

                    {task.actualHours && (
                      <div className="flex items-center space-x-1">
                        <Play className="w-3 h-3" />
                        <span>Thực tế: {task.actualHours}h</span>
                      </div>
                    )}
                  </div>

                  {task.tags.length > 0 && (
                    <div className="flex items-center flex-wrap gap-1 mt-2">
                      <Tag className="w-3 h-3 text-gray-400" />
                      {task.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;