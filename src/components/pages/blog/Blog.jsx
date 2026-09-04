import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import {
  FiSearch,
  FiClock,
  FiCalendar,
  FiUser,
  FiArrowRight,
  FiEdit3,
  FiX,
  FiShare2,
  FiTag,
  FiBookOpen,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { blogService, DEFAULT_BLOGS } from "../../../services/blogService";
import { authService } from "../../../services/authService";
import toast from "react-hot-toast";

const CATEGORIES = [
  "All",
  "Forensic Science",
  "Cyber Security",
  "Criminology",
  "Legal & Ethics",
  "Case Studies",
  "Digital Forensics",
  "DNA & Toxicology",
  "Ballistics",
];

const LIMIT = 9;

export default function Blog() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [activeBlog, setActiveBlog] = useState(null); // Modal state for reading full article
  const [copiedLink, setCopiedLink] = useState(false);

  const currentUser = authService.getCurrentUser();
  const isAuth = authService.isAuthenticated();

  // Search input debounce (350ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to page 1 on new search
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch blogs on query changes
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await blogService.getPublishedBlogs({
        category: selectedCategory === "All" ? "" : selectedCategory,
        search: debouncedSearch,
        page: currentPage,
        limit: LIMIT,
      });

      const list = res.blogs || [];
      // Ensure only published blogs are shown on public feed
      const publishedOnly = list.filter(
        (b) => !b.status || b.status === "published"
      );

      setBlogs(publishedOnly);
      setTotalPages(res.totalPages || 1);
      setTotalCount(res.total ?? publishedOnly.length);
    } catch (err) {
      console.error("Error fetching published blogs:", err);
      setBlogs(DEFAULT_BLOGS);
      setTotalPages(1);
      setTotalCount(DEFAULT_BLOGS.length);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, debouncedSearch, currentPage]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handle direct link to open article by ID or slug (?read=slug or route param)
  useEffect(() => {
    const targetSlugOrId = params.idOrSlug || searchParams.get("read");
    if (targetSlugOrId) {
      (async () => {
        try {
          const detailedBlog = await blogService.getBlogById(targetSlugOrId);
          if (detailedBlog) {
            setActiveBlog(detailedBlog);
          }
        } catch (err) {
          console.warn("Could not deep load target blog:", err);
        }
      })();
    }
  }, [params.idOrSlug, searchParams]);

  const handlePublishClick = () => {
    if (!isAuth) {
      toast("Please sign in as Author / Reader to publish an article.", {
        icon: "ℹ️",
      });
      navigate("/login");
    } else {
      navigate("/postb");
    }
  };

  const handleOpenBlog = async (blog) => {
    setActiveBlog(blog);
    const idOrSlug = blog.slug || blog._id || blog.id;
    if (idOrSlug) {
      setSearchParams({ read: idOrSlug });
    }

    try {
      if (idOrSlug && !idOrSlug.toString().startsWith("default-")) {
        const detailedBlog = await blogService.getBlogById(idOrSlug);
        if (detailedBlog) {
          setActiveBlog(detailedBlog);
          // Update local view count in feed array
          setBlogs((prev) =>
            prev.map((b) =>
              (b._id || b.id) === (detailedBlog._id || detailedBlog.id)
                ? { ...b, views: detailedBlog.views }
                : b
            )
          );
        }
      }
    } catch (err) {
      console.warn("Could not fetch detailed blog increment:", err);
    }
  };

  const handleCloseModal = () => {
    setActiveBlog(null);
    setCopiedLink(false);
    searchParams.delete("read");
    setSearchParams(searchParams);
  };

  const handleCopyShareLink = () => {
    if (!activeBlog) return;
    const slugOrId = activeBlog.slug || activeBlog._id || activeBlog.id;
    const shareUrl = `${window.location.origin}/blog?read=${encodeURIComponent(slugOrId)}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    toast.success("Article link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      {/* Top Hero Banner - Academic Theme */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-100/70 via-indigo-50/40 to-slate-50 border-b border-slate-200/80 pt-16 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100/80 text-blue-900 border border-blue-200 shadow-xs mb-4 uppercase tracking-wider">
            <FiBookOpen size={14} className="text-blue-700" />
            <span>Academic Knowledge & Investigation Feed</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 font-serif leading-tight">
            Forensic Patrika Research Insights
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
            Verified scientific analyses, case study commentaries, cyber forensics methodologies, and scholar viewpoints.
          </p>

          {/* Search & Actions Bar */}
          <div className="mt-8 max-w-2xl mx-auto flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic, author, evidence keyword..."
                className="w-full bg-transparent pl-10 pr-12 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={handlePublishClick}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-98 shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <FiEdit3 size={15} />
              <span className="hidden sm:inline">Write Article</span>
              <span className="sm:hidden">Write</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Category Tabs */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-8 overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-blue-700 text-white shadow-md shadow-blue-700/25"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <span className="text-xs font-medium text-slate-500 hidden md:inline shrink-0">
            Showing {blogs.length} of {totalCount} articles
          </span>
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="animate-pulse bg-white border border-slate-200 rounded-2xl p-5 h-80 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className="h-44 bg-slate-100 rounded-xl" />
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-6 bg-slate-200 rounded w-4/5" />
                  <div className="h-12 bg-slate-100 rounded" />
                </div>
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
            <FiSearch className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1 font-serif">No articles found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              We couldn't find any articles matching your search query or selected category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Blog Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => {
              const id = blog._id || blog.id;
              const imageUrl =
                blog.images && blog.images.length > 0
                  ? typeof blog.images[0] === "string"
                    ? blog.images[0]
                    : blog.images[0]?.url
                  : null;

              return (
                <article
                  key={id}
                  onClick={() => handleOpenBlog(blog)}
                  className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Thumbnail Image */}
                  {imageUrl ? (
                    <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                      <img
                        src={imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-slate-200 text-blue-800 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                        {blog.category}
                      </span>
                    </div>
                  ) : (
                    <div className="h-28 w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-end">
                      <span className="bg-white text-blue-800 border border-blue-200 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                        {blog.category}
                      </span>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 group-hover:text-blue-700 transition-colors leading-snug line-clamp-2">
                        {blog.title}
                      </h2>

                      <p className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {blog.summary || blog.content}
                      </p>
                    </div>

                    {/* Meta Row */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center gap-1.5 truncate">
                        <FiUser size={13} className="text-blue-600 shrink-0" />
                        <span className="text-slate-700 font-medium truncate">
                          {blog.author || "Forensic Scholar"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {typeof blog.views === "number" && (
                          <span className="flex items-center gap-1 text-slate-400">
                            <FiEye size={12} />
                            <span>{blog.views}</span>
                          </span>
                        )}
                        <div className="flex items-center gap-1 text-slate-500">
                          <FiClock size={12} className="text-slate-400" />
                          <span>{blog.readTime || "5 min read"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* 1-Indexed Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Previous Page"
            >
              <FiChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-blue-700 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Next Page"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Call-to-action Banner - Navy/Academic Theme */}
        <div className="mt-14 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white border border-blue-800 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="text-xs uppercase font-bold tracking-wider text-yellow-300">
              Open Academic Call
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Contribute Your Findings to Forensic Patrika
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/80 max-w-lg leading-relaxed">
              Are you an investigator, academic scholar, or student researcher? Publish your case methodologies and perspectives to our global readership.
            </p>
          </div>

          <button
            onClick={handlePublishClick}
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all active:scale-98 shrink-0 flex items-center gap-2 cursor-pointer z-10"
          >
            <FiEdit3 size={16} />
            <span>Submit Your Article</span>
            <FiArrowRight size={14} />
          </button>
        </div>
      </main>

      {/* ARTICLE READER MODAL - Clean Academic Light Design */}
      {activeBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-md">
                  {activeBlog.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-2.5 leading-snug">
                  {activeBlog.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <FiUser className="text-blue-600" /> {activeBlog.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiCalendar /> {activeBlog.publishDate || activeBlog.date || "2026"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiClock /> {activeBlog.readTime || "5 min read"}
                  </span>
                  {typeof activeBlog.views === "number" && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        <FiEye /> {activeBlog.views} views
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  title="Share Article Link"
                  className="p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0 cursor-pointer"
                >
                  {copiedLink ? <FiCheck size={18} className="text-emerald-600" /> : <FiShare2 size={18} />}
                </button>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors shrink-0 cursor-pointer"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Evidence Images Gallery */}
              {activeBlog.images && activeBlog.images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeBlog.images.map((img, idx) => {
                    const src = typeof img === "string" ? img : img?.url;
                    const caption = typeof img === "object" ? img?.caption : "";
                    return (
                      <div key={idx} className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs flex flex-col">
                        <img
                          src={src}
                          alt={caption || `Evidence Image ${idx + 1}`}
                          className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {caption && (
                          <div className="p-2 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 italic">
                            Figure {idx + 1}: {caption}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Full Content */}
              <div className="prose max-w-none text-sm sm:text-base text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                {activeBlog.content}
              </div>

              {/* Tags */}
              {activeBlog.tags && activeBlog.tags.length > 0 && (
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                  {activeBlog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-full font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Official Peer Publication • Forensic Patrika
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyShareLink}
                  className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FiCopy size={13} />
                  <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
