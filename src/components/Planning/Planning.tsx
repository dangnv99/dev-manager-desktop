import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import AIPlanner from './AIPlanner';
import TaskCalendar from './TaskCalendar';
import TimeTracking from './TimeTracking';
import Dependencies from './Dependencies';

const Planning: React.FC = () => {
  const { state } = useTaskManager();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Lập kế hoạch thông minh</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            AI sẽ giúp bạn tối ưu hóa thứ tự và thời gian làm việc
          </p>
        </div>
      </div>

      {/* AI Planner */}
      <AIPlanner />

      {/* Main Planning Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Calendar View */}
        <TaskCalendar />

        {/* Right Column */}
        <div className="space-y-6">
          <TimeTracking />
          <Dependencies />
        </div>
      </div>
    </div>
  );
};

export default Planning;