import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Automatic JWT Bearer token injection for all protected routes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token') || localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response interceptor for session expiry (401) and access control (403)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthEndpoint = error.config?.url?.includes('/auth/');
      
      // Only clear storage and redirect for expired session on protected routes (not auth login/verify attempts)
      if (!isAuthEndpoint) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('userChanged'));
        
        const publicRoutes = ['/login', '/register', '/verify-otp'];
        if (!publicRoutes.includes(window.location.pathname)) {
          window.location.href = '/login?expired=true';
        }
      }
    } else if (error.response?.status === 403) {
      console.warn('Access denied (403): You do not have permission for this resource.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;

