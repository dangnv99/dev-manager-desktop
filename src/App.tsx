import React from 'react';
import { TaskManagerProvider } from './contexts/TaskManagerContext';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <TaskManagerProvider>
      <Layout />
    </TaskManagerProvider>
  );
}

export default App;