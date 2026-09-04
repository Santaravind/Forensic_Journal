import axios from 'axios';
import { apiClient } from '../api/apiClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8080';
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'j9ksfgqo';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'forensic';

// Fallback initial demo blogs if backend has no records yet or is initial setup
export const DEFAULT_BLOGS = [
  {
    _id: 'default-1',
    id: 'default-1',
    category: 'Forensic Science',
    title: 'Understanding Digital Evidence in Modern Investigations',
    slug: 'understanding-digital-evidence-in-modern-investigations-k8s9f',
    summary: 'Exploring the fundamentals of extracting, preserving, and analyzing digital artifacts across various file systems and devices.',
    content: 'Digital forensics is a branch of forensic science encompassing the recovery and investigation of material found in digital devices, often in relation to computer crime. As technology advances, modern investigations increasingly rely on digital traces, memory forensics, mobile extractions, and network packet analysis to establish critical chains of evidence in courtrooms.',
    publishDate: '2026-08-24',
    readTime: '5 min read',
    author: 'Dr. A. Sharma',
    authorEmail: 'dr.sharma@forensicpatrika.com',
    authorRole: 'EDITOR',
    status: 'published',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
        publicId: 'forensic/default_1',
        caption: 'Digital Storage Extraction',
      },
    ],
    tags: ['Forensics', 'Digital Evidence', 'Cybercrime'],
    views: 1240,
    likes: 0,
    isFeatured: true,
  },
  {
    _id: 'default-2',
    id: 'default-2',
    category: 'Cyber Security',
    title: 'Network Intrusion Analysis and Incident Response',
    slug: 'network-intrusion-analysis-and-incident-response-m9z2q',
    summary: 'A deep dive into packet analysis, log monitoring, and immediate mitigation techniques during active security breaches.',
    content: 'Security Operations Centers (SOC) face an unprecedented frequency of zero-day attacks and stealth lateral movements. Incident responders must act decisively using SIEM correlations, EDR instrumentation, and forensic memory snapshots to isolate infected endpoints before privilege escalation occurs.',
    publishDate: '2026-08-22',
    readTime: '8 min read',
    author: 'R. Verma',
    authorEmail: 'r.verma@forensicpatrika.com',
    authorRole: 'PUBLISHER',
    status: 'published',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
        publicId: 'forensic/default_2',
        caption: 'SOC Network Monitoring',
      },
    ],
    tags: ['Cybersecurity', 'Incident Response', 'Network'],
    views: 980,
    likes: 0,
    isFeatured: false,
  },
  {
    _id: 'default-3',
    id: 'default-3',
    category: 'Criminology',
    title: 'Psychological Profiling in Complex Case Studies',
    slug: 'psychological-profiling-in-complex-case-studies-x3p1a',
    summary: 'How behavioral patterns assist forensic teams in establishing motives and narrowing down suspect pools.',
    content: 'Investigative psychology and behavioral analysis provide invaluable insights into crime scene reconstruction, victimology, and offender Modus Operandi (MO). By examining behavioral consistency, forensic criminologists help detectives anticipate next actions and formulate interrogation strategies.',
    publishDate: '2026-08-18',
    readTime: '6 min read',
    author: 'S. Kapoor',
    authorEmail: 's.kapoor@forensicpatrika.com',
    authorRole: 'REVIEWER',
    status: 'published',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=800&auto=format&fit=crop&q=80',
        publicId: 'forensic/default_3',
        caption: 'Behavioral Investigation Study',
      },
    ],
    tags: ['Criminology', 'Psychology', 'Case Study'],
    views: 750,
    likes: 0,
    isFeatured: false,
  },
  {
    _id: 'default-4',
    id: 'default-4',
    category: 'Legal & Ethics',
    title: 'Chain of Custody Protocols in Courtroom Admissibility',
    slug: 'chain-of-custody-protocols-in-courtroom-admissibility-b7v4e',
    summary: 'Maintaining strict evidentiary standards to ensure digital and physical evidence withstands legal scrutiny.',
    content: 'Even the most conclusive forensic findings can be deemed inadmissible in court if chain of custody protocols are breached. Documenting every individual who handled the evidence, the exact timestamp, and the storage conditions prevents allegations of tampering and evidence spoliation.',
    publishDate: '2026-08-15',
    readTime: '4 min read',
    author: 'M. Nambiar',
    authorEmail: 'm.nambiar@forensicpatrika.com',
    authorRole: 'ADMIN',
    status: 'published',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
        publicId: 'forensic/default_4',
        caption: 'Legal Chain of Custody Record',
      },
    ],
    tags: ['Legal', 'Ethics', 'Chain of Custody'],
    views: 1120,
    likes: 0,
    isFeatured: false,
  },
];

// Helper to normalize backend blog entity schema
export const normalizeBlog = (b) => {
  if (!b) return null;
  const id = b.id || b._id || '';
  return {
    ...b,
    id,
    _id: id,
    images: Array.isArray(b.images) ? b.images : [],
    tags: Array.isArray(b.tags) ? b.tags : [],
    views: typeof b.views === 'number' ? b.views : 0,
    status: b.status || 'published',
  };
};

export const blogService = {
  // 1. Get published blogs for public feed (with 1-indexed pagination, search, & category filter)
  getPublishedBlogs: async ({ category = '', search = '', page = 1, limit = 12 } = {}) => {
    const params = {
      page: Math.max(1, page),
      limit: Math.max(1, limit),
    };
    if (category && category !== 'All') {
      params.category = category;
    }
    if (search && search.trim()) {
      params.search = search.trim();
    }

    try {
      const response = await apiClient.get('/api/blogs', { params });
      const data = response.data;
      if (data?.blogs && Array.isArray(data.blogs)) {
        return {
          blogs: data.blogs.map(normalizeBlog),
          total: data.total ?? data.blogs.length,
          totalPages: data.totalPages ?? 1,
          page: data.page ?? params.page,
          count: data.count ?? data.blogs.length,
        };
      }
      if (Array.isArray(data)) {
        return {
          blogs: data.map(normalizeBlog),
          total: data.length,
          totalPages: 1,
          page: 1,
          count: data.length,
        };
      }
    } catch (err) {
      // Compatibility with legacy /blogpost endpoint
      try {
        const legacyRes = await apiClient.get('/blogpost', { params });
        const legacyData = legacyRes.data;
        if (legacyData?.blogs && Array.isArray(legacyData.blogs)) {
          return {
            blogs: legacyData.blogs.map(normalizeBlog),
            total: legacyData.total ?? legacyData.blogs.length,
            totalPages: legacyData.totalPages ?? 1,
            page: legacyData.page ?? params.page,
            count: legacyData.count ?? legacyData.blogs.length,
          };
        }
        if (Array.isArray(legacyData)) {
          return {
            blogs: legacyData.map(normalizeBlog),
            total: legacyData.length,
            totalPages: 1,
            page: 1,
            count: legacyData.length,
          };
        }
      } catch {
        console.warn('Backend blog API unreachable, using curated default fallback.');
      }
    }

    // Fallback if backend is offline
    let localFiltered = [...DEFAULT_BLOGS];
    if (category && category !== 'All') {
      localFiltered = localFiltered.filter(
        (b) => b.category?.toLowerCase() === category.toLowerCase()
      );
    }
    if (search && search.trim()) {
      const q = search.toLowerCase();
      localFiltered = localFiltered.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.summary?.toLowerCase().includes(q) ||
          b.content?.toLowerCase().includes(q) ||
          b.author?.toLowerCase().includes(q)
      );
    }
    return {
      blogs: localFiltered.map(normalizeBlog),
      total: localFiltered.length,
      totalPages: Math.max(1, Math.ceil(localFiltered.length / limit)),
      page: params.page,
      count: localFiltered.length,
    };
  },

  // 2. Get blog details by ID or Slug (atomically increments view count on backend)
  getBlogById: async (idOrSlug) => {
    try {
      const response = await apiClient.get(`/api/blogs/${idOrSlug}`);
      const blog = response.data?.blog || response.data;
      return normalizeBlog(blog);
    } catch (err) {
      try {
        const legacyRes = await apiClient.get(`/blogpost/${idOrSlug}`);
        const legacyBlog = legacyRes.data?.blog || legacyRes.data;
        return normalizeBlog(legacyBlog);
      } catch {
        const found = DEFAULT_BLOGS.find(
          (b) => b._id === idOrSlug || b.id === idOrSlug || b.slug === idOrSlug
        );
        if (found) return normalizeBlog(found);
        throw err;
      }
    }
  },

  // 3. Create a new blog (Authors -> pending, Admins/Publishers -> published)
  createBlog: async (blogData) => {
    try {
      const response = await apiClient.post('/api/blogs', blogData);
      return response.data;
    } catch (err) {
      const legacyRes = await apiClient.post('/blogpost', blogData);
      return legacyRes.data;
    }
  },

  // 4. Get admin blogs moderation list
  getAdminBlogs: async ({ status = 'all', search = '', page = 1, limit = 50 } = {}) => {
    const params = {
      page: Math.max(1, page),
      limit: Math.max(1, limit),
    };
    if (status && status !== 'all') params.status = status;
    if (search && search.trim()) params.search = search.trim();

    try {
      const response = await apiClient.get('/api/blogs/admin/all', { params });
      const list = response.data?.blogs || response.data || [];
      return Array.isArray(list) ? list.map(normalizeBlog) : [];
    } catch {
      try {
        const legacyRes = await apiClient.get('/blogpost/admin/all', { params });
        const legacyList = legacyRes.data?.blogs || legacyRes.data || [];
        return Array.isArray(legacyList) ? legacyList.map(normalizeBlog) : [];
      } catch {
        return DEFAULT_BLOGS.map(normalizeBlog);
      }
    }
  },

  // 5. Update status (Publish, Restrict, Reject, Approve)
  updateBlogStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(`/api/blogs/${id}/status`, { status });
      return response.data;
    } catch (err) {
      const legacyRes = await apiClient.patch(`/blogpost/${id}/status`, { status });
      return legacyRes.data;
    }
  },

  // 6. Full edit of a blog
  updateBlog: async (id, updateData) => {
    try {
      const response = await apiClient.put(`/api/blogs/${id}`, updateData);
      return response.data;
    } catch (err) {
      const legacyRes = await apiClient.put(`/blogpost/${id}`, updateData);
      return legacyRes.data;
    }
  },

  // 7. Delete blog and delete associated Cloudinary images
  deleteBlog: async (id) => {
    try {
      const response = await apiClient.delete(`/api/blogs/${id}`);
      return response.data;
    } catch (err) {
      const legacyRes = await apiClient.delete(`/blogpost/${id}`);
      return legacyRes.data;
    }
  },

  // 8. Direct Cloudinary Upload Helper with unsigned preset
  uploadImageToCloudinary: async (file, caption = '', onProgress = null) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

    return new Promise((resolve, reject) => {
      xhr.open('POST', uploadUrl, true);

      if (onProgress) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve({
              url: data.secure_url || data.url,
              publicId: data.public_id || '',
              caption: caption || file.name,
              format: data.format,
              bytes: data.bytes,
            });
          } catch (e) {
            reject(new Error('Failed to parse Cloudinary response.'));
          }
        } else {
          reject(new Error(`Cloudinary upload failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error('Network error during Cloudinary image upload.'));
      xhr.send(formData);
    });
  },

  // 9. Multi-image Upload Helper with overall aggregated progress
  uploadMultipleImages: async (files, onOverallProgress = null) => {
    if (!files || files.length === 0) return [];
    const progressMap = {};

    const updateCombined = () => {
      if (onOverallProgress) {
        const total = Object.values(progressMap).reduce((a, b) => a + b, 0);
        const avg = Math.round(total / files.length);
        onOverallProgress(avg);
      }
    };

    const promises = files.map((file, idx) => {
      progressMap[idx] = 0;
      return blogService.uploadImageToCloudinary(file, file.name, (percent) => {
        progressMap[idx] = percent;
        updateCombined();
      });
    });

    return Promise.all(promises);
  },
};

export default blogService;

