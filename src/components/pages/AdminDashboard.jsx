import React, { useState, useEffect } from "react";
import Sidebar from "../AdminDashboard/Sidebar";
import Header from "../AdminDashboard/Header";
import StatsRow from "../AdminDashboard/StatsRow";
import BlogManagement from "../AdminDashboard/BlogManagement";
import AdminManuscriptTable from "../AdminDashboard/AdminManuscriptTable";
import QuickActions from "../AdminDashboard/QuickActions";
import OverviewBreakdown from "../AdminDashboard/OverviewBreakdown";
import JournalManagement from "../AdminDashboard/JournalManagement";
import AnnouncementsManager from "../AdminDashboard/AnnouncementsManager";
import AuditLogsView from "../AdminDashboard/AuditLogsView";
import {
  LayoutDashboard,
  FileText,
  FileStack,
  BookOpen,
  Megaphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { researchPaperApi, publisherApi, normalizePaper, extractPaperList } from "../../api/publisherApi";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllPapers();

    const handleUpdate = () => {
      loadAllPapers();
    };

    window.addEventListener("paperStatusUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("paperStatusUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const loadAllPapers = async () => {
    try {
      setLoading(true);
      const allPapers = await researchPaperApi.getAllPapers();
      if (allPapers && allPapers.length > 0) {
        setPapers(allPapers.map(normalizePaper));
      } else {
        const res = await publisherApi.getQueue(1, 100);
        const rawList = extractPaperList(res);
        setPapers(rawList.map(normalizePaper));
      }
    } catch (err) {
      console.warn("Could not fetch papers:", err);
      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex font-sans">
      {/* Sleek Dark Dynamic Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        manuscriptCount={papers.length}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          setIsMobileOpen={setIsMobileOpen}
          activeTab={activeTab}
        />

        <div className="p-4 sm:p-6 space-y-6">
          {/* Quick Tab Switcher Pill Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-2 shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setActiveTab("Dashboard")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Dashboard"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <LayoutDashboard size={14} />
                <span>Overview Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab("Manuscripts")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Manuscripts"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <FileStack size={14} />
                <span>Manuscripts & Papers</span>
                {papers.length > 0 && (
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                      activeTab === "Manuscripts" ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {papers.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("Blog")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Blog"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <FileText size={14} />
                <span>Blog & Editorial Moderation</span>
                <span className="bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                  Live
                </span>
              </button>

              <button
                onClick={() => setActiveTab("Journals")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Journals"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <BookOpen size={14} />
                <span>Journals & Issues</span>
              </button>

              <button
                onClick={() => setActiveTab("Announcements")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Announcements"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Megaphone size={14} />
                <span>Announcements</span>
              </button>

              <button
                onClick={() => setActiveTab("Settings")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Settings"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <ShieldCheck size={14} />
                <span>System & Audit Logs</span>
              </button>
            </div>

            <div className="hidden xl:flex items-center gap-2 text-xs text-slate-500 pr-2 shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-700">Neon DB & Cloudinary Connected</span>
            </div>
          </div>

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "Dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Primary Live Metrics Counters */}
              <StatsRow
                papers={papers}
                onNavigateTab={setActiveTab}
              />

              {/* Functional Quick Actions */}
              <QuickActions
                onNavigateTab={setActiveTab}
                onRefreshData={loadAllPapers}
              />

              {/* Dynamic Pipeline Breakdown */}
              <OverviewBreakdown
                papers={papers}
                loading={loading}
                onNavigateTab={setActiveTab}
              />

              {/* Recent Submissions Queue */}
              <AdminManuscriptTable
                papers={papers}
                loading={loading}
                onRefresh={loadAllPapers}
                limit={6}
                title="Recent Manuscript Submissions Queue"
                subtitle="Incoming research papers awaiting initial check or reviewer assignments."
                onNavigateTab={setActiveTab}
              />
            </div>
          )}

          {/* TAB 2: MANUSCRIPTS & PAPERS */}
          {activeTab === "Manuscripts" && (
            <div className="animate-in fade-in duration-200">
              <AdminManuscriptTable
                papers={papers}
                loading={loading}
                onRefresh={loadAllPapers}
                title="Submitted Manuscripts & Research Papers"
                subtitle="Full oversight of research submissions, review statuses, editorial decisions, and publishing pipeline."
                onNavigateTab={setActiveTab}
              />
            </div>
          )}

          {/* TAB 3: DEDICATED BLOG & EDITORIAL MODERATION */}
          {activeTab === "Blog" && (
            <div className="animate-in fade-in duration-200">
              <BlogManagement />
            </div>
          )}

          {/* TAB 4: JOURNALS, VOLUMES & ISSUES */}
          {activeTab === "Journals" && (
            <div className="animate-in fade-in duration-200">
              <JournalManagement />
            </div>
          )}

          {/* TAB 5: ANNOUNCEMENTS & BROADCASTS */}
          {activeTab === "Announcements" && (
            <div className="animate-in fade-in duration-200">
              <AnnouncementsManager />
            </div>
          )}

          {/* TAB 6: SYSTEM & AUDIT LOGS */}
          {activeTab === "Settings" && (
            <div className="animate-in fade-in duration-200">
              <AuditLogsView papers={papers} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
