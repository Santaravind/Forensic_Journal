import React from "react";
import { UserCog, UserCheck, Building2, BookOpen } from "lucide-react";
import ManagementCard from "./ManagementCard";

const cards = [
  {
    icon: UserCog,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    title: "Editors Management",
    totalLabel: "Total Editors",
    totalValue: 158,
    rows: [
      { label: "Active Editors", value: 142, color: "text-emerald-600" },
      { label: "Pending Requests", value: 8, color: "text-amber-500" },
      { label: "Inactive Editors", value: 8, color: "text-slate-400" },
    ],
    manageLabel: "Manage Editors",
  },
  {
    icon: UserCheck,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    title: "Reviewers Management",
    totalLabel: "Total Reviewers",
    totalValue: 312,
    rows: [
      { label: "Active Reviewers", value: 285, color: "text-emerald-600" },
      { label: "Pending Requests", value: 15, color: "text-amber-500" },
      { label: "Inactive Reviewers", value: 12, color: "text-slate-400" },
    ],
    manageLabel: "Manage Reviewers",
  },
  {
    icon: Building2,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    title: "Publishers Management",
    totalLabel: "Total Publishers",
    totalValue: 98,
    rows: [
      { label: "Active Publishers", value: 92, color: "text-emerald-600" },
      { label: "Pending Requests", value: 4, color: "text-amber-500" },
      { label: "Inactive Publishers", value: 2, color: "text-slate-400" },
    ],
    manageLabel: "Manage Publishers",
  },
  {
    icon: BookOpen,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-500",
    title: "Journals Management",
    totalLabel: "Total Journals",
    totalValue: 24,
    rows: [
      { label: "Active Journals", value: 22, color: "text-emerald-600" },
      { label: "Inactive Journals", value: 2, color: "text-slate-400" },
      { label: "Pending Approval", value: 0, color: "text-slate-400" },
    ],
    manageLabel: "Manage Journals",
  },
];

export default function ManagementSection() {
  return (
    <>
      {cards.map((c) => (
        <ManagementCard key={c.title} {...c} />
      ))}
    </>
  );
}
