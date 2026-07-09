import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", submissions: 12000, publications: 4000 },
  { month: "Feb", submissions: 18000, publications: 9000 },
  { month: "Mar", submissions: 15000, publications: 12000 },
  { month: "Apr", submissions: 25000, publications: 14000 },
  { month: "May", submissions: 22000, publications: 20000 },
  { month: "Jun", submissions: 32000, publications: 21000 },
];

export default function MonthlyActivityOverview() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">Monthly Activity Overview</h3>
        <button className="text-xs font-medium text-slate-500 border border-slate-200 rounded-lg px-2.5 py-1 flex items-center gap-1">
          This Year (2026) <span className="text-slate-400">▾</span>
        </button>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#eef1f6" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `${v / 1000}K`}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(v) => v.toLocaleString()}
              contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="submissions"
              stroke="#4f46e5"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#4f46e5" }}
            />
            <Line
              type="monotone"
              dataKey="publications"
              stroke="#a855f7"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#a855f7" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-5 mt-2 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-indigo-600" /> Submissions
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-purple-500" /> Publications
        </span>
      </div>
    </div>
  );
}
