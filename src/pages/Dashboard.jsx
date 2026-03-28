import { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { tasks, addTask, deleteTask, editTask, toggleComplete, fetchTasks, loading } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchTasks();
  }, [user, navigate, fetchTasks]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'completed' && task.completed) ||
      (filterStatus === 'pending' && !task.completed);
    return matchesSearch && matchesStatus;
  });

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📌 Your Tasks</h1>
          <p className="text-gray-600">Manage your daily tasks efficiently</p>
        </div>

        <TaskForm onAdd={addTask} />

        {error && <div className="text-red-500 mb-3 p-3 bg-red-50 rounded border border-red-200">{error}</div>}

        <div className="mb-6 flex gap-3 flex-wrap bg-white p-4 rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 flex-1 min-w-48 focus:outline-none focus:border-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="all">📋 All Tasks ({tasks.length})</option>
            <option value="pending">⏳ Pending ({tasks.filter((t) => !t.completed).length})</option>
            <option value="completed">✅ Completed ({tasks.filter((t) => t.completed).length})</option>
          </select>
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-2xl text-gray-400">
              {tasks.length === 0 ? '🎉 No tasks yet. Create one!' : '🔍 No tasks match your search or filter.'}
            </p>
          </div>
        )}

        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleComplete}
              onEdit={editTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
