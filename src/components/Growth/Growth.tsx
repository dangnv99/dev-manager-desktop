import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import SkillCloud from './SkillCloud';
import AILearningRecommendations from './AILearningRecommendations';
import GrowthJournal from './GrowthJournal';
import AchievementSystem from './AchievementSystem';

const Growth: React.FC = () => {
  const { state } = useTaskManager();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Phát triển năng lực</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            AI đồng hành cùng bạn trên hành trình nâng cao kỹ năng
          </p>
        </div>
      </div>

      {/* Top Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SkillCloud />
        <AILearningRecommendations />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <GrowthJournal />
        <AchievementSystem />
      </div>
    </div>
  );
};

export default Growth;