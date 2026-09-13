import React from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  Activity,
  Award,
} from "lucide-react";

export default function RecentActivity({ papers = [] }) {
  const activities = [
    {
      id: 1,
      title: "Assigned: Forensic DNA Analysis Using NGS",
      type: "assigned",
      time: "2 hours ago",
      icon: FileText,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      desc: "Editorial board assigned manuscript FP-2026-1056 for peer review.",
    },
    {
      id: 2,
      title: "Review Submitted: Ballistic Evidence Examination",
      type: "submitted",
      time: "1 day ago",
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      desc: "Recommended Accept with Minor Revisions (Score: 8.8/10).",
    },
    {
      id: 3,
      title: "Deadline Reminder: Forensic Entomology Review",
      type: "reminder",
      time: "2 days ago",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      desc: "Evaluation report due in 3 days (Target: 18 June 2026).",
    },
    {
      id: 4,
      title: "Editorial Commendation: Gold Reviewer Tier",
      type: "award",
      time: "5 days ago",
      icon: Award,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      desc: "Recognized by Editor-in-Chief for 100% on-time review rate.",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm font-bold font-serif text-slate-900 flex items-center gap-2">
          <Activity size={16} className="text-indigo-600" />
          <span>Recent Review Activity & Milestones</span>
        </h3>
        <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
          Live Log
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start gap-3"
            >
              <div
                className={`p-2 rounded-xl border shrink-0 ${act.color} shadow-2xs`}
              >
                <Icon size={16} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-xs text-slate-900 truncate">
                    {act.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {act.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
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