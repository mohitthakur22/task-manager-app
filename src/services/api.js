import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: (email, password, name) =>
    api.post('/auth/signup', { email, password, name }),
  login: (email, password) => api.post('/auth/login', { email, password }),
};

// Tasks API
export const tasksAPI = {
  getAll: () => api.get('/tasks'),
  create: (title) => api.post('/tasks', { title }),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
};

export default api;

