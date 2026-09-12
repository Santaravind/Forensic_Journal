import React, { useState } from "react";
import {
  FileText,
  Search,
  Filter,
  Eye,
  Download,
  Mail,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Sparkles,
  ExternalLink,
  BookOpen,
  Calendar,
  Send,
  Star,
  Copy,
  Check,
} from "lucide-react";
import ManuscriptDetailModal from "../AdminDashboard/ManuscriptDetailModal";
import DirectAuthorEmailModal from "../publisharPage/modals/DirectAuthorEmailModal";
import ReviewModal from "./ReviewModal";
import toast from "react-hot-toast";

export default function ManuscriptTable({
  papers = [],
  loading = false,
  onRefresh = () => {},
  limit = null,
  title = "Assigned Manuscripts for Peer Review",
  subtitle = "Evaluate assigned submissions, inspect methodology, and submit formal reviewer recommendations.",
  onNavigateTab = () => {},
  initialFilter = "ALL",
}) {
  const [statusFilter, setStatusFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  // Modals state
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [reviewingPaper, setReviewingPaper] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [emailModalProps, setEmailModalProps] = useState({
    author: null,
    paper: null,
  });
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    toast.success(`Copied ${text} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status) => {
    const s = (status || "").toUpperCase();
    if (s.includes("ACCEPT"))
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (s.includes("REVIEW") || s.includes("PENDING"))
      return "bg-amber-50 text-amber-700 border-amber-200";
    if (s.includes("AWAIT") || s.includes("REVISION") || s.includes("REVISE"))
      return "bg-purple-50 text-purple-700 border-purple-200";
    if (s.includes("REJECT"))
      return "bg-rose-50 text-rose-700 border-rose-200";
    if (s.includes("PUBLISH"))
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  // Helper to determine due date relative state
  const getDueDateTag = (paper, index) => {
    const s = (paper.status || "").toUpperCase();
    if (s.includes("ACCEPT") || s.includes("COMPLET") || s.includes("PUBLISH")) {
      return {
        text: "Completed",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle2,
      };
    }

    // Assign mock due days based on index if not set
    const dueDays = index % 3 === 0 ? 3 : index % 3 === 1 ? 8 : 14;
    if (dueDays <= 3) {
      return {
        text: `Due in ${dueDays} days`,
        className: "bg-amber-50 text-amber-700 border-amber-200 animate-pulse font-bold",
        icon: Clock,
      };
    }
    return {
      text: `Due in ${dueDays} days`,
      className: "bg-slate-50 text-slate-600 border-slate-200",
      icon: Calendar,
    };
  };

  const filteredPapers = papers.filter((paper) => {
    const s = (paper.status || paper.rawStatus || "").toUpperCase();
    const matchesFilter =
      statusFilter === "ALL" ||
      (statusFilter === "PENDING" &&
        (s.includes("NEW") || s.includes("SUBMIT") || s.includes("PENDING") || s.includes("REVIEW"))) ||
      (statusFilter === "UNDER_REVIEW" && s.includes("REVIEW")) ||
      (statusFilter === "COMPLETED" && (s.includes("ACCEPT") || s.includes("COMPLET") || s.includes("PUBLISH"))) ||
      (statusFilter === "REVISION" && (s.includes("REVIS") || s.includes("AWAIT")));

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      paper.title?.toLowerCase().includes(q) ||
      paper.paperTitle?.toLowerCase().includes(q) ||
      paper.submissionId?.toLowerCase().includes(q) ||
      paper.id?.toLowerCase().includes(q) ||
      paper.author?.toLowerCase().includes(q) ||
      paper.researchArea?.toLowerCase().includes(q) ||
      (Array.isArray(paper.keywords) &&
        paper.keywords.some((k) => k.toLowerCase().includes(q)));

    return matchesFilter && matchesSearch;
  });

  const displayedPapers = limit
    ? filteredPapers.slice(0, limit)
    : filteredPapers;

  const handleOpenDetail = (paper) => {
    setSelectedPaper(paper);
    setIsDetailModalOpen(true);
  };

  const handleOpenReviewModal = (paper) => {
    setReviewingPaper(paper);
    setIsReviewModalOpen(true);
  };

  const handleOpenEmail = (author, paper) => {
    setEmailModalProps({ author, paper });
    setIsEmailModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 leading-tight">
              {title}
            </h2>
            <span className="text-[11px] font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
              {filteredPapers.length} Papers
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, ID, author..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[10px] font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={onRefresh}
            title="Refresh queue"
            className="p-2 rounded-xl border border-slate-200/90 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw
              size={14}
              className={loading ? "animate-spin text-indigo-600" : ""}
            />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 sm:px-5 py-2.5 bg-slate-50/70 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
        {[
          { id: "ALL", label: "All Manuscripts" },
          { id: "PENDING", label: "Pending Evaluations" },
          { id: "UNDER_REVIEW", label: "Under Review" },
          { id: "COMPLETED", label: "Completed Reviews" },
          { id: "REVISION", label: "Revisions Needed" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              statusFilter === tab.id
                ? "bg-indigo-600 text-white shadow-xs font-bold"
                : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/90 border-b border-slate-200/90 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 font-mono">
            <tr>
              <th className="px-4 sm:px-5 py-3.5">Manuscript ID</th>
              <th className="px-4 sm:px-5 py-3.5 min-w-[240px]">Paper Title & Domain</th>
              <th className="px-4 sm:px-5 py-3.5">Author & University</th>
              <th className="px-4 sm:px-5 py-3.5">Due Date / SLA</th>
              <th className="px-4 sm:px-5 py-3.5">Review Status</th>
              <th className="px-4 sm:px-5 py-3.5 text-right">Evaluation Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-medium">
            {displayedPapers.length > 0 ? (
              displayedPapers.map((paper, idx) => {
                const dueInfo = getDueDateTag(paper, idx);
                const DueIcon = dueInfo.icon;
                const isCompleted =
                  (paper.status || "").toUpperCase().includes("ACCEPT") ||
                  (paper.status || "").toUpperCase().includes("COMPLET") ||
                  (paper.status || "").toUpperCase().includes("PUBLISH");

                return (
                  <tr
                    key={paper.id || paper.submissionId || idx}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Manuscript ID with Copy Button */}
                    <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-indigo-700 bg-indigo-50/70 border border-indigo-100 px-2 py-0.5 rounded-md">
                          {paper.submissionId || paper.id || "FP-2026-XXXX"}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              paper.submissionId || paper.id || ""
                            )
                          }
                          title="Copy ID"
                          className="text-slate-400 hover:text-indigo-600 p-1 rounded transition-colors cursor-pointer"
                        >
                          {copiedId === (paper.submissionId || paper.id) ? (
                            <Check size={12} className="text-emerald-600" />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 font-normal">
                        Assigned: {paper.submittedAt || paper.date || "15 May 2026"}
                      </p>
                    </td>

                    {/* Paper Title & Abstract preview */}
                    <td className="px-4 sm:px-5 py-4">
                      <div className="space-y-1 max-w-sm sm:max-w-md">
                        <button
                          onClick={() => handleOpenDetail(paper)}
                          className="font-bold text-slate-900 hover:text-indigo-600 transition-colors text-left leading-snug line-clamp-2 cursor-pointer font-serif"
                        >
                          {paper.title || paper.paperTitle || paper.caseTitle}
                        </button>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {paper.researchArea || "Forensic Science"}
                          </span>
                          {paper.abstract && (
                            <span className="text-[10px] text-slate-400 truncate max-w-[200px]">
                              {paper.abstract}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Author Info */}
                    <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-bold text-slate-800">
                          {paper.author || paper.firstAuthor?.name || "Author"}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate max-w-[160px]">
                          {paper.university ||
                            paper.firstAuthor?.university ||
                            "Affiliated Institute"}
                        </p>
                      </div>
                    </td>

                    {/* Due Date & Urgency */}
                    <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ${dueInfo.className}`}
                      >
                        <DueIcon size={12} />
                        <span>{dueInfo.text}</span>
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${getStatusBadge(
                          paper.status
                        )}`}
                      >
                        {paper.status || "Under Review"}
                      </span>
                    </td>

                    {/* Evaluation Actions */}
                    <td className="px-4 sm:px-5 py-4 text-right whitespace-nowrap space-x-1.5">
                      <button
                        onClick={() => handleOpenReviewModal(paper)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs transition-all flex-inline items-center gap-1.5 cursor-pointer ${
                          isCompleted
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-indigo-600/25 hover:scale-105"
                        }`}
                      >
                        <Star size={12} className={isCompleted ? "text-emerald-600 fill-emerald-600" : "fill-white/80"} />
                        <span>{isCompleted ? "Update Review" : "Evaluate & Score"}</span>
                      </button>

                      <button
                        onClick={() => handleOpenDetail(paper)}
                        title="View Manuscript Abstract & Details"
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors inline-flex items-center cursor-pointer border border-transparent hover:border-indigo-100"
                      >
                        <Eye size={15} />
                      </button>

                      {(paper.fileUrl || paper.paperFileUrl || paper.manuscriptFileUrl) && (
                        <a
                          href={paper.fileUrl || paper.paperFileUrl || paper.manuscriptFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Download Document"
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors inline-flex items-center cursor-pointer border border-transparent hover:border-emerald-100"
                        >
                          <Download size={15} />
                        </a>
                      )}

                      <button
                        onClick={() =>
                          handleOpenEmail(
                            {
                              name: paper.author || paper.firstAuthor?.name,
                              email:
                                paper.authorEmail ||
                                paper.firstAuthor?.email ||
                                "author@example.com",
                            },
                            paper
                          )
                        }
                        title="Contact Editorial Board / Author"
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors inline-flex items-center cursor-pointer border border-transparent hover:border-blue-100"
                      >
                        <Mail size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  <div className="max-w-xs mx-auto space-y-2">
                    <FileText size={32} className="mx-auto text-slate-300" />
                    <p className="font-bold text-slate-700 text-sm">
                      No manuscripts found matching your criteria.
                    </p>
                    <p className="text-xs text-slate-400">
                      Try adjusting the search query or selecting a different status filter tab.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer with View All shortcut if limited */}
      {limit && filteredPapers.length > limit && (
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Showing top {limit} of {filteredPapers.length} assigned manuscripts
          </span>
          <button
            onClick={() => onNavigateTab("Manuscripts")}
            className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View Full Review Queue</span>
            <ExternalLink size={12} />
          </button>
        </div>
      )}

      {/* Modals */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        paper={reviewingPaper}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewSubmitted={onRefresh}
      />

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