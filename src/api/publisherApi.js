import { apiClient } from './apiClient';

/**
 * Robustly extracts an array list from any Spring Boot / Express / Axios response format
 */
export const extractPaperList = (response) => {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.content)) return response.content;
  if (Array.isArray(response.data?.content)) return response.data.content;
  if (Array.isArray(response.queue)) return response.queue;
  if (Array.isArray(response.data?.queue)) return response.data.queue;
  if (Array.isArray(response.papers)) return response.papers;
  if (Array.isArray(response.data?.papers)) return response.data.papers;
  if (Array.isArray(response.manuscripts)) return response.manuscripts;
  if (Array.isArray(response.data?.manuscripts)) return response.data.manuscripts;
  if (Array.isArray(response.items)) return response.items;
  if (Array.isArray(response.data?.items)) return response.data.items;
  if (Array.isArray(response.list)) return response.list;
  if (Array.isArray(response.data?.list)) return response.data.list;
  return [];
};

/**
 * Normalizes any Research Paper / Manuscript JSON shape from Spring Boot
 */
export const normalizePaper = (p) => {
  if (!p) return null;

  // Extract authors array / string
  let parsedAuthors = [];
  if (Array.isArray(p.authors)) {
    parsedAuthors = p.authors;
  } else if (typeof p.authors === 'string') {
    try {
      const parsed = JSON.parse(p.authors);
      parsedAuthors = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      parsedAuthors = [{ name: p.authors }];
    }
  }

  const firstAuthorName =
    p.author ||
    p.authorName ||
    p.firstAuthor?.name ||
    p.submitter?.name ||
    parsedAuthors[0]?.name ||
    (typeof parsedAuthors[0] === 'string' ? parsedAuthors[0] : null) ||
    'Primary Author';

  const firstAuthorEmail =
    p.authorEmail ||
    p.email ||
    p.firstAuthor?.email ||
    p.submitter?.email ||
    parsedAuthors[0]?.email ||
    '';

  const firstAuthorUniv =
    p.university ||
    p.organization ||
    p.firstAuthor?.university ||
    parsedAuthors[0]?.university ||
    'University / Institutional Affiliation';

  const title =
    p.title ||
    p.paperTitle ||
    p.caseTitle ||
    'Untitled Manuscript';

  const id = p.id || p._id || p.submissionId || ('FP-2026-' + Math.floor(1000 + Math.random() * 9000));
  const submissionId = p.submissionId || (p.id ? `FP-2026-${p.id}` : `FP-2026-${id}`);

  const rawStatus = (p.status || p.paperStatus || p.stage || 'NEW_SUBMISSION').toString();
  let status = 'New Submission';
  let stage = 'Initial Check';

  const sUpper = rawStatus.toUpperCase();
  if (sUpper.includes('ACCEPT')) {
    status = 'Accepted';
    stage = 'Ready for Publisher';
  } else if (sUpper.includes('PUBLISH')) {
    status = 'Published';
    stage = 'Live Catalog';
  } else if (sUpper.includes('REVIEW')) {
    status = 'Under Review';
    stage = 'Peer Review';
  } else if (sUpper.includes('REVIS') || sUpper.includes('AWAIT') || sUpper.includes('DECISION')) {
    status = 'Awaiting Decision';
    stage = 'Editorial Decision';
  } else if (sUpper.includes('REJECT')) {
    status = 'Rejected';
    stage = 'Closed';
  }

  const date =
    p.date ||
    p.submittedAt ||
    (p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : null) ||
    (p.created_at ? new Date(p.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : null) ||
    '15 May 2026';

  const fileUrl = p.manuscriptFileUrl || p.fileUrl || p.paperFileUrl || p.filePath || p.paperFile || '';
  const abstract = p.abstractText || p.abstract || '';

  return {
    ...p,
    id,
    submissionId,
    title,
    paperTitle: title,
    caseTitle: title,
    author: firstAuthorName,
    authorEmail: firstAuthorEmail,
    university: firstAuthorUniv,
    firstAuthor: {
      name: firstAuthorName,
      email: firstAuthorEmail,
      university: firstAuthorUniv,
      contactNumber: p.mobileNumber || p.contactNumber || '',
    },
    authors: parsedAuthors.length > 0 ? parsedAuthors : [{ name: firstAuthorName, email: firstAuthorEmail, university: firstAuthorUniv }],
    researchArea: p.researchArea || p.domain || 'Forensic Science',
    abstract,
    abstractText: abstract,
    keywords: Array.isArray(p.keywords) ? p.keywords : (typeof p.keywords === 'string' ? p.keywords.split(',') : []),
    status,
    rawStatus,
    stage,
    date,
    submittedAt: date,
    fileUrl,
    manuscriptFileUrl: fileUrl,
    doi: p.doi || `10.5958/JFSR.2026.${Math.floor(1000 + Math.random() * 9000)}`,
    journal: p.journal || p.journalTitle || 'Journal of Forensic Science and Research',
    issue: p.issue || p.issueTitle || 'Vol. 10, Issue 2 May 2026',
  };
};

export const publisherApi = {
  /**
   * 1. Dashboard Statistics (GET /api/publisher/stats)
   */
  getStats: async () => {
    try {
      const res = await apiClient.get('/api/publisher/stats');
      return res.data;
    } catch (err) {
      console.warn('Could not fetch live publisher stats:', err);
      return null;
    }
  },

  /**
   * 2. Ingestion & Accepted Queue (GET /api/publisher/queue)
   */
  getQueue: async (page = 1, limit = 50, search = '') => {
    try {
      const res = await apiClient.get('/api/publisher/queue', {
        params: { page, limit, search: search || undefined },
      });
      return res.data;
    } catch (err) {
      // Fallback if queue endpoint is unavailable
      const res = await apiClient.get('/api/research-papers', {
        params: { page, limit, search: search || undefined },
      });
      return res.data;
    }
  },

  /**
   * 3. Publish Paper Action (POST /api/publisher/publish)
   */
  publishPaper: async (payload) => {
    const res = await apiClient.post('/api/publisher/publish', payload);
    return res.data;
  },

  /**
   * 4. Recently Published Papers Feed (GET /api/publisher/published-papers)
   */
  getPublishedPapers: async (page = 1, limit = 10, journalId = '', year = '', search = '') => {
    try {
      const res = await apiClient.get('/api/publisher/published-papers', {
        params: { 
          page, 
          limit, 
          journalId: journalId || undefined, 
          year: year || undefined, 
          search: search || undefined 
        },
      });
      return res.data;
    } catch (err) {
      if (err.response?.status === 404) {
        const res = await apiClient.get('/api/research-papers', {
          params: { page, limit, journalId, year, search },
        });
        return res.data;
      }
      throw err;
    }
  },

  /**
   * 5. Journal Management
   */
  getJournals: async () => {
    const res = await apiClient.get('/api/publisher/journals');
    return res.data;
  },

  createJournal: async (journalData) => {
    const res = await apiClient.post('/api/publisher/journals', journalData);
    return res.data;
  },

  /**
   * 6. Issue Management
   */
  getIssues: async (journalId = '') => {
    const res = await apiClient.get('/api/publisher/issues', {
      params: { journalId: journalId || undefined },
    });
    return res.data;
  },

  createIssue: async (issueData) => {
    const res = await apiClient.post('/api/publisher/issues', issueData);
    return res.data;
  },

  publishIssue: async (issueId) => {
    const res = await apiClient.patch(`/api/publisher/issues/${issueId}/publish`);
    return res.data;
  },

  /**
   * 7. Certificate Generation & List
   */
  getCertificates: async (search = '', page = 1, limit = 50) => {
    const res = await apiClient.get('/api/publisher/certificates', {
      params: { search: search || undefined, page, limit },
    });
    return res.data;
  },

  generateCertificate: async (certPayload) => {
    const res = await apiClient.post('/api/publisher/certificates/generate', certPayload);
    return res.data;
  },

  /**
   * 8. Direct Admin-to-Author Emailing (via Resend)
   */
  sendAuthorEmail: async (emailPayload) => {
    try {
      const res = await apiClient.post('/api/publisher/mail-author', emailPayload);
      return res.data;
    } catch {
      const res = await apiClient.post('/api/admin/mail-author', emailPayload);
      return res.data;
    }
  },

  /**
   * 9. Announcements
   */
  getAnnouncements: async () => {
    const res = await apiClient.get('/api/publisher/announcements');
    return res.data;
  },

  createAnnouncement: async (announcementData) => {
    const res = await apiClient.post('/api/publisher/announcements', announcementData);
    return res.data;
  },

  /**
   * 10. File Upload (DOC, DOCX, PDF)
   */
  uploadDocument: async (file, folder = 'published_papers') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    const res = await apiClient.post('/api/publisher/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  /**
   * 11. Seed Demo Data
   */
  seedDemoData: async () => {
    const res = await apiClient.post('/api/publisher/seed-demo');
    return res.data;
  },
};

/**
 * Public & Author Research Paper APIs
 */
export const researchPaperApi = {
  // 1. Submit research paper with attached file (POST /api/research-papers/submit-with-file)
  submitWithFile: async (file, metadata = {}) => {
    const formData = new FormData();
    
    // Attach file under standard parameter names
    if (file) {
      formData.append('file', file);
    }

    // Attach individual fields for Spring Boot @RequestParam binding in ResearchPaperController
    const title = metadata.paperTitle || metadata.title || metadata.caseTitle || '';
    const abstractText = metadata.abstract || metadata.abstractText || '';
    
    if (title) formData.append('title', title);
    if (metadata.researchArea) formData.append('researchArea', metadata.researchArea);
    if (abstractText) formData.append('abstractText', abstractText);
    if (metadata.keywords) formData.append('keywords', metadata.keywords);

    // Also attach the full metadata JSON for @RequestParam("metadata") parsing
    formData.append('metadata', JSON.stringify({
      ...metadata,
      title,
      abstractText,
    }));

    const config = {
      headers: {
        'Content-Type': undefined,
      },
    };

    try {
      const res = await apiClient.post('/api/research-papers/submit-with-file', formData, config);
      return res.data;
    } catch (err) {
      if (err.response?.status === 404) {
        const fallbackRes = await apiClient.post('/api/research-papers/submit', formData, config);
        return fallbackRes.data;
      }
      throw err;
    }
  },

  // 2. Submit Paper via JSON payload (POST /api/research-papers/submit)
  submitJson: async (paperData) => {
    const res = await apiClient.post('/api/research-papers/submit', paperData);
    return res.data;
  },

  // 3. Track paper status by submission ID (GET /api/research-papers/track/{submissionId})
  trackBySubmissionId: async (submissionId) => {
    try {
      const res = await apiClient.get(`/api/research-papers/track/${submissionId}`);
      return res.data;
    } catch (err) {
      if (err.response?.status === 404) {
        const fallbackRes = await apiClient.get(`/api/research-papers/${submissionId}`);
        return fallbackRes.data;
      }
      throw err;
    }
  },

  // 4. Get all submitted research papers for Admin / Publisher Dashboard
  getAllPapers: async (params = {}) => {
    try {
      // 1st priority: Try Publisher Queue (GET /api/publisher/queue)
      const queueRes = await apiClient.get('/api/publisher/queue', { params: { page: 1, limit: 100, ...params } });
      const rawList = extractPaperList(queueRes.data || queueRes);
      if (rawList.length > 0) return queueRes.data || queueRes;
    } catch (e) {
      // queue endpoint failed or forbidden, proceed to fallback
    }

    try {
      // 2nd priority: GET /api/research-papers
      const res = await apiClient.get('/api/research-papers', { params });
      return res.data;
    } catch (err) {
      try {
        const pubRes = await apiClient.get('/api/publisher/published-papers', { params });
        return pubRes.data;
      } catch (pubErr) {
        return [];
      }
    }
  },

  // 5. Get single paper details (GET /api/research-papers/{id})
  getPaperById: async (id) => {
    const res = await apiClient.get(`/api/research-papers/${id}`);
    return res.data;
  },

  // 6. Update paper status (PATCH /api/research-papers/{id}/status)
  updatePaperStatus: async (id, status, notes = '') => {
    try {
      const res = await apiClient.patch(`/api/research-papers/${id}/status`, { status, notes });
      return res.data;
    } catch (err) {
      if (err.response?.status === 404 || err.response?.status === 405) {
        const altRes = await apiClient.post(`/api/editor/manuscripts/${id}/decision`, { decision: status, editorialNotes: notes });
        return altRes.data;
      }
      throw err;
    }
  },

  // 7. Public QR code certificate verification
  verifyCertificate: async (qrCode) => {
    const res = await apiClient.get(`/api/public/certificates/verify/${qrCode}`);
    return res.data;
  },
};

export default publisherApi;
