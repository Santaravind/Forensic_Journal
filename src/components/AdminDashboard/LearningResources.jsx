import React from "react";
import { BookOpenCheck } from "lucide-react";

const popular = [
  { name: "Research Ethics in Forensic Science", views: "1,245 Views" },
  { name: "How to Write a Good Research Paper", views: "987 Views" },
  { name: "Understanding Peer Review Process", views: "876 Views" },
  { name: "Plagiarism and Academic Integrity", views: "765 Views" },
  { name: "Referencing Styles Guide", views: "654 Views" },
];

export default function LearningResources() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">Learning Resources</h3>
        <a href="#" className="text-xs font-semibold text-indigo-600 hover:underline">
          View All →
        </a>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3 mb-4">
        <div>
          <p className="text-xs font-semibold text-slate-500">Total Resources</p>
          <p className="text-2xl font-bold text-slate-800 leading-tight">86</p>
          <p className="text-[11px] text-slate-400">Across 12 Categories</p>
        </div>
        <div className="h-11 w-11 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 ml-auto">
          <BookOpenCheck size={20} className="text-white" />
        </div>
      </div>

      <p className="text-xs font-semibold text-slate-500 mb-2">Popular Resources</p>
      <div className="space-y-2.5">
        {popular.map((p) => (
          <div key={p.name} className="flex items-center justify-between text-xs gap-3">
            <span className="text-slate-600 truncate">{p.name}</span>
            <span className="font-semibold text-slate-400 whitespace-nowrap">{p.views}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
