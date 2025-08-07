import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressChart: React.FC = () => {
  const { state } = useTaskManager();

  // Generate sample data for the last 7 days
  const generateProgressData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Simulate completed tasks for each day
      const completedTasks = Math.floor(Math.random() * 5) + 1;
      const createdTasks = Math.floor(Math.random() * 3) + 1;
      
      data.push({
        date: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
        completed: completedTasks,
        created: createdTasks,
        cumulative: data.length > 0 ? data[data.length - 1].cumulative + completedTasks : completedTasks
      });
    }
    return data;
  };

  const data = generateProgressData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg ${
          state.theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <p className="font-medium">{label}</p>
          <p className="text-sm text-green-600">
            Hoàn thành: {payload[0]?.value || 0}
          </p>
          <p className="text-sm text-blue-600">
            Tạo mới: {payload[1]?.value || 0}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`p-6 rounded-xl transition-colors duration-300 ${
      state.theme === 'dark'
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        📈 Tiến độ 7 ngày
      </h3>
      
      <div style={{ width: '100%', height: '200px' }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={state.theme === 'dark' ? '#374151' : '#E5E7EB'} 
            />
            <XAxis 
              dataKey="date" 
              stroke={state.theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={state.theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="completed" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="created" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm">Hoàn thành</span>
          </div>
          <div className="text-lg font-bold text-green-600">
            {data[data.length - 1]?.completed || 0}
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm">Tạo mới</span>
          </div>
          <div className="text-lg font-bold text-blue-600">
            {data[data.length - 1]?.created || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;