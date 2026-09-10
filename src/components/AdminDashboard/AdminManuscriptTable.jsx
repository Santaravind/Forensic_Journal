import React, { useState, useEffect } from "react";
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
  PlusCircle,
  Sparkles,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { researchPaperApi, publisherApi, normalizePaper, extractPaperList } from "../../api/publisherApi";
import ManuscriptDetailModal from "./ManuscriptDetailModal";
import PublishPaperModal from "../publisharPage/modals/PublishPaperModal";
import DirectAuthorEmailModal from "../publisharPage/modals/DirectAuthorEmailModal";
import toast from "react-hot-toast";

export default function AdminManuscriptTable() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [publishingPaper, setPublishingPaper] = useState(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const [emailModalProps, setEmailModalProps] = useState({ author: null, paper: null });
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = async () => {
    try {
      setLoading(true);
      // Fetch queue from GET /api/publisher/queue
      const res = await publisherApi.getQueue(1, 100);
      const rawList = extractPaperList(res);
       console.log(res);
      if (rawList && rawList.length > 0) {
        const normalized = rawList.map(normalizePaper);
        setPapers(normalized);
      } else {
        // Fallback to getAllPapers
        const altRes = await researchPaperApi.getAllPapers();
        const altList = extractPaperList(altRes);
        if (altList && altList.length > 0) {
          setPapers(altList.map(normalizePaper));
        } else {
          setPapers([]);
        }
      }
    } catch (err) {
      console.warn("Could not fetch live papers from backend queue:", err);
      // Try fallback to public published or empty
      try {
        const pubRes = await publisherApi.getPublishedPapers(1, 50);
        const pubList = extractPaperList(pubRes);
        if (pubList && pubList.length > 0) {
          setPapers(pubList.map(normalizePaper));
        } else {
          setPapers([]);
        }
      } catch {
        setPapers([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || "").toUpperCase();
    if (s.includes("ACCEPT")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (s.includes("REVIEW")) return "bg-yellow-50 text-yellow-700 border-yellow-200";
    if (s.includes("AWAIT") || s.includes("REVISION") || s.includes("REVISE"))
      return "bg-amber-50 text-amber-700 border-amber-200";
    if (s.includes("REJECT")) return "bg-rose-50 text-rose-700 border-rose-200";
    if (s.includes("PUBLISH")) return "bg-purple-50 text-purple-700 border-purple-200";
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  const filteredPapers = papers.filter((paper) => {
    const s = (paper.status || "").toUpperCase();
    const matchesFilter =
      statusFilter === "ALL" ||
      (statusFilter === "NEW" && (s.includes("NEW") || s.includes("SUBMIT"))) ||
      (statusFilter === "REVIEW" && s.includes("REVIEW")) ||
      (statusFilter === "ACCEPT" && s.includes("ACCEPT")) ||
      (statusFilter === "PUBLISHED" && s.includes("PUBLISH")) ||
      (statusFilter === "REJECT" && s.includes("REJECT"));

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      paper.title?.toLowerCase().includes(q) ||
      paper.paperTitle?.toLowerCase().includes(q) ||
      paper.submissionId?.toLowerCase().includes(q) ||
      paper.id?.toLowerCase().includes(q) ||
      paper.author?.toLowerCase().includes(q) ||
      paper.researchArea?.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const handleOpenDetail = (paper) => {
    setSelectedPaper(paper);
    setIsDetailModalOpen(true);
  };

  const handleOpenPublish = (paper) => {
    setPublishingPaper(paper);
    setIsPublishModalOpen(true);
  };

  const handleOpenEmail = (author, paper) => {
    setEmailModalProps({ author, paper });
    setIsEmailModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      
      {/* Header Section */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Submitted Manuscripts & Research Papers</h2>
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full border border-indigo-100">
              {filteredPapers.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full oversight of research submissions, review statuses, editorial decisions, and publishing pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Refresh button */}
          <button
            onClick={loadPapers}
            title="Refresh Papers"
            className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-indigo-600" : ""} />
          </button>

          {/* Search Box */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Title, ID, Author..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-5 py-2.5 bg-slate-50/60 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: "ALL", label: "All Manuscripts" },
          { id: "NEW", label: "New Submissions" },
          { id: "REVIEW", label: "Under Review" },
          { id: "ACCEPT", label: "Accepted" },
          { id: "PUBLISHED", label: "Published" },
          { id: "REJECT", label: "Rejected" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 ${
              statusFilter === tab.id
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Manuscripts Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="py-3.5 px-4">Manuscript ID</th>
              <th className="py-3.5 px-4">Title</th>
              <th className="py-3.5 px-4">Author & Affiliation</th>
              <th className="py-3.5 px-4">Research Area</th>
              <th className="py-3.5 px-4">Date Submitted</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredPapers.length > 0 ? (
              filteredPapers.map((paper, idx) => {
                const isAccepted = (paper.status || "").toUpperCase().includes("ACCEPT");
                return (
                  <tr key={paper.id || paper.submissionId || idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-700 whitespace-nowrap">
                      {paper.submissionId || paper.id}
                    </td>
                    <td className="py-3.5 px-4 max-w-sm">
                      <p className="font-bold text-slate-900 leading-snug line-clamp-2">
                        {paper.title || paper.paperTitle || paper.caseTitle}
                      </p>
                      {(paper.abstract || paper.abstractText) && (
                        <p className="text-[11px] text-slate-400 truncate mt-0.5 max-w-xs">{paper.abstract || paper.abstractText}</p>
                      )}
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
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium text-[11px]">
                        {paper.researchArea || "Forensic Science"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {paper.date || paper.submittedAt || "Recent"}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(paper.status)}`}>
                        {paper.status || "New Submission"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                      {isAccepted && (
                        <button
                          onClick={() => handleOpenPublish(paper)}
                          title="Proceed to Publish Live"
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors inline-flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Sparkles size={12} />
                          <span>Publish</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenDetail(paper)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 rounded-lg font-bold text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye size={13} />
                        <span>View & Review</span>
                      </button>
                      <button
                        onClick={() =>
                          handleOpenEmail(
                            { name: paper.author || paper.firstAuthor?.name, email: paper.authorEmail || paper.firstAuthor?.email },
                            paper
                          )
                        }
                        title="Email Author via Resend"
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
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  <FileText size={36} className="mx-auto text-slate-300 mb-2" />
                  <p className="font-semibold text-slate-600">No manuscripts matching filter.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Newly submitted papers & case studies will appear in this live queue automatically.
                  </p>
                  <button
                    onClick={loadPapers}
                    className="mt-3 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw size={13} />
                    <span>Reload Queue</span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <ManuscriptDetailModal
        isOpen={isDetailModalOpen}
        paper={selectedPaper}
        onClose={() => setIsDetailModalOpen(false)}
        onStatusUpdated={loadPapers}
        onOpenEmailModal={handleOpenEmail}
      />

      <PublishPaperModal
        isOpen={isPublishModalOpen}
        paper={publishingPaper}
        onClose={() => setIsPublishModalOpen(false)}
        onSuccess={loadPapers}
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
