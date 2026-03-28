import { createContext, useEffect, useState, useCallback } from 'react';
import { tasksAPI } from '../services/api';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await tasksAPI.getAll();
      setTasks(response.data);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to load tasks';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add task
  const addTask = async (title) => {
    try {
      const response = await tasksAPI.create(title);
      setTasks((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to create task';
      throw new Error(errorMsg);
    }
  };

  // Update task
  const editTask = async (id, data) => {
    try {
      const response = await tasksAPI.update(id, data);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? response.data : t))
      );
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to update task';
      throw new Error(errorMsg);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await tasksAPI.delete(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to delete task';
      throw new Error(errorMsg);
    }
  };

  // Toggle complete
  const toggleComplete = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
      const response = await tasksAPI.update(id, { completed: !task.completed });
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? response.data : t))
      );
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to update task';
      throw new Error(errorMsg);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, editTask, toggleComplete, fetchTasks, loading, error }}
    >
      {children}
    </TaskContext.Provider>
  );
};
