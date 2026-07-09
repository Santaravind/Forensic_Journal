import React from "react";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  UserCog,
  UserCheck,
  Building2,
  BookOpen,
  FileStack,
  FileText,
  ClipboardList,
  Gavel,
  Bell,
  Megaphone,
  Mail,
  Award,
  GraduationCap,
  FolderKanban,
  Trophy,
  Medal,
  BarChart3,
  FileBarChart,
  Settings,
  DatabaseBackup,
  History,
  LifeBuoy,
  Headphones,
  ChevronRight,
} from "lucide-react";

const mainNav = [{ icon: LayoutDashboard, label: "Dashboard", active: true }];

const managementNav = [
  { icon: Users, label: "Users Management" },
  { icon: ShieldCheck, label: "Roles & Permissions" },
  { icon: UserCog, label: "Editors Management" },
  { icon: UserCheck, label: "Reviewers Management" },
  { icon: Building2, label: "Publishers Management" },
  { icon: BookOpen, label: "Journals Management" },
  { icon: FileStack, label: "Issues & Publications", expandable: true },
  { icon: FileText, label: "Manuscripts" },
  { icon: ClipboardList, label: "Peer Review", expandable: true },
  { icon: Gavel, label: "Editorial Decisions", expandable: true },
];

const communicationNav = [
  { icon: Bell, label: "Notifications", badge: 12 },
  { icon: Megaphone, label: "Announcements" },
  { icon: Mail, label: "Email Templates" },
  { icon: Award, label: "Certificates", tag: "New" },
];

const learningNav = [
  { icon: GraduationCap, label: "Learning Resources" },
  { icon: FolderKanban, label: "Resource Categories" },
];

const achievementsNav = [
  { icon: Trophy, label: "Achievements" },
  { icon: Medal, label: "Badges" },
];

const reportsNav = [
  { icon: BarChart3, label: "Analytics Dashboard" },
  { icon: FileBarChart, label: "Reports", expandable: true },
];

const systemNav = [
  { icon: Settings, label: "System Settings" },
  { icon: DatabaseBackup, label: "Backup & Restore" },
  { icon: History, label: "Audit Logs" },
  { icon: LifeBuoy, label: "Support & Help" },
];

function NavItem({ item }) {
  const Icon = item.icon;
  return (
    <button
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-colors ${
        item.active
          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-md shadow-indigo-900/30"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className="flex items-center gap-3">
        <Icon size={16} />
        {item.label}
      </span>
      <span className="flex items-center gap-1.5">
        {item.tag && (
          <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
            {item.tag}
          </span>
        )}
        {item.badge && (
          <span className="bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {item.badge}
          </span>
        )}
        {item.expandable && <ChevronRight size={14} className="text-slate-500" />}
      </span>
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-bold tracking-widest text-slate-500 px-3 mt-5 mb-2">
      {children}
    </p>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-[#140b33] text-white h-screen sticky top-0 overflow-y-auto">
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-amber-400/40">
          <span className="text-xs font-serif italic text-indigo-700">P</span>
        </div>
        <div>
          <p className="text-sm font-bold leading-tight">FORENSIC</p>
          <p className="text-sm font-bold leading-tight">PATRIKA</p>
          <p className="text-[10px] text-slate-400">Official Portal</p>
        </div>
      </div>

      <div className="px-3">
        <div className="space-y-1">
          {mainNav.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </div>

        <SectionLabel>MANAGEMENT</SectionLabel>
        <div className="space-y-1">
          {managementNav.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </div>

        <SectionLabel>COMMUNICATION</SectionLabel>
        <div className="space-y-1">
          {communicationNav.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </div>

        <SectionLabel>LEARNING & RESOURCES</SectionLabel>
        <div className="space-y-1">
          {learningNav.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </div>

        <SectionLabel>ACHIEVEMENTS</SectionLabel>
        <div className="space-y-1">
          {achievementsNav.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </div>

        <SectionLabel>REPORTS & ANALYTICS</SectionLabel>
        <div className="space-y-1">
          {reportsNav.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </div>

        <SectionLabel>SYSTEM</SectionLabel>
        <div className="space-y-1 pb-4">
          {systemNav.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-auto p-3">
        <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Headphones size={16} />
          </div>
          <div>
            <p className="text-xs font-semibold">Need Help?</p>
            <p className="text-[11px] text-slate-400">Contact Admin Support</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
