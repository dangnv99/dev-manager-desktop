import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Target,
  Zap,
  Timer,
  Trophy
} from 'lucide-react';

const StatsCards: React.FC = () => {
  const { state } = useTaskManager();

  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = state.tasks.filter(t => t.status === 'doing').length;
  const highPriorityTasks = state.tasks.filter(t => t.priority === 'high' && t.status !== 'done').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Tasks due this week
  const weekFromNow = new Date();
  weekFromNow.setDate(weekFromNow.getDate() + 7);
  const tasksDueThisWeek = state.tasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate <= weekFromNow && task.status !== 'done';
  }).length;

  const unlockedAchievements = state.achievements.filter(a => a.isUnlocked).length;
  const todayPomodoros = state.pomodoroSession;

  const stats = [
    {
      title: 'Task hoàn thành',
      value: completedTasks,
      total: totalTasks,
      icon: CheckCircle2,
      color: 'green',
      trend: '+12%',
      description: `${completionRate}% tỷ lệ hoàn thành`
    },
    {
      title: 'Đang thực hiện',
      value: inProgressTasks,
      icon: Clock,
      color: 'blue',
      description: 'Task đang làm việc'
    },
    {
      title: 'Ưu tiên cao',
      value: highPriorityTasks,
      icon: AlertTriangle,
      color: 'red',
      description: 'Cần chú ý đặc biệt'
    },
    {
      title: 'Hết hạn tuần này',
      value: tasksDueThisWeek,
      icon: Target,
      color: 'orange',
      description: 'Cần hoàn thành sớm'
    },
    {
      title: 'Pomodoro hôm nay',
      value: todayPomodoros,
      icon: Timer,
      color: 'purple',
      description: 'Phiên tập trung'
    },
    {
      title: 'Thành tựu mở khóa',
      value: unlockedAchievements,
      total: state.achievements.length,
      icon: Trophy,
      color: 'yellow',
      description: 'Cột mốc đạt được'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        bg: 'bg-green-100 dark:bg-green-900/20',
        icon: 'text-green-600 dark:text-green-400',
        text: 'text-green-600 dark:text-green-400'
      },
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/20',
        icon: 'text-blue-600 dark:text-blue-400',
        text: 'text-blue-600 dark:text-blue-400'
      },
      red: {
        bg: 'bg-red-100 dark:bg-red-900/20',
        icon: 'text-red-600 dark:text-red-400',
        text: 'text-red-600 dark:text-red-400'
      },
      orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/20',
        icon: 'text-orange-600 dark:text-orange-400',
        text: 'text-orange-600 dark:text-orange-400'
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/20',
        icon: 'text-purple-600 dark:text-purple-400',
        text: 'text-purple-600 dark:text-purple-400'
      },
      yellow: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/20',
        icon: 'text-yellow-600 dark:text-yellow-400',
        text: 'text-yellow-600 dark:text-yellow-400'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClasses = getColorClasses(stat.color);
        
        return (
          <div
            key={index}
            className={`p-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              state.theme === 'dark'
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-white border border-gray-100 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
                <Icon className={`w-6 h-6 ${colorClasses.icon}`} />
              </div>
              {stat.trend && (
                <span className={`text-xs font-medium ${colorClasses.text}`}>
                  {stat.trend}
                </span>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">
                  {stat.value}
                </span>
                {stat.total && (
                  <span className="text-sm text-gray-500">
                    /{stat.total}
                  </span>
                )}
              </div>
              
              <h3 className="font-medium text-sm">
                {stat.title}
              </h3>
              
              <p className="text-xs text-gray-500">
                {stat.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;