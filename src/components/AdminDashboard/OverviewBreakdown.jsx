import React from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  Sparkles,
  XCircle,
  TrendingUp,
  FileStack,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function OverviewBreakdown({
  papers = [],
  loading = false,
  onNavigateTab = () => {},
}) {
  const total = papers.length || 0;

  const newSubmissions = papers.filter((p) => {
    const s = (p.status || "").toUpperCase();
    return s.includes("NEW") || s.includes("SUBMIT");
  }).length;

  const underReview = papers.filter((p) => {
    const s = (p.status || "").toUpperCase();
    return s.includes("REVIEW");
  }).length;

  const accepted = papers.filter((p) => {
    const s = (p.status || "").toUpperCase();
    return s.includes("ACCEPT");
  }).length;

  const published = papers.filter((p) => {
    const s = (p.status || "").toUpperCase();
    return s.includes("PUBLISH");
  }).length;

  const rejected = papers.filter((p) => {
    const s = (p.status || "").toUpperCase();
    return s.includes("REJECT");
  }).length;

  const awaitingDecision = papers.filter((p) => {
    const s = (p.status || "").toUpperCase();
    return s.includes("AWAIT") || s.includes("REVIS");
  }).length;

  const getPercent = (count) => {
    if (!total) return 0;
    return Math.round((count / total) * 100);
  };

  const statusList = [
    {
      label: "New Submissions",
      count: newSubmissions,
      percent: getPercent(newSubmissions),
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: FileText,
      hint: "Pending editor assignment",
    },
    {
      label: "Under Review",
      count: underReview,
      percent: getPercent(underReview),
      color: "bg-amber-500",
      textColor: "text-amber-600",
      bgLight: "bg-amber-50",
      borderColor: "border-amber-200",
      icon: Clock,
      hint: "In peer-review workflow",
    },
    {
      label: "Accepted for Publication",
      count: accepted,
      percent: getPercent(accepted),
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      bgLight: "bg-emerald-50",
      borderColor: "border-emerald-200",
      icon: CheckCircle2,
      hint: "Ready for DOI & issue assignment",
    },
    {
      label: "Published in Catalog",
      count: published,
      percent: getPercent(published),
      color: "bg-purple-500",
      textColor: "text-purple-600",
      bgLight: "bg-purple-50",
      borderColor: "border-purple-200",
      icon: Sparkles,
      hint: "Live with registered DOI",
    },
    {
      label: "Awaiting Revision",
      count: awaitingDecision,
      percent: getPercent(awaitingDecision),
      color: "bg-indigo-500",
      textColor: "text-indigo-600",
      bgLight: "bg-indigo-50",
      borderColor: "border-indigo-200",
      icon: Layers,
      hint: "Author revisions requested",
    },
    {
      label: "Rejected / Closed",
      count: rejected,
      percent: getPercent(rejected),
      color: "bg-rose-500",
      textColor: "text-rose-600",
      bgLight: "bg-rose-50",
      borderColor: "border-rose-200",
      icon: XCircle,
      hint: "Not accepted for publication",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">
              Manuscript Pipeline & Status Distribution
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              Live DB
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time breakdown of all {total} manuscript submissions currently in the system.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab("Manuscripts")}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-colors self-start sm:self-auto cursor-pointer"
        >
          <span>Open Full Queue</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Segmented Visual Multi-Bar */}
      <div className="mt-5 space-y-2">
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
          {total > 0 ? (
            statusList.map(
              (item) =>
                item.count > 0 && (
                  <div
                    key={item.label}
                    style={{ width: `${item.percent}%` }}
                    className={`${item.color} h-full transition-all duration-500`}
                    title={`${item.label}: ${item.count} (${item.percent}%)`}
                  />
                )
            )
          ) : (
            <div className="w-full h-full bg-slate-200 animate-pulse" />
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-0.5">
          <span>0 Submissions</span>
          <span>{total} Total Active Manuscripts in Registry</span>
        </div>
      </div>

      {/* Status Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-5">
        {statusList.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`p-3.5 rounded-xl border ${item.borderColor} ${item.bgLight} flex flex-col justify-between transition-all hover:shadow-xs`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg bg-white shadow-xs ${item.textColor}`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {item.label}
                  </span>
                </div>
                <span className={`text-base font-extrabold ${item.textColor}`}>
                  {item.count}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium truncate max-w-[150px]">
                  {item.hint}
                </span>
                <span className="font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200/60 shadow-2xs">
                  {item.percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
