import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  ExternalLink,
  Copy,
  Search,
  RefreshCw,
  PlusCircle,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { paperService } from "../../services/paperService";
import { authService } from "../../services/authService";

export default function MySubmissions() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 1,
    totalElements: 0,
    pageSize: 10,
  });

  const currentUser = authService.getCurrentUser();

  const fetchSubmissions = async (page = 0) => {
    try {
      if (page === 0) setLoading(true);
      else setRefreshing(true);

      const res = await paperService.getMySubmissions(page, pagination.pageSize);
      
      let paperList = [];
      if (Array.isArray(res?.data)) {
        paperList = res.data;
      } else if (Array.isArray(res?.content)) {
        paperList = res.content;
      } else if (Array.isArray(res)) {
        paperList = res;
      }

      setPapers(paperList);

      if (res?.pagination) {
        setPagination(res.pagination);
      } else if (res?.totalPages !== undefined) {
        setPagination({
          currentPage: res.number || page,
          totalPages: res.totalPages || 1,
          totalElements: res.totalElements || paperList.length,
          pageSize: res.size || 10,
        });
      } else {
        setPagination((prev) => ({
          ...prev,
          currentPage: page,
          totalPages: Math.max(1, Math.ceil(paperList.length / prev.pageSize)),
          totalElements: paperList.length,
        }));
      }
    } catch (err) {
      console.error("Failed to load author submissions:", err);
      toast.error("Could not fetch your submissions. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSubmissions(0);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Tracking ID copied to clipboard!");
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return null;
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || "").toUpperCase();
    if (s === "ACCEPTED" || s === "PUBLISHED") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
          <CheckCircle size={13} className="text-emerald-600" />
          {s === "PUBLISHED" ? "Published" : "Accepted"}
        </span>
      );
    } else if (s === "UNDER_REVIEW" || s === "REVIEW") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold">
          <Clock size={13} className="text-blue-600" />
          Under Review
        </span>
      );
    } else if (s === "REJECTED") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-semibold">
          <XCircle size={13} className="text-rose-600" />
          Revision Needed / Rejected
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
          <AlertCircle size={13} className="text-amber-600" />
          Pending Initial Review
        </span>
      );
    }
  };

  const filteredPapers = papers.filter((p) => {
    const title = (p.title || p.paperTitle || "").toLowerCase();
    const trackingId = (p.trackingId || p.submissionId || "").toLowerCase();
    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      trackingId.includes(searchTerm.toLowerCase());

    if (statusFilter === "ALL") return matchesSearch;
    const s = (p.status || "").toUpperCase();
    return matchesSearch && s === statusFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-36 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-indigo-100">
              <ShieldCheck size={14} /> Author Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
              My Research Submissions
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage and track the editorial review progress of your submitted manuscripts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchSubmissions(pagination.currentPage)}
              disabled={refreshing}
              className="p-2.5 bg-white text-slate-700 hover:text-indigo-600 border border-slate-200 rounded-xl shadow-sm hover:border-indigo-200 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Refresh submissions"
            >
              <RefreshCw size={15} className={refreshing ? "animate-spin text-indigo-600" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              to="/reserchform"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all"
            >
              <PlusCircle size={16} />
              <span>Submit New Manuscript</span>
            </Link>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by title or tracking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-800"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
              Filter Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-indigo-600 text-slate-800 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="PUBLISHED">Published</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Papers Listing / Empty State */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-medium text-sm">
              Loading your submitted manuscripts...
            </p>
          </div>
        ) : filteredPapers.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif mb-2">
              {searchTerm || statusFilter !== "ALL"
                ? "No matching manuscripts found"
                : "No manuscripts submitted yet"}
            </h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
              {searchTerm || statusFilter !== "ALL"
                ? "Try clearing your search keyword or switching your status filter."
                : "Submit your original research or review paper to start the peer-review process."}
            </p>
            <Link
              to="/reserchform"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all"
            >
              <PlusCircle size={16} />
              <span>Submit Manuscript Now</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPapers.map((paper, idx) => {
              const trackingId =
                paper.trackingId ||
                paper.submissionId ||
                `FP-${new Date().getFullYear()}-${1000 + (paper.id || idx)}`;
              const title = paper.title || paper.paperTitle || "Untitled Manuscript";
              const abstract = paper.abstractText || paper.abstract || "";
              const submittedDate = paper.submittedAt || paper.createdAt;
              const updatedDate = paper.updatedAt || paper.lastModifiedAt;

              return (
                <div
                  key={paper.id || trackingId || idx}
                  className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 hover:border-indigo-200 transition-all duration-200 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-mono font-bold">
                        <span>{trackingId}</span>
                        <button
                          onClick={() => copyToClipboard(trackingId)}
                          className="text-slate-400 hover:text-slate-700 transition-colors"
                          title="Copy tracking ID"
                        >
                          <Copy size={12} />
                        </button>
                      </div>

                      {getStatusBadge(paper.status)}

                      {paper.domain && (
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-medium">
                          {paper.domain}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar size={13} />
                      <span>Submitted: {formatDate(submittedDate)}</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-serif leading-snug mb-2">
                    {title}
                  </h3>

                  {abstract && (
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {abstract}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-4 text-slate-500">
                      {paper.fileSize && (
                        <span>Size: {formatFileSize(paper.fileSize)}</span>
                      )}
                      {paper.fileFormat && (
                        <span className="uppercase">{paper.fileFormat}</span>
                      )}
                      {updatedDate && updatedDate !== submittedDate && (
                        <span>Updated: {formatDate(updatedDate)}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/paper-status`}
                        state={{ submissionId: trackingId }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                      >
                        <ExternalLink size={13} />
                        <span>Public Tracker</span>
                      </Link>

                      {paper.fileUrl && (
                        <a
                          href={paper.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg font-medium transition-colors"
                        >
                          <Download size={13} />
                          <span>Download Paper</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
            <p className="text-xs sm:text-sm text-slate-500">
              Showing page{" "}
              <span className="font-semibold text-slate-800">
                {pagination.currentPage + 1}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {pagination.totalPages}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchSubmissions(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 0 || loading}
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                <span>Previous</span>
              </button>

              <button
                onClick={() => fetchSubmissions(pagination.currentPage + 1)}
                disabled={
                  pagination.currentPage >= pagination.totalPages - 1 || loading
                }
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
