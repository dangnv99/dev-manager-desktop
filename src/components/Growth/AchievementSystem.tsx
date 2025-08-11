import React, { useState } from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { 
  Trophy, 
  Award, 
  Star,
  Lock,
  CheckCircle2,
  Target,
  Zap,
  Timer,
  Code,
  Brain,
  TrendingUp,
  Calendar,
  BookOpen
} from 'lucide-react';

const AchievementSystem: React.FC = () => {
  const { state } = useTaskManager();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Tất cả', icon: Trophy },
    { id: 'productivity', name: 'Năng suất', icon: Zap },
    { id: 'learning', name: 'Học tập', icon: BookOpen },
    { id: 'consistency', name: 'Kiên trì', icon: Calendar },
    { id: 'quality', name: 'Chất lượng', icon: Star }
  ];

  // Extended achievements with more variety
  const allAchievements = [
    ...state.achievements,
    {
      id: '5',
      title: 'Bậc thầy tập trung',
      description: 'Hoàn thành 50 phiên Pomodoro',
      icon: '🧠',
      progress: 23,
      maxProgress: 50,
      isUnlocked: false,
      category: 'productivity',
      rarity: 'epic',
      reward: 'Unlock advanced focus analytics'
    },
    {
      id: '6',
      title: 'Chiến binh cuối tuần',
      description: 'Làm việc 5 cuối tuần liên tiếp',
      icon: '⚔️',
      progress: 2,
      maxProgress: 5,
      isUnlocked: false,
      category: 'consistency',
      rarity: 'rare',
      reward: '2x XP for weekend tasks'
    },
    {
      id: '7',
      title: 'Code không lỗi',
      description: 'Hoàn thành 10 task không phát sinh bug',
      icon: '✨',
      progress: 6,
      maxProgress: 10,
      isUnlocked: false,
      category: 'quality',
      rarity: 'legendary',
      reward: 'Quality master badge'
    },
    {
      id: '8',
      title: 'Người học suốt đời',
      description: 'Hoàn thành 20 khóa học/tutorial',
      icon: '📚',
      progress: 8,
      maxProgress: 20,
      isUnlocked: false,
      category: 'learning',
      rarity: 'epic',
      reward: 'AI learning recommendations boost'
    },
    {
      id: '9',
      title: 'Deadline không đe dọa',
      description: 'Hoàn thành 15 task trước deadline',
      icon: '⏰',
      progress: 12,
      maxProgress: 15,
      isUnlocked: false,
      category: 'productivity',
      rarity: 'rare',
      reward: 'Priority task highlighting'
    },
    {
      id: '10',
      title: 'Mentor tương lai',
      description: 'Viết 50 lesson learned',
      icon: '🎓',
      progress: 18,
      maxProgress: 50,
      isUnlocked: false,
      category: 'learning',
      rarity: 'legendary',
      reward: 'Unlock mentoring features'
    }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? allAchievements 
    : allAchievements.filter(achievement => achievement.category === selectedCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700';
      case 'rare':
        return 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20';
      case 'epic':
        return 'border-purple-300 bg-purple-50 dark:border-purple-600 dark:bg-purple-900/20';
      case 'legendary':
        return 'border-yellow-300 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700';
    }
  };

  const getRarityBadge = (rarity: string) => {
    const colors = {
      common: 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300',
      rare: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      epic: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      legendary: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[rarity as keyof typeof colors] || colors.common}`}>
        {rarity === 'common' ? 'Thường' : 
         rarity === 'rare' ? 'Hiếm' : 
         rarity === 'epic' ? 'Epic' : 
         rarity === 'legendary' ? 'Huyền thoại' : 'Thường'}
      </span>
    );
  };

  // Calculate achievement stats
  const totalAchievements = allAchievements.length;
  const unlockedAchievements = allAchievements.filter(a => a.isUnlocked).length;
  const totalProgress = allAchievements.reduce((acc, achievement) => 
    acc + (achievement.progress / achievement.maxProgress), 0);
  const averageProgress = Math.round((totalProgress / totalAchievements) * 100);

  const rarityCount = {
    legendary: allAchievements.filter(a => a.rarity === 'legendary' && a.isUnlocked).length,
    epic: allAchievements.filter(a => a.rarity === 'epic' && a.isUnlocked).length,
    rare: allAchievements.filter(a => a.rarity === 'rare' && a.isUnlocked).length,
    common: allAchievements.filter(a => (!a.rarity || a.rarity === 'common') && a.isUnlocked).length
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
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Hệ thống thành tựu</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Các cột mốc và phần thưởng trong hành trình phát triển
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-yellow-600">
              {unlockedAchievements}/{totalAchievements}
            </div>
            <div className="text-xs text-gray-500">Thành tựu đạt được</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Achievement Stats */}
        <div className={`mb-6 p-4 rounded-lg ${
          state.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-yellow-600">{rarityCount.legendary}</div>
              <div className="text-xs text-gray-500">Huyền thoại</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">{rarityCount.epic}</div>
              <div className="text-xs text-gray-500">Epic</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">{rarityCount.rare}</div>
              <div className="text-xs text-gray-500">Hiếm</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-600">{rarityCount.common}</div>
              <div className="text-xs text-gray-500">Thường</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Tiến độ tổng thể</span>
              <span>{averageProgress}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${averageProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category?.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800'
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

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {filteredAchievements.map((achievement) => {
            const isUnlocked = achievement.isUnlocked;
            const progressPercent = (achievement.progress / achievement.maxProgress) * 100;
            
            return (
              <div
                key={achievement?.id}
                className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                  isUnlocked 
                    ? getRarityColor(achievement.rarity || 'common')
                    : state.theme === 'dark'
                      ? 'border-gray-600 bg-gray-700/50'
                      : 'border-gray-200 bg-gray-50/50'
                } ${isUnlocked ? 'hover:scale-105' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`text-2xl p-2 rounded-lg ${
                      isUnlocked 
                        ? 'bg-white/80 dark:bg-gray-800/80' 
                        : 'bg-gray-200 dark:bg-gray-700 grayscale'
                    }`}>
                      {isUnlocked ? achievement.icon : <Lock className="w-6 h-6 text-gray-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className={`font-medium ${isUnlocked ? '' : 'text-gray-500'}`}>
                          {achievement.title}
                        </h4>
                        {achievement.rarity && getRarityBadge(achievement.rarity)}
                      </div>
                      <p className={`text-sm ${
                        isUnlocked 
                          ? 'text-gray-600 dark:text-gray-400' 
                          : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  {isUnlocked && (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Tiến độ</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${
                    state.theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isUnlocked 
                          ? 'bg-gradient-to-r from-green-400 to-green-600' 
                          : 'bg-gradient-to-r from-gray-400 to-gray-500'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Reward */}
                {achievement.reward && (
                  <div className={`text-xs p-2 rounded ${
                    isUnlocked
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-500'
                  }`}>
                    <span className="font-medium">Phần thưởng:</span> {achievement.reward}
                  </div>
                )}

                {isUnlocked && achievement.unlockedAt && (
                  <div className="mt-2 text-xs text-gray-500">
                    Mở khóa: {new Date(achievement.unlockedAt).toLocaleDateString('vi-VN')}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Achievement Tips */}
        <div className={`mt-6 p-4 rounded-lg ${
          state.theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-start space-x-3">
            <Star className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                Mẹo mở khóa thành tựu
              </h4>
              <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                <li>• Hoàn thành task đều đặn để tích lũy điểm kinh nghiệm</li>
                <li>• Sử dụng Pomodoro timer để cải thiện khả năng tập trung</li>
                <li>• Viết nhật ký phát triển để ghi nhận lesson learned</li>
                <li>• Thử thách bản thân với các task có độ khó cao hơn</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementSystem;