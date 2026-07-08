import React from "react";
import DonutChartCard from "./DonutChartCard";

const data = [
  { name: "Authors", value: 623, percent: "49.7%", color: "#4f46e5" },
  { name: "Reviewers", value: 312, percent: "24.9%", color: "#f59e0b" },
  { name: "Editors", value: 158, percent: "12.6%", color: "#a855f7" },
  { name: "Publishers", value: 98, percent: "7.8%", color: "#10b981" },
  { name: "Readers", value: 62, percent: "5.0%", color: "#ef4444" },
];

export default function UserRolesDistribution() {
  return (
    <DonutChartCard
      title="User Roles Distribution"
      total="1,253"
      totalLabel="Total Users"
      data={data}
    />
  );
}
