import { apiClient } from '../api/apiClient';
import { jwtDecode } from 'jwt-decode';

export const authService = {
  /**
   * Register a new user
   * Payload: { fullName, organization, domain, password, mobileNo, email, role? }
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
   * Accepts (payload: { email, otp }) or (email, otp)
   */
  verifyOtp: async (emailOrPayload, maybeOtp) => {
    let payload;
    if (typeof emailOrPayload === 'object' && emailOrPayload !== null) {
      payload = emailOrPayload;
    } else {
      payload = { email: emailOrPayload, otp: maybeOtp };
    }
    const res = await apiClient.post('/auth/verify-otp', payload);
    return res.data;
  },

  /**
   * Request resending a fresh 6-digit OTP
   * Accepts (email) or ({ email })
   */
  resendOtp: async (emailOrPayload) => {
    const email = typeof emailOrPayload === 'object' ? emailOrPayload.email : emailOrPayload;
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

      const role = decodedUser.role || payload.role;
      localStorage.setItem('user_role', role);

      const userData = res.data?.user || {
        email: decodedUser.sub || decodedUser.email || credentials.email,
        role: role,
        fullName: decodedUser.name || decodedUser.fullName || credentials.email.split('@')[0],
      };

      localStorage.setItem('user', JSON.stringify(userData));
      window.dispatchEvent(new Event('userChanged'));
    }
    return res.data;
  },

  /**
   * Step 1: Request password reset OTP (Forgot Password)
   * Accepts (email) or ({ email })
   */
  forgotPassword: async (emailOrPayload) => {
    const email = typeof emailOrPayload === 'object' ? emailOrPayload.email : emailOrPayload;
    const res = await apiClient.post('/auth/forgot-password', { email });
    return res.data;
  },

  /**
   * Step 2: Confirm password reset with 6-digit OTP
   * Accepts (payload: { email, otp, newPassword }) or (email, otp, newPassword)
   */
  resetPassword: async (payloadOrEmail, maybeOtp, maybeNewPassword) => {
    let payload;
    if (typeof payloadOrEmail === 'object' && payloadOrEmail !== null) {
      payload = payloadOrEmail;
    } else {
      payload = { email: payloadOrEmail, otp: maybeOtp, newPassword: maybeNewPassword };
    }
    const res = await apiClient.post('/auth/reset-password', payload);
    return res.data;
  },

  /**
   * Clear session and tokens
   */
  logout: () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user');
    sessionStorage.removeItem('pending_verification_email');
    sessionStorage.removeItem('reset_email');
    window.dispatchEvent(new Event('userChanged'));
  },

  /**
   * Get current stored token
   */
  getToken: () => localStorage.getItem('jwt_token') || localStorage.getItem('token'),

  /**
   * Get role of current user
   */
  getRole: () => {
    const storedRole = localStorage.getItem('user_role');
    if (storedRole) return storedRole.toUpperCase();
    const user = authService.getCurrentUser();
    return (user?.role || '').toUpperCase();
  },

  /**
   * Get normalized uppercase role of the current user
   */
  getUserRole: () => authService.getRole(),

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

  /**
   * Check if current user logged in with Google OAuth
   */
  isGoogleUser: () => {
    const user = authService.getCurrentUser();
    return Boolean(user?.isGoogleUser);
  },
};

export default authService;

