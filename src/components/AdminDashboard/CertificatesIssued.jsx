import React from "react";
import { GraduationCap } from "lucide-react";

const topTypes = [
  { name: "Reviewer Excellence", count: 98 },
  { name: "Editorial Excellence", count: 65 },
  { name: "Outstanding Contribution", count: 47 },
  { name: "Best Paper Award", count: 32 },
  { name: "Rising Researcher", count: 14 },
];

export default function CertificatesIssued() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">Certificates Issued</h3>
        <a href="#" className="text-xs font-semibold text-indigo-600 hover:underline">
          View All →
        </a>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3 mb-4">
        <div className="h-11 w-11 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
          <GraduationCap size={20} className="text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800 leading-tight">256</p>
          <p className="text-xs font-medium text-slate-500">Certificates Issued</p>
          <p className="text-[11px] text-slate-400">This Year (2026)</p>
        </div>
      </div>

      <p className="text-xs font-semibold text-slate-500 mb-2">Top Certificates Types</p>
      <div className="space-y-2.5">
        {topTypes.map((t) => (
          <div key={t.name} className="flex items-center justify-between text-xs">
            <span className="text-slate-600">{t.name}</span>
            <span className="font-semibold text-slate-700">{t.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
