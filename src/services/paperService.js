import { apiClient } from '../api/apiClient';

export const paperService = {
  /**
   * Retrieve paginated research papers submitted by the authenticated user (Endpoint 7)
   * GET /api/research-papers/my-submissions?page=0&limit=10
   */
  getMySubmissions: async (page = 0, limit = 10) => {
    const response = await apiClient.get(
      `/api/research-papers/my-submissions?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  /**
   * Track submission status by tracking ID (Public)
   * GET /api/research-papers/track/{trackingId}
   */
  trackPaper: async (trackingId) => {
    try {
      const response = await apiClient.get(
        `/api/research-papers/track/${encodeURIComponent(trackingId)}`
      );
      return response.data;
    } catch (err) {
      if (err.response?.status === 404) {
        const fallbackRes = await apiClient.get(`/api/research-papers/${encodeURIComponent(trackingId)}`);
        return fallbackRes.data;
      }
      throw err;
    }
  },

  /**
   * Submit research paper with document attachment (Multipart)
   * POST /api/research-papers/submit-with-file
   */
  submitPaperWithFile: async (formData) => {
    const response = await apiClient.post('/api/research-papers/submit-with-file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Submit research paper via JSON payload
   * POST /api/research-papers/submit
   */
  submitPaper: async (paperData) => {
    const response = await apiClient.post('/api/research-papers/submit', paperData);
    return response.data;
  },

  /**
   * Inspect manuscript detail (Admin/Publisher/Editor)
   * GET /api/research-papers/{id}
   */
  getPaperById: async (id) => {
    const response = await apiClient.get(`/api/research-papers/${id}`);
    return response.data;
  },
};

export default paperService;
