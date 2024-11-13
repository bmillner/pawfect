import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const fallbackError = 'An unexpected error occurred';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(new Error('Session expired. Please login again.'));
    }

    const errorMessage = error.response?.data?.message || error.message || fallbackError;
    return Promise.reject(new Error(errorMessage));
  }
);