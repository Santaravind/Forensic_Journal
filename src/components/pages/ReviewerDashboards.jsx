import React, { useState, useEffect } from "react";
import Sidebar from "../reviewerDashboard/Sidebar";
import Header from "../reviewerDashboard/Header";
import StatsRow from "../reviewerDashboard/StatsRow";
import ManuscriptTable from "../reviewerDashboard/ManuscriptTable";
import QuickActions from "../reviewerDashboard/QuickActions";
import RecentActivity from "../reviewerDashboard/RecentActivity";
import ReviewCalendar from "../reviewerDashboard/ReviewCalender";
import ReviewerGuidelines from "../reviewerDashboard/ReviewerGuidelines";
import {
  LayoutDashboard,
  FileStack,
  Clock,
  CheckCircle2,
  Calendar,
  BookOpen,
  Sparkles,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import {
  researchPaperApi,
  publisherApi,
  normalizePaper,
  extractPaperList,
} from "../../api/publisherApi";

// Realistic fallback peer-review manuscripts if backend returns empty
const DEFAULT_REVIEWER_PAPERS = [
  {
    id: "FP-2026-1056",
    submissionId: "FP-2026-1056",
    title: "Advancements in Forensic DNA Analysis Using Next-Generation Sequencing",
    author: "Dr. Ananya Sharma",
    authorEmail: "ananya.sharma@nfsu.ac.in",
    university: "National Forensic Sciences University, Gandhinagar",
    submittedAt: "15 May 2026",
    status: "Under Review",
    rawStatus: "UNDER_REVIEW",
    researchArea: "Forensic Genetics & DNA",
    abstract: "Evaluation of high-throughput massively parallel sequencing for challenging degraded human skeletal remains and complex mixed STR profile resolution.",
    keywords: ["Forensic DNA", "NGS", "STR Typing", "Degraded Skeletal Remains"],
    fileUrl: "",
  },
  {
    id: "FP-2026-1055",
    submissionId: "FP-2026-1055",
    title: "Forensic Entomology: Succession Patterns of Necrophagous Diptera in Arid Regions",
    author: "Prof. Rajesh Verma",
    authorEmail: "r.verma@du.ac.in",
    university: "University of Delhi",
    submittedAt: "12 May 2026",
    status: "Under Review",
    rawStatus: "UNDER_REVIEW",
    researchArea: "Forensic Toxicology & Entomology",
    abstract: "Post-Mortem Interval (PMI) determination in North-Western Indian desert climates based on larval developmental rates of Chrysomya albiceps.",
    keywords: ["Entomology", "PMI", "Chrysomya albiceps", "Forensic Taphoromy"],
    fileUrl: "",
  },
  {
    id: "FP-2026-1054",
    submissionId: "FP-2026-1054",
    title: "Latent Fingerprint Enhancement and Matching Using Deep Convolutional Networks",
    author: "Siddharth Mehta",
    authorEmail: "siddharth.m@iitkgp.ac.in",
    university: "Indian Institute of Technology Kharagpur",
    submittedAt: "10 May 2026",
    status: "New Submission",
    rawStatus: "NEW_SUBMISSION",
    researchArea: "Digital & Pattern Evidence",
    abstract: "Deep residual neural networks for automated minutiae feature extraction from smudged, overlapping, and partial latent friction ridge patterns on non-porous surfaces.",
    keywords: ["Fingerprint AI", "Deep Learning", "Minutiae Extraction", "Pattern Recognition"],
    fileUrl: "",
  },
  {
    id: "FP-2026-1053",
    submissionId: "FP-2026-1053",
    title: "Microscopic Striation Mark Comparison on 9mm Fired Cartridge Cases",
    author: "Virendra Singh",
    authorEmail: "virendra.singh@cfsl.gov.in",
    university: "Central Forensic Science Laboratory, Chandigarh",
    submittedAt: "08 May 2026",
    status: "Accepted",
    rawStatus: "ACCEPTED",
    researchArea: "Ballistics & Firearms",
    abstract: "Automated 3D optical profilometry for quantitative comparison of breech face and firing pin impression signatures on brass cartridge casings.",
    keywords: ["Ballistics", "Striation Analysis", "3D Profilometry", "CFSL"],
    fileUrl: "",
  },
  {
    id: "FP-2026-1052",
    submissionId: "FP-2026-1052",
    title: "Memory Forensics and Volatile Artifact Extraction in Encrypted Ransomware Incidents",
    author: "Pooja Hegde",
    authorEmail: "pooja.hegde@iiitb.ac.in",
    university: "International Institute of Information Technology Bangalore",
    submittedAt: "05 May 2026",
    status: "Awaiting Decision",
    rawStatus: "REVISION_REQUIRED",
    researchArea: "Cyber Forensics & Incident Response",
    abstract: "Novel memory acquisition techniques bypassing kernel-level evasion hooks to recover ephemeral cryptographic keys in modern ransomware variants.",
    keywords: ["Cyber Forensics", "Memory Forensics", "Ransomware", "RAM Dump"],
    fileUrl: "",
  },
];

export default function ReviewerDashboards() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [papers, setPapers] = useState(DEFAULT_REVIEWER_PAPERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAssignedPapers();

    const handleUpdate = () => {
      loadAssignedPapers();
    };

    window.addEventListener("paperStatusUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("paperStatusUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const loadAssignedPapers = async () => {
    try {
      setLoading(true);
      const allPapers = await researchPaperApi.getAllPapers();
      if (allPapers && allPapers.length > 0) {
        // Merge with default seed papers so reviewer always has rich initial context plus all submitted papers
        const submittedIds = new Set(allPapers.map((p) => p.submissionId || p.id));
        const nonDuplicateDefaults = DEFAULT_REVIEWER_PAPERS.filter(
          (dp) => !submittedIds.has(dp.submissionId || dp.id)
        );
        setPapers([...allPapers, ...nonDuplicateDefaults]);
      } else {
        setPapers(DEFAULT_REVIEWER_PAPERS);
      }
    } catch (err) {
      console.warn("Could not fetch live papers from backend queue, using peer-review dataset:", err);
      setPapers(DEFAULT_REVIEWER_PAPERS);
    } finally {
      setLoading(false);
    }
  };

  const pendingCount = papers.filter((p) => {
    const s = (p.status || p.rawStatus || "").toUpperCase();
    return (
      s.includes("NEW") ||
      s.includes("SUBMIT") ||
      s.includes("PENDING") ||
      (s.includes("REVIEW") && !s.includes("COMPLET"))
    );
  }).length;

  const completedCount = papers.filter((p) => {
    const s = (p.status || p.rawStatus || "").toUpperCase();
    return s.includes("ACCEPT") || s.includes("COMPLET") || s.includes("PUBLISH");
  }).length;

  return (
    <div className="min-h-screen w-full bg-slate-100 flex font-sans">
      {/* Sleek Dark Dynamic Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        assignedCount={papers.length}
        pendingCount={pendingCount}
        completedCount={completedCount}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          setIsMobileOpen={setIsMobileOpen}
          activeTab={activeTab}
          pendingCount={pendingCount}
          onNavigateTab={setActiveTab}
        />

        <div className="p-4 sm:p-6 space-y-6">
          {/* Quick Tab Switcher Pill Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-2 shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setActiveTab("Dashboard")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Dashboard"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <LayoutDashboard size={14} />
                <span>Overview Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab("Manuscripts")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Manuscripts"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <FileStack size={14} />
                <span>Assigned Manuscripts</span>
                {papers.length > 0 && (
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                      activeTab === "Manuscripts"
                        ? "bg-white/20 text-white"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {papers.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("Pending")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Pending"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Clock size={14} />
                <span>Pending Reviews</span>
                {pendingCount > 0 && (
                  <span className="bg-amber-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full animate-pulse">
                    {pendingCount} Due
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("Completed")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Completed"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <CheckCircle2 size={14} />
                <span>Completed Reviews</span>
                {completedCount > 0 && (
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                      activeTab === "Completed"
                        ? "bg-white/20 text-white"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {completedCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("Calendar")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Calendar"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Calendar size={14} />
                <span>Deadlines & Calendar</span>
              </button>

              <button
                onClick={() => setActiveTab("Guidelines")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "Guidelines"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <BookOpen size={14} />
                <span>Rubric & Guidelines</span>
              </button>
            </div>

            <div className="hidden xl:flex items-center gap-2 text-xs text-slate-500 pr-2 shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-700">Peer Review Gateway Active</span>
            </div>
          </div>

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "Dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Primary Live Metrics Counters */}
              <StatsRow
                papers={papers}
                onNavigateTab={setActiveTab}
              />

              {/* Functional Quick Actions */}
              <QuickActions
                onNavigateTab={setActiveTab}
                onRefreshData={loadAssignedPapers}
              />

              {/* Priority Assigned Manuscripts Queue */}
              <ManuscriptTable
                papers={papers}
                loading={loading}
                onRefresh={loadAssignedPapers}
                limit={4}
                title="Priority Peer Review Queue"
                subtitle="Upcoming assignments requiring evaluation, scoring, or editorial feedback."
                onNavigateTab={setActiveTab}
              />

              {/* Bottom 2-Column: Recent Activity & Deadlines Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentActivity papers={papers} />
                <ReviewCalendar
                  papers={papers}
                  onNavigateTab={setActiveTab}
                />
              </div>
            </div>
          )}

          {/* TAB 2: ASSIGNED MANUSCRIPTS & PAPERS */}
          {activeTab === "Manuscripts" && (
            <div className="animate-in fade-in duration-200">
              <ManuscriptTable
                papers={papers}
                loading={loading}
                onRefresh={loadAssignedPapers}
                title="All Assigned Manuscripts for Peer Review"
                subtitle="Complete registry of research submissions assigned to your reviewer profile."
                onNavigateTab={setActiveTab}
                initialFilter="ALL"
              />
            </div>
          )}

          {/* TAB 3: PENDING EVALUATIONS HUB */}
          {activeTab === "Pending" && (
            <div className="animate-in fade-in duration-200">
              <ManuscriptTable
                papers={papers}
                loading={loading}
                onRefresh={loadAssignedPapers}
                title="Pending Peer Review Evaluations"
                subtitle="Papers currently awaiting your score, evaluation report, and editorial recommendation."
                onNavigateTab={setActiveTab}
                initialFilter="PENDING"
              />
            </div>
          )}

          {/* TAB 4: COMPLETED REVIEWS ARCHIVE */}
          {activeTab === "Completed" && (
            <div className="animate-in fade-in duration-200">
              <ManuscriptTable
                papers={papers}
                loading={loading}
                onRefresh={loadAssignedPapers}
                title="Completed Peer Review Reports Archive"
                subtitle="Historical records of all evaluated manuscripts and submitted recommendations."
                onNavigateTab={setActiveTab}
                initialFilter="COMPLETED"
              />
            </div>
          )}

          {/* TAB 5: REVIEW DEADLINES & CALENDAR */}
          {activeTab === "Calendar" && (
            <div className="animate-in fade-in duration-200">
              <ReviewCalendar
                papers={papers}
                onNavigateTab={setActiveTab}
              />
            </div>
          )}

          {/* TAB 6: REVIEWER GUIDELINES & RUBRICS */}
          {activeTab === "Guidelines" && (
            <div className="animate-in fade-in duration-200">
              <ReviewerGuidelines />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}