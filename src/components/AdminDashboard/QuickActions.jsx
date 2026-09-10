import React from "react";
import {
  Plus,
  BookPlus,
  Megaphone,
  FileStack,
  FileText,
  Mail,
  Sparkles,
  Database,
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
      label: "Review Manuscripts Queue",
      desc: "Examine incoming papers",
      color: "text-indigo-600",
      bg: "bg-indigo-50 hover:bg-indigo-100",
      border: "border-indigo-100",
      onClick: () => onNavigateTab("Manuscripts"),
    },
    {
      icon: FileText,
      label: "Moderate Editorial Blogs",
      desc: "Approve or restrict articles",
      color: "text-purple-600",
      bg: "bg-purple-50 hover:bg-purple-100",
      border: "border-purple-100",
      onClick: () => onNavigateTab("Blog"),
    },
    {
      icon: BookPlus,
      label: "Manage Journals & Issues",
      desc: "Configure volumes & ISSN",
      color: "text-emerald-600",
      bg: "bg-emerald-50 hover:bg-emerald-100",
      border: "border-emerald-100",
      onClick: () => onNavigateTab("Journals"),
    },
    {
      icon: Megaphone,
      label: "Broadcast Notice",
      desc: "Announce to authors & readers",
      color: "text-amber-600",
      bg: "bg-amber-50 hover:bg-amber-100",
      border: "border-amber-100",
      onClick: () => onNavigateTab("Announcements"),
    },
    {
      icon: Database,
      label: "Seed Sample Manuscripts",
      desc: "Populate test papers with DOC/PDF",
      color: "text-sky-600",
      bg: "bg-sky-50 hover:bg-sky-100",
      border: "border-sky-100",
      onClick: handleSeedDemo,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Quick Administrative Actions
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Instant shortcuts for common editorial & publishing operations.
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
