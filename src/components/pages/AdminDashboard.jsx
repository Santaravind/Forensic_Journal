import React, { useState } from "react";
import Sidebar from "../AdminDashboard/Sidebar";
import Header from "../AdminDashboard/Header";
import StatsRow from "../AdminDashboard/StatsRow";
import BlogManagement from "../AdminDashboard/BlogManagement";
import QuickActions from "../AdminDashboard/QuickActions";
import ManuscriptSummary from "../AdminDashboard/ManuscriptSummary";
import UserRolesDistribution from "../AdminDashboard/UserRolesDistribution";
import CertificatesIssued from "../AdminDashboard/CertificatesIssued";
import NotificationCenter from "../AdminDashboard/NotificationCenter";
import ManagementSection from "../AdminDashboard/ManagementSection";
import LearningResources from "../AdminDashboard/LearningResources";
import AchievementOverview from "../AdminDashboard/AchievementOverview";
import AchievementsLeaderboard from "../AdminDashboard/AchievementsLeaderboard";
import MonthlyActivityOverview from "../AdminDashboard/MonthlyActivityOverview";
import SystemInformation from "../AdminDashboard/SystemInformation";
import {
  LayoutDashboard,
  FileText,
  FileStack,
  Users,
  Settings,
  Bell,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-slate-100 flex font-sans">
      {/* Dynamic Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          setIsMobileOpen={setIsMobileOpen}
          activeTab={activeTab}
        />

        <div className="p-4 sm:p-6 space-y-6">
          {/* Quick View Switcher Pill Bar */}
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
                onClick={() => setActiveTab("Manuscripts")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Manuscripts"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <FileStack size={14} />
                <span>Manuscripts</span>
              </button>

              <button
                onClick={() => setActiveTab("Users")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Users"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Users size={14} />
                <span>Users & Roles</span>
              </button>

              <button
                onClick={() => setActiveTab("Settings")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Settings"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Settings size={14} />
                <span>System & Logs</span>
              </button>
            </div>

            <div className="hidden xl:flex items-center gap-2 text-xs text-slate-500 pr-2 shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-700">Neon DB & Cloudinary Online</span>
            </div>
          </div>

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "Dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Primary High-Level Stat Counters */}
              <StatsRow />

              {/* Central Blog Moderation Workspace */}
              <BlogManagement />

              {/* Quick Actions, Manuscript Summary, Roles Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <QuickActions />
                <ManuscriptSummary />
                <UserRolesDistribution />
                <CertificatesIssued />
              </div>

              {/* Communication & Management Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
                <NotificationCenter />
                <ManagementSection />
                <LearningResources />
              </div>

              {/* System & Activity Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <AchievementOverview />
                <AchievementsLeaderboard />
                <MonthlyActivityOverview />
                <SystemInformation />
              </div>
            </div>
          )}

          {/* TAB 2: DEDICATED BLOG & EDITORIAL MODERATION */}
          {activeTab === "Blog" && (
            <div className="animate-in fade-in duration-200">
              <BlogManagement />
            </div>
          )}

          {/* TAB 3: MANUSCRIPTS & PAPERS */}
          {activeTab === "Manuscripts" || activeTab === "Journals" || activeTab === "PeerReview" ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="xl:col-span-2">
                  <ManuscriptSummary />
                </div>
                <QuickActions />
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <MonthlyActivityOverview />
                <SystemInformation />
              </div>
            </div>
          ) : null}

          {/* TAB 4: USERS & ROLES */}
          {activeTab === "Users" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="xl:col-span-2">
                  <UserRolesDistribution />
                </div>
                <QuickActions />
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <ManagementSection />
                <CertificatesIssued />
              </div>
            </div>
          )}

          {/* TAB 5: NOTIFICATIONS & COMMUNICATION */}
          {activeTab === "Notifications" || activeTab === "Announcements" || activeTab === "Certificates" ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="xl:col-span-2">
                  <NotificationCenter />
                </div>
                <CertificatesIssued />
              </div>
              <LearningResources />
            </div>
          ) : null}

          {/* TAB 6: SYSTEM & LOGS */}
          {activeTab === "Settings" || activeTab === "Analytics" ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <SystemInformation />
                <MonthlyActivityOverview />
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <AchievementOverview />
                <AchievementsLeaderboard />
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
