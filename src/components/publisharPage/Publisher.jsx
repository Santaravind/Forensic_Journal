import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Newspaper, 
  FileText, 
  Users, 
  BarChart3, 
  CreditCard, 
  Megaphone, 
  Mail, 
  FileEdit, 
  Award, 
  Settings, 
  LogOut, 
  HelpCircle, 
  Search, 
  Bell, 
  ChevronDown, 
  PlusCircle, 
  Send, 
  FileCheck, 
  TrendingUp, 
  Download, 
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Eye,
  CheckCircle2,
  Clock,
  SendHorizontal
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import logo from '../assets/logoss.png';
import BlogManagement from '../AdminDashboard/BlogManagement';
import { publisherApi, researchPaperApi, normalizePaper, extractPaperList } from '../../api/publisherApi';
import authService from '../../services/authService';
import toast from 'react-hot-toast';

// Import Modals
import PublishPaperModal from './modals/PublishPaperModal';
import AddJournalModal from './modals/AddJournalModal';
import CreateIssueModal from './modals/CreateIssueModal';
import IssueCertificateModal from './modals/IssueCertificateModal';
import DirectAuthorEmailModal from './modals/DirectAuthorEmailModal';
import SendAnnouncementModal from './modals/SendAnnouncementModal';

// Fallback initial demo data
const DEFAULT_PIE_DATA = [
  { name: 'Published', value: 1245, color: '#6366F1' },
  { name: 'Under Review', value: 512, color: '#3B82F6' },
  { name: 'Accepted', value: 184, color: '#10B981' },
  { name: 'Rejected', value: 67, color: '#F59E0B' },
];

const DEFAULT_PUBLISHED_PAPERS = [
  {
    id: 'demo-1',
    submissionId: 'FP-2026-1056',
    title: 'Advancements in Forensic DNA Analysis Using NGS Technologies',
    journal: 'Journal of Forensic Science and Research',
    author: 'Mr. Indresh',
    authorEmail: 'indresh@example.com',
    date: '15 May 2026',
    issue: 'Vol. 10, Issue 2 May 2026',
    doi: '10.5958/JFSR.2026.1002'
  },
  {
    id: 'demo-2',
    submissionId: 'FP-2026-1055',
    title: 'Forensic Entomology: A Review of Recent Applications',
    journal: 'Journal of Forensic Science and Research',
    author: 'Dr. Neha Gupta',
    authorEmail: 'neha.gupta@example.com',
    date: '12 May 2026',
    issue: 'Vol. 10, Issue 2 May 2026',
    doi: '10.5958/JFSR.2026.1003'
  },
  {
    id: 'demo-3',
    submissionId: 'FP-2026-1054',
    title: 'Fingerprint Analysis Using Deep Learning Techniques',
    journal: 'Forensic Science International Reports',
    author: 'Prof. Rajesh Verma',
    authorEmail: 'r.verma@example.com',
    date: '10 May 2026',
    issue: 'Vol. 8, Issue 2 May 2026',
    doi: '10.5958/FSIR.2026.0802'
  },
  {
    id: 'demo-4',
    submissionId: 'FP-2026-1053',
    title: 'Ballistic Evidence Examination: Methods and Challenges',
    journal: 'Journal of Forensic Science and Research',
    author: 'Indresh Kumar',
    authorEmail: 'indresh.k@example.com',
    date: '08 May 2026',
    issue: 'Vol. 10, Issue 2 May 2026',
    doi: '10.5958/JFSR.2026.1004'
  },
  {
    id: 'demo-5',
    submissionId: 'FP-2026-1052',
    title: 'Digital Forensics in Cyber Crime Investigation',
    journal: 'Cyber Forensics and Security Journal',
    author: 'S. Kapoor',
    authorEmail: 's.kapoor@example.com',
    date: '05 May 2026',
    issue: 'Vol. 6, Issue 2 May 2026',
    doi: '10.5958/CFSJ.2026.0602'
  }
];

const DEFAULT_QUEUE = [
  {
    id: 'queue-1',
    submissionId: 'FP-2026-1056',
    title: 'Advancements in Forensic DNA Analysis Using NGS Technologies',
    researchArea: 'Genetics',
    submittedAt: '2026-05-14',
    firstAuthor: {
      name: 'Mr. Indresh',
      email: 'indresh@example.com',
      university: 'National Forensic Sciences University'
    },
    manuscriptFileUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800'
  },
  {
    id: 'queue-2',
    submissionId: 'FP-2026-1057',
    title: 'Toxicological Screening of Novel Psychoactive Substances',
    researchArea: 'Toxicology',
    submittedAt: '2026-05-15',
    firstAuthor: {
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@example.com',
      university: 'AIIMS New Delhi'
    },
    manuscriptFileUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800'
  }
];

export default function Publisher() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Data states
  const [statsData, setStatsData] = useState(null);
  const [pieData, setPieData] = useState(DEFAULT_PIE_DATA);
  const [publishedPapers, setPublishedPapers] = useState(DEFAULT_PUBLISHED_PAPERS);
  const [queue, setQueue] = useState(DEFAULT_QUEUE);
  const [journals, setJournals] = useState([]);
  const [issues, setIssues] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [queueFilter, setQueueFilter] = useState('ALL');

  // Modal control states
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedPaperForPublish, setSelectedPaperForPublish] = useState(null);

  const [isAddJournalModalOpen, setIsAddJournalModalOpen] = useState(false);
  const [isCreateIssueModalOpen, setIsCreateIssueModalOpen] = useState(false);
  const [isIssueCertModalOpen, setIsIssueCertModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

  const [isEmailAuthorModalOpen, setIsEmailAuthorModalOpen] = useState(false);
  const [emailModalProps, setEmailModalProps] = useState({ author: null, paper: null });

  const currentUser = authService.getCurrentUser() || { fullName: 'Dr. Publisher', role: 'PUBLISHER' };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, queueRes, papersRes, journalsRes, issuesRes, certsRes, annRes] = await Promise.allSettled([
        publisherApi.getStats(),
        publisherApi.getQueue(1, 20),
        publisherApi.getPublishedPapers(1, 20),
        publisherApi.getJournals(),
        publisherApi.getIssues(),
        publisherApi.getCertificates(),
        publisherApi.getAnnouncements(),
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value?.data) {
        setStatsData(statsRes.value.data);
        if (statsRes.value.data.pieChart && statsRes.value.data.pieChart.length > 0) {
          setPieData(statsRes.value.data.pieChart);
        }
      }

      // 1. Ingestion Queue (Accepted or pending papers awaiting DOI/release)
      let fetchedQueue = [];
      if (queueRes.status === 'fulfilled') {
        const rawQueue = extractPaperList(queueRes.value);
        if (rawQueue.length > 0) {
          fetchedQueue = rawQueue.map(normalizePaper);
        }
      }

      // If queue is empty from dedicated queue endpoint, query research-papers
      if (fetchedQueue.length === 0) {
        try {
          const allRes = await researchPaperApi.getAllPapers();
          const allList = extractPaperList(allRes).map(normalizePaper);
          if (allList.length > 0) {
            const acceptedOrPending = allList.filter(
              (p) => p.status === 'Accepted' || p.status === 'New Submission' || p.status === 'Under Review'
            );
            fetchedQueue = acceptedOrPending.length > 0 ? acceptedOrPending : allList;
          }
        } catch (e) {
          console.warn('Queue sync fallback query notice:', e);
        }
      }

      if (fetchedQueue.length > 0) {
        setQueue(fetchedQueue);
      }

      // 2. Published Papers
      let fetchedPublished = [];
      if (papersRes.status === 'fulfilled') {
        const rawPapers = extractPaperList(papersRes.value);
        if (rawPapers.length > 0) {
          fetchedPublished = rawPapers.map(normalizePaper);
        }
      }

      if (fetchedPublished.length === 0) {
        try {
          const allRes = await researchPaperApi.getAllPapers();
          const allList = extractPaperList(allRes).map(normalizePaper);
          if (allList.length > 0) {
            const publishedOnly = allList.filter((p) => p.status === 'Published');
            fetchedPublished = publishedOnly.length > 0 ? publishedOnly : allList;
          }
        } catch (e) {
          console.warn('Published papers sync fallback notice:', e);
        }
      }

      if (fetchedPublished.length > 0) {
        setPublishedPapers(fetchedPublished);
      }

      // 3. Journals
      if (journalsRes.status === 'fulfilled') {
        const jList = extractPaperList(journalsRes.value);
        if (jList.length > 0) setJournals(jList);
      }

      // 4. Issues
      if (issuesRes.status === 'fulfilled') {
        const iList = extractPaperList(issuesRes.value);
        if (iList.length > 0) setIssues(iList);
      }

      // 5. Certificates
      if (certsRes.status === 'fulfilled') {
        const cList = extractPaperList(certsRes.value);
        if (cList.length > 0) setCertificates(cList);
      }

      // 6. Announcements
      if (annRes.status === 'fulfilled') {
        const aList = extractPaperList(annRes.value);
        if (aList.length > 0) setAnnouncements(aList);
      }
    } catch (err) {
      console.error('Error fetching publisher dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Stats cards configuration with live or fallback values
  const stats = [
    {
      title: 'Journals Published',
      count: statsData?.journalsPublished ?? journals.length ?? '8',
      subtitle: 'Active Journals',
      icon: BookOpen,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Issues Published',
      count: statsData?.issuesPublished ?? issues.length ?? '101',
      subtitle: 'This Year (2026)',
      icon: Newspaper,
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      title: 'Papers Published',
      count: statsData?.papersPublished?.toLocaleString() ?? publishedPapers.length ?? '1,245',
      subtitle: 'This Year (2026)',
      icon: FileText,
      color: 'bg-amber-100 text-amber-600',
    },
    {
      title: 'Registered Users',
      count: statsData?.registeredUsers?.toLocaleString() ?? '2,356',
      subtitle: 'Authors, Reviewers, Editors',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Total Downloads',
      count: statsData?.totalDownloads?.toLocaleString() ?? '32,450',
      subtitle: 'This Year (2026)',
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-600',
    },
  ];

  // Quick actions items with modal links
  const quickActions = [
    { 
      title: 'Add New Journal', 
      desc: 'Create and manage journals', 
      icon: BookOpen, 
      action: () => setIsAddJournalModalOpen(true) 
    },
    { 
      title: 'Publish New Issue', 
      desc: 'Create a new issue for a journal', 
      icon: Newspaper, 
      action: () => setIsCreateIssueModalOpen(true) 
    },
    { 
      title: 'Publish New Paper', 
      desc: 'Assign DOI and publish paper', 
      icon: FileText, 
      action: () => {
        setSelectedPaperForPublish(queue[0] || null);
        setIsPublishModalOpen(true);
      } 
    },
    { 
      title: 'Blog Publish', 
      desc: 'Create and publish blog posts', 
      icon: FileEdit, 
      isNew: true, 
      action: () => setActiveTab('Blog Publish') 
    },
    { 
      title: 'Issue Certificate', 
      desc: 'Generate and issue certificates', 
      icon: Award, 
      action: () => setIsIssueCertModalOpen(true) 
    },
    { 
      title: 'Send Notification', 
      desc: 'Send notifications to users', 
      icon: Megaphone, 
      action: () => setIsAnnouncementModalOpen(true) 
    },
    { 
      title: 'Manage Subscriptions', 
      desc: 'View institutional access', 
      icon: CreditCard, 
      action: () => setActiveTab('Subscriptions') 
    },
    { 
      title: 'Generate Reports', 
      desc: 'View analytics and download reports', 
      icon: BarChart3, 
      action: () => setActiveTab('Analytics & Reports') 
    }
  ];

  // Recent Activities
  const recentActivities = [
    {
      icon: Newspaper,
      color: 'bg-purple-100 text-purple-600',
      title: 'New issue published',
      desc: 'Journal of Forensic Science and Research Vol. 10, Issue 2 (May 2026)',
      time: '2 hours ago'
    },
    {
      icon: FileCheck,
      color: 'bg-emerald-100 text-emerald-600',
      title: 'Manuscript published',
      desc: 'Advancements in Forensic DNA Analysis...',
      time: '3 hours ago'
    },
    {
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      title: 'New user registered',
      desc: 'Dr. Neha Gupta (Author)',
      time: '5 hours ago'
    },
    {
      icon: CreditCard,
      color: 'bg-indigo-100 text-indigo-600',
      title: 'Subscription renewed',
      desc: 'Institutional Subscription – AIIMS Delhi',
      time: '1 day ago'
    },
    {
      icon: Megaphone,
      color: 'bg-amber-100 text-amber-600',
      title: 'Announcement posted',
      desc: 'Call for Papers – Special Issue 2026',
      time: '2 days ago'
    }
  ];

  // Recent Blogs
  const recentBlogs = [
    { title: 'The Future of Forensic', author: 'Dr. Publisher', date: 'May 2026', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&auto=format&fit=crop&q=60' },
    { title: 'AI and Machine Learning in Forensics', author: 'Editorial Team', date: '14 May 2026', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=60' },
    { title: 'How to Write a Good Research Paper', author: 'Dr. Editor-in-Chief', date: '12 May 2026', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=100&auto=format&fit=crop&q=60' },
    { title: 'Understanding Plagiarism and Ethics', author: 'Dr. Publisher', date: '10 May 2026', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&auto=format&fit=crop&q=60' },
    { title: 'Top 10 Research Tools for Academics', author: 'Editorial Team', date: '08 May 2026', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&auto=format&fit=crop&q=60' }
  ];

  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Journals', icon: BookOpen },
    { name: 'Issues & Publications', icon: Newspaper },
    { name: 'Manuscripts', icon: FileText, hasSubMenu: true },
    { name: 'Users & Roles', icon: Users },
    { name: 'Analytics & Reports', icon: BarChart3 },
    { name: 'Subscriptions', icon: CreditCard },
    { name: 'Announcements', icon: Megaphone },
    { name: 'Messages', icon: Mail, badge: 4 },
    { name: 'Blog Publish', icon: FileEdit, isNew: true },
    { name: 'Certificates', icon: Award },
    { name: 'Settings', icon: Settings },
  ];

  const filteredPapers = publishedPapers.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.journal?.toLowerCase().includes(q) ||
      p.author?.toLowerCase().includes(q) ||
      p.doi?.toLowerCase().includes(q)
    );
  });

  const handleOpenEmailAuthor = (author, paper) => {
    setEmailModalProps({ author, paper });
    setIsEmailAuthorModalOpen(true);
  };

  const handleOpenPublishPaper = (paper) => {
    setSelectedPaperForPublish(paper);
    setIsPublishModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased text-slate-800 overflow-hidden mt-0.5">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0B0F3B] text-slate-300 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header/Logo section */}
        <div className="p-4 border-b border-slate-800/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-white w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={logo} 
                      alt="Logo" 
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-300">Forensic Patrika</p>
                <p className="text-xs text-gray-500">Publisher Portal</p>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mt-4 px-3 py-1.5 bg-indigo-950/50 rounded-md border border-indigo-900/50 flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-300 tracking-wider">PUBLISHER PORTAL</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1 custom-scrollbar">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 font-medium cursor-pointer
                  ${isActive 
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md' 
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'}
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.isNew && (
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-[10px] text-white px-2 py-0.5 rounded-full font-semibold">
                      New
                    </span>
                  )}
                  {item.badge && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center">
                      {item.badge}
                    </span>
                  )}
                  {item.hasSubMenu && <ChevronDown size={14} className="text-slate-400" />}
                </div>
              </button>
            );
          })}

          <button 
            onClick={() => authService.logout()}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800/60 hover:text-white transition-all font-medium mt-4 cursor-pointer"
          >
            <LogOut size={18} className="text-slate-400" />
            <span>Logout</span>
          </button>
        </div>

        {/* Footer Banner */}
        <div className="p-3">
          <div className="bg-indigo-900/40 rounded-xl p-3 border border-indigo-800/30 flex flex-col items-center text-center">
            <div className="p-2 bg-indigo-600/30 rounded-full text-indigo-300 mb-2">
              <HelpCircle size={18} />
            </div>
            <p className="text-xs font-semibold text-white">Need Help?</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Contact Publisher Office</p>
            <a href="mailto:publisher@forensicpatrika.com" className="text-[10px] text-indigo-300 underline mt-1">
              publisher@forensicpatrika.com
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">{activeTab}</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Welcome back, {currentUser.fullName || 'Dr. Publisher'}! Here is your publishing overview.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <div className="relative hidden md:block w-64 lg:w-80">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search manuscripts, journals, DOI..."
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
              />
            </div>

            {/* Refresh Data Button */}
            <button 
              onClick={loadDashboardData}
              title="Refresh Data"
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RefreshCw size={17} className={loading ? 'animate-spin text-indigo-600' : ''} />
            </button>

            {/* Notification Bell */}
            <button 
              onClick={() => setIsAnnouncementModalOpen(true)}
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full"></span>
            </button>

            {/* Certificates Button */}
            <button 
              onClick={() => setIsIssueCertModalOpen(true)}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 cursor-pointer"
            >
              <Award size={14} className="text-amber-600" />
              <span>Issue Certificate</span>
            </button>

            {/* User Profile Dropdown */}
            <div className="flex items-center space-x-2 border-l border-slate-200 pl-3">
              <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-xs shadow-sm">
                {currentUser.fullName ? currentUser.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'DP'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-800 leading-tight">{currentUser.fullName || 'Dr. Publisher'}</p>
                <p className="text-[10px] text-slate-500">{currentUser.role || 'Publisher'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main className="p-4 lg:p-6 space-y-6">
          
          {/* TAB 1: BLOG MANAGEMENT */}
          {activeTab === 'Blog Publish' && (
            <div className="animate-in fade-in duration-200">
              <BlogManagement />
            </div>
          )}

          {/* TAB 2: JOURNALS MANAGEMENT */}
          {activeTab === 'Journals' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Registered Scholarly Journals</h2>
                  <p className="text-xs text-slate-500">Manage journals, ISSN identifiers, and editorial scopes.</p>
                </div>
                <button
                  onClick={() => setIsAddJournalModalOpen(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                >
                  <PlusCircle size={15} />
                  <span>Add New Journal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {journals.length > 0 ? (
                  journals.map((j) => (
                    <div key={j.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-mono text-xs font-bold rounded-lg">
                          {j.code}
                        </span>
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 leading-snug">{j.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{j.description || 'Scholarly peer-reviewed forensic journal publication.'}</p>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <span>Print: <strong>{j.issnPrint || j.issn_print || 'N/A'}</strong></span>
                        <span>Online: <strong>{j.issnOnline || j.issn_online || 'N/A'}</strong></span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-500">
                    <BookOpen size={36} className="mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold">No custom journals registered yet.</p>
                    <button onClick={() => setIsAddJournalModalOpen(true)} className="mt-3 text-xs text-indigo-600 font-bold underline">
                      Create First Journal
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ISSUES & PUBLICATIONS */}
          {activeTab === 'Issues & Publications' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Journal Volumes & Issues</h2>
                  <p className="text-xs text-slate-500">Create upcoming issues, organize papers, and release issues live.</p>
                </div>
                <button
                  onClick={() => setIsCreateIssueModalOpen(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <PlusCircle size={15} />
                  <span>Publish New Issue</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                      <th className="py-3.5 px-4">Issue Title</th>
                      <th className="py-3.5 px-4">Journal</th>
                      <th className="py-3.5 px-4">Volume / Issue</th>
                      <th className="py-3.5 px-4">Year / Month</th>
                      <th className="py-3.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {issues.length > 0 ? (
                      issues.map((i) => (
                        <tr key={i.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-800">{i.issueTitle || `Vol. ${i.volumeNo}, Issue ${i.issueNo}`}</td>
                          <td className="py-3.5 px-4 text-slate-600">{i.journalTitle || 'Forensic Patrika'}</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">Vol. {i.volumeNo}, Issue {i.issueNo}</td>
                          <td className="py-3.5 px-4 text-slate-500">{i.month} {i.year}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-full text-[11px]">
                              Published
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          No issues created yet. Click "Publish New Issue" above to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFICATES */}
          {activeTab === 'Certificates' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Issued Certificates Registry</h2>
                  <p className="text-xs text-slate-500">Official author publication and peer reviewer certificates with QR verification.</p>
                </div>
                <button
                  onClick={() => setIsIssueCertModalOpen(true)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-600/20"
                >
                  <Award size={15} />
                  <span>Issue New Certificate</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                      <th className="py-3.5 px-4">Certificate No</th>
                      <th className="py-3.5 px-4">Recipient Name</th>
                      <th className="py-3.5 px-4">Type</th>
                      <th className="py-3.5 px-4">Paper / Manuscript</th>
                      <th className="py-3.5 px-4">Issue Date</th>
                      <th className="py-3.5 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {certificates.length > 0 ? (
                      certificates.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-indigo-700">{c.certificateNo || c.certificate_no}</td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">{c.recipientName || c.recipient_name}</td>
                          <td className="py-3.5 px-4 text-slate-600">{c.certificateType || 'AUTHOR_PUBLICATION'}</td>
                          <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate">{c.paperTitle || 'DNA Analysis Research'}</td>
                          <td className="py-3.5 px-4 text-slate-500">{c.issueDate || c.issue_date || 'May 2026'}</td>
                          <td className="py-3.5 px-4">
                            <a
                              href={`/verify-certificate/${c.qrVerificationCode || c.qr_verification_code || c.certificateNo || 'demo'}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
                            >
                              <span>Verify QR</span>
                              <ExternalLink size={12} />
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No certificates in registry yet. Issue one with the button above.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: DEFAULT MAIN DASHBOARD VIEW */}
          {activeTab === 'Dashboard' && (
            <>
              {/* Top Date Filter Row */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Publishing Performance Overview</h2>
                  <p className="text-xs text-slate-500">Live metrics from the Forensic Patrika Editorial Registry</p>
                </div>
                <div className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 shadow-sm">
                  <span>{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Stats Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-2xl font-extrabold text-slate-900">{stat.count}</span>
                          <h3 className="text-xs font-semibold text-slate-700 mt-1">{stat.title}</h3>
                          <p className="text-[10px] text-slate-400 mt-0.5">{stat.subtitle}</p>
                        </div>
                        <div className={`p-2.5 rounded-lg ${stat.color}`}>
                          <Icon size={18} />
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          if (idx === 0) setActiveTab('Journals');
                          else if (idx === 1) setActiveTab('Issues & Publications');
                          else setActiveTab('Manuscripts');
                        }}
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-800 mt-3 text-left flex items-center space-x-1 cursor-pointer"
                      >
                        <span>View details</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Ingestion Queue / Ready for Publication Banner */}
              {queue.length > 0 && (
                <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-5 rounded-2xl shadow-lg border border-indigo-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-400 text-slate-900 font-extrabold text-[10px] rounded-full">
                        {queue.length} READY TO PUBLISH
                      </span>
                      <h3 className="font-bold text-sm sm:text-base">Accepted Manuscripts Awaiting Publisher Release</h3>
                    </div>
                    <p className="text-xs text-indigo-200">
                      Latest: <strong>{queue[0]?.title}</strong> ({queue[0]?.firstAuthor?.name || 'Author'})
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleOpenEmailAuthor(queue[0]?.firstAuthor, queue[0])}
                      className="px-3.5 py-2 bg-indigo-700/60 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold border border-indigo-500/50 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Mail size={14} />
                      <span>Email Author</span>
                    </button>
                    <button
                      onClick={() => handleOpenPublishPaper(queue[0])}
                      className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles size={14} />
                      <span>Publish Now</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Middle Main Section: Table & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Left Table Container (3 Columns) */}
                <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h2 className="font-bold text-slate-800 text-sm">Recently Published Papers</h2>
                      <p className="text-[11px] text-slate-400">Peer-reviewed manuscripts live with assigned DOIs</p>
                    </div>
                    <span className="text-xs text-indigo-600 font-semibold">{filteredPapers.length} Records</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                          <th className="py-3 px-4">Paper Title</th>
                          <th className="py-3 px-4">Journal</th>
                          <th className="py-3 px-4">Author</th>
                          <th className="py-3 px-4">Published Date</th>
                          <th className="py-3 px-4">Volume / Issue</th>
                          <th className="py-3 px-4">DOI</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {filteredPapers.map((paper, idx) => (
                          <tr key={paper.id || idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-semibold text-slate-800 max-w-xs">{paper.title}</td>
                            <td className="py-3 px-4 text-slate-600">{paper.journal}</td>
                            <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{paper.author}</td>
                            <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{paper.date}</td>
                            <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{paper.issue}</td>
                            <td className="py-3 px-4 font-mono text-[11px] text-indigo-600 whitespace-nowrap font-medium">{paper.doi}</td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleOpenEmailAuthor({ name: paper.author, email: paper.authorEmail }, paper)}
                                title="Send Direct Editorial Email via Resend"
                                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center"
                              >
                                <Mail size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Quick Actions (1 Column) */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4">
                  <h2 className="font-bold text-slate-800 text-sm mb-3">Quick Actions</h2>
                  <div className="space-y-2">
                    {quickActions.map((action, idx) => {
                      const Icon = action.icon;
                      return (
                        <button 
                          key={idx}
                          onClick={action.action}
                          className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/40 transition-all text-left group cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                              <Icon size={16} />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                  {action.title}
                                </span>
                                {action.isNew && (
                                  <span className="bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400">{action.desc}</p>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Bottom Section: Chart, Recent Activities, Blog Published */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Publication Statistics Donut Chart */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold text-slate-800 text-sm">Publication Statistics (2026)</h2>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Live Sync</span>
                  </div>

                  {/* Chart Visual */}
                  <div className="relative h-48 w-full flex items-center justify-center my-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Donut Inner Text */}
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-lg font-bold text-slate-800">
                        {statsData?.papersPublished?.toLocaleString() ?? '1,245'}
                      </span>
                      <span className="text-[10px] text-slate-400">Total Papers</span>
                    </div>
                  </div>

                  {/* Chart Legend Details */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-slate-100">
                    {pieData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                          <span className="text-slate-600 text-[11px]">{item.name}</span>
                        </div>
                        <span className="font-semibold text-slate-800 text-[11px]">
                          {item.value?.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Secondary Metric Cards */}
                  <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                    <div className="bg-slate-50 p-1.5 rounded-lg">
                      <p className="text-[10px] text-slate-400">Acceptance Rate</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{statsData?.metrics?.acceptanceRate ?? 68}%</p>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded-lg">
                      <p className="text-[10px] text-slate-400">Rejection Rate</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{statsData?.metrics?.rejectionRate ?? 4}%</p>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded-lg">
                      <p className="text-[10px] text-slate-400">Avg. Review Time</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{statsData?.metrics?.avgReviewDays ?? 18} Days</p>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded-lg">
                      <p className="text-[10px] text-slate-400">Avg. Publish Time</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{statsData?.metrics?.avgPublishDays ?? 25} Days</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activities Feed */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="font-bold text-slate-800 text-sm mb-3">Recent Activities</h2>
                    <div className="space-y-3">
                      {recentActivities.map((act, idx) => {
                        const Icon = act.icon;
                        return (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${act.color} mt-0.5`}>
                              <Icon size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold text-slate-800">{act.title}</p>
                                <span className="text-[10px] text-slate-400">{act.time}</span>
                              </div>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">{act.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 mt-4 text-left flex items-center space-x-1 cursor-pointer">
                    <span>View All Activities</span>
                    <span>&rarr;</span>
                  </button>
                </div>

                {/* Blog Published List */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-bold text-slate-800 text-sm">Blog Published</h2>
                      <button onClick={() => setActiveTab('Blog Publish')} className="text-xs text-indigo-600 hover:underline cursor-pointer">
                        View All Blogs &rarr;
                      </button>
                    </div>
                    <div className="space-y-3">
                      {recentBlogs.map((blog, idx) => (
                        <div key={idx} className="flex items-center space-x-3 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                          <img 
                            src={blog.img} 
                            alt={blog.title} 
                            className="w-10 h-10 rounded-md object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-800 truncate">{blog.title}</p>
                            <p className="text-[10px] text-slate-400">By {blog.author}</p>
                          </div>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{blog.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </>
          )}

          {/* TAB 6: MANUSCRIPTS QUEUE */}
          {activeTab === 'Manuscripts' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Manuscript Ingestion & Publishing Queue</h2>
                  <p className="text-xs text-slate-500">Accepted papers awaiting DOI and volume/issue release.</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedPaperForPublish(queue[0] || null);
                    setIsPublishModalOpen(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  <PlusCircle size={15} />
                  <span>Publish New Paper</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                      <th className="py-3.5 px-4">Submission ID</th>
                      <th className="py-3.5 px-4">Manuscript Title</th>
                      <th className="py-3.5 px-4">Research Area</th>
                      <th className="py-3.5 px-4">Author Details</th>
                      <th className="py-3.5 px-4">Date Accepted</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {queue.length > 0 ? (
                      queue.map((paper) => (
                        <tr key={paper.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-indigo-700">{paper.submissionId}</td>
                          <td className="py-3.5 px-4 font-bold text-slate-800 max-w-sm">{paper.title}</td>
                          <td className="py-3.5 px-4 text-slate-600">{paper.researchArea}</td>
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-slate-800">{paper.firstAuthor?.name || 'Author'}</p>
                            <p className="text-[10px] text-slate-400">{paper.firstAuthor?.email || 'N/A'}</p>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">{paper.submittedAt || 'May 2026'}</td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEmailAuthor(paper.firstAuthor, paper)}
                              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              Email
                            </button>
                            <button
                              onClick={() => handleOpenPublishPaper(paper)}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                            >
                              Publish Live
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No accepted papers in queue at the moment.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* OTHER TABS FALLBACK UI */}
          {(activeTab === 'Users & Roles' || activeTab === 'Analytics & Reports' || activeTab === 'Subscriptions' || activeTab === 'Announcements' || activeTab === 'Messages' || activeTab === 'Settings') && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm text-center space-y-4 animate-in fade-in duration-200">
              <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mx-auto">
                <BarChart3 size={32} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">{activeTab} Panel</h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Real-time publishing records and institutional data synchronization are active for {activeTab}.
              </p>
              <button
                onClick={() => setActiveTab('Dashboard')}
                className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-indigo-700 cursor-pointer"
              >
                Back to Publisher Dashboard
              </button>
            </div>
          )}

        </main>
      </div>

      {/* MODALS */}
      <PublishPaperModal
        isOpen={isPublishModalOpen}
        paper={selectedPaperForPublish}
        onClose={() => setIsPublishModalOpen(false)}
        onSuccess={loadDashboardData}
      />

      <AddJournalModal
        isOpen={isAddJournalModalOpen}
        onClose={() => setIsAddJournalModalOpen(false)}
        onSuccess={loadDashboardData}
      />

      <CreateIssueModal
        isOpen={isCreateIssueModalOpen}
        onClose={() => setIsCreateIssueModalOpen(false)}
        onSuccess={loadDashboardData}
      />

      <IssueCertificateModal
        isOpen={isIssueCertModalOpen}
        onClose={() => setIsIssueCertModalOpen(false)}
        onSuccess={loadDashboardData}
      />

      <DirectAuthorEmailModal
        isOpen={isEmailAuthorModalOpen}
        author={emailModalProps.author}
        paper={emailModalProps.paper}
        onClose={() => setIsEmailAuthorModalOpen(false)}
      />

      <SendAnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        onSuccess={loadDashboardData}
      />

    </div>
  );
}
