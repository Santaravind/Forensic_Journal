import React from "react";
import {
  Menu,
  Calendar,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Database,
} from "lucide-react";
import { authService } from "../../services/authService";
import { Link } from "react-router-dom";

export default function Header({
  setIsMobileOpen = () => {},
  activeTab = "Dashboard",
}) {
  const currentUser = authService.getCurrentUser() || {};
  const todayFormatted = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const getPageTitle = () => {
    switch (activeTab) {
      case "Blog":
        return "Blog & Editorial Moderation";
      case "Manuscripts":
        return "Manuscripts & Academic Papers";
      case "Journals":
        return "Journals & Issue Releases";
      case "Announcements":
        return "Broadcasts & Public Notices";
      case "Settings":
        return "System Health & Audit Logs";
      default:
        return "Super Admin Dashboard";
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case "Blog":
        return "Review, approve, or restrict submitted research articles and news";
      case "Manuscripts":
        return "Full oversight of peer-review queue, decisions, and DOI publication";
      case "Journals":
        return "Configure official journals, volumes, issues, and ISSN registration";
      case "Announcements":
        return "Broadcast public notices and calls for papers";
      case "Settings":
        return "Live database connectivity, CDN storage, and editorial activity logs";
      default:
        return "Executive Operations Pulse • Forensic Patrika Journal Administration";
    }
  };

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5">
        {/* Left Section: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold font-serif text-slate-900 leading-tight">
              {getPageTitle()}
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              {getPageSubtitle()}
            </p>
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Link to public website */}
          <Link
            to="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink size={12} className="text-slate-400" />
          </Link>

          {/* Date Tag */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
            <Calendar size={13} className="text-indigo-600" />
            <span>{todayFormatted}</span>
          </div>

          {/* Admin User Badge */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : "A"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[130px]">
                {currentUser.fullName || currentUser.name || "Administrator"}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-md">
                <ShieldCheck size={10} /> ADMIN
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
