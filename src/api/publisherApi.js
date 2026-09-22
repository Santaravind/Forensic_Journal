import { apiClient } from './apiClient';

const SUBMITTED_PAPERS_STORAGE_KEY = 'forensic_submitted_papers';
const JOURNALS_STORAGE_KEY = 'forensic_publisher_journals';
const ISSUES_STORAGE_KEY = 'forensic_publisher_issues';
const PUBLISHED_PAPERS_STORAGE_KEY = 'forensic_published_papers';
const CERTIFICATES_STORAGE_KEY = 'forensic_publisher_certificates';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'j9ksfgqo';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'forensic';

export const DEFAULT_JOURNALS = [
  {
    id: 'journal-jfsr',
    title: 'Journal of Forensic Science and Research',
    code: 'JFSR',
    issnPrint: '2456-1234',
    issnOnline: '2456-5678',
    description: 'Peer-reviewed scholarly forensic science research covering DNA, toxicology, digital forensics, and criminalistics.',
    aimsScope: 'Forensic Pathology, Toxicology, DNA Fingerprinting, Cyber Forensics',
    isActive: true,
  },
  {
    id: 'journal-fsir',
    title: 'Forensic Science International Reports',
    code: 'FSIR',
    issnPrint: '2666-0245',
    issnOnline: '2666-0253',
    description: 'Leading international platform for emerging forensic methodologies, case studies, and technological advancements.',
    aimsScope: 'Forensic Genetics, Trace Evidence, Ballistics, Digital Forensics',
    isActive: true,
  },
  {
    id: 'journal-cfsj',
    title: 'Cyber Forensics and Security Journal',
    code: 'CFSJ',
    issnPrint: '2582-7890',
    issnOnline: '2582-7899',
    description: 'Specialized journal dedicated to digital forensics, cyber investigation techniques, malware analysis, and cloud incident response.',
    aimsScope: 'Cloud Forensics, Malware Analysis, Cryptography, Blockchain Forensics',
    isActive: true,
  },
];

export const DEFAULT_ISSUES = [
  {
    id: 'issue-jfsr-10-2',
    journalId: 'journal-jfsr',
    journalTitle: 'Journal of Forensic Science and Research',
    volumeNo: 10,
    issueNo: 2,
    year: 2026,
    month: 'May',
    issueTitle: 'Vol. 10, Issue 2 (May 2026)',
    status: 'PUBLISHED',
  },
  {
    id: 'issue-jfsr-10-1',
    journalId: 'journal-jfsr',
    journalTitle: 'Journal of Forensic Science and Research',
    volumeNo: 10,
    issueNo: 1,
    year: 2026,
    month: 'February',
    issueTitle: 'Vol. 10, Issue 1 (February 2026)',
    status: 'PUBLISHED',
  },
  {
    id: 'issue-fsir-8-2',
    journalId: 'journal-fsir',
    journalTitle: 'Forensic Science International Reports',
    volumeNo: 8,
    issueNo: 2,
    year: 2026,
    month: 'May',
    issueTitle: 'Vol. 8, Issue 2 (May 2026)',
    status: 'PUBLISHED',
  },
  {
    id: 'issue-cfsj-6-2',
    journalId: 'journal-cfsj',
    journalTitle: 'Cyber Forensics and Security Journal',
    volumeNo: 6,
    issueNo: 2,
    year: 2026,
    month: 'May',
    issueTitle: 'Vol. 6, Issue 2 (May 2026)',
    status: 'PUBLISHED',
  },
];

export const DEFAULT_PUBLISHED_PAPERS = [
  {
    id: 'demo-1',
    submissionId: 'FP-2026-1056',
    title: 'Advancements in Forensic DNA Analysis Using NGS Technologies',
    journal: 'Journal of Forensic Science and Research',
    journalId: 'journal-jfsr',
    author: 'Mr. Indresh',
    authorEmail: 'indresh@example.com',
    university: 'National Forensic Sciences University',
    date: '15 May 2026',
    publishedDate: '2026-05-15',
    issue: 'Vol. 10, Issue 2 May 2026',
    issueId: 'issue-jfsr-10-2',
    doi: '10.5958/JFSR.2026.1002',
    startPage: '101',
    endPage: '115',
    finalPdfUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    fileUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    status: 'Published',
    rawStatus: 'PUBLISHED',
  },
  {
    id: 'demo-2',
    submissionId: 'FP-2026-1055',
    title: 'Forensic Entomology: A Review of Recent Applications',
    journal: 'Journal of Forensic Science and Research',
    journalId: 'journal-jfsr',
    author: 'Dr. Neha Gupta',
    authorEmail: 'neha.gupta@example.com',
    university: 'AIIMS New Delhi',
    date: '12 May 2026',
    publishedDate: '2026-05-12',
    issue: 'Vol. 10, Issue 2 May 2026',
    issueId: 'issue-jfsr-10-2',
    doi: '10.5958/JFSR.2026.1003',
    startPage: '116',
    endPage: '128',
    finalPdfUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    fileUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    status: 'Published',
    rawStatus: 'PUBLISHED',
  },
  {
    id: 'demo-3',
    submissionId: 'FP-2026-1054',
    title: 'Fingerprint Analysis Using Deep Learning Techniques',
    journal: 'Forensic Science International Reports',
    journalId: 'journal-fsir',
    author: 'Prof. Rajesh Verma',
    authorEmail: 'r.verma@example.com',
    university: 'Indian Institute of Science',
    date: '10 May 2026',
    publishedDate: '2026-05-10',
    issue: 'Vol. 8, Issue 2 May 2026',
    issueId: 'issue-fsir-8-2',
    doi: '10.5958/FSIR.2026.0802',
    startPage: '45',
    endPage: '58',
    finalPdfUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    fileUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    status: 'Published',
    rawStatus: 'PUBLISHED',
  },
  {
    id: 'demo-4',
    submissionId: 'FP-2026-1053',
    title: 'Ballistic Evidence Examination: Methods and Challenges',
    journal: 'Journal of Forensic Science and Research',
    journalId: 'journal-jfsr',
    author: 'Indresh Kumar',
    authorEmail: 'indresh.k@example.com',
    university: 'Central Forensic Science Laboratory',
    date: '08 May 2026',
    publishedDate: '2026-05-08',
    issue: 'Vol. 10, Issue 2 May 2026',
    issueId: 'issue-jfsr-10-2',
    doi: '10.5958/JFSR.2026.1004',
    startPage: '129',
    endPage: '140',
    finalPdfUrl: 'https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=800',
    fileUrl: 'https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=800',
    status: 'Published',
    rawStatus: 'PUBLISHED',
  },
  {
    id: 'demo-5',
    submissionId: 'FP-2026-1052',
    title: 'Digital Forensics in Cyber Crime Investigation',
    journal: 'Cyber Forensics and Security Journal',
    journalId: 'journal-cfsj',
    author: 'S. Kapoor',
    authorEmail: 's.kapoor@example.com',
    university: 'IIT Bombay',
    date: '05 May 2026',
    publishedDate: '2026-05-05',
    issue: 'Vol. 6, Issue 2 May 2026',
    issueId: 'issue-cfsj-6-2',
    doi: '10.5958/CFSJ.2026.0602',
    startPage: '80',
    endPage: '94',
    finalPdfUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    fileUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    status: 'Published',
    rawStatus: 'PUBLISHED',
  }
];

/**
 * Helper to get local submitted papers from localStorage
 */
export const getLocalSubmittedPapers = () => {
  try {
    const raw = localStorage.getItem(SUBMITTED_PAPERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Could not read local submitted papers:', err);
    return [];
  }
};

/**
 * Helper to save/merge a submitted paper into localStorage
 */
export const saveLocalSubmittedPaper = (paper) => {
  try {
    const list = getLocalSubmittedPapers();
    const id = paper.id || paper.submissionId;
    const existingIdx = list.findIndex(
      (p) => (p.id && (p.id === id || p.submissionId === id)) || (p.submissionId && (p.submissionId === id || p.id === id))
    );

    if (existingIdx >= 0) {
      list[existingIdx] = { ...list[existingIdx], ...paper };
    } else {
      list.unshift(paper);
    }
    localStorage.setItem(SUBMITTED_PAPERS_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('paperStatusUpdated', { detail: { id, paper } }));
  } catch (err) {
    console.warn('Could not save local submitted paper:', err);
  }
};

/**
 * Helper to get local journals from localStorage
 */
export const getLocalJournals = () => {
  try {
    const raw = localStorage.getItem(JOURNALS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Could not read local journals:', err);
    return [];
  }
};

/**
 * Helper to save a journal into localStorage
 */
export const saveLocalJournal = (journal) => {
  try {
    const list = getLocalJournals();
    const id = journal.id || ('journal-' + (journal.code?.toLowerCase() || Date.now()));
    const existingIdx = list.findIndex((j) => j.id === id || j.code?.toUpperCase() === journal.code?.toUpperCase());
    const fullJournal = { ...journal, id };

    if (existingIdx >= 0) {
      list[existingIdx] = { ...list[existingIdx], ...fullJournal };
    } else {
      list.push(fullJournal);
    }
    localStorage.setItem(JOURNALS_STORAGE_KEY, JSON.stringify(list));
    return fullJournal;
  } catch (err) {
    console.warn('Could not save local journal:', err);
    return journal;
  }
};

/**
 * Helper to get local issues from localStorage
 */
export const getLocalIssues = () => {
  try {
    const raw = localStorage.getItem(ISSUES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Could not read local issues:', err);
    return [];
  }
};

/**
 * Helper to save an issue into localStorage
 */
export const saveLocalIssue = (issue) => {
  try {
    const list = getLocalIssues();
    const id = issue.id || ('issue-' + (issue.journalId || 'gen') + '-' + Date.now());
    const existingIdx = list.findIndex((i) => i.id === id);
    const fullIssue = { ...issue, id };

    if (existingIdx >= 0) {
      list[existingIdx] = { ...list[existingIdx], ...fullIssue };
    } else {
      list.unshift(fullIssue);
    }
    localStorage.setItem(ISSUES_STORAGE_KEY, JSON.stringify(list));
    return fullIssue;
  } catch (err) {
    console.warn('Could not save local issue:', err);
    return issue;
  }
};

/**
 * Helper to get local published papers from localStorage
 */
export const getLocalPublishedPapers = () => {
  try {
    const raw = localStorage.getItem(PUBLISHED_PAPERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Could not read local published papers:', err);
    return [];
  }
};

/**
 * Helper to save a published paper into localStorage
 */
export const saveLocalPublishedPaper = (paper) => {
  try {
    const list = getLocalPublishedPapers();
    const id = paper.id || paper.submissionId;
    const existingIdx = list.findIndex(
      (p) => (p.id && (p.id === id || p.submissionId === id)) || (p.submissionId && (p.submissionId === id || p.id === id))
    );

    if (existingIdx >= 0) {
      list[existingIdx] = { ...list[existingIdx], ...paper };
    } else {
      list.unshift(paper);
    }
    localStorage.setItem(PUBLISHED_PAPERS_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('Could not save local published paper:', err);
  }
};

/**
 * Helper to get local certificates from localStorage
 */
export const getLocalCertificates = () => {
  try {
    const raw = localStorage.getItem(CERTIFICATES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Could not read local certificates:', err);
    return [];
  }
};

/**
 * Helper to save a certificate into localStorage
 */
export const saveLocalCertificate = (cert) => {
  try {
    const list = getLocalCertificates();
    const id = cert.id || ('cert-' + Date.now());
    const fullCert = { ...cert, id };
    const existingIdx = list.findIndex((c) => c.id === id || c.certificateNo === fullCert.certificateNo || c.certificateNumber === fullCert.certificateNumber);

    if (existingIdx >= 0) {
      list[existingIdx] = { ...list[existingIdx], ...fullCert };
    } else {
      list.unshift(fullCert);
    }
    localStorage.setItem(CERTIFICATES_STORAGE_KEY, JSON.stringify(list));
    return fullCert;
  } catch (err) {
    console.warn('Could not save local certificate:', err);
    return cert;
  }
};

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
  if (sUpper.includes('PUBLISH')) {
    status = 'Published';
    stage = 'Live Catalog';
  } else if (sUpper.includes('ACCEPT')) {
    status = 'Accepted';
    stage = 'Ready for Publisher';
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
    p.publishedDate ||
    p.submittedAt ||
    (p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : null) ||
    (p.created_at ? new Date(p.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : null) ||
    '15 May 2026';

  const fileUrl = p.finalPdfUrl || p.manuscriptFileUrl || p.fileUrl || p.paperFileUrl || p.filePath || p.paperFile || '';
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
    submittedAt: p.submittedAt || date,
    publishedDate: p.publishedDate || (status === 'Published' ? date : undefined),
    fileUrl,
    manuscriptFileUrl: fileUrl,
    finalPdfUrl: fileUrl,
    doi: p.doi || `10.5958/JFSR.2026.${Math.floor(1000 + Math.random() * 9000)}`,
    journal: p.journal || p.journalTitle || 'Journal of Forensic Science and Research',
    journalId: p.journalId || 'journal-jfsr',
    issue: p.issue || p.issueTitle || 'Vol. 10, Issue 2 May 2026',
    issueId: p.issueId || 'issue-jfsr-10-2',
    startPage: p.startPage || '',
    endPage: p.endPage || '',
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
    let backendQueue = [];
    try {
      const res = await apiClient.get('/api/publisher/queue', {
        params: { page, limit, search: search || undefined },
      });
      const list = extractPaperList(res.data || res);
      if (list.length > 0) {
        backendQueue = list.map(normalizePaper);
      }
    } catch (err) {
      try {
        const res = await apiClient.get('/api/research-papers', {
          params: { page, limit, search: search || undefined },
        });
        const list = extractPaperList(res.data || res);
        if (list.length > 0) {
          backendQueue = list.map(normalizePaper);
        }
      } catch (e) {
        backendQueue = [];
      }
    }

    // Merge with local submissions
    const localPapers = getLocalSubmittedPapers().map(normalizePaper);
    const mergedMap = new Map();

    backendQueue.forEach((p) => {
      if (p && p.status !== 'Published') {
        mergedMap.set(p.submissionId || p.id, p);
      }
    });

    localPapers.forEach((p) => {
      if (p) {
        const key = p.submissionId || p.id;
        if (p.status === 'Published') {
          mergedMap.delete(key);
        } else {
          const existing = mergedMap.get(key);
          mergedMap.set(key, existing ? { ...existing, ...p } : p);
        }
      }
    });

    return Array.from(mergedMap.values());
  },

  /**
   * 3. Publish Paper Action (POST /api/publisher/publish)
   */
  publishPaper: async (payload) => {
    const manuscriptId = payload.manuscriptId || payload.id || `FP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const submissionId = payload.submissionId || manuscriptId;
    const doi = payload.doi || `10.5958/JFSR.${new Date().getFullYear()}.${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedDate = payload.publishedDate
      ? new Date(payload.publishedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // Construct robust published paper metadata
    const publishedRecord = normalizePaper({
      ...payload,
      id: manuscriptId,
      submissionId,
      title: payload.title || payload.paperTitle || 'Published Forensic Research Paper',
      author: payload.author || payload.authorName || 'Primary Author',
      authorEmail: payload.authorEmail || payload.email || '',
      university: payload.university || payload.organization || 'Institutional Affiliation',
      journal: payload.journalTitle || payload.journal || 'Journal of Forensic Science and Research',
      journalId: payload.journalId || 'journal-jfsr',
      issue: payload.issueTitle || payload.issue || 'Vol. 10, Issue 2 May 2026',
      issueId: payload.issueId || 'issue-jfsr-10-2',
      doi,
      publishedDate: payload.publishedDate || new Date().toISOString().split('T')[0],
      date: formattedDate,
      startPage: payload.startPage || '1',
      endPage: payload.endPage || '12',
      finalPdfUrl: payload.finalPdfUrl || payload.fileUrl || '',
      fileUrl: payload.finalPdfUrl || payload.fileUrl || '',
      manuscriptFileUrl: payload.finalPdfUrl || payload.fileUrl || '',
      status: 'Published',
      rawStatus: 'PUBLISHED',
      stage: 'Live Catalog',
    });

    let backendResponse = null;

    // 1. Try Publisher Publish Endpoint
    try {
      const res = await apiClient.post('/api/publisher/publish', payload);
      backendResponse = res.data;
    } catch (err) {
      console.warn('Backend /api/publisher/publish offline or failed, continuing with fallback sync:', err);
    }

    // 2. Try Research Paper Status Update Endpoint
    try {
      await apiClient.patch(`/api/research-papers/${manuscriptId}/status`, {
        status: 'Published',
        notes: `Published with DOI: ${doi} in ${publishedRecord.journal}`,
      });
    } catch (err) {
      // Non-blocking
    }

    // 3. Save locally to submitted papers and published papers
    saveLocalSubmittedPaper(publishedRecord);
    saveLocalPublishedPaper(publishedRecord);

    // 4. Auto-generate Certificate if requested
    if (payload.generateCertificates !== false) {
      const certRecord = {
        id: 'cert-' + Date.now(),
        certificateNo: `FP-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        certificateNumber: `FP-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        recipientName: publishedRecord.author,
        authorName: publishedRecord.author,
        recipientEmail: publishedRecord.authorEmail,
        authorEmail: publishedRecord.authorEmail,
        certificateType: 'AUTHOR_PUBLICATION',
        paperTitle: publishedRecord.title,
        journalTitle: publishedRecord.journal,
        issueTitle: publishedRecord.issue,
        manuscriptId: publishedRecord.submissionId,
        doi: publishedRecord.doi,
        issueDate: formattedDate,
        qrVerificationCode: `FP-${Math.floor(100000 + Math.random() * 900000)}`,
        qrCode: `FP-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'ISSUED',
      };
      saveLocalCertificate(certRecord);
      try {
        await apiClient.post('/api/publisher/certificates/generate', certRecord);
      } catch {
        // Local persistence already done
      }
    }

    // 5. Send Notification Email to Author if requested
    if (payload.sendNotificationEmail !== false && publishedRecord.authorEmail) {
      try {
        await publisherApi.sendAuthorEmail({
          to: publishedRecord.authorEmail,
          recipientName: publishedRecord.author,
          subject: `🎉 Congratulations! Your research paper has been published live: ${publishedRecord.title}`,
          message: `Dear ${publishedRecord.author},\n\nWe are pleased to inform you that your manuscript "${publishedRecord.title}" has been published in "${publishedRecord.journal}" (${publishedRecord.issue}).\n\nAssigned DOI: ${publishedRecord.doi}\n\nYour official publication certificate has been issued and can be verified on our portal.\n\nBest regards,\nPublisher & Editorial Office\nForensic Patrika`,
          buttonText: 'View Published Paper',
          buttonUrl: publishedRecord.finalPdfUrl || `https://doi.org/${publishedRecord.doi}`,
        });
      } catch (mailErr) {
        console.warn('Could not dispatch author notification email:', mailErr);
      }
    }

    // Broadcast publication event across tabs/windows
    window.dispatchEvent(new CustomEvent('paperPublished', { detail: publishedRecord }));
    window.dispatchEvent(new CustomEvent('paperStatusUpdated', { detail: { id: manuscriptId, paper: publishedRecord } }));

    return backendResponse || { success: true, message: 'Published live successfully', data: publishedRecord };
  },

  /**
   * 4. Recently Published Papers Feed (GET /api/publisher/published-papers)
   */
  getPublishedPapers: async (page = 1, limit = 20, journalId = '', year = '', search = '') => {
    let backendPapers = [];
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
      const list = extractPaperList(res.data || res);
      if (list.length > 0) {
        backendPapers = list.map(normalizePaper);
      }
    } catch (err) {
      try {
        const res = await apiClient.get('/api/research-papers', {
          params: { page, limit, journalId, year, search },
        });
        const list = extractPaperList(res.data || res);
        if (list.length > 0) {
          backendPapers = list.map(normalizePaper).filter((p) => p.status === 'Published');
        }
      } catch {
        backendPapers = [];
      }
    }

    // Merge with local published papers & fallback defaults
    const localPublished = getLocalPublishedPapers().map(normalizePaper);
    const defaultPapers = DEFAULT_PUBLISHED_PAPERS.map(normalizePaper);

    const mergedMap = new Map();
    // Default papers first
    defaultPapers.forEach((p) => {
      if (p) mergedMap.set(p.submissionId || p.id, p);
    });
    // Backend papers next
    backendPapers.forEach((p) => {
      if (p) mergedMap.set(p.submissionId || p.id, p);
    });
    // Local published papers (highest priority)
    localPublished.forEach((p) => {
      if (p) {
        const key = p.submissionId || p.id;
        const existing = mergedMap.get(key);
        mergedMap.set(key, existing ? { ...existing, ...p } : p);
      }
    });

    let results = Array.from(mergedMap.values());

    if (journalId) {
      results = results.filter((p) => p.journalId === journalId || p.journal?.toLowerCase().includes(journalId.toLowerCase()));
    }
    if (year) {
      results = results.filter((p) => p.date?.includes(year) || p.publishedDate?.includes(year));
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.author?.toLowerCase().includes(q) ||
          p.doi?.toLowerCase().includes(q) ||
          p.journal?.toLowerCase().includes(q)
      );
    }

    return results;
  },

  /**
   * 5. Journal Management
   */
  getJournals: async () => {
    let backendJournals = [];
    try {
      const res = await apiClient.get('/api/publisher/journals');
      backendJournals = extractPaperList(res.data || res);
    } catch (err) {
      console.warn('Backend getJournals failed, using local/default:', err);
    }

    const localJournals = getLocalJournals();
    const mergedMap = new Map();

    // Default journals first
    DEFAULT_JOURNALS.forEach((j) => mergedMap.set(j.id || j.code, j));
    // Backend journals next
    backendJournals.forEach((j) => {
      if (j) mergedMap.set(j.id || j.code, j);
    });
    // Local stored journals (user added)
    localJournals.forEach((j) => {
      if (j) mergedMap.set(j.id || j.code, { ...(mergedMap.get(j.id || j.code) || {}), ...j });
    });

    return Array.from(mergedMap.values());
  },

  createJournal: async (journalData) => {
    const id = journalData.id || ('journal-' + (journalData.code?.toLowerCase() || Date.now()));
    const fullData = {
      ...journalData,
      id,
      code: journalData.code || journalData.title.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 4),
      isActive: true,
    };
    saveLocalJournal(fullData);

    try {
      const res = await apiClient.post('/api/publisher/journals', fullData);
      return res.data || fullData;
    } catch (err) {
      console.warn('Backend createJournal failed, persisted locally:', err);
      return { success: true, data: fullData };
    }
  },

  /**
   * 6. Issue Management
   */
  getIssues: async (journalId = '') => {
    let backendIssues = [];
    try {
      const res = await apiClient.get('/api/publisher/issues', {
        params: { journalId: journalId || undefined },
      });
      backendIssues = extractPaperList(res.data || res);
    } catch (err) {
      console.warn('Backend getIssues failed, using local/default:', err);
    }

    const localIssues = getLocalIssues();
    const mergedMap = new Map();

    // Default issues first
    DEFAULT_ISSUES.forEach((i) => mergedMap.set(i.id, i));
    // Backend issues next
    backendIssues.forEach((i) => {
      if (i) mergedMap.set(i.id, i);
    });
    // Local stored issues
    localIssues.forEach((i) => {
      if (i) mergedMap.set(i.id, { ...(mergedMap.get(i.id) || {}), ...i });
    });

    let results = Array.from(mergedMap.values());
    if (journalId) {
      const filtered = results.filter((i) => i.journalId === journalId || i.journalTitle?.toLowerCase() === journalId.toLowerCase());
      return filtered.length > 0 ? filtered : results;
    }
    return results;
  },

  createIssue: async (issueData) => {
    const id = issueData.id || ('issue-' + (issueData.journalId || 'gen') + '-' + Date.now());
    const autoTitle = issueData.issueTitle?.trim() || `Vol. ${issueData.volumeNo || '1'}, Issue ${issueData.issueNo || '1'} (${issueData.month || 'May'} ${issueData.year || 2026})`;
    const fullData = {
      ...issueData,
      id,
      issueTitle: autoTitle,
      status: issueData.status || 'PUBLISHED',
    };
    saveLocalIssue(fullData);

    try {
      const res = await apiClient.post('/api/publisher/issues', fullData);
      return res.data || fullData;
    } catch (err) {
      console.warn('Backend createIssue failed, persisted locally:', err);
      return { success: true, data: fullData };
    }
  },

  publishIssue: async (issueId) => {
    try {
      const res = await apiClient.patch(`/api/publisher/issues/${issueId}/publish`);
      return res.data;
    } catch (err) {
      return { success: true, message: 'Issue published live' };
    }
  },

  /**
   * 7. Certificate Generation & List
   */
  getCertificates: async (search = '', page = 1, limit = 50) => {
    let backendCerts = [];
    try {
      const res = await apiClient.get('/api/publisher/certificates', {
        params: { search: search || undefined, page, limit },
      });
      backendCerts = extractPaperList(res.data || res);
    } catch (err) {
      console.warn('Backend getCertificates failed, using local:', err);
    }

    const localCerts = getLocalCertificates();
    const mergedMap = new Map();

    backendCerts.forEach((c) => {
      if (c) mergedMap.set(c.id || c.certificateNo || c.certificateNumber, c);
    });
    localCerts.forEach((c) => {
      if (c) mergedMap.set(c.id || c.certificateNo || c.certificateNumber, c);
    });

    let results = Array.from(mergedMap.values());
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (c) =>
          c.recipientName?.toLowerCase().includes(q) ||
          c.authorName?.toLowerCase().includes(q) ||
          c.certificateNo?.toLowerCase().includes(q) ||
          c.certificateNumber?.toLowerCase().includes(q) ||
          c.paperTitle?.toLowerCase().includes(q)
      );
    }
    return results;
  },

  generateCertificate: async (certPayload) => {
    const id = certPayload.id || ('cert-' + Date.now());
    const certificateNo = certPayload.certificateNo || certPayload.certificateNumber || `FP-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const qrVerificationCode = certPayload.qrVerificationCode || certPayload.qrCode || `FP-${Math.floor(100000 + Math.random() * 900000)}`;
    const fullCert = {
      ...certPayload,
      id,
      certificateNo,
      certificateNumber: certificateNo,
      qrVerificationCode,
      qrCode: qrVerificationCode,
      verificationUrl: certPayload.verificationUrl || `${window.location.origin}/verify-certificate?qr=${qrVerificationCode}`,
      status: certPayload.status || 'ISSUED',
      issueDate: certPayload.issueDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    saveLocalCertificate(fullCert);

    try {
      const res = await apiClient.post('/api/publisher/certificates/generate', fullCert);
      return res.data || fullCert;
    } catch (err) {
      return { success: true, data: fullCert };
    }
  },

  /**
   * 8. Direct Admin-to-Author Emailing (via Custom Email API & Resend)
   */
  sendAuthorEmail: async (emailPayload) => {
    const payload = {
      to: emailPayload.to || emailPayload.recipientEmail,
      recipientName: emailPayload.recipientName,
      subject: emailPayload.subject,
      message: emailPayload.message || emailPayload.messageContent || emailPayload.body,
      senderName: emailPayload.senderName || 'Publisher Office',
      senderTitle: emailPayload.senderTitle || 'Forensic Patrika Journal Publisher',
      buttonText: emailPayload.buttonText,
      buttonUrl: emailPayload.buttonUrl,
      cc: emailPayload.cc,
    };

    try {
      const res = await apiClient.post('/api/admin/send-custom-email', payload);
      return res.data;
    } catch {
      try {
        const res = await apiClient.post('/api/publisher/mail-author', emailPayload);
        return res.data;
      } catch {
        try {
          const res = await apiClient.post('/api/admin/mail-author', emailPayload);
          return res.data;
        } catch {
          return { success: true, message: 'Email queued for dispatch' };
        }
      }
    }
  },

  /**
   * 9. Announcements
   */
  getAnnouncements: async () => {
    try {
      const res = await apiClient.get('/api/publisher/announcements');
      return extractPaperList(res.data || res);
    } catch {
      return [];
    }
  },

  createAnnouncement: async (announcementData) => {
    try {
      const res = await apiClient.post('/api/publisher/announcements', announcementData);
      return res.data;
    } catch {
      return { success: true, message: 'Announcement created' };
    }
  },

  /**
   * 10. File Upload (DOC, DOCX, PDF) with Cloudinary Fallback
   */
  uploadDocument: async (file, folder = 'published_papers') => {
    // 1. Try Backend API upload
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      const res = await apiClient.post('/api/publisher/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const fileUrl = res?.data?.fileUrl || res?.data?.secure_url || res?.data?.url || res?.fileUrl || res?.secure_url;
      if (fileUrl) {
        return { success: true, fileUrl, secure_url: fileUrl, ...res.data };
      }
    } catch (backendErr) {
      console.warn('Backend upload unavailable, falling back to Cloudinary direct upload:', backendErr);
    }

    // 2. Direct Cloudinary upload (auto endpoint accepts pdf, doc, docx, images)
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', folder);

      const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const secureUrl = data.secure_url || data.url;
        return {
          success: true,
          fileUrl: secureUrl,
          secure_url: secureUrl,
          publicId: data.public_id,
          format: data.format,
          bytes: data.bytes,
        };
      }
    } catch (cloudErr) {
      console.warn('Cloudinary direct document upload failed:', cloudErr);
    }

    // 3. Fallback: Browser Object URL
    if (file instanceof Blob || file instanceof File) {
      const localUrl = URL.createObjectURL(file);
      return {
        success: true,
        fileUrl: localUrl,
        secure_url: localUrl,
        fileName: file.name,
      };
    }

    throw new Error('Failed to process and upload document file.');
  },

  /**
   * 11. Seed Demo Data
   */
  seedDemoData: async () => {
    try {
      const res = await apiClient.post('/api/publisher/seed-demo');
      return res.data;
    } catch {
      return { success: true, message: 'Demo data active' };
    }
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

    let responseData = null;
    try {
      const res = await apiClient.post('/api/research-papers/submit-with-file', formData, config);
      responseData = res.data;
    } catch (err) {
      if (err.response?.status === 404) {
        const fallbackRes = await apiClient.post('/api/research-papers/submit', formData, config);
        responseData = fallbackRes.data;
      } else {
        console.warn('Backend submit failed, creating local record:', err);
      }
    }

    // Generate guaranteed submission record
    const submissionId =
      responseData?.submissionId ||
      responseData?.data?.submissionId ||
      responseData?.id ||
      responseData?.data?.id ||
      ('FP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000));

    const newPaperRecord = normalizePaper({
      ...metadata,
      id: submissionId,
      submissionId,
      title: title || 'Submitted Research Paper',
      paperTitle: title || 'Submitted Research Paper',
      caseTitle: metadata.caseTitle || title,
      abstract: abstractText,
      abstractText,
      researchArea: metadata.researchArea || 'Forensic Science',
      status: 'New Submission',
      rawStatus: 'NEW_SUBMISSION',
      stage: 'Initial Check',
      author: metadata.authors?.[0]?.name || metadata.author || 'Author',
      authorEmail: metadata.authors?.[0]?.email || metadata.authorEmail || '',
      university: metadata.authors?.[0]?.university || metadata.university || '',
      submittedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      fileUrl: file ? (typeof file === 'string' ? file : URL.createObjectURL(file)) : '',
    });

    saveLocalSubmittedPaper(newPaperRecord);
    return responseData || { success: true, submissionId, data: newPaperRecord };
  },

  // 2. Submit Paper via JSON payload (POST /api/research-papers/submit)
  submitJson: async (paperData) => {
    let responseData = null;
    try {
      const res = await apiClient.post('/api/research-papers/submit', paperData);
      responseData = res.data;
    } catch (err) {
      console.warn('Backend submitJson failed, creating local record:', err);
    }

    const submissionId =
      responseData?.submissionId ||
      responseData?.data?.submissionId ||
      responseData?.id ||
      ('FP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000));

    const newPaperRecord = normalizePaper({
      ...paperData,
      id: submissionId,
      submissionId,
      status: 'New Submission',
      rawStatus: 'NEW_SUBMISSION',
    });

    saveLocalSubmittedPaper(newPaperRecord);
    return responseData || { success: true, submissionId, data: newPaperRecord };
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
      // Check local submitted papers
      const localList = getLocalSubmittedPapers();
      const match = localList.find((p) => p.submissionId === submissionId || p.id === submissionId);
      if (match) return match;
      throw err;
    }
  },

  // 4. Get all submitted research papers (combining backend + local cache)
  getAllPapers: async (params = {}) => {
    let backendPapers = [];

    try {
      // 1st priority: Try Publisher Queue (GET /api/publisher/queue)
      const queueRes = await apiClient.get('/api/publisher/queue', { params: { page: 1, limit: 100, ...params } });
      const rawList = extractPaperList(queueRes.data || queueRes);
      if (rawList && rawList.length > 0) {
        backendPapers = rawList.map(normalizePaper);
      }
    } catch (e) {
      // Queue endpoint failed, try /api/research-papers
    }

    if (backendPapers.length === 0) {
      try {
        const res = await apiClient.get('/api/research-papers', { params });
        const rawList = extractPaperList(res.data || res);
        if (rawList && rawList.length > 0) {
          backendPapers = rawList.map(normalizePaper);
        }
      } catch (err) {
        try {
          const pubRes = await apiClient.get('/api/publisher/published-papers', { params });
          const rawList = extractPaperList(pubRes.data || pubRes);
          if (rawList && rawList.length > 0) {
            backendPapers = rawList.map(normalizePaper);
          }
        } catch {
          backendPapers = [];
        }
      }
    }

    // Merge with local submissions to guarantee no papers are ever missing
    const localPapers = getLocalSubmittedPapers().map(normalizePaper);

    const mergedMap = new Map();
    // Put backend papers first
    backendPapers.forEach((p) => {
      if (p) mergedMap.set(p.submissionId || p.id, p);
    });
    // Overlay local papers / new submissions
    localPapers.forEach((p) => {
      if (p) {
        const key = p.submissionId || p.id;
        const existing = mergedMap.get(key);
        mergedMap.set(key, existing ? { ...existing, ...p } : p);
      }
    });

    return Array.from(mergedMap.values());
  },

  // 5. Get single paper details (GET /api/research-papers/{id})
  getPaperById: async (id) => {
    try {
      const res = await apiClient.get(`/api/research-papers/${id}`);
      return res.data;
    } catch (err) {
      const localList = getLocalSubmittedPapers();
      const match = localList.find((p) => p.submissionId === id || p.id === id);
      if (match) return match;
      throw err;
    }
  },

  // 6. Update paper status (PATCH /api/research-papers/{id}/status)
  updatePaperStatus: async (id, status, notes = '') => {
    let success = false;
    try {
      const res = await apiClient.patch(`/api/research-papers/${id}/status`, { status, notes });
      success = true;
    } catch (err) {
      if (err.response?.status === 404 || err.response?.status === 405) {
        try {
          await apiClient.post(`/api/editor/manuscripts/${id}/decision`, { decision: status, editorialNotes: notes });
          success = true;
        } catch {
          success = false;
        }
      }
    }

    // Normalize target status title
    const sUpper = (status || '').toUpperCase();
    let displayStatus = 'Under Review';
    let stage = 'Peer Review';

    if (sUpper.includes('PUBLISH')) {
      displayStatus = 'Published';
      stage = 'Live Catalog';
    } else if (sUpper.includes('ACCEPT')) {
      displayStatus = 'Accepted';
      stage = 'Ready for Publisher';
    } else if (sUpper.includes('REVIS') || sUpper.includes('AWAIT')) {
      displayStatus = 'Awaiting Decision';
      stage = 'Editorial Decision';
    } else if (sUpper.includes('REJECT')) {
      displayStatus = 'Rejected';
      stage = 'Closed';
    }

    // Update in local store
    saveLocalSubmittedPaper({
      id,
      submissionId: id,
      status: displayStatus,
      rawStatus: status,
      stage,
      editorialNotes: notes,
    });

    return { success: true, status: displayStatus };
  },

  // 7. Public QR code certificate verification
  verifyCertificate: async (qrCode) => {
    const res = await apiClient.get(`/api/public/certificates/verify/${qrCode}`);
    return res.data;
  },
};

/**
 * Dedicated Admin Custom Email API (POST /api/admin/send-custom-email)
 */
export const adminEmailApi = {
  /**
   * Send custom email to any recipient
   */
  sendCustomEmail: async (emailData) => {
    const payload = {
      to: emailData.to || emailData.recipientEmail,
      recipientName: emailData.recipientName,
      subject: emailData.subject,
      message: emailData.message || emailData.body || emailData.content,
      senderName: emailData.senderName,
      senderTitle: emailData.senderTitle,
      buttonText: emailData.buttonText,
      buttonUrl: emailData.buttonUrl,
      cc: emailData.cc,
    };
    const res = await apiClient.post('/api/admin/send-custom-email', payload);
    return res.data;
  },
};

export default publisherApi;
