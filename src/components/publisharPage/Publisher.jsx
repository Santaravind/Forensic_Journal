import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import logo from '../assets/logoss.png' 


export default function Publisher() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data for Publication Statistics Chart
  const pieData = [
    { name: 'Published', value: 1245, color: '#6366F1' },
    { name: 'Under Review', value: 512, color: '#3B82F6' },
    { name: 'Accepted', value: 184, color: '#10B981' },
    { name: 'Rejected', value: 67, color: '#F59E0B' },
  ];

  // Stats cards configuration
  const stats = [
    { title: 'Journals Published', count: '8', subtitle: 'Active Journals', icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
    { title: 'Issues Published', count: '101', subtitle: 'This Year (2026)', icon: Newspaper, color: 'bg-emerald-100 text-emerald-600' },
    { title: 'Papers Published', count: '1,245', subtitle: 'This Year (2026)', icon: FileText, color: 'bg-amber-100 text-amber-600' },
    { title: 'Registered Users', count: '2,356', subtitle: 'Authors, Reviewers, Editors', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Downloads', count: '32,450', subtitle: 'This Year (2026)', icon: TrendingUp, color: 'bg-indigo-100 text-indigo-600' },
  ];

  // Recently Published Papers table data
  const publishedPapers = [
    {
      title: 'Advancements in Forensic DNA Analysis Using NGS Technologies',
      journal: 'Journal of Forensic Science and Research',
      author: 'Mr. Indresh',
      date: '15 May 2026',
      issue: 'Vol. 10, Issue 2 May 2026',
      doi: '10.5958/JFSR.2026.1002'
    },
    {
      title: 'Forensic Entomology: A Review of Recent Applications',
      journal: 'Journal of Forensic Science and Research',
      author: 'Mr. Indresh',
      date: '12 May 2026',
      issue: 'Vol. 10, Issue 2 May 2026',
      doi: '10.5958/JFSR.2026.1003'
    },
    {
      title: 'Fingerprint Analysis Using Deep Learning Techniques',
      journal: 'Forensic Science International Reports',
      author: 'Mr. Indresh',
      date: '10 May 2026',
      issue: 'Vol. 8, Issue 2 May 2026',
      doi: '10.5958/FSIR.2026.0802'
    },
    {
      title: 'Ballistic Evidence Examination: Methods and Challenges',
      journal: 'Journal of Forensic Science and Research',
      author: 'Mr. Indresh',
      date: '08 May 2026',
      issue: 'Vol. 10, Issue 2 May 2026',
      doi: '10.5958/JFSR.2026.1004'
    },
    {
      title: 'Digital Forensics in Cyber Crime Investigation',
      journal: 'Cyber Forensics and Security Journal',
      author: 'Mr. Indresh',
      date: '05 May 2026',
      issue: 'Vol. 6, Issue 2 May 2026',
      doi: '10.5958/CFSJ.2026.0602'
    }
  ];

  // Quick actions items
  const quickActions = [
    { title: 'Add New Journal', desc: 'Create and manage journals', icon: BookOpen },
    { title: 'Publish New Issue', desc: 'Create a new issue for a journal', icon: Newspaper },
    { title: 'Publish New Paper', desc: 'Create and publish new paper', icon: FileText },
    { title: 'Blog Publish', desc: 'Create and publish blog posts', icon: FileEdit, isNew: true },
    { title: 'Issue Certificate', desc: 'Generate and issue certificates', icon: Award },
    { title: 'Send Notification', desc: 'Send notifications to users', icon: Megaphone },
    { title: 'Manage Subscriptions', desc: 'View and manage subscriptions', icon: CreditCard },
    { title: 'Generate Reports', desc: 'View analytics and download reports', icon: BarChart3 }
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
                onClick={() => setActiveTab(item.name)}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 font-medium
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

          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800/60 hover:text-white transition-all font-medium mt-4">
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
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Publisher Dashboard</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Welcome back! Here's an overview of your publishing activities.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <div className="relative hidden md:block w-64 lg:w-80">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search manuscripts, journals, users..."
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
              />
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full"></span>
            </button>

            {/* Certificates Button */}
            <button className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700">
              <Award size={14} />
              <span>Certificates</span>
            </button>

            {/* User Profile Dropdown */}
            <div className="flex items-center space-x-2 border-l border-slate-200 pl-3">
              <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-xs shadow-sm">
                DP
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-800 leading-tight">Dr. Publisher</p>
                <p className="text-[10px] text-slate-500">Publisher</p>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main className="p-4 lg:p-6 space-y-6">
          
          {/* Top Date Filter Row */}
          <div className="flex justify-end items-center">
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
                  <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 mt-3 text-left flex items-center space-x-1">
                    <span>View all</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Middle Main Section: Table & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Table Container (3 Columns) */}
            <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-800 text-sm">Recently Published Papers</h2>
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {publishedPapers.map((paper, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-800 max-w-xs">{paper.title}</td>
                        <td className="py-3 px-4 text-slate-600">{paper.journal}</td>
                        <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{paper.author}</td>
                        <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{paper.date}</td>
                        <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{paper.issue}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">{paper.doi}</td>
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
                      className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/40 transition-all text-left group"
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
                <select className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-slate-50 text-slate-600 focus:outline-none">
                  <option>This Year</option>
                  <option>Last Year</option>
                </select>
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
                  <span className="text-lg font-bold text-slate-800">1,245</span>
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
                      {item.value.toLocaleString()} ({Math.round((item.value / 2008) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>

              {/* Secondary Metric Cards */}
              <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                <div className="bg-slate-50 p-1.5 rounded-lg">
                  <p className="text-[10px] text-slate-400">Acceptance Rate</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">68%</p>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-lg">
                  <p className="text-[10px] text-slate-400">Rejection Rate</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">4%</p>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-lg">
                  <p className="text-[10px] text-slate-400">Avg. Review Time</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">18 Days</p>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-lg">
                  <p className="text-[10px] text-slate-400">Avg. Publish Time</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">25 Days</p>
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
              <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 mt-4 text-left flex items-center space-x-1">
                <span>View All Activities</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* Blog Published List */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-slate-800 text-sm">Blog Published</h2>
                  <a href="#" className="text-xs text-indigo-600 hover:underline">View All Blogs &rarr;</a>
                </div>
                <div className="space-y-3">
                  {recentBlogs.map((blog, idx) => (
                    <div key={idx} className="flex items-center space-x-3 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                      <img 
                        src={blog.img} 
                        alt={blog.title} 
                        className="w-10 h-10 rounded-md object-cover flex-shrink-0"
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

        </main>
      </div>
    </div>
  );
}


