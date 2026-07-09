import React from "react";
import { FileText, Star, UserPlus, Award, BookOpen } from "lucide-react";

const notifications = [
  {
    icon: FileText,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    title: "New manuscript submitted",
    sub: "FP-2026-1056 by Mr Sant",
    time: "10 min ago",
  },
  {
    icon: Star,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    title: "Review reminder sent",
    sub: "To 15 reviewers",
    time: "1 hour ago",
  },
  {
    icon: UserPlus,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-500",
    title: "New user registered",
    sub: "Mr Indresh (Author)",
    time: "3 hours ago",
  },
  {
    icon: Award,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
    title: "Certificate issued",
    sub: "Reviewer Excellence - May 2026",
    time: "5 hours ago",
  },
  {
    icon: BookOpen,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    title: "New issue published",
    sub: "Volume 11, Issue 2 (May 2026)",
    time: "1 day ago",
  },
];

export default function NotificationCenter() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">Notification Center</h3>
        <a href="#" className="text-xs font-semibold text-indigo-600 hover:underline">
          View All →
        </a>
      </div>
      <div className="space-y-4">
        {notifications.map((n) => (
          <div key={n.title} className="flex items-start gap-3">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${n.iconBg}`}
            >
              <n.icon size={16} className={n.iconColor} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-700">{n.title}</p>
              <p className="text-xs text-slate-400">{n.sub}</p>
            </div>
            <span className="text-[11px] text-slate-300 whitespace-nowrap">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
