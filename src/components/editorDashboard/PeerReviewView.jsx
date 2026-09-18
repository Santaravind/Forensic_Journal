import React, { useState } from "react";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  UserCheck,
  Search,
  Eye,
  Mail,
  RefreshCw,
  Sparkles,
  Award,
  Filter,
  ArrowRight,
} from "lucide-react";
import ManuscriptDetailModal from "../AdminDashboard/ManuscriptDetailModal";
import DirectAuthorEmailModal from "../publisharPage/modals/DirectAuthorEmailModal";

export default function PeerReviewView({
  papers = [],
  loading = false,
  onRefresh = () => {},
}) {
  const [activeSubTab, setActiveSubTab] = useState("ALL_DECISIONS");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [emailModalProps, setEmailModalProps] = useState({ author: null, paper: null });
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Filter papers that are in peer review or require decision
  const reviewPapers = papers.filter((p) => {
    const s = (p.status || "").toUpperCase();
    return (
      s.includes("REVIEW") ||
      s.includes("AWAIT") ||
      s.includes("DECISION") ||
      s.includes("REVIS") ||
      s.includes("NEW") ||
      s.includes("SUBMIT")
    );
  });

  const filteredPapers = reviewPapers.filter((paper) => {
    const s = (paper.status || "").toUpperCase();
    const matchesTab =
      activeSubTab === "ALL_DECISIONS" ||
      (activeSubTab === "UNDER_REVIEW" && s.includes("REVIEW")) ||
      (activeSubTab === "AWAITING" && (s.includes("AWAIT") || s.includes("DECISION") || s.includes("REVIS"))) ||
      (activeSubTab === "NEW" && (s.includes("NEW") || s.includes("SUBMIT")));

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      paper.title?.toLowerCase().includes(q) ||
      paper.paperTitle?.toLowerCase().includes(q) ||
      paper.submissionId?.toLowerCase().includes(q) ||
      paper.id?.toLowerCase().includes(q) ||
      paper.author?.toLowerCase().includes(q) ||
      paper.researchArea?.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  const handleOpenDetail = (paper) => {
    setSelectedPaper(paper);
    setIsDetailModalOpen(true);
  };

  const handleOpenEmail = (author, paper) => {
    setEmailModalProps({ author, paper });
    setIsEmailModalOpen(true);
  };

  const underReviewCount = papers.filter((p) => (p.status || "").toUpperCase().includes("REVIEW")).length;
  const awaitingCount = papers.filter((p) => {
    const s = (p.status || "").toUpperCase();
    return s.includes("AWAIT") || s.includes("DECISION") || s.includes("REVIS");
  }).length;
  const newCount = papers.filter((p) => {
    const s = (p.status || "").toUpperCase();
    return s.includes("NEW") || s.includes("SUBMIT");
  }).length;

  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-blue-200/90 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">New Awaiting Assignment</span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{newCount}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Submissions needing reviewer assignment</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <FileText size={22} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-amber-200/90 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Under Peer Review</span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{underReviewCount}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Currently with assigned peer reviewers</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <Clock size={22} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-purple-200/90 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Awaiting Decision</span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{awaitingCount}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Reviews received • Final decision pending</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <AlertCircle size={22} />
          </div>
        </div>
      </div>

      {/* Main Review Console Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Peer Review & Editorial Evaluation Queue</h2>
              <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 font-bold text-xs rounded-full border border-amber-200">
                {filteredPapers.length} In Pipeline
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Evaluate reviewer recommendations, request author revisions, or finalize acceptance/rejection decisions.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onRefresh}
              title="Refresh Review Queue"
              className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw size={15} className={loading ? "animate-spin text-indigo-600" : ""} />
            </button>

            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={15} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search review queue..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Sub filter tabs */}
        <div className="px-5 py-2.5 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: "ALL_DECISIONS", label: "All Review Pipeline" },
            { id: "NEW", label: `Unassigned Submissions (${newCount})` },
            { id: "UNDER_REVIEW", label: `Under Review (${underReviewCount})` },
            { id: "AWAITING", label: `Awaiting Decision (${awaitingCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 ${
                activeSubTab === tab.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Review Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-4">Manuscript ID</th>
                <th className="py-3.5 px-4">Title & Scope</th>
                <th className="py-3.5 px-4">Author & Institute</th>
                <th className="py-3.5 px-4">Stage</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Editorial Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPapers.length > 0 ? (
                filteredPapers.map((paper, idx) => {
                  const s = (paper.status || "").toUpperCase();
                  return (
                    <tr key={paper.id || paper.submissionId || idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-700 whitespace-nowrap">
                        {paper.submissionId || paper.id}
                      </td>
                      <td className="py-3.5 px-4 max-w-sm">
                        <p className="font-bold text-slate-900 leading-snug line-clamp-2">
                          {paper.title || paper.paperTitle || paper.caseTitle}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">
                          {paper.researchArea || "Forensic Science"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="font-semibold text-slate-800">
                          {paper.author || paper.firstAuthor?.name || "Author"}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate max-w-[160px]">
                          {paper.university || paper.firstAuthor?.university || paper.authorEmail || "Affiliated Institute"}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {s.includes("NEW") && (
                          <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                            Initial Screening
                          </span>
                        )}
                        {s.includes("REVIEW") && (
                          <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                            Double-Blind Peer Review
                          </span>
                        )}
                        {(s.includes("AWAIT") || s.includes("DECISION") || s.includes("REVIS")) && (
                          <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-md border border-purple-100">
                            Editorial Judgment
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          {paper.status || "Under Evaluation"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                        <button
                          onClick={() => handleOpenDetail(paper)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs transition-colors inline-flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Eye size={13} />
                          <span>Decide / Update</span>
                        </button>
                        <button
                          onClick={() =>
                            handleOpenEmail(
                              { name: paper.author || paper.firstAuthor?.name, email: paper.authorEmail || paper.firstAuthor?.email },
                              paper
                            )
                          }
                          title="Contact Author Directly"
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center cursor-pointer"
                        >
                          <Mail size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Clock size={36} className="mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">No manuscripts currently matching this review filter.</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Submissions in peer review or awaiting editorial decisions will appear here.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ManuscriptDetailModal
        isOpen={isDetailModalOpen}
        paper={selectedPaper}
        onClose={() => setIsDetailModalOpen(false)}
        onStatusUpdated={onRefresh}
        onOpenEmailModal={handleOpenEmail}
      />

      <DirectAuthorEmailModal
        isOpen={isEmailModalOpen}
        author={emailModalProps.author}
        paper={emailModalProps.paper}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
