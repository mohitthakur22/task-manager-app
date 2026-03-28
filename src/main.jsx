import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <TaskProvider>
      <App />
    </TaskProvider>
  </AuthProvider>
);
