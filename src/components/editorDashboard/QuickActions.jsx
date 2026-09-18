import React from "react";
import {
  FileStack,
  Clock,
  FileText,
  Megaphone,
  Database,
  ScrollText,
  Mail,
  Sparkles,
} from "lucide-react";
import { publisherApi } from "../../api/publisherApi";
import toast from "react-hot-toast";

export default function QuickActions({ onNavigateTab = () => {}, onRefreshData = () => {} }) {
  const handleSeedDemo = async () => {
    try {
      toast.loading("Generating demo research papers...", { id: "seed" });
      await publisherApi.seedDemoData();
      toast.success("Demo manuscripts & journal issues seeded successfully!", { id: "seed" });
      onRefreshData();
    } catch (e) {
      toast.error("Failed to seed demo data", { id: "seed" });
    }
  };

  const actions = [
    {
      icon: FileStack,
      label: "Evaluate Submissions Queue",
      desc: "Perform initial editorial check",
      color: "text-indigo-600",
      bg: "bg-indigo-50 hover:bg-indigo-100",
      border: "border-indigo-100",
      onClick: () => onNavigateTab("Manuscripts"),
    },
    {
      icon: Clock,
      label: "Peer Review & Decisions",
      desc: "Review reviewer feedback & decide",
      color: "text-amber-600",
      bg: "bg-amber-50 hover:bg-amber-100",
      border: "border-amber-100",
      onClick: () => onNavigateTab("Decisions"),
    },
    {
      icon: FileText,
      label: "Moderate Editorial Blogs",
      desc: "Approve, edit or restrict articles",
      color: "text-purple-600",
      bg: "bg-purple-50 hover:bg-purple-100",
      border: "border-purple-100",
      onClick: () => onNavigateTab("Blog"),
    },
    {
      icon: Megaphone,
      label: "Broadcast Call for Papers",
      desc: "Announce notices to authors",
      color: "text-blue-600",
      bg: "bg-blue-50 hover:bg-blue-100",
      border: "border-blue-100",
      onClick: () => onNavigateTab("Announcements"),
    },
    {
      icon: Database,
      label: "Seed Sample Manuscripts",
      desc: "Populate test papers with DOC/PDF",
      color: "text-teal-600",
      bg: "bg-teal-50 hover:bg-teal-100",
      border: "border-teal-100",
      onClick: handleSeedDemo,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Quick Editorial Actions
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Instant shortcuts for peer review management & editorial workflow.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              onClick={a.onClick}
              className={`p-3.5 rounded-xl border ${a.border} ${a.bg} text-left transition-all hover:shadow-xs cursor-pointer flex flex-col justify-between`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg bg-white shadow-xs ${a.color} shrink-0`}>
                  <Icon size={16} />
                </div>
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {a.label}
                </span>
              </div>

              <p className="text-[11px] text-slate-500 mt-2.5 leading-snug">
                {a.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}