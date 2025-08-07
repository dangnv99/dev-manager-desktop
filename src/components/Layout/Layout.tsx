import React from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../Dashboard/Dashboard';
import Planning from '../Planning/Planning';
import Growth from '../Growth/Growth';

const Layout: React.FC = () => {
  const { state } = useTaskManager();

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'planning':
        return <Planning />;
      case 'growth':
        return <Growth />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="container mx-auto px-6 py-8">
              {renderCurrentView()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;