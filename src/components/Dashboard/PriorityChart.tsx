import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PriorityChart: React.FC = () => {
  const { state } = useTaskManager();

  const data = [
    {
      name: 'Cao',
      value: state.tasks.filter(t => t.priority === 'high').length,
      color: '#EF4444'
    },
    {
      name: 'Trung bình',
      value: state.tasks.filter(t => t.priority === 'medium').length,
      color: '#F59E0B'
    },
    {
      name: 'Thấp',
      value: state.tasks.filter(t => t.priority === 'low').length,
      color: '#10B981'
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg ${
          state.theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <p className="font-medium">Ưu tiên {payload[0].name}</p>
          <p className="text-sm text-blue-600">
            {payload[0].value} task ({Math.round((payload[0].value / state.tasks.length) * 100)}%)
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
        🎯 Độ ưu tiên
      </h3>
      
      <div style={{ width: '100%', height: '200px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm">Ưu tiên {item.name}</span>
            </div>
            <span className="text-sm font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityChart;