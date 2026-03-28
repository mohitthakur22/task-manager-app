import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
      <div className="text-2xl font-bold" style={{ minWidth: '250px' }}>
        📋 Task Manager
      </div>

      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="hover:text-blue-300 transition">
          Dashboard
        </Link>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <span>👤 {user?.name || user?.email}</span>
            <span className="text-sm">▼</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10">
              <div className="p-4 border-b">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
