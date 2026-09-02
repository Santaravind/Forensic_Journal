import { apiClient } from '../api/apiClient';
import { jwtDecode } from 'jwt-decode';

export const authService = {
  /**
   * Register a new user
   * Payload: { fullName, organization, domain, password, mobileNo, email, role }
   */
  register: async (data) => {
    const payload = {
      ...data,
      role: (data.role || 'USER').toUpperCase(),
    };
    const res = await apiClient.post('/auth/register', payload);
    return res.data;
  },

  /**
   * Verify email via 6-digit OTP
   * Payload: { email, otp }
   */
  verifyOtp: async (email, otp) => {
    const res = await apiClient.post('/auth/verify-otp', { email, otp });
    return res.data;
  },

  /**
   * Request resending a fresh 6-digit OTP
   * Payload: { email }
   */
  resendOtp: async (email) => {
    const res = await apiClient.post('/auth/resend-otp', { email });
    return res.data;
  },

  /**
   * Log in user and store token/user details
   * Payload: { email, password, role }
   */
  login: async (credentials) => {
    const payload = {
      email: credentials.email,
      password: credentials.password,
      role: (credentials.role || 'USER').toUpperCase(),
    };
    const res = await apiClient.post('/auth/login', payload);
    
    if (res.data?.token) {
      const token = res.data.token;
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('token', token); // compatibility key
      
      let decodedUser = {};
      try {
        decodedUser = jwtDecode(token);
      } catch (err) {
        console.warn('Could not decode JWT:', err);
      }

      const userData = res.data?.user || {
        email: decodedUser.sub || decodedUser.email || credentials.email,
        role: decodedUser.role || payload.role,
        fullName: decodedUser.name || decodedUser.fullName || credentials.email.split('@')[0],
      };

      localStorage.setItem('user', JSON.stringify(userData));
      window.dispatchEvent(new Event('userChanged'));
    }
    return res.data;
  },

  /**
   * Reset user password
   * Payload: { email, newPassword }
   */
  resetPassword: async (email, newPassword) => {
    const res = await apiClient.post('/auth/reset-password', { email, newPassword });
    return res.data;
  },

  /**
   * Clear session and tokens
   */
  logout: () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('pending_verification_email');
    window.dispatchEvent(new Event('userChanged'));
  },

  /**
   * Get current stored token
   */
  getToken: () => localStorage.getItem('jwt_token') || localStorage.getItem('token'),

  /**
   * Get parsed user from localStorage
   */
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  /**
   * Check if user is logged in
   */
  isAuthenticated: () => {
    const token = localStorage.getItem('jwt_token') || localStorage.getItem('token');
    const user = authService.getCurrentUser();
    return Boolean(token || (user && user.isGoogleUser));
  },
};

export default authService;
