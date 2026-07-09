import React from "react";
import { Trophy, Medal, Award, MoreHorizontal } from "lucide-react";

const tiers = [
  { icon: Trophy, label: "Gold", value: 28, bg: "bg-amber-100", color: "text-amber-500" },
  { icon: Medal, label: "Silver", value: 45, bg: "bg-slate-200", color: "text-slate-500" },
  { icon: Award, label: "Bronze", value: 36, bg: "bg-orange-100", color: "text-orange-500" },
  { icon: MoreHorizontal, label: "Others", value: 19, bg: "bg-indigo-100", color: "text-indigo-500" },
];

export default function AchievementOverview() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">Achievement Overview</h3>
        <a href="#" className="text-xs font-semibold text-indigo-600 hover:underline">
          View All →
        </a>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 text-center mb-5">
        <p className="text-xs font-semibold text-slate-500">Total Achievements</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">128</p>
        <p className="text-[11px] text-slate-400">This Year (2026)</p>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        {tiers.map((t) => (
          <div key={t.label}>
            <div
              className={`h-12 w-12 mx-auto rounded-full flex items-center justify-center ${t.bg}`}
            >
              <t.icon size={20} className={t.color} />
            </div>
            <p className="text-sm font-bold text-slate-800 mt-2">{t.value}</p>
            <p className="text-[11px] text-slate-400">{t.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
