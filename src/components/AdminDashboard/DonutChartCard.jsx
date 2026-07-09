import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

/**
 * Generic donut-chart card used for "Manuscript Summary" and
 * "User Roles Distribution".
 *
 * props:
 *  - title: string
 *  - filterLabel: string (e.g. "This Year (2026)")
 *  - total: string | number
 *  - totalLabel: string (e.g. "Total" / "Total Users")
 *  - data: [{ name, value, percent, color }]
 */
export default function DonutChartCard({ title, filterLabel, total, totalLabel, data }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-800">{title}</h3>
        {filterLabel && (
          <button className="text-xs font-medium text-slate-500 border border-slate-200 rounded-lg px-2.5 py-1 flex items-center gap-1">
            {filterLabel}
            <span className="text-slate-400">▾</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative h-40 w-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-lg font-bold text-slate-800">{total}</p>
            <p className="text-[11px] text-slate-400">{totalLabel}</p>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-600">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: d.color }}
                />
                {d.name}
              </span>
              <span className="font-semibold text-slate-700">
                {d.value} ({d.percent})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
