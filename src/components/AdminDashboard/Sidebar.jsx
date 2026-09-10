import React from "react";
import {
  LayoutDashboard,
  FileText,
  FileStack,
  BookOpen,
  Megaphone,
  ShieldCheck,
  LogOut,
  ChevronRight,
  X,
  ExternalLink,
  Sparkles,
  Database,
  Activity,
  Layers,
} from "lucide-react";
import logo from "../assets/logoss.png";
import { authService } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Sidebar({
  activeTab = "Dashboard",
  setActiveTab = () => {},
  isMobileOpen = false,
  setIsMobileOpen = () => {},
  manuscriptCount = 0,
}) {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser() || {
    fullName: "Super Admin",
    email: "admin@forensicpatrika.com",
    role: "ADMIN",
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const navSections = [
    {
      title: "Core Administration",
      items: [
        {
          id: "Dashboard",
          label: "Dashboard Overview",
          icon: LayoutDashboard,
          hint: "Executive Operations Pulse",
        },
        {
          id: "Manuscripts",
          label: "Manuscripts & Papers",
          icon: FileStack,
          badge: manuscriptCount > 0 ? `${manuscriptCount}` : null,
          badgeType: "primary",
          hint: "Submissions, Review & Publishing",
        },
        {
          id: "Blog",
          label: "Blog & Editorial Moderation",
          icon: FileText,
          badge: "Live",
          badgeType: "live",
          hint: "Articles & News Moderation",
        },
      ],
    },
    {
      title: "Publishing & Communications",
      items: [
        {
          id: "Journals",
          label: "Journals & Issue Releases",
          icon: BookOpen,
          hint: "Volumes, Issues & ISSN Registry",
        },
        {
          id: "Announcements",
          label: "Broadcasts & Public Notices",
          icon: Megaphone,
          hint: "Author Notices & Call for Papers",
        },
      ],
    },
    {
      title: "System & Governance",
      items: [
        {
          id: "Settings",
          label: "System Health & Audit Logs",
          icon: ShieldCheck,
          hint: "PostgreSQL & Action History",
        },
      ],
    },
  ];

  const getBadgeClass = (type) => {
    switch (type) {
      case "live":
        return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
      case "primary":
        return "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30";
      default:
        return "bg-slate-700/50 text-slate-300 border border-slate-600/30";
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#090B1E] via-[#0D122E] to-[#070918] text-slate-300 flex flex-col justify-between transform transition-all duration-300 ease-in-out shrink-0 h-screen border-r border-slate-800/80 shadow-2xl select-none ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* TOP SECTION */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          
          {/* Brand Header */}
          <div className="p-4 pb-3 border-b border-white/[0.08] relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-600/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-[2px] shadow-lg shadow-indigo-600/25">
                    <div className="bg-[#090B1E] w-full h-full rounded-2xl flex items-center justify-center overflow-hidden">
                      <img
                        src={logo}
                        alt="Forensic Patrika Logo"
                        className="w-8 h-8 object-contain filter brightness-110"
                      />
                    </div>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#090B1E]"></span>
                  </span>
                </div>

                <div>
                  <h2 className="text-sm font-extrabold text-white tracking-wide leading-tight font-serif uppercase">
                    Forensic Patrika
                  </h2>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                    <p className="text-[10px] text-indigo-300/90 font-bold uppercase tracking-widest">
                      Admin Portal
                    </p>
                  </div>
                </div>
              </div>

              {/* Close button for mobile */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/[0.08] transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Status Pill */}
            <div className="mt-3.5 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                <span className="font-semibold text-slate-300">Neon DB & Cloudinary</span>
              </div>
              <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-800/40">
                Online
              </span>
            </div>
          </div>

          {/* Admin Profile Mini Card */}
          <div className="px-3 pt-3">
            <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/40 border border-white/[0.06] rounded-2xl p-2.5 flex items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-extrabold text-xs shadow-md shadow-indigo-900/50 shrink-0">
                  {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : "A"}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate leading-tight">
                    {currentUser.fullName || "Administrator"}
                  </p>
                  <p className="text-[10px] text-indigo-300/80 truncate font-medium">
                    {currentUser.email || "admin@forensicpatrika.com"}
                  </p>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-lg text-[9px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 shrink-0 flex items-center gap-1">
                <ShieldCheck size={11} className="text-indigo-400" />
                ADMIN
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="p-3 space-y-4">
            {navSections.map((section, sIdx) => (
              <div key={section.title || sIdx} className="space-y-1">
                <div className="px-3 py-1 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase font-mono">
                    {section.title}
                  </span>
                </div>

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileOpen(false);
                        }}
                        className={`w-full group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer overflow-hidden ${
                          isActive
                            ? "bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 font-bold"
                            : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.06]"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-white rounded-r-full shadow-xs" />
                        )}

                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`p-1.5 rounded-lg transition-all duration-200 shrink-0 ${
                              isActive
                                ? "bg-white/15 text-white"
                                : "bg-white/[0.03] text-slate-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/10 group-hover:scale-110"
                            }`}
                          >
                            <Icon size={15} />
                          </div>
                          <div className="text-left min-w-0">
                            <span className="truncate block leading-tight">
                              {item.label}
                            </span>
                            {item.hint && (
                              <span
                                className={`text-[10px] block leading-tight font-normal truncate mt-0.5 ${
                                  isActive
                                    ? "text-indigo-100/80"
                                    : "text-slate-500 group-hover:text-slate-400"
                                }`}
                              >
                                {item.hint}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {item.badge && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold transition-all flex items-center gap-1 ${
                                item.badgeType === "live" ? "animate-pulse" : ""
                              } ${getBadgeClass(item.badgeType)}`}
                            >
                              {item.badgeType === "live" && (
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                              )}
                              {item.badge}
                            </span>
                          )}

                          <ChevronRight
                            size={13}
                            className={`transition-transform duration-200 ${
                              isActive
                                ? "text-white/90 translate-x-0.5"
                                : "text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-slate-300 group-hover:translate-x-0.5"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="p-3 border-t border-white/[0.08] bg-[#070918]/80 space-y-2.5 shrink-0">
          <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-white/[0.06] rounded-2xl p-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
                <Database size={13} className="text-indigo-400" />
                <span>Neon PostgreSQL</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-white/[0.05]">
              <Link
                to="/"
                target="_blank"
                className="hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                <ExternalLink size={11} />
                <span>Public Website</span>
              </Link>
              <button
                onClick={() => setActiveTab("Settings")}
                className="hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Activity size={11} />
                <span>Audit Logs</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/30 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <LogOut size={15} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Sign Out Admin</span>
            </div>
            <span className="text-[10px] text-rose-400/70 group-hover:text-rose-300 font-mono font-medium">
              Esc
            </span>
          </button>
        </div>

      </aside>
    </>
  );
}
