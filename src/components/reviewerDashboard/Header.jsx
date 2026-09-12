import React from "react";
import {
  Menu,
  Calendar,
  UserCheck,
  ExternalLink,
  Sparkles,
  BookOpen,
  Bell,
} from "lucide-react";
import { authService } from "../../services/authService";
import { Link } from "react-router-dom";

export default function Header({
  setIsMobileOpen = () => {},
  activeTab = "Dashboard",
  pendingCount = 0,
  onNavigateTab = () => {},
}) {
  const currentUser = authService.getCurrentUser() || {};
  const todayFormatted = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const getPageTitle = () => {
    switch (activeTab) {
      case "Manuscripts":
        return "Assigned Manuscripts & Papers";
      case "Pending":
        return "Pending Review Evaluations";
      case "Completed":
        return "Completed Peer Review Archive";
      case "Calendar":
        return "Review Deadlines & Calendar";
      case "Guidelines":
        return "Peer Review Guidelines & Rubric";
      default:
        return "Reviewer Operations Dashboard";
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case "Manuscripts":
        return "Evaluate forensic manuscripts, submit recommendations, and download documents";
      case "Pending":
        return "Priority manuscripts awaiting your score, evaluation report, and editorial comments";
      case "Completed":
        return "Historical log of completed peer reviews and editorial recommendations";
      case "Calendar":
        return "Manage upcoming review due dates, milestone schedules, and submission windows";
      case "Guidelines":
        return "COPE ethical standards, scoring criteria, and academic integrity guidance";
      default:
        return "Peer Review Command Center • Forensic Patrika Academic Publishing";
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
          {/* Pending Reviews Alert Pill */}
          {pendingCount > 0 && (
            <button
              onClick={() => onNavigateTab("Pending")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>{pendingCount} Pending Review{pendingCount > 1 ? 's' : ''}</span>
            </button>
          )}

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

          {/* Reviewer User Badge */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : "R"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[130px]">
                {currentUser.fullName || currentUser.name || "Peer Reviewer"}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] text-indigo-700 font-bold bg-indigo-50 px-1.5 py-0.2 rounded-md">
                <UserCheck size={10} /> REVIEWER
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
