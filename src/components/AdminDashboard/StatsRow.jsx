import React from "react";
import {
  Users,
  FileText,
  Hourglass,
  CheckCircle2,
  Download,
  Server,
  ArrowUp,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "1,253",
    label: "Total Users",
    trend: "12.5% from last month",
    trendColor: "text-emerald-500",
    link: "View all users",
    linkColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    icon: FileText,
    value: "2,356",
    label: "Total Manuscripts",
    trend: "15.3% from last month",
    trendColor: "text-emerald-500",
    link: "View all manuscripts",
    linkColor: "text-indigo-600",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Hourglass,
    value: "1,145",
    label: "Under Review",
    trend: "10.7% from last month",
    trendColor: "text-emerald-500",
    link: "View all reviews",
    linkColor: "text-amber-500",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
  {
    icon: CheckCircle2,
    value: "982",
    label: "Published Papers",
    trend: "8.4% from last month",
    trendColor: "text-emerald-500",
    link: "View all publications",
    linkColor: "text-indigo-600",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-500",
  },
  {
    icon: Download,
    value: "32,450",
    label: "Total Downloads",
    trend: "9.8% from last month",
    trendColor: "text-emerald-500",
    link: "View analytics",
    linkColor: "text-red-500",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    icon: Server,
    value: "100%",
    label: "System Status",
    trendText: "All systems operational",
    trendColor: "text-slate-400",
    link: "View system status",
    linkColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
];

export default function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between"
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${s.iconBg}`}
            >
              <s.icon size={18} className={s.iconColor} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800 leading-tight">
                {s.value}
              </p>
              <p className="text-xs font-medium text-slate-500">{s.label}</p>
            </div>
          </div>

          <p className={`text-[11px] font-medium mt-3 flex items-center gap-1 ${s.trendColor}`}>
            {s.trend && <ArrowUp size={11} />}
            {s.trend || s.trendText}
          </p>

          <a
            href="#"
            className={`text-xs font-semibold mt-2 flex items-center gap-1 ${s.linkColor} hover:underline`}
          >
            {s.link} <span aria-hidden>→</span>
          </a>
        </div>
      ))}
    </div>
  );
}
