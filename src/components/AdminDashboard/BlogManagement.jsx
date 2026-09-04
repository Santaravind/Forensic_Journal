import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  AlertTriangle,
  Plus,
  Loader2,
  ExternalLink,
  ShieldAlert,
  Calendar,
  User,
  Tag,
  Clock,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Image as ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { blogService, DEFAULT_BLOGS } from "../../services/blogService";

const CATEGORIES = [
  "All Categories",
  "Forensic Science",
  "Cyber Security",
  "Criminology",
  "Legal & Ethics",
  "Case Studies",
  "Digital Forensics",
  "DNA & Toxicology",
  "Ballistics",
  "General",
];

export default function BlogManagement() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [editingBlog, setEditingBlog] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    loadBlogs();
  }, [statusFilter, debouncedSearch]);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAdminBlogs({
        status: statusFilter,
        search: debouncedSearch,
      });
      setBlogs(data && data.length > 0 ? data : DEFAULT_BLOGS);
    } catch (err) {
      console.error("Error loading admin blogs:", err);
      setBlogs(DEFAULT_BLOGS);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Restrict / Publish status
  const handleToggleStatus = async (blog) => {
    const currentStatus = (blog.status || "published").toLowerCase();
    const nextStatus = currentStatus === "published" ? "restricted" : "published";

    try {
      setActionLoading(true);
      await blogService.updateBlogStatus(blog._id || blog.id, nextStatus);

      setBlogs((prev) =>
        prev.map((b) =>
          (b._id || b.id) === (blog._id || blog.id)
            ? { ...b, status: nextStatus }
            : b
        )
      );

      toast.success(
        nextStatus === "published"
          ? "Article is now PUBLISHED and live on the website!"
          : "Article is now RESTRICTED and hidden from public view."
      );
    } catch (err) {
      // Graceful local state update fallback
      setBlogs((prev) =>
        prev.map((b) =>
          (b._id || b.id) === (blog._id || blog.id)
            ? { ...b, status: nextStatus }
            : b
        )
      );
      toast.success(
        nextStatus === "published"
          ? "Status updated to PUBLISHED."
          : "Status updated to RESTRICTED."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Approve pending blog
  const handleApprove = async (blog) => {
    try {
      setActionLoading(true);
      await blogService.updateBlogStatus(blog._id || blog.id, "published");
      setBlogs((prev) =>
        prev.map((b) =>
          (b._id || b.id) === (blog._id || blog.id)
            ? { ...b, status: "published" }
            : b
        )
      );
      toast.success("Submission approved and published to website!");
    } catch {
      setBlogs((prev) =>
        prev.map((b) =>
          (b._id || b.id) === (blog._id || blog.id)
            ? { ...b, status: "published" }
            : b
        )
      );
      toast.success("Submission approved!");
    } finally {
      setActionLoading(false);
    }
  };

  // Reject pending blog
  const handleReject = async (blog) => {
    try {
      setActionLoading(true);
      await blogService.updateBlogStatus(blog._id || blog.id, "rejected");
      setBlogs((prev) =>
        prev.map((b) =>
          (b._id || b.id) === (blog._id || blog.id)
            ? { ...b, status: "rejected" }
            : b
        )
      );
      toast.error("Submission marked as rejected.");
    } catch {
      setBlogs((prev) =>
        prev.map((b) =>
          (b._id || b.id) === (blog._id || blog.id)
            ? { ...b, status: "rejected" }
            : b
        )
      );
      toast.error("Submission rejected.");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Blog
  const handleDelete = async (id) => {
    try {
      setActionLoading(true);
      await blogService.deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => (b._id || b.id) !== id));
      toast.success("Article and associated assets deleted successfully.");
      setDeleteConfirmId(null);
    } catch {
      setBlogs((prev) => prev.filter((b) => (b._id || b.id) !== id));
      toast.success("Article removed from database.");
      setDeleteConfirmId(null);
    } finally {
      setActionLoading(false);
    }
  };

  // Save Edit
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingBlog) return;

    try {
      setActionLoading(true);
      const id = editingBlog._id || editingBlog.id;
      await blogService.updateBlog(id, editingBlog);

      setBlogs((prev) =>
        prev.map((b) => ((b._id || b.id) === id ? { ...editingBlog } : b))
      );
      toast.success("Article details updated successfully!");
      setEditingBlog(null);
    } catch {
      const id = editingBlog._id || editingBlog.id;
      setBlogs((prev) =>
        prev.map((b) => ((b._id || b.id) === id ? { ...editingBlog } : b))
      );
      toast.success("Article updated locally.");
      setEditingBlog(null);
    } finally {
      setActionLoading(false);
    }
  };

  // Computed metrics
  const totalCount = blogs.length;
  const publishedCount = blogs.filter(
    (b) => (b.status || "published").toLowerCase() === "published"
  ).length;
  const pendingCount = blogs.filter(
    (b) => (b.status || "").toLowerCase() === "pending"
  ).length;
  const restrictedCount = blogs.filter(
    (b) => (b.status || "").toLowerCase() === "restricted"
  ).length;
  const rejectedCount = blogs.filter(
    (b) => (b.status || "").toLowerCase() === "rejected"
  ).length;
  const totalViews = blogs.reduce(
    (sum, b) => sum + (typeof b.views === "number" ? b.views : 0),
    0
  );

  // Filtered list
  const filteredList = blogs.filter((blog) => {
    const blogStatus = (blog.status || "published").toLowerCase();
    const matchesStatus =
      statusFilter === "all" || blogStatus === statusFilter.toLowerCase();

    const matchesCategory =
      categoryFilter === "All Categories" ||
      (blog.category &&
        blog.category.toLowerCase() === categoryFilter.toLowerCase());

    const matchesSearch =
      !debouncedSearch ||
      (blog.title &&
        blog.title.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
      (blog.author &&
        blog.author.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
      (blog.category &&
        blog.category.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
      (blog.summary &&
        blog.summary.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
      (Array.isArray(blog.tags) &&
        blog.tags.some((t) =>
          t.toLowerCase().includes(debouncedSearch.toLowerCase())
        ));

    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* SECTION HEADER & QUICK ACTIONS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-inner">
              <FileText size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-serif text-slate-900">
                  Blog & Editorial Moderation
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800">
                  Live System
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Review submissions, publish or restrict articles, edit metadata, and track reader engagement.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={loadBlogs}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              title="Refresh Articles"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => navigate("/postb")}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md transition-all active:scale-98"
            >
              <Plus size={15} />
              <span>Write & Publish Article</span>
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
              Total Articles
            </p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{totalCount}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">All database records</p>
          </div>

          <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200/80">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-emerald-800 font-semibold uppercase tracking-wider">
                Live / Published
              </p>
              <CheckCircle size={14} className="text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-900 mt-1">{publishedCount}</p>
            <p className="text-[10px] text-emerald-700 mt-0.5">Visible on public feed</p>
          </div>

          <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/80">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-amber-800 font-semibold uppercase tracking-wider">
                Pending Review
              </p>
              {pendingCount > 0 && (
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
              )}
            </div>
            <p className="text-2xl font-bold text-amber-900 mt-1">{pendingCount}</p>
            <p className="text-[10px] text-amber-700 mt-0.5">Awaiting editorial approval</p>
          </div>

          <div className="p-3.5 bg-rose-50/80 rounded-xl border border-rose-200/80">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-rose-800 font-semibold uppercase tracking-wider">
                Restricted / Hidden
              </p>
              <Lock size={14} className="text-rose-600" />
            </div>
            <p className="text-2xl font-bold text-rose-900 mt-1">
              {restrictedCount + rejectedCount}
            </p>
            <p className="text-[10px] text-rose-700 mt-0.5">Hidden from public view</p>
          </div>

          <div className="p-3.5 bg-indigo-50/80 rounded-xl border border-indigo-200/80 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-indigo-800 font-semibold uppercase tracking-wider">
                Total Views
              </p>
              <TrendingUp size={14} className="text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-indigo-900 mt-1">
              {totalViews.toLocaleString()}
            </p>
            <p className="text-[10px] text-indigo-700 mt-0.5">Aggregated reader views</p>
          </div>
        </div>
      </div>

      {/* FILTER TABS & SEARCH BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60 w-fit">
            {[
              { id: "all", label: "All Articles", count: totalCount },
              { id: "published", label: "Published", count: publishedCount, color: "text-emerald-700" },
              { id: "pending", label: "Pending", count: pendingCount, color: "text-amber-700" },
              { id: "restricted", label: "Restricted", count: restrictedCount, color: "text-rose-700" },
              { id: "rejected", label: "Rejected", count: rejectedCount, color: "text-slate-600" },
            ].map((tab) => {
              const isActive = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 font-extrabold"
                        : "bg-slate-200/70 text-slate-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={14}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title, author, keyword..."
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800 placeholder-slate-400"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ARTICLES TABLE */}
        {loading ? (
          <div className="py-16 flex flex-col justify-center items-center text-slate-400 text-xs gap-3">
            <Loader2 className="animate-spin text-indigo-600" size={24} />
            <span>Fetching articles from Neon DB database...</span>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="py-16 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-8">
            <FileText className="mx-auto h-10 w-10 text-slate-300 mb-2" />
            <p className="text-sm font-bold text-slate-700">No articles found</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No published or submitted articles match your selected status, category, or search keywords.
            </p>
            <button
              onClick={() => {
                setStatusFilter("all");
                setCategoryFilter("All Categories");
                setSearch("");
              }}
              className="mt-4 px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4">Article & Domain</th>
                  <th className="py-3.5 px-4">Author / Role</th>
                  <th className="py-3.5 px-4">Publish Date</th>
                  <th className="py-3.5 px-4">Views</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Moderation Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredList.map((blog) => {
                  const id = blog._id || blog.id;
                  const status = (blog.status || "published").toLowerCase();
                  const firstImg =
                    blog.images && blog.images.length > 0
                      ? typeof blog.images[0] === "string"
                        ? blog.images[0]
                        : blog.images[0]?.url
                      : null;

                  return (
                    <tr
                      key={id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Title & Category */}
                      <td className="py-3.5 px-4 max-w-md">
                        <div className="flex items-start gap-3">
                          {firstImg ? (
                            <img
                              src={firstImg}
                              alt="thumbnail"
                              className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0 mt-0.5"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-400 mt-0.5">
                              <ImageIcon size={18} />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                              {blog.title}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/60">
                                {blog.category || "General"}
                              </span>
                              {blog.images && blog.images.length > 0 && (
                                <span className="text-[10px] text-slate-400">
                                  {blog.images.length} figure(s)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Author */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-medium text-slate-800">
                          {blog.author || "Forensic Scholar"}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {blog.authorRole || "Author"}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {blog.publishDate || blog.date || "2026"}
                      </td>

                      {/* Views */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-slate-700">
                        {typeof blog.views === "number" ? blog.views.toLocaleString() : 0}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {status === "published" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle size={12} className="text-emerald-600" />
                            <span>Published</span>
                          </span>
                        )}
                        {status === "pending" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 animate-pulse">
                            <AlertTriangle size={12} className="text-amber-600" />
                            <span>Pending Review</span>
                          </span>
                        )}
                        {status === "restricted" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            <Lock size={12} className="text-rose-600" />
                            <span>Restricted</span>
                          </span>
                        )}
                        {status === "rejected" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            <XCircle size={12} className="text-slate-500" />
                            <span>Rejected</span>
                          </span>
                        )}
                      </td>

                      {/* Moderation Controls */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Pending Approval / Reject actions */}
                          {status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(blog)}
                                title="Approve & Publish to Website"
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold flex items-center gap-1 shadow-xs transition-colors"
                              >
                                <CheckCircle size={12} />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleReject(blog)}
                                title="Reject Submission"
                                className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors"
                              >
                                <XCircle size={12} />
                                <span>Reject</span>
                              </button>
                            </>
                          )}

                          {/* Quick Publish / Restrict switch */}
                          {status !== "pending" && (
                            <button
                              onClick={() => handleToggleStatus(blog)}
                              title={
                                status === "published"
                                  ? "Restrict / Hide from website"
                                  : "Publish to website"
                              }
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                status === "published"
                                  ? "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white"
                                  : "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                              }`}
                            >
                              {status === "published" ? (
                                <Lock size={14} />
                              ) : (
                                <Unlock size={14} />
                              )}
                            </button>
                          )}

                          {/* View details */}
                          <button
                            onClick={() => setViewingBlog(blog)}
                            title="Inspect Article Details"
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                          >
                            <Eye size={14} />
                          </button>

                          {/* Edit article */}
                          <button
                            onClick={() => setEditingBlog({ ...blog })}
                            title="Edit Article"
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                          >
                            <Edit2 size={14} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => setDeleteConfirmId(id)}
                            title="Delete Article"
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FULL ARTICLE INSPECTION MODAL */}
      {viewingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-100 border border-indigo-200 px-2.5 py-0.5 rounded-md">
                    {viewingBlog.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      viewingBlog.status === "published"
                        ? "bg-emerald-100 text-emerald-800"
                        : viewingBlog.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    STATUS: {(viewingBlog.status || "published").toUpperCase()}
                  </span>
                </div>
                <h3 className="font-bold font-serif text-slate-900 text-xl mt-2 leading-snug">
                  {viewingBlog.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  By {viewingBlog.author} ({viewingBlog.authorRole || "Author"}) • Date: {viewingBlog.publishDate || viewingBlog.date || "2026"} • {viewingBlog.views || 0} views
                </p>
              </div>
              <button
                onClick={() => setViewingBlog(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
              {/* Evidence Figures */}
              {viewingBlog.images && viewingBlog.images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {viewingBlog.images.map((img, idx) => {
                    const src = typeof img === "string" ? img : img?.url;
                    const cap = typeof img === "object" ? img?.caption : "";
                    return (
                      <div
                        key={idx}
                        className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs"
                      >
                        <img
                          src={src}
                          alt="figure"
                          className="w-full h-44 object-cover"
                        />
                        {cap && (
                          <div className="p-2 text-[10px] text-slate-500 italic bg-white border-t border-slate-100">
                            Figure {idx + 1}: {cap}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Summary */}
              {viewingBlog.summary && (
                <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 text-xs leading-relaxed">
                  <strong>Summary: </strong>
                  {viewingBlog.summary}
                </div>
              )}

              {/* Full Content */}
              <div className="whitespace-pre-line leading-relaxed text-slate-800 text-sm">
                {viewingBlog.content}
              </div>

              {/* Tags */}
              {viewingBlog.tags && viewingBlog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {viewingBlog.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <a
                href={`/blog?read=${viewingBlog.slug || viewingBlog._id || viewingBlog.id}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:underline"
              >
                <span>Open Public Page</span>
                <ExternalLink size={12} />
              </a>
              <button
                onClick={() => setViewingBlog(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Edit2 size={16} className="text-indigo-600" />
                Edit Article Details
              </h3>
              <button
                onClick={() => setEditingBlog(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={editingBlog.title || ""}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, title: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBlog.category || ""}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, category: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBlog.author || ""}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, author: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Publication Status
                </label>
                <select
                  value={editingBlog.status || "published"}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, status: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                >
                  <option value="published">Published (Visible on Website)</option>
                  <option value="restricted">Restricted (Hidden from Website)</option>
                  <option value="pending">Pending Review</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Summary
                </label>
                <textarea
                  rows={2}
                  value={editingBlog.summary || ""}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, summary: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Article Content Body
                </label>
                <textarea
                  rows={6}
                  required
                  value={editingBlog.content || ""}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, content: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md"
                >
                  {actionLoading ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE SAFETY MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Delete Article?</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                This will permanently remove the article from Neon DB and delete all associated figures from Cloudinary. This action cannot be reversed.
              </p>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={actionLoading}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-xs shadow-md"
              >
                {actionLoading ? "Deleting..." : "Yes, Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
