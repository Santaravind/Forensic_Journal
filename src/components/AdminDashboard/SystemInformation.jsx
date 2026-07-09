import React from "react";
import { CheckCircle2 } from "lucide-react";

const info = [
  { label: "System Version", value: "3.2.1" },
  { label: "PHP Version", value: "8.2.12" },
  { label: "Database", value: "MySQL 8.0.36" },
  { label: "Server", value: "Ubuntu 22.04 LTS" },
  { label: "Last Backup", value: "17 May 2026, 02:00 AM" },
  { label: "Total Size", value: "256.4 GB" },
  { label: "Uptime", value: "45 Days, 12 Hours" },
];

export default function SystemInformation() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <h3 className="font-bold text-slate-800 mb-4">System Information</h3>
      <div className="space-y-2.5">
        {info.map((i) => (
          <div key={i.label} className="flex items-center justify-between text-xs">
            <span className="text-slate-500">{i.label}</span>
            <span className="font-semibold text-slate-700">{i.value}</span>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-lg py-2.5 border border-emerald-100">
        <CheckCircle2 size={14} />
        System Healthy
      </button>
    </div>
  );
}
