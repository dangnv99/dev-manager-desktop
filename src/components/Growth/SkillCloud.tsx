import React, { useState } from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { 
  TrendingUp, 
  Star, 
  Target, 
  Zap,
  Code,
  Database,
  Palette,
  Settings
} from 'lucide-react';

const SkillCloud: React.FC = () => {
  const { state } = useTaskManager();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Tất cả', icon: Target },
    { id: 'Frontend', name: 'Frontend', icon: Palette },
    { id: 'Backend', name: 'Backend', icon: Database },
    { id: 'Language', name: 'Ngôn ngữ', icon: Code },
    { id: 'Database', name: 'Database', icon: Settings },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? state.skills 
    : state.skills.filter(skill => skill.category === selectedCategory);

  const getSkillSize = (level: number) => {
    const baseSize = 'px-3 py-2 text-sm';
    switch (level) {
      case 5:
        return 'px-6 py-3 text-lg font-bold';
      case 4:
        return 'px-5 py-3 text-base font-semibold';
      case 3:
        return 'px-4 py-2 text-base font-medium';
      case 2:
        return 'px-3 py-2 text-sm font-medium';
      default:
        return baseSize;
    }
  };

  const getSkillColor = (level: number) => {
    switch (level) {
      case 5:
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg';
      case 4:
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md';
      case 3:
        return 'bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-md';
      case 2:
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 5:
        return 'Expert';
      case 4:
        return 'Advanced';
      case 3:
        return 'Intermediate';
      case 2:
        return 'Beginner';
      default:
        return 'Novice';
    }
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
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Skill Cloud</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Kỹ năng của bạn theo thời gian thực
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                    : state.theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Cloud */}
        <div className="min-h-[200px] flex flex-wrap gap-3 items-center justify-center p-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className={`rounded-full transition-all duration-300 hover:scale-110 cursor-pointer ${getSkillSize(skill.level)} ${getSkillColor(skill.level)}`}
              title={`${skill.name} - Level ${skill.level} (${getLevelLabel(skill.level)})\n${skill.tasksCompleted} task hoàn thành\nKinh nghiệm: ${skill.experience}/${skill.maxExperience}`}
            >
              <div className="flex items-center space-x-2">
                <span>{skill.name}</span>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-3 h-3 ${
                        index < skill.level 
                          ? 'text-yellow-300 fill-current' 
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skill Progress */}
        <div className="space-y-4 mt-6">
          <h4 className="font-medium">Tiến độ kỹ năng</h4>
          {filteredSkills.slice(0, 4).map((skill) => (
            <div key={skill.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{skill.name}</span>
                  <span className="text-xs text-gray-500">
                    Level {skill.level} - {getLevelLabel(skill.level)}
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {skill.experience}/{skill.maxExperience} XP
                </span>
              </div>
              
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${(skill.experience / skill.maxExperience) * 100}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{skill.tasksCompleted} task hoàn thành</span>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>{skill.maxExperience - skill.experience} XP để level tiếp theo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skill Stats */}
        <div className={`mt-6 p-4 rounded-lg ${
          state.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">
                {state.skills.reduce((acc, skill) => acc + skill.level, 0)}
              </div>
              <div className="text-xs text-gray-500">Tổng level</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {state.skills.reduce((acc, skill) => acc + skill.tasksCompleted, 0)}
              </div>
              <div className="text-xs text-gray-500">Task hoàn thành</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">
                {Math.round(state.skills.reduce((acc, skill) => acc + (skill.experience / skill.maxExperience), 0) / state.skills.length * 100)}%
              </div>
              <div className="text-xs text-gray-500">Tiến độ trung bình</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCloud;