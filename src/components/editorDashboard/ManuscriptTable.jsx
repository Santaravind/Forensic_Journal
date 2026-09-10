import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Search, 
  Eye, 
  Download, 
  Mail, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  XCircle 
} from "lucide-react";
import { researchPaperApi, normalizePaper, extractPaperList } from "../../api/publisherApi";
import ManuscriptDetailModal from "../AdminDashboard/ManuscriptDetailModal";
import DirectAuthorEmailModal from "../publisharPage/modals/DirectAuthorEmailModal";

// Fallback initial demo data
const DEFAULT_MANUSCRIPTS = [
  {
    id: "FP-2026-1056",
    submissionId: "FP-2026-1056",
    title: "Advancements in Forensic DNA Analysis Using NGS Technologies",
    author: "Mr Indresh",
    authorEmail: "indresh@example.com",
    university: "National Forensic Sciences University",
    date: "15 May 2026",
    status: "Under Review",
    stage: "Peer Review",
    researchArea: "Genetics",
    abstract: "Next-generation sequencing (NGS) has revolutionized the identification and individualization of forensic biological evidence.",
    keywords: ["Forensic DNA", "NGS", "Genetics"],
  },
  {
    id: "FP-2026-1055",
    submissionId: "FP-2026-1055",
    title: "Forensic Entomology: A Review of Recent Applications",
    author: "Mr Indresh",
    authorEmail: "indresh@example.com",
    university: "Delhi University",
    date: "12 May 2026",
    status: "Under Review",
    stage: "Peer Review",
    researchArea: "Toxicology",
    abstract: "Estimation of Post-Mortem Interval (PMI) using developmental stages of necrophagous insect fauna.",
    keywords: ["Entomology", "PMI", "Forensics"],
  },
  {
    id: "FP-2026-1054",
    submissionId: "FP-2026-1054",
    title: "Fingerprint Analysis Using Deep Learning Techniques",
    author: "Mr Indresh",
    authorEmail: "indresh@example.com",
    university: "IIT Kharagpur",
    date: "10 May 2026",
    status: "Awaiting Decision",
    stage: "Editorial Decision",
    researchArea: "Cyber Forensics",
    abstract: "Convolutional Neural Networks applied to partial, smudged, and latent friction ridge impressions.",
    keywords: ["Fingerprint", "AI", "Deep Learning"],
  },
  {
    id: "FP-2026-1053",
    submissionId: "FP-2026-1053",
    title: "Ballistic Evidence Examination: Methods and Challenges",
    author: "Mr Indresh",
    authorEmail: "indresh@example.com",
    university: "CFSL",
    date: "08 May 2026",
    status: "Awaiting Decision",
    stage: "Editorial Decision",
    researchArea: "Ballistics",
    abstract: "Comparative microscopic examination of striation marks on fired cartridge cases and bullets.",
    keywords: ["Ballistics", "Firearms"],
  },
  {
    id: "FP-2026-1052",
    submissionId: "FP-2026-1052",
    title: "Digital Forensics in Cyber Crime Investigation",
    author: "Mr Indresh",
    authorEmail: "indresh@example.com",
    university: "IIIT",
    date: "05 May 2026",
    status: "New Submission",
    stage: "Initial Check",
    researchArea: "Cyber Forensics",
    abstract: "Memory forensics, volatile artifact preservation, and network intrusion reconstruction.",
    keywords: ["Cybercrime", "Memory Forensics"],
  },
];

export default function ManuscriptTable() {
  const [manuscripts, setManuscripts] = useState(DEFAULT_MANUSCRIPTS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modal states
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [emailModalProps, setEmailModalProps] = useState({ author: null, paper: null });
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  useEffect(() => {
    loadManuscripts();
  }, []);

  const loadManuscripts = async () => {
    try {
      setLoading(true);
      const res = await researchPaperApi.getAllPapers();
      const rawList = extractPaperList(res);
      if (rawList.length > 0) {
        const normalized = rawList.map(normalizePaper);
        setManuscripts(normalized);
      }
    } catch (err) {
      console.warn("Could not fetch manuscripts for editor, keeping fallback records:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    const s = (status || "").toUpperCase();
    if (s.includes("REVIEW")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (s.includes("AWAIT") || s.includes("DECISION") || s.includes("REVISION"))
      return "bg-amber-100 text-amber-800 border-amber-200";
    if (s.includes("ACCEPT")) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (s.includes("NEW") || s.includes("SUBMIT")) return "bg-blue-100 text-blue-800 border-blue-200";
    if (s.includes("REJECT")) return "bg-rose-100 text-rose-800 border-rose-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const filteredManuscripts = manuscripts.filter((item) => {
    const s = (item.status || "").toUpperCase();
    const matchesFilter =
      statusFilter === "ALL" ||
      (statusFilter === "NEW" && (s.includes("NEW") || s.includes("SUBMIT"))) ||
      (statusFilter === "REVIEW" && s.includes("REVIEW")) ||
      (statusFilter === "AWAITING" && (s.includes("AWAIT") || s.includes("DECISION"))) ||
      (statusFilter === "ACCEPTED" && s.includes("ACCEPT"));

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title?.toLowerCase().includes(q) ||
      item.paperTitle?.toLowerCase().includes(q) ||
      item.id?.toLowerCase().includes(q) ||
      item.submissionId?.toLowerCase().includes(q) ||
      item.author?.toLowerCase().includes(q) ||
      item.researchArea?.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const handleOpenDetail = (paper) => {
    setSelectedPaper(paper);
    setIsDetailModalOpen(true);
  };

  const handleOpenEmail = (author, paper) => {
    setEmailModalProps({ author, paper });
    setIsEmailModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mt-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-5 border-b gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#171C44]">
            Manuscript Overview
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage peer reviews, editorial evaluations, and decision workflows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Refresh Button */}
          <button
            onClick={loadManuscripts}
            title="Refresh Manuscripts"
            className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={loading ? "animate-spin text-blue-600" : ""} />
          </button>

          {/* Search Input */}
          <div className="relative w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search manuscripts..."
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-2.5 bg-gray-50/70 border-b flex items-center gap-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: "ALL", label: "All Papers" },
          { id: "NEW", label: "New Submissions" },
          { id: "REVIEW", label: "Under Review" },
          { id: "AWAITING", label: "Awaiting Decision" },
          { id: "ACCEPTED", label: "Accepted" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 ${
              statusFilter === tab.id
                ? "bg-purple-600 text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8F9FD]">
            <tr>
              <th className="px-5 py-4 font-semibold text-[#171C44]">Manuscript ID</th>
              <th className="px-5 py-4 font-semibold text-[#171C44]">Title</th>
              <th className="px-5 py-4 font-semibold text-[#171C44]">Author</th>
              <th className="px-5 py-4 font-semibold text-[#171C44]">Research Area</th>
              <th className="px-5 py-4 font-semibold text-[#171C44]">Date Submitted</th>
              <th className="px-5 py-4 font-semibold text-[#171C44]">Status</th>
              <th className="px-5 py-4 font-semibold text-[#171C44] text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredManuscripts.length > 0 ? (
              filteredManuscripts.map((item, index) => (
                <tr key={item.id || item.submissionId || index} className="hover:bg-gray-50/80 transition">
                  <td className="px-5 py-4 font-mono font-bold text-purple-700 whitespace-nowrap">
                    {item.submissionId || item.id}
                  </td>

                  <td className="px-5 py-4 max-w-[320px]">
                    <p className="font-bold text-[#171C44] leading-snug line-clamp-2">
                      {item.title || item.paperTitle || item.caseTitle}
                    </p>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="font-semibold text-gray-800">
                      {item.author || item.firstAuthor?.name || "Author"}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {item.university || item.firstAuthor?.university || "Affiliated Institute"}
                    </p>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[11px] font-medium">
                      {item.researchArea || "Forensic Science"}
                    </span>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap text-gray-500">
                    {item.date || item.submittedAt || "15 May 2026"}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusStyle(item.status)}`}>
                      {item.status || "New Submission"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleOpenDetail(item)}
                      className="px-4 py-1.5 border border-purple-300 rounded-lg text-purple-700 font-semibold hover:bg-purple-50 transition cursor-pointer"
                    >
                      View & Review
                    </button>
                    <button
                      onClick={() =>
                        handleOpenEmail(
                          { name: item.author || item.firstAuthor?.name, email: item.authorEmail || item.firstAuthor?.email },
                          item
                        )
                      }
                      title="Email Author"
                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition inline-flex items-center cursor-pointer"
                    >
                      <Mail size={15} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-400">
                  No manuscripts found matching filter.
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
        onStatusUpdated={loadManuscripts}
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