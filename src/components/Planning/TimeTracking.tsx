import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { 
  Clock, 
  Play, 
  Pause, 
  BarChart3,
  TrendingUp,
  Target,
  Timer
} from 'lucide-react';

const TimeTracking: React.FC = () => {
  const { state } = useTaskManager();

  // Calculate time statistics
  const totalEstimatedHours = state.tasks.reduce((total, task) => 
    total + (task.estimatedHours || 0), 0
  );
  
  const totalActualHours = state.tasks.reduce((total, task) => 
    total + (task.actualHours || 0), 0
  );

  const completedTasks = state.tasks.filter(t => t.status === 'done');
  const completedEstimatedHours = completedTasks.reduce((total, task) => 
    total + (task.estimatedHours || 0), 0
  );
  const completedActualHours = completedTasks.reduce((total, task) => 
    total + (task.actualHours || 0), 0
  );

  const accuracy = completedEstimatedHours > 0 
    ? Math.round((completedEstimatedHours / completedActualHours) * 100) 
    : 0;

  const weeklyStats = [
    {
      day: 'T2',
      planned: 8,
      actual: 7.5,
      efficiency: 94
    },
    {
      day: 'T3',
      planned: 8,
      actual: 8.5,
      efficiency: 106
    },
    {
      day: 'T4',
      planned: 7,
      actual: 6,
      efficiency: 86
    },
    {
      day: 'T5',
      planned: 8,
      actual: 8,
      efficiency: 100
    },
    {
      day: 'T6',
      planned: 6,
      actual: 5.5,
      efficiency: 92
    }
  ];

  return (
    <div className={`rounded-xl transition-colors duration-300 ${
      state.theme === 'dark'
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      <div className="p-6 border-b border-current border-opacity-10">
        <div className="flex items-center space-x-3">
          <Timer className="w-6 h-6 text-orange-500" />
          <div>
            <h3 className="text-lg font-semibold">Theo dõi thời gian</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Phân tích hiệu suất và độ chính xác ước lượng
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${
            state.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Ước lượng vs Thực tế</span>
            </div>
            <div className="text-2xl font-bold mb-1">
              {completedEstimatedHours}h / {completedActualHours}h
            </div>
            <div className={`text-sm ${
              accuracy >= 90 ? 'text-green-600' : accuracy >= 70 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              Độ chính xác: {accuracy}%
            </div>
          </div>

          <div className={`p-4 rounded-lg ${
            state.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Pomodoro hôm nay</span>
            </div>
            <div className="text-2xl font-bold mb-1">
              {state.pomodoroSession}
            </div>
            <div className="text-sm text-gray-600">
              {state.pomodoroSession * 25} phút tập trung
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Hiệu suất tuần này
          </h4>
          
          <div className="space-y-3">
            {weeklyStats.map((day) => (
              <div key={day.day} className="flex items-center space-x-3">
                <div className="w-8 text-sm font-medium text-center">
                  {day.day}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm">Kế hoạch: {day.planned}h</span>
                    <span className="text-sm text-gray-500">Thực tế: {day.actual}h</span>
                  </div>
                  
                  <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((day.actual / day.planned) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                
                <div className={`text-sm font-medium min-w-[50px] text-right ${
                  day.efficiency >= 95 ? 'text-green-600' : 
                  day.efficiency >= 85 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {day.efficiency}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Tasks with Timer */}
        <div>
          <h4 className="font-medium mb-3">Task đang thực hiện</h4>
          
          {state.tasks.filter(t => t.status === 'doing').length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Chưa có task nào đang thực hiện</p>
            </div>
          ) : (
            <div className="space-y-2">
              {state.tasks.filter(t => t.status === 'doing').map((task) => (
                <div 
                  key={task.id}
                  className={`p-3 rounded-lg border ${
                    state.theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-sm">{task.title}</h5>
                      <p className="text-xs text-gray-500">
                        Ước lượng: {task.estimatedHours || 0}h | 
                        Đã làm: {task.actualHours || 0}h
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors duration-200">
                        <Play className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/40 transition-colors duration-200">
                        <Pause className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Tiến độ</span>
                      <span>{Math.round(((task.actualHours || 0) / (task.estimatedHours || 1)) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min(((task.actualHours || 0) / (task.estimatedHours || 1)) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;