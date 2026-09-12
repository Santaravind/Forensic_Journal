import React from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Award,
  ArrowUpRight,
  TrendingUp,
  FileCheck2,
  Calendar,
} from "lucide-react";

export default function StatsRow({ papers = [], onNavigateTab = () => {} }) {
  const totalAssigned = papers.length;

  const pendingReviews = papers.filter((p) => {
    const s = (p.status || p.rawStatus || "").toUpperCase();
    return s.includes("NEW") || s.includes("SUBMIT") || s.includes("PENDING") || (s.includes("REVIEW") && !s.includes("COMPLET"));
  }).length;

  const completedReviews = papers.filter((p) => {
    const s = (p.status || p.rawStatus || "").toUpperCase();
    return s.includes("ACCEPT") || s.includes("COMPLET") || s.includes("PUBLISH");
  }).length;

  const revisionRequired = papers.filter((p) => {
    const s = (p.status || p.rawStatus || "").toUpperCase();
    return s.includes("REVIS") || s.includes("AWAIT");
  }).length;

  const stats = [
    {
      id: "total",
      label: "Assigned Manuscripts",
      value: totalAssigned,
      subtext: "Total assigned for peer review",
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-slate-200/90 hover:border-indigo-300",
      tab: "Manuscripts",
    },
    {
      id: "pending",
      label: "Pending Evaluations",
      value: pendingReviews,
      subtext: "Awaiting scoring & report",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-slate-200/90 hover:border-amber-300",
      tab: "Pending",
    },
    {
      id: "completed",
      label: "Completed Reviews",
      value: completedReviews,
      subtext: "Submitted evaluation reports",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-slate-200/90 hover:border-emerald-300",
      tab: "Completed",
    },
    {
      id: "revisions",
      label: "Revision Requests",
      value: revisionRequired,
      subtext: "Minor/major rework needed",
      icon: AlertCircle,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-slate-200/90 hover:border-purple-300",
      tab: "Manuscripts",
    },
    {
      id: "turnaround",
      label: "Avg. Turnaround",
      value: "4.8 Days",
      subtext: "Target SLA: ≤ 14 Days",
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-slate-200/90 hover:border-blue-300",
      tab: "Calendar",
    },
    {
      id: "rating",
      label: "Reviewer Quality",
      value: "9.6 / 10",
      subtext: "Editorial Recognition Tier",
      icon: Award,
      color: "text-teal-600",
      bg: "bg-teal-50",
      border: "border-slate-200/90 hover:border-teal-300",
      tab: "Guidelines",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.id}
            onClick={() => onNavigateTab(s.tab)}
            className={`bg-white rounded-2xl border ${s.border} p-4.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl ${s.bg} ${s.color} transition-transform group-hover:scale-110 shadow-2xs`}>
                <Icon size={18} />
              </div>
              <ArrowUpRight
                size={15}
                className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </div>

            <div className="mt-3">
              <p className="text-2xl font-extrabold text-slate-900 leading-tight">
                {s.value}
              </p>
              <p className="text-xs font-bold text-slate-700 mt-0.5">
                {s.label}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 truncate">
                {s.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
