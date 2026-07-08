import React from "react";

/**
 * props:
 *  - icon, iconBg, iconColor
 *  - title (e.g. "Editors Management")
 *  - totalLabel (e.g. "Total Editors")
 *  - totalValue (e.g. 158)
 *  - rows: [{ label, value, color }]
 *  - manageLabel (e.g. "Manage Editors")
 */
export default function ManagementCard({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  totalLabel,
  totalValue,
  rows,
  manageLabel,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col">
      <h3 className="font-bold text-slate-800 mb-3">{title}</h3>

      <div className="flex items-center gap-3 mb-4">
        <div
          className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
        >
          <Icon size={18} className={iconColor} />
        </div>
        <div>
          <p className="text-xl font-bold text-slate-800 leading-tight">{totalValue}</p>
          <p className="text-xs text-slate-400">{totalLabel}</p>
        </div>
      </div>

      <div className="space-y-2.5 flex-1">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-xs">
            <span className="text-slate-500">{r.label}</span>
            <span className={`font-semibold ${r.color || "text-slate-700"}`}>{r.value}</span>
          </div>
        ))}
      </div>

      <a
        href="#"
        className="text-xs font-semibold text-indigo-600 hover:underline mt-4 inline-flex items-center gap-1"
      >
        {manageLabel} →
      </a>
    </div>
  );
}
