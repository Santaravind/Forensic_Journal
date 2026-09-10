import React, { useState, useEffect } from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  Sparkles,
  Layers,
  Database,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { publisherApi } from "../../api/publisherApi";

export default function StatsRow({ papers = [], onNavigateTab = () => {} }) {
  const [apiStats, setApiStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await publisherApi.getStats();
      if (data) {
        setApiStats(data);
      }
    } catch (e) {
      console.warn("Could not load stats from backend:", e);
    }
  };

  // Derive counts dynamically from live papers array as authoritative fallback
  const totalPapers = apiStats?.totalManuscripts ?? (papers.length || 0);
  
  const underReviewCount =
    apiStats?.underReview ??
    papers.filter((p) => (p.status || "").toUpperCase().includes("REVIEW")).length;

  const acceptedCount =
    apiStats?.accepted ??
    papers.filter((p) => (p.status || "").toUpperCase().includes("ACCEPT")).length;

  const publishedCount =
    apiStats?.publishedPapers ??
    apiStats?.published ??
    papers.filter((p) => (p.status || "").toUpperCase().includes("PUBLISH")).length;

  const newSubmissionsCount = papers.filter((p) => {
    const s = (p.status || "").toUpperCase();
    return s.includes("NEW") || s.includes("SUBMIT");
  }).length;

  const stats = [
    {
      id: "total",
      label: "Total Manuscripts",
      value: totalPapers,
      subtext: "All registered submissions",
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-slate-200/90 hover:border-indigo-300",
      tab: "Manuscripts",
    },
    {
      id: "new",
      label: "New Submissions",
      value: newSubmissionsCount,
      subtext: "Awaiting initial editorial check",
      icon: Layers,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-slate-200/90 hover:border-blue-300",
      tab: "Manuscripts",
    },
    {
      id: "review",
      label: "Under Peer Review",
      value: underReviewCount,
      subtext: "Assigned to reviewers",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-slate-200/90 hover:border-amber-300",
      tab: "Manuscripts",
    },
    {
      id: "accepted",
      label: "Accepted Papers",
      value: acceptedCount,
      subtext: "Ready for publication & DOI",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-slate-200/90 hover:border-emerald-300",
      tab: "Manuscripts",
    },
    {
      id: "published",
      label: "Published Catalog",
      value: publishedCount,
      subtext: "Live online with DOI",
      icon: Sparkles,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-slate-200/90 hover:border-purple-300",
      tab: "Manuscripts",
    },
    {
      id: "database",
      label: "PostgreSQL & Cloudinary",
      value: "100% Live",
      subtext: "API Gateway Operational",
      icon: Database,
      color: "text-teal-600",
      bg: "bg-teal-50",
      border: "border-slate-200/90 hover:border-teal-300",
      tab: "Settings",
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
            className={`bg-white rounded-2xl border ${s.border} p-4.5 flex flex-col justify-between shadow-xs hover:shadow-sm transition-all cursor-pointer group`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl ${s.bg} ${s.color} transition-transform group-hover:scale-105`}>
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
