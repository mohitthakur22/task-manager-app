import React, { useState } from 'react';

const TaskCard = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (editTitle.trim() && editTitle !== task.title) {
      setLoading(true);
      try {
        await onEdit(task._id, { title: editTitle.trim() });
        setIsEditing(false);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setIsEditing(false);
      setEditTitle(task.title);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(task._id);
      setShowDeleteConfirm(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    setLoading(true);
    try {
      await onToggle(task._id);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`border p-4 rounded mb-3 shadow-sm ${task.completed ? 'bg-green-50' : 'bg-white'}`}>
      {isEditing ? (
        <div className="flex gap-2 mb-3">
          <input
            className="border rounded px-2 py-1 flex-1"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={loading}
          />
          <button
            disabled={loading}
            className="px-2 py-1 bg-green-500 text-white rounded text-sm disabled:bg-gray-400"
            onClick={handleEdit}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            disabled={loading}
            className="px-2 py-1 bg-gray-500 text-white rounded text-sm disabled:bg-gray-400"
            onClick={() => {
              setIsEditing(false);
              setEditTitle(task.title);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              disabled={loading}
              className="w-5 h-5 cursor-pointer disabled:opacity-50"
            />
            <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Status: {task.completed ? '✅ Done' : '⏳ Pending'}</p>
          <div className="flex gap-2">
            <button
              disabled={loading}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:bg-gray-400"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              disabled={loading}
              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:bg-gray-400"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete
            </button>
          </div>
        </>
      )}

      {showDeleteConfirm && (
        <div className="mt-3 p-3 bg-red-50 border border-red-300 rounded">
          <p className="text-sm mb-2">Are you sure? This action cannot be undone.</p>
          <div className="flex gap-2">
            <button
              disabled={loading}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded disabled:bg-gray-400"
              onClick={handleDelete}
            >
              {loading ? 'Deleting...' : 'Confirm Delete'}
            </button>
            <button
              disabled={loading}
              className="px-3 py-1 bg-gray-400 text-white text-sm rounded disabled:opacity-50"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
