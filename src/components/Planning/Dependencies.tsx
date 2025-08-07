import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { 
  GitBranch, 
  ArrowRight, 
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';

const Dependencies: React.FC = () => {
  const { state } = useTaskManager();

  // Mock dependency data - in real app this would come from task dependencies
  const dependencyChains = [
    {
      id: '1',
      name: 'Chuỗi Authentication',
      tasks: [
        {
          id: '1',
          title: 'Xây dựng hệ thống xác thực',
          status: 'doing',
          blockedBy: [],
          blocking: ['2', '4']
        },
        {
          id: '2',
          title: 'Tích hợp JWT middleware',
          status: 'todo',
          blockedBy: ['1'],
          blocking: ['3']
        },
        {
          id: '3',
          title: 'Testing bảo mật',
          status: 'todo',
          blockedBy: ['2'],
          blocking: []
        }
      ]
    },
    {
      id: '2',
      name: 'Chuỗi UI Enhancement',
      tasks: [
        {
          id: '2',
          title: 'Sửa lỗi menu điều hướng',
          status: 'todo',
          blockedBy: [],
          blocking: ['5']
        },
        {
          id: '5',
          title: 'Responsive design update',
          status: 'todo',
          blockedBy: ['2'],
          blocking: []
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'doing':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'blocked':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20';
      case 'doing':
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20';
      case 'blocked':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20';
      default:
        return 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800';
    }
  };

  // Calculate blocking issues
  const blockingIssues = state.tasks.filter(task => {
    // In real app, check if task is blocked by incomplete dependencies
    return task.status === 'todo' && Math.random() > 0.7; // Mock blocking
  });

  return (
    <div className={`rounded-xl transition-colors duration-300 ${
      state.theme === 'dark'
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      <div className="p-6 border-b border-current border-opacity-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GitBranch className="w-6 h-6 text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold">Phụ thuộc Task</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Theo dõi chuỗi dependencies
              </p>
            </div>
          </div>
          
          {blockingIssues.length > 0 && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">{blockingIssues.length} bị chặn</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Blocking Issues Alert */}
        {blockingIssues.length > 0 && (
          <div className={`p-4 rounded-lg border-l-4 border-red-500 ${
            state.theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h4 className="font-medium text-red-800 dark:text-red-200">Cảnh báo phụ thuộc</h4>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300 mb-3">
              {blockingIssues.length} task đang bị chặn bởi các dependency chưa hoàn thành
            </p>
            <div className="space-y-1">
              {blockingIssues.slice(0, 3).map((task) => (
                <div key={task.id} className="text-sm text-red-600 dark:text-red-400">
                  • {task.title}
                </div>
              ))}
              {blockingIssues.length > 3 && (
                <div className="text-sm text-red-500">
                  và {blockingIssues.length - 3} task khác...
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dependency Chains */}
        <div className="space-y-6">
          {dependencyChains.map((chain) => (
            <div key={chain.id}>
              <h4 className="font-medium mb-3 flex items-center">
                <GitBranch className="w-4 h-4 mr-2 text-purple-500" />
                {chain.name}
              </h4>
              
              <div className="space-y-3">
                {chain.tasks.map((task, index) => (
                  <div key={task.id} className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg border-2 flex-1 ${getStatusColor(task.status)}`}>
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">{task.title}</h5>
                          <div className="text-xs text-gray-500 mt-1">
                            {task.blockedBy.length > 0 && (
                              <span>Chờ: {task.blockedBy.length} task | </span>
                            )}
                            {task.blocking.length > 0 && (
                              <span>Chặn: {task.blocking.length} task</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {index < chain.tasks.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dependency Stats */}
        <div className={`p-4 rounded-lg ${
          state.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <h4 className="font-medium mb-3">Thống kê Dependencies</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">
                {dependencyChains.reduce((acc, chain) => 
                  acc + chain.tasks.filter(t => t.status === 'done').length, 0
                )}
              </div>
              <div className="text-xs text-gray-500">Hoàn thành</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">
                {dependencyChains.reduce((acc, chain) => 
                  acc + chain.tasks.filter(t => t.status === 'doing').length, 0
                )}
              </div>
              <div className="text-xs text-gray-500">Đang thực hiện</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">{blockingIssues.length}</div>
              <div className="text-xs text-gray-500">Bị chặn</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dependencies;