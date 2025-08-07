import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import StatsCards from './StatsCards';
import TaskChart from './TaskChart';
import PriorityChart from './PriorityChart';
import ProgressChart from './ProgressChart';
import TaskList from './TaskList';
import ActivityFeed from './ActivityFeed';
import FilterPanel from './FilterPanel';

const Dashboard: React.FC = () => {
  const { state } = useTaskManager();

  return (
    <div className="space-y-6">
      {/* Filter Panel */}
      <FilterPanel />
      
      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TaskChart />
        <PriorityChart />
        <ProgressChart />
      </div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TaskList />
        </div>
        <div className="space-y-6">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;