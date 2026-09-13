import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Star,
  ExternalLink,
} from "lucide-react";

export default function ReviewCalendar({
  papers = [],
  onOpenReviewModal = () => {},
  onNavigateTab = () => {},
}) {
  const [selectedDay, setSelectedDay] = useState(18);

  const daysInMonth = 30;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Marked deadlines
  const dueDates = {
    8: { status: "completed", title: "Ballistic Evidence Examination", id: "FP-2026-1053" },
    15: { status: "completed", title: "Forensic DNA Analysis", id: "FP-2026-1025" },
    18: { status: "due-soon", title: "Forensic Entomology Review", id: "FP-2026-1024" },
    22: { status: "due-soon", title: "Fingerprint Analysis Using Deep Learning", id: "FP-2026-1054" },
    28: { status: "normal", title: "Digital Forensics in Cyber Crime", id: "FP-2026-1052" },
  };

  const getDayStyle = (day) => {
    const isSelected = selectedDay === day;
    const deadline = dueDates[day];

    let base = "h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all cursor-pointer relative ";

    if (isSelected) {
      return base + "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105";
    }

    if (deadline) {
      if (deadline.status === "completed") {
        return base + "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100";
      }
      if (deadline.status === "due-soon") {
        return base + "bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100 font-extrabold";
      }
      return base + "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100";
    }

    return base + "text-slate-600 hover:bg-slate-100";
  };

  const currentSelection = dueDates[selectedDay];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
            <CalendarIcon size={18} className="text-indigo-600" />
            <span>Review Deadlines & Milestone Schedules</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor assigned manuscript due dates and submission timeframes.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
          <span>June 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px] font-extrabold text-slate-400 uppercase">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center">
            {daysArray.map((day) => {
              const deadline = dueDates[day];
              return (
                <div key={day} className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={getDayStyle(day)}
                  >
                    <span>{day}</span>
                    {deadline && selectedDay !== day && (
                      <span
                        className={`absolute bottom-1 h-1 w-1 rounded-full ${
                          deadline.status === "completed"
                            ? "bg-emerald-500"
                            : deadline.status === "due-soon"
                            ? "bg-amber-500"
                            : "bg-indigo-500"
                        }`}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Status Legend */}
          <div className="flex items-center justify-center gap-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-600 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
              <span>Due Soon (Priority)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
              <span>Upcoming SLA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <span>Completed Report</span>
            </div>
          </div>
        </div>

        {/* Selected Day / Upcoming Timeline Sidebar */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200/90 p-4.5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 font-mono">
                Date Details: {selectedDay} June 2026
              </h4>
              {currentSelection && (
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                    currentSelection.status === "completed"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                      : "bg-amber-100 text-amber-800 border-amber-200"
                  }`}
                >
                  {currentSelection.status === "completed" ? "Completed" : "Action Due"}
                </span>
              )}
            </div>

            {currentSelection ? (
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {currentSelection.id}
                </span>
                <p className="font-bold text-xs sm:text-sm text-slate-900 leading-snug font-serif">
                  {currentSelection.title}
                </p>
                <p className="text-[11px] text-slate-500">
                  Target Review Deadline: <span className="font-semibold text-slate-700">{selectedDay} June 2026</span>
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onOpenReviewModal({ id: currentSelection.id, title: currentSelection.title })}
                    className="w-full px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg text-xs shadow-xs hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Star size={12} />
                    <span>Evaluate Manuscript</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-slate-400 space-y-1">
                <Clock size={24} className="mx-auto text-slate-300" />
                <p className="text-xs font-bold text-slate-600">No review deadline on this day.</p>
                <p className="text-[10px]">Select a highlighted date to view scheduled milestones.</p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-600">
              <span>Reviewer On-Time Rate:</span>
              <span className="font-extrabold text-emerald-600">100% (Gold Tier)</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Standard Review SLA:</span>
              <span className="font-bold text-slate-800">14 Calendar Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}