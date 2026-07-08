import React from "react";
import DonutChartCard from "./DonutChartCard";

const data = [
  { name: "New Submission", value: 512, percent: "21.7%", color: "#4f46e5" },
  { name: "Under Review", value: 1145, percent: "48.6%", color: "#f59e0b" },
  { name: "Awaiting Decision", value: 398, percent: "16.9%", color: "#a855f7" },
  { name: "Accepted", value: 184, percent: "7.8%", color: "#10b981" },
  { name: "Rejected", value: 117, percent: "5.0%", color: "#ef4444" },
];

export default function ManuscriptSummary() {
  return (
    <DonutChartCard
      title="Manuscript Summary"
      filterLabel="This Year (2026)"
      total="2,356"
      totalLabel="Total"
      data={data}
    />
  );
}
