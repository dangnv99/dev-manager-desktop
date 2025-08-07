import React, { useState } from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Clock,
  AlertTriangle,
  Plus
} from 'lucide-react';

const TaskCalendar: React.FC = () => {
  const { state } = useTaskManager();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Get tasks for a specific date
  const getTasksForDate = (day: number) => {
    const dateStr = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    return state.tasks.filter(task => {
      if (!task.dueDate) return false;
      return task.dueDate.split('T')[0] === dateStr;
    });
  };

  // Month names in Vietnamese
  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  // Day names in Vietnamese
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  return (
    <div className={`rounded-xl transition-colors duration-300 ${
      state.theme === 'dark'
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      <div className="p-6 border-b border-current border-opacity-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold">Lịch công việc</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPreviousMonth}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                state.theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <h4 className="text-lg font-medium min-w-[120px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </h4>
            
            <button
              onClick={goToNextMonth}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                state.theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={index} className="h-24" />;
            }

            const tasksForDay = getTasksForDate(day);
            const isCurrentDay = isToday(day);

            return (
              <div
                key={day}
                className={`h-24 p-1 border rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer ${
                  isCurrentDay
                    ? state.theme === 'dark'
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-blue-500 bg-blue-50'
                    : state.theme === 'dark'
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isCurrentDay 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {day}
                </div>
                
                <div className="space-y-1">
                  {tasksForDay.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      className={`text-xs px-1 py-1 rounded text-white truncate ${getPriorityColor(task.priority)}`}
                      title={task.title}
                    >
                      {task.title.substring(0, 15)}...
                    </div>
                  ))}
                  
                  {tasksForDay.length > 2 && (
                    <div className="text-xs text-gray-500 px-1">
                      +{tasksForDay.length - 2} task khác
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Calendar Legend */}
        <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Ưu tiên cao</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Ưu tiên TB</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Ưu tiên thấp</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar;