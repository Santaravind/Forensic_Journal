import React from "react";
import {
  UserPlus,
  BookPlus,
  Send,
  UserCheck,
  BellRing,
  Award,
  GraduationCap,
  Trophy,
} from "lucide-react";

const actions = [
  { icon: UserPlus, label: "Add New User", color: "text-indigo-600", bg: "bg-indigo-50" },
  { icon: BookPlus, label: "Add New Journal", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Send, label: "Publish New Issue", color: "text-sky-600", bg: "bg-sky-50" },
  { icon: UserCheck, label: "Assign Reviewer", color: "text-violet-600", bg: "bg-violet-50" },
  { icon: BellRing, label: "Send Notification", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Award, label: "Issue Certificate", color: "text-red-500", bg: "bg-red-50" },
  { icon: GraduationCap, label: "Add Learning Resource", color: "text-teal-600", bg: "bg-teal-50" },
  { icon: Trophy, label: "View Achievements", color: "text-fuchsia-600", bg: "bg-fuchsia-50" },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <button
            key={a.label}
            className="flex items-center gap-2.5 border border-slate-200 rounded-xl px-3 py-3 hover:border-indigo-300 hover:bg-indigo-50/40 transition-colors text-left"
          >
            <div
              className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${a.bg}`}
            >
              <a.icon size={16} className={a.color} />
            </div>
            <span className="text-xs font-semibold text-slate-700 leading-tight">
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
