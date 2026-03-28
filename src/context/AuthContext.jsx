import { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signup = async (email, password, name) => {
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.signup(email, password, name);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Signup failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tasks');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
