import React from "react";
import { User } from "lucide-react";

const leaders = [
  { rank: 1, name: "Mr.Indresh", pts: "2,450 pts", rankBg: "bg-amber-400" },
  { rank: 2, name: "Mr.Indresh", pts: "2,120 pts", rankBg: "bg-slate-300" },
  { rank: 3, name: "Mr.Indresh", pts: "1,980 pts", rankBg: "bg-orange-400" },
  { rank: 4, name: "Mr.Indresh", pts: "1,645 pts", rankBg: "bg-indigo-200" },
  { rank: 5, name: "Mr.Indresh", pts: "1,320 pts", rankBg: "bg-indigo-200" },
];

export default function AchievementsLeaderboard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">Achievements Leaderboard</h3>
        <a href="#" className="text-xs font-semibold text-indigo-600 hover:underline">
          View All →
        </a>
      </div>

      <div className="space-y-3">
        {leaders.map((l) => (
          <div key={l.rank} className="flex items-center gap-3">
            <span
              className={`h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 ${l.rankBg}`}
            >
              {l.rank}
            </span>
            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
              <User size={14} className="text-slate-400" />
            </div>
            <span className="text-sm text-slate-700 flex-1">{l.name}</span>
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
              {l.pts}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
