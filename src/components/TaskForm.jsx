import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { tasks } = useContext(TaskContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    const isDuplicate = tasks.some((t) => t.title.toLowerCase() === title.toLowerCase());
    if (isDuplicate) {
      setError('Task already exists');
      return;
    }

    setLoading(true);
    try {
      await onAdd(title.trim());
      setTitle('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2 flex-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task..."
          disabled={loading}
        />
        <button
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
