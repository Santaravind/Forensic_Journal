import React from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  ShieldCheck,
  BookOpen,
  FileStack,
  ClipboardList,
  Bell,
  Megaphone,
  Award,
  GraduationCap,
  BarChart3,
  Settings,
  LogOut,
  Headphones,
  ChevronRight,
  X,
} from "lucide-react";
import logo from "../assets/logoss.png";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Sidebar({
  activeTab = "Dashboard",
  setActiveTab = () => {},
  isMobileOpen = false,
  setIsMobileOpen = () => {},
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const navItems = [
    {
      section: "CORE",
      items: [
        { id: "Dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
        {
          id: "Blog",
          label: "Blog & Editorial",
          icon: FileText,
          badge: "Live",
          badgeColor: "bg-emerald-500",
        },
      ],
    },
    {
      section: "ACADEMIC MANAGEMENT",
      items: [
        { id: "Manuscripts", label: "Manuscripts & Papers", icon: FileStack },
        { id: "Journals", label: "Journals & Issues", icon: BookOpen },
        { id: "PeerReview", label: "Peer Review Queue", icon: ClipboardList },
        { id: "Users", label: "Users & Roles", icon: Users },
      ],
    },
    {
      section: "COMMUNICATION & SYSTEM",
      items: [
        { id: "Notifications", label: "Notifications & Alerts", icon: Bell, badge: "12" },
        { id: "Announcements", label: "Announcements", icon: Megaphone },
        { id: "Certificates", label: "Certificates Issued", icon: Award },
        { id: "Analytics", label: "Reports & Analytics", icon: BarChart3 },
        { id: "Settings", label: "System & Audit Logs", icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0F1026] text-slate-300 flex flex-col justify-between transform transition-transform duration-300 ease-in-out shrink-0 h-screen overflow-y-auto ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-md">
                <div className="bg-slate-900 w-full h-full rounded-2xl flex items-center justify-center overflow-hidden">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-8 h-8 object-contain filter brightness-110"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white tracking-wide leading-tight font-serif">
                  Forensic Patrika
                </p>
                <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">
                  Super Admin Panel
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Groups */}
          <div className="p-3 space-y-5">
            {navItems.map((group) => (
              <div key={group.section} className="space-y-1">
                <p className="text-[10px] font-bold tracking-widest text-slate-500 px-3 uppercase mb-1.5">
                  {group.section}
                </p>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-950/40"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          size={16}
                          className={isActive ? "text-white" : "text-slate-400"}
                        />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white ${
                            item.badgeColor || "bg-rose-500"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer info & Logout */}
        <div className="p-3 border-t border-slate-800/80 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sign Out from Admin</span>
          </button>

          <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Headphones size={15} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Admin Support</p>
              <p className="text-[10px] text-slate-400">admin@forensicpatrika.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
