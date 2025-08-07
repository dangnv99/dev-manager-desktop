import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { 
  LayoutDashboard, 
  Calendar, 
  TrendingUp, 
  Settings,
  Timer,
  Trophy,
  Users,
  Cog
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { state, dispatch } = useTaskManager();

  const navigationItems = [
    {
      id: 'dashboard' as const,
      label: 'Tổng quan',
      icon: LayoutDashboard,
      description: 'Bảng điều khiển chính'
    },
    {
      id: 'planning' as const,
      label: 'Kế hoạch thông minh',
      icon: Calendar,
      description: 'AI gợi ý thông minh'
    },
    {
      id: 'growth' as const,
      label: 'Phát triển kỹ năng',
      icon: TrendingUp,
      description: 'Nâng cao năng lực'
    }
  ];

  const adminItems = [
    {
      id: 'users',
      label: 'Quản lý người dùng',
      icon: Users,
      description: 'Quản lý tài khoản'
    },
    {
      id: 'settings',
      label: 'Cài đặt',
      icon: Cog,
      description: 'Cấu hình hệ thống'
    }
  ];

  return (
    <div className={`w-64 h-full transition-colors duration-300 ${
      state.theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    } border-r flex flex-col`}>
      {/* Logo */}
      <div className="p-6 border-b border-current border-opacity-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">DevFlow Admin</h1>
            <p className="text-sm text-gray-500">Quản lý thông minh</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Chức năng chính
          </h3>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = state.currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => dispatch({ type: 'SET_VIEW', payload: item.id })}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? state.theme === 'dark'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                    : state.theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`} />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-xs mt-1 ${
                      isActive 
                        ? 'text-current opacity-80' 
                        : 'text-gray-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quản trị
          </h3>
          {adminItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 group ${
                  state.theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs mt-1 text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="px-4 py-6 border-t border-current border-opacity-10">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-orange-500" />
              <span>Pomodoro hôm nay</span>
            </div>
            <span className="font-medium">{state.pomodoroSession}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>Thành tựu</span>
            </div>
            <span className="font-medium">
              {state.achievements.filter(a => a.isUnlocked).length}/{state.achievements.length}
            </span>
          </div>

          <div className="pt-3">
            <div className="text-xs text-gray-500 mb-2">Tiến độ tuần này</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min(100, (state.tasks.filter(t => t.status === 'done').length / state.tasks.length) * 100)}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;