import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
  type: 'feature' | 'bug' | 'refactor' | 'research';
  dueDate?: string;
  startDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  dependencies?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  tasksCompleted: number;
  experience: number;
  maxExperience: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
}

export interface Activity {
  id: string;
  type: 'task_created' | 'task_updated' | 'task_completed' | 'skill_improved' | 'achievement_unlocked';
  description: string;
  timestamp: string;
  taskId?: string;
  skillId?: string;
}

interface AppState {
  tasks: Task[];
  skills: Skill[];
  achievements: Achievement[];
  activities: Activity[];
  theme: 'light' | 'dark';
  currentView: 'dashboard' | 'planning' | 'growth';
  pomodoroActive: boolean;
  pomodoroTimeLeft: number;
  pomodoroSession: number;
  searchQuery: string;
  filterStatus: string;
  filterPriority: string;
  filterType: string;
}

type AppAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_VIEW'; payload: 'dashboard' | 'planning' | 'growth' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'START_POMODORO' }
  | { type: 'STOP_POMODORO' }
  | { type: 'TICK_POMODORO' }
  | { type: 'COMPLETE_POMODORO_SESSION' }
  | { type: 'UPDATE_SKILL'; payload: Skill }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: string }
  | { type: 'ADD_ACTIVITY'; payload: Activity }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTER_STATUS'; payload: string }
  | { type: 'SET_FILTER_PRIORITY'; payload: string }
  | { type: 'SET_FILTER_TYPE'; payload: string };

const initialState: AppState = {
  tasks: [
    {
      id: '1',
      title: 'Xây dựng hệ thống xác thực người dùng',
      description: 'Thiết lập xác thực dựa trên JWT với refresh token',
      status: 'doing',
      priority: 'high',
      type: 'feature',
      dueDate: '2025-01-20',
      startDate: '2025-01-15',
      estimatedHours: 8,
      actualHours: 4,
      tags: ['xác thực', 'bảo mật', 'backend'],
      createdAt: '2025-01-15T09:00:00Z',
      updatedAt: '2025-01-17T14:30:00Z',
    },
    {
      id: '2',
      title: 'Sửa lỗi menu điều hướng',
      description: 'Menu trên mobile không đóng khi click bên ngoài',
      status: 'todo',
      priority: 'medium',
      type: 'bug',
      dueDate: '2025-01-18',
      estimatedHours: 2,
      tags: ['UI', 'mobile', 'navigation'],
      createdAt: '2025-01-16T10:00:00Z',
      updatedAt: '2025-01-16T10:00:00Z',
    },
    {
      id: '3',
      title: 'Tối ưu hóa hiệu suất database',
      description: 'Refactor các query và thêm index để cải thiện tốc độ',
      status: 'done',
      priority: 'high',
      type: 'refactor',
      dueDate: '2025-01-10',
      startDate: '2025-01-08',
      estimatedHours: 6,
      actualHours: 8,
      tags: ['database', 'performance', 'optimization'],
      createdAt: '2025-01-08T08:00:00Z',
      updatedAt: '2025-01-10T16:00:00Z',
    },
    {
      id: '4',
      title: 'Nghiên cứu GraphQL cho API mới',
      description: 'Tìm hiểu và đánh giá khả năng áp dụng GraphQL',
      status: 'todo',
      priority: 'low',
      type: 'research',
      dueDate: '2025-01-25',
      estimatedHours: 4,
      tags: ['GraphQL', 'API', 'research'],
      createdAt: '2025-01-17T11:00:00Z',
      updatedAt: '2025-01-17T11:00:00Z',
    }
  ],
  skills: [
    {
      id: '1',
      name: 'React',
      level: 4,
      category: 'Frontend',
      tasksCompleted: 12,
      experience: 80,
      maxExperience: 100,
    },
    {
      id: '2',
      name: 'Node.js',
      level: 3,
      category: 'Backend',
      tasksCompleted: 8,
      experience: 60,
      maxExperience: 100,
    },
    {
      id: '3',
      name: 'TypeScript',
      level: 3,
      category: 'Language',
      tasksCompleted: 15,
      experience: 70,
      maxExperience: 100,
    },
    {
      id: '4',
      name: 'PostgreSQL',
      level: 2,
      category: 'Database',
      tasksCompleted: 5,
      experience: 40,
      maxExperience: 100,
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'Người mới bắt đầu',
      description: 'Hoàn thành task đầu tiên',
      icon: '🌟',
      unlockedAt: '2025-01-10T16:00:00Z',
      progress: 1,
      maxProgress: 1,
      isUnlocked: true,
    },
    {
      id: '2',
      title: 'Thợ săn Bug',
      description: 'Sửa 5 bug trong tuần',
      icon: '🐛',
      progress: 3,
      maxProgress: 5,
      isUnlocked: false,
    },
    {
      id: '3',
      title: 'Chuyên gia tốc độ',
      description: 'Hoàn thành 10 task trước deadline',
      icon: '⚡',
      progress: 7,
      maxProgress: 10,
      isUnlocked: false,
    },
    {
      id: '4',
      title: 'Bậc thầy Pomodoro',
      description: 'Hoàn thành 25 phiên Pomodoro',
      icon: '🍅',
      progress: 12,
      maxProgress: 25,
      isUnlocked: false,
    }
  ],
  activities: [
    {
      id: '1',
      type: 'task_completed',
      description: 'Đã hoàn thành "Tối ưu hóa hiệu suất database"',
      timestamp: '2025-01-10T16:00:00Z',
      taskId: '3',
    },
    {
      id: '2',
      type: 'achievement_unlocked',
      description: 'Mở khóa thành tựu "Người mới bắt đầu"',
      timestamp: '2025-01-10T16:05:00Z',
    },
    {
      id: '3',
      type: 'task_created',
      description: 'Tạo mới task "Nghiên cứu GraphQL cho API mới"',
      timestamp: '2025-01-17T11:00:00Z',
      taskId: '4',
    },
    {
      id: '4',
      type: 'skill_improved',
      description: 'Kỹ năng PostgreSQL tăng lên level 2',
      timestamp: '2025-01-15T14:20:00Z',
      skillId: '4',
    }
  ],
  theme: 'light',
  currentView: 'dashboard',
  pomodoroActive: false,
  pomodoroTimeLeft: 25 * 60, // 25 minutes in seconds
  pomodoroSession: 0,
  searchQuery: '',
  filterStatus: 'all',
  filterPriority: 'all',
  filterType: 'all',
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        ),
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    
    case 'SET_VIEW':
      return {
        ...state,
        currentView: action.payload,
      };
    
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    
    case 'START_POMODORO':
      return {
        ...state,
        pomodoroActive: true,
        pomodoroTimeLeft: 25 * 60,
      };
    
    case 'STOP_POMODORO':
      return {
        ...state,
        pomodoroActive: false,
        pomodoroTimeLeft: 25 * 60,
      };
    
    case 'TICK_POMODORO':
      return {
        ...state,
        pomodoroTimeLeft: Math.max(0, state.pomodoroTimeLeft - 1),
      };
    
    case 'COMPLETE_POMODORO_SESSION':
      return {
        ...state,
        pomodoroSession: state.pomodoroSession + 1,
        pomodoroActive: false,
        pomodoroTimeLeft: 25 * 60,
      };
    
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map(skill =>
          skill.id === action.payload.id ? action.payload : skill
        ),
      };
    
    case 'UNLOCK_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map(achievement =>
          achievement.id === action.payload 
            ? { ...achievement, isUnlocked: true, unlockedAt: new Date().toISOString() }
            : achievement
        ),
      };
    
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: [action.payload, ...state.activities.slice(0, 49)], // Keep last 50 activities
      };
    
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    
    case 'SET_FILTER_STATUS':
      return {
        ...state,
        filterStatus: action.payload,
      };
    
    case 'SET_FILTER_PRIORITY':
      return {
        ...state,
        filterPriority: action.payload,
      };
    
    case 'SET_FILTER_TYPE':
      return {
        ...state,
        filterType: action.payload,
      };
    
    default:
      return state;
  }
}

const TaskManagerContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const TaskManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Pomodoro timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.pomodoroActive && state.pomodoroTimeLeft > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK_POMODORO' });
      }, 1000);
    } else if (state.pomodoroActive && state.pomodoroTimeLeft === 0) {
      dispatch({ type: 'COMPLETE_POMODORO_SESSION' });
      // Play notification sound or show notification
      if (Notification.permission === 'granted') {
        new Notification('Phiên Pomodoro hoàn thành!', {
          body: 'Thời gian nghỉ ngơi 5 phút.',
          icon: '/vite.svg'
        });
      }
    }

    return () => clearInterval(interval);
  }, [state.pomodoroActive, state.pomodoroTimeLeft]);

  // Theme effect
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  // Request notification permission
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <TaskManagerContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskManagerContext.Provider>
  );
};

export const useTaskManager = () => {
  const context = useContext(TaskManagerContext);
  if (!context) {
    throw new Error('useTaskManager must be used within a TaskManagerProvider');
  }
  return context;
};