import React from "react";
import {
  FileText,
  Star,
  BookOpen,
  Download,
  Mail,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";

export default function QuickActions({
  onNavigateTab = () => {},
  onRefreshData = () => {},
  onOpenNextReview = () => {},
}) {
  const downloadTemplate = () => {
    const templateContent = `
FORENSIC PATRIKA — OFFICIAL PEER REVIEW TEMPLATE
==================================================
Manuscript ID: [FP-2026-XXXX]
Reviewer Evaluation Report

1. QUANTITATIVE SCORING (1 to 10):
- Originality & Novelty: [ /10]
- Methodological Rigor: [ /10]
- Clarity & Organization: [ /10]
- Literature & Citations: [ /10]
- Forensic Impact: [ /10]

2. RECOMMENDATION (Check one):
[ ] Accept As Is
[ ] Accept with Minor Revisions
[ ] Major Revisions Required
[ ] Reject Manuscript

3. COMMENTS FOR THE AUTHOR:
(Include detailed observations on abstract, methodology, results, discussion, and forensic soundness)

4. CONFIDENTIAL COMMENTS FOR THE EDITOR-IN-CHIEF:
(Disclose any conflicts of interest, ethical concerns, or priority assessment)
==================================================
    `.trim();

    const blob = new Blob([templateContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Forensic_Patrika_Reviewer_Evaluation_Form.txt";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded official reviewer evaluation form template!");
  };

  const actions = [
    {
      id: "evaluate",
      title: "Evaluate Next Due Paper",
      desc: "Score priority manuscript and submit review report",
      icon: Star,
      bg: "bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white",
      border: "border-slate-200/90 hover:border-indigo-300",
      action: () => onNavigateTab("Pending"),
    },
    {
      id: "guidelines",
      title: "Reviewer Rubric & Ethics",
      desc: "Inspect scoring criteria, COPE ethical standards, and AI rules",
      icon: BookOpen,
      bg: "bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white",
      border: "border-slate-200/90 hover:border-purple-300",
      action: () => onNavigateTab("Guidelines"),
    },
    {
      id: "download",
      title: "Download Review Template",
      desc: "Official offline scoring and critique template file",
      icon: Download,
      bg: "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white",
      border: "border-slate-200/90 hover:border-emerald-300",
      action: downloadTemplate,
    },
    {
      id: "calendar",
      title: "Check Due Deadlines",
      desc: "View upcoming manuscript submission milestones",
      icon: Calendar,
      bg: "bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white",
      border: "border-slate-200/90 hover:border-blue-300",
      action: () => onNavigateTab("Calendar"),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div>
          <h3 className="text-sm sm:text-base font-bold font-serif text-slate-900 flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-600" />
            <span>Fast Reviewer Shortcuts</span>
          </h3>
          <p className="text-xs text-slate-500">
            One-click operational triggers for common peer review actions.
          </p>
        </div>

        <button
          onClick={onRefreshData}
          title="Refresh Review Data"
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer border border-slate-200/90"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              onClick={act.action}
              className={`p-3.5 rounded-2xl border ${act.border} hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between space-y-3 bg-white`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`p-2.5 rounded-xl ${act.bg} transition-all duration-200 shadow-2xs group-hover:scale-110`}
                >
                  <Icon size={18} />
                </div>
                <ArrowRight
                  size={14}
                  className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"
                />
              </div>

              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                  {act.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {act.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}