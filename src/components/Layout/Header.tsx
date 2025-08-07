import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Play, 
  Pause, 
  Square,
  User,
  Plus
} from 'lucide-react';

const Header: React.FC = () => {
  const { state, dispatch } = useTaskManager();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePomodoroToggle = () => {
    if (state.pomodoroActive) {
      dispatch({ type: 'STOP_POMODORO' });
    } else {
      dispatch({ type: 'START_POMODORO' });
    }
  };

  const getViewTitle = () => {
    switch (state.currentView) {
      case 'dashboard':
        return 'Tổng quan công việc';
      case 'planning':
        return 'Kế hoạch làm việc';
      case 'growth':
        return 'Phát triển cá nhân';
      default:
        return 'DevFlow Admin';
    }
  };

  return (
    <header className={`h-16 transition-colors duration-300 ${
      state.theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    } border-b px-6 flex items-center justify-between`}>
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-xl font-semibold">{getViewTitle()}</h1>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('vi-VN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm task, dự án..."
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors duration-200 ${
              state.theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            } focus:ring-2 focus:ring-blue-200 focus:outline-none`}
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Quick Add Task */}
        <button className={`p-2 rounded-lg transition-colors duration-200 ${
          state.theme === 'dark'
            ? 'text-gray-300 hover:bg-gray-700 bg-blue-600 text-white'
            : 'text-white bg-blue-600 hover:bg-blue-700'
        }`}>
          <Plus className="w-5 h-5" />
        </button>

        {/* Pomodoro Timer */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePomodoroToggle}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              state.pomodoroActive
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            {state.pomodoroActive ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
          <div className={`font-mono text-sm px-3 py-1 rounded-lg ${
            state.pomodoroActive
              ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            {formatTime(state.pomodoroTimeLeft)}
          </div>
        </div>

        {/* Notifications */}
        <button className={`p-2 rounded-lg transition-colors duration-200 relative ${
          state.theme === 'dark'
            ? 'text-gray-300 hover:bg-gray-700'
            : 'text-gray-600 hover:bg-gray-100'
        }`}>
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">3</span>
          </span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            state.theme === 'dark'
              ? 'text-yellow-400 hover:bg-gray-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {state.theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Profile */}
        <button className={`p-2 rounded-lg transition-colors duration-200 ${
          state.theme === 'dark'
            ? 'text-gray-300 hover:bg-gray-700'
            : 'text-gray-600 hover:bg-gray-100'
        }`}>
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;