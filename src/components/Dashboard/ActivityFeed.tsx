import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { 
  CheckCircle2, 
  Plus, 
  Edit3, 
  Trophy, 
  TrendingUp,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const ActivityFeed: React.FC = () => {
  const { state } = useTaskManager();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'task_created':
        return <Plus className="w-4 h-4 text-blue-600" />;
      case 'task_updated':
        return <Edit3 className="w-4 h-4 text-yellow-600" />;
      case 'achievement_unlocked':
        return <Trophy className="w-4 h-4 text-purple-600" />;
      case 'skill_improved':
        return <TrendingUp className="w-4 h-4 text-indigo-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case 'task_completed':
        return 'bg-green-100 dark:bg-green-900/20';
      case 'task_created':
        return 'bg-blue-100 dark:bg-blue-900/20';
      case 'task_updated':
        return 'bg-yellow-100 dark:bg-yellow-900/20';
      case 'achievement_unlocked':
        return 'bg-purple-100 dark:bg-purple-900/20';
      case 'skill_improved':
        return 'bg-indigo-100 dark:bg-indigo-900/20';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className={`rounded-xl transition-colors duration-300 ${
      state.theme === 'dark'
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      <div className="p-6 border-b border-current border-opacity-10">
        <h3 className="text-lg font-semibold flex items-center">
          🔔 Hoạt động gần đây
        </h3>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        {state.activities.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Chưa có hoạt động nào</p>
          </div>
        ) : (
          <div className="space-y-3">
            {state.activities.slice(0, 10).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className={`p-2 rounded-full ${getActivityBgColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(activity.timestamp), { 
                      addSuffix: true, 
                      locale: vi 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {state.activities.length > 10 && (
        <div className="p-4 border-t border-current border-opacity-10">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
            Xem tất cả hoạt động
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;