import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TaskChart: React.FC = () => {
  const { state } = useTaskManager();

  const data = [
    {
      name: 'Cần làm',
      count: state.tasks.filter(t => t.status === 'todo').length,
      color: '#EF4444'
    },
    {
      name: 'Đang làm',
      count: state.tasks.filter(t => t.status === 'doing').length,
      color: '#3B82F6'
    },
    {
      name: 'Hoàn thành',
      count: state.tasks.filter(t => t.status === 'done').length,
      color: '#10B981'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg ${
          state.theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <p className="font-medium">{label}</p>
          <p className="text-sm text-blue-600">
            Số lượng: {payload[0].value}
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
        📊 Trạng thái Task
      </h3>
      
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={state.theme === 'dark' ? '#374151' : '#E5E7EB'} 
            />
            <XAxis 
              dataKey="name" 
              stroke={state.theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={state.theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="count" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              className="transition-all duration-200 hover:opacity-80"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <div 
              className="w-4 h-4 rounded-full mx-auto mb-1"
              style={{ backgroundColor: item.color }}
            />
            <div className="text-sm font-medium">{item.count}</div>
            <div className="text-xs text-gray-500">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskChart;