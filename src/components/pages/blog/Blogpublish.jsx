import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiUploadCloud,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiTag,
  FiArrowLeft,
  FiEye,
  FiUser,
  FiCalendar,
  FiBold,
  FiItalic,
  FiList,
  FiMessageSquare,
  FiTrash2,
  FiSave,
} from "react-icons/fi";
import { authService } from "../../../services/authService";
import { blogService } from "../../../services/blogService";
import logos from "../../assets/logoss.png";

const CATEGORIES = [
  "Forensic Science",
  "Cyber Security",
  "Criminology",
  "Legal & Ethics",
  "Case Studies",
  "Digital Forensics",
  "DNA & Toxicology",
  "Ballistics",
];

const MAX_WORDS = 800;
const MAX_IMAGES = 4;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per image
const DRAFT_STORAGE_KEY = "fp_blog_publish_draft";

export default function Blogpublish() {
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const currentUser = authService.getCurrentUser() || {};
  const userRole = (currentUser.role || "USER").toUpperCase();
  const isPrivileged =
    userRole === "ADMIN" || userRole === "PUBLISHER" || userRole === "EDITOR";

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    author: currentUser.fullName || currentUser.name || "",
    authorEmail: currentUser.email || "",
    authorRole: userRole,
    publishDate: new Date().toISOString().split("T")[0],
    summary: "",
    content: "",
    tags: "",
  });

  const [images, setImages] = useState([]); // File objects
  const [imageCaptions, setImageCaptions] = useState([]); // Array of strings
  const [imagePreviews, setImagePreviews] = useState([]); // Blob URLs
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  // Check login
  useEffect(() => {
    if (!currentUser.email && !authService.isAuthenticated()) {
      toast.error("Please login to submit an article.");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Check if draft exists in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.title || parsed.content) {
          setHasDraft(true);
        }
      }
    } catch (e) {
      console.warn("Could not read draft:", e);
    }
  }, []);

  // Autosave draft
  useEffect(() => {
    if (formData.title || formData.content) {
      const timeout = setTimeout(() => {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [formData]);

  const restoreDraft = () => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          author: prev.author || parsed.author,
          authorEmail: prev.authorEmail || parsed.authorEmail,
        }));
        setHasDraft(false);
        toast.success("Draft restored successfully!");
      }
    } catch {
      toast.error("Could not restore draft.");
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setHasDraft(false);
    toast("Draft removed", { icon: "🗑️" });
  };

  const wordCount = formData.content.trim()
    ? formData.content
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length
    : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const insertFormatting = (prefix, suffix = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousContent = formData.content;
    const selectedText = previousContent.substring(start, end) || "text";
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent =
      previousContent.substring(0, start) +
      replacement +
      previousContent.substring(end);

    setFormData((prev) => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 0);
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setError("");

    if (files.length + images.length > MAX_IMAGES) {
      setError(`You can upload a maximum of ${MAX_IMAGES} images.`);
      toast.error(`Maximum ${MAX_IMAGES} images allowed.`);
      return;
    }

    for (let file of files) {
      if (file.size > MAX_FILE_SIZE) {
        setError(`"${file.name}" exceeds the 5MB size limit.`);
        toast.error(`Image "${file.name}" is larger than 5MB.`);
        return;
      }
    }

    const updatedImages = [...images, ...files];
    setImages(updatedImages);

    const defaultCaptions = files.map((f) => f.name.replace(/\.[^/.]+$/, ""));
    setImageCaptions((prev) => [...prev, ...defaultCaptions]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleCaptionChange = (index, value) => {
    setImageCaptions((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageCaptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUploadProgress(0);

    if (wordCount > MAX_WORDS) {
      setError(`Content exceeds maximum limit of ${MAX_WORDS} words.`);
      toast.error(`Word limit exceeded (${wordCount}/${MAX_WORDS}).`);
      return;
    }

    if (!formData.category) {
      setError("Please select a relevant domain category.");
      return;
    }

    try {
      setStatus("submitting");

      // Step 1: Upload images directly to Cloudinary
      let uploadedImageObjects = [];
      if (images.length > 0) {
        toast.loading("Uploading evidence figures to Cloudinary...", { id: "blog-submit" });
        uploadedImageObjects = await Promise.all(
          images.map((file, idx) =>
            blogService.uploadImageToCloudinary(
              file,
              imageCaptions[idx] || file.name,
              (percent) => setUploadProgress(percent)
            )
          )
        );
      }

      // Step 2: Format tags array
      const tagsArray = formData.tags
        ? formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [formData.category];

      // Auto generate summary if empty
      const summaryText =
        formData.summary.trim() ||
        formData.content.slice(0, 160).trim() + "...";

      // Role-based status: Admins/Publishers publish directly; Authors submit for review
      const publicationStatus = isPrivileged ? "published" : "pending";

      // Step 3: Payload for Backend MongoDB API (matches schema exactly)
      const blogPayload = {
        title: formData.title.trim(),
        category: formData.category,
        author: formData.author || currentUser.fullName || "Forensic Scholar",
        authorEmail: formData.authorEmail || currentUser.email,
        authorRole: userRole,
        publishDate: formData.publishDate,
        summary: summaryText,
        content: formData.content,
        tags: tagsArray,
        images: uploadedImageObjects,
        status: publicationStatus,
        isFeatured: false,
      };

      toast.loading("Persisting article in database...", { id: "blog-submit" });
      await blogService.createBlog(blogPayload);

      setStatus("success");
      toast.success(
        isPrivileged
          ? "Article published successfully to the website!"
          : "Article submitted for editorial review! Our team will publish it shortly.",
        { id: "blog-submit", duration: 5000 }
      );

      // Clean up draft & previews
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      setImages([]);
      setImagePreviews([]);
      setImageCaptions([]);
      setFormData({
        category: "",
        title: "",
        author: currentUser.fullName || currentUser.name || "",
        authorEmail: currentUser.email || "",
        authorRole: userRole,
        publishDate: new Date().toISOString().split("T")[0],
        summary: "",
        content: "",
        tags: "",
      });
      setUploadProgress(0);
    } catch (err) {
      console.error("Failed to submit blog post:", err);
      setStatus("error");
      let msg =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while submitting your article. Please try again.";

      if (err.response?.data?.details && typeof err.response.data.details === "object") {
        const detailsStr = Object.entries(err.response.data.details)
          .map(([field, errorMsg]) => `${field}: ${errorMsg}`)
          .join(", ");
        msg = `Validation Error: ${detailsStr}`;
      }

      setError(msg);
      toast.error(msg, { id: "blog-submit" });
      setUploadProgress(0);
    }
  };

  const inputStyle =
    "w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-slate-800 bg-white placeholder-slate-400";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-6xl">
        {/* Top Controls & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
          >
            <FiArrowLeft size={16} />
            <span>Back to Research Insights</span>
          </Link>

          <div className="flex items-center gap-2">
            {hasDraft && (
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs text-amber-800 shadow-xs">
                <span>Unsaved draft found</span>
                <button
                  type="button"
                  onClick={restoreDraft}
                  className="font-bold underline hover:text-amber-950 cursor-pointer ml-1"
                >
                  Restore
                </button>
                <button
                  type="button"
                  onClick={clearDraft}
                  title="Discard Draft"
                  className="text-amber-600 hover:text-rose-600 ml-1 cursor-pointer"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs transition-colors cursor-pointer"
            >
              <FiEye size={14} className="text-blue-600" />
              <span>{previewMode ? "Edit Form Mode" : "Live Preview Mode"}</span>
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="grid lg:grid-cols-12 min-h-[750px]">
            {/* LEFT PANEL: Branding & Guidelines in Classic Navy Academic Theme */}
            <div className="lg:col-span-4 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Header Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center p-1 shadow-inner">
                    <img src={logos} alt="Logo" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <h2 className="font-serif text-base font-bold text-white tracking-wide uppercase">
                      Forensic Patrika
                    </h2>
                    <p className="text-[10px] font-semibold text-blue-300 uppercase tracking-wider">
                      Official Publishing Portal
                    </p>
                  </div>
                </div>

                <h1 className="text-2xl font-bold font-serif tracking-tight text-white mb-2 leading-snug">
                  Publish Your Article
                </h1>
                <p className="text-xs text-blue-100/80 leading-relaxed mb-6">
                  Contribute verified forensic methodologies, case studies, and scientific research to our academic audience.
                </p>

                {/* Workflow Checklist Card */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md space-y-4 mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-yellow-300">
                    Submission Framework
                  </h3>
                  <ul className="space-y-3 text-xs text-blue-100/90">
                    <li className="flex items-start gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                      <span>
                        <strong>Cloudinary CDN:</strong> Evidence figures are securely uploaded and transformed with publicId tracking.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-yellow-400 mt-1 shrink-0" />
                      <span>
                        <strong>MongoDB Document:</strong> Article text, metadata, authors, and keywords are permanently preserved.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-blue-400 mt-1 shrink-0" />
                      <span>
                        <strong>Editorial Workflow:</strong> {isPrivileged ? "Your role publishes directly to the live feed." : "Submissions are verified by Chief Editors before going live."}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Author Info Badge */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 text-xs text-blue-100/80">
                  <p className="text-white font-semibold mb-0.5">Author Identity:</p>
                  <p className="text-yellow-300 font-medium truncate">
                    {currentUser.fullName || currentUser.name || "Authenticated Scholar"}
                  </p>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 font-bold">
                    Role: {userRole === "USER" ? "Author / Reader" : userRole}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-blue-200/60">
                Official Research & Publishing Portal • 2026 Forensic Patrika
              </div>
            </div>

            {/* RIGHT PANEL: Form or Live Preview */}
            <div className="lg:col-span-8 p-6 sm:p-10 bg-white flex flex-col justify-center">
              {previewMode ? (
                /* LIVE PREVIEW */
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      {formData.category || "General Forensics"}
                    </span>
                    <h2 className="text-2xl font-bold font-serif text-slate-900 mt-3 leading-snug">
                      {formData.title || "Untitled Article"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      By {formData.author || "Forensic Scholar"} • {formData.publishDate}
                    </p>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {imagePreviews.map((src, i) => (
                        <div key={i} className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs">
                          <img
                            src={src}
                            alt="preview"
                            className="w-full h-44 object-cover"
                          />
                          {imageCaptions[i] && (
                            <div className="p-2 text-[11px] text-slate-500 italic bg-white border-t border-slate-100">
                              Figure {i + 1}: {imageCaptions[i]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="prose max-w-none text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                    {formData.content || "Article content will appear here in live preview mode..."}
                  </div>

                  {formData.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                      {formData.tags.split(",").map((t, i) => (
                        <span
                          key={i}
                          className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full"
                        >
                          #{t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* MAIN EDITORIAL FORM */
                <>
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h2 className="text-xl font-bold font-serif text-slate-900 tracking-tight">
                      Submit Research Article
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Complete the metadata, attach high-res evidence figures, and submit your paper.
                    </p>
                  </div>

                  {/* Status Notifications */}
                  {status === "success" && (
                    <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-800 flex items-center gap-3">
                      <FiCheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                      <span>
                        {isPrivileged
                          ? "Article successfully published! It is now live on the public feed."
                          : "Article submitted successfully! It has been dispatched to the editorial moderation queue."}
                      </span>
                    </div>
                  )}

                  {error && (
                    <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-800 flex items-center gap-3">
                      <FiAlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Upload Progress Bar */}
                  {status === "submitting" && uploadProgress > 0 && (
                    <div className="mb-6 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-medium">
                        <span>Uploading evidence figures to Cloudinary...</span>
                        <span className="font-bold text-blue-700">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Category & Title */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Category <span className="text-rose-500">*</span>
                        </label>
                        <select
                          name="category"
                          required
                          value={formData.category}
                          onChange={handleInputChange}
                          className={`${inputStyle} cursor-pointer`}
                        >
                          <option value="">Select Domain</option>
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Article Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          required
                          placeholder="e.g. Advanced Spectroscopic Analysis of Ballistic Residue"
                          value={formData.title}
                          onChange={handleInputChange}
                          className={inputStyle}
                        />
                      </div>
                    </div>

                    {/* Author & Tags */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Author Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="author"
                          required
                          placeholder="Dr. John Doe"
                          value={formData.author}
                          onChange={handleInputChange}
                          className={inputStyle}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Keywords / Tags (comma separated)
                        </label>
                        <div className="relative">
                          <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            name="tags"
                            placeholder="DNA, Ballistics, Investigation"
                            value={formData.tags}
                            onChange={handleInputChange}
                            className={`${inputStyle} pl-9`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Textarea with Markdown Toolbar */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Article Content / Findings <span className="text-rose-500">*</span>
                        </label>
                        <span
                          className={`text-xs font-medium ${
                            wordCount > MAX_WORDS ? "text-rose-600 font-bold" : "text-slate-500"
                          }`}
                        >
                          {wordCount} / {MAX_WORDS} words
                        </span>
                      </div>

                      {/* Formatting Helper Toolbar */}
                      <div className="flex items-center gap-1 mb-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
                        <button
                          type="button"
                          onClick={() => insertFormatting("**", "**")}
                          title="Bold Text"
                          className="p-1.5 hover:bg-white rounded text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                          <FiBold size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting("*", "*")}
                          title="Italic Text"
                          className="p-1.5 hover:bg-white rounded text-slate-700 text-xs italic transition-colors cursor-pointer"
                        >
                          <FiItalic size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting("\n### ", "\n")}
                          title="Heading"
                          className="px-2 py-1 hover:bg-white rounded text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          H3
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting("\n- ")}
                          title="Bullet List"
                          className="p-1.5 hover:bg-white rounded text-slate-700 text-xs transition-colors cursor-pointer"
                        >
                          <FiList size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting("\n> ")}
                          title="Quote Block"
                          className="p-1.5 hover:bg-white rounded text-slate-700 text-xs transition-colors cursor-pointer"
                        >
                          <FiMessageSquare size={13} />
                        </button>
                      </div>

                      <textarea
                        ref={textareaRef}
                        name="content"
                        rows={7}
                        required
                        placeholder="Detail your scientific methodology, case observations, and forensic evidence analysis..."
                        value={formData.content}
                        onChange={handleInputChange}
                        className={`w-full px-3.5 py-3 text-xs sm:text-sm text-slate-800 rounded-xl border bg-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          wordCount > MAX_WORDS
                            ? "border-rose-500 focus:ring-rose-500/20"
                            : "border-slate-300 focus:border-blue-600 focus:ring-blue-500/20"
                        }`}
                      />
                    </div>

                    {/* Media Attachments with Caption Input */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Evidence / Figure Images (Cloudinary CDN, Max {MAX_IMAGES})
                      </label>

                      {images.length < MAX_IMAGES && (
                        <label className="relative border-2 border-dashed border-slate-300 hover:border-blue-600 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-blue-50/40 transition-colors cursor-pointer group bg-slate-50/50">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageSelect}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <FiUploadCloud className="w-6 h-6 text-slate-400 group-hover:text-blue-600 mb-1 transition-colors" />
                          <p className="text-xs text-slate-600">
                            <span className="font-bold text-blue-600">Click to upload</span> or drag image files here
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, WEBP up to 5MB each</p>
                        </label>
                      )}

                      {/* Image Preview Grid with editable captions */}
                      {imagePreviews.length > 0 && (
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {imagePreviews.map((src, idx) => (
                            <div
                              key={idx}
                              className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2 shadow-xs space-y-2"
                            >
                              <div className="relative h-28 rounded-lg overflow-hidden bg-slate-200">
                                <img
                                  src={src}
                                  alt={`Preview ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(idx)}
                                  className="absolute top-1 right-1 bg-slate-900/80 hover:bg-rose-600 text-white rounded-full p-1 transition-colors cursor-pointer"
                                >
                                  <FiX size={12} />
                                </button>
                              </div>
                              <input
                                type="text"
                                placeholder={`Figure ${idx + 1} caption (e.g. Spectral analysis)`}
                                value={imageCaptions[idx] || ""}
                                onChange={(e) => handleCaptionChange(idx, e.target.value)}
                                className="w-full text-xs px-2.5 py-1 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 bg-white"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <p className="text-[11px] text-slate-500 font-medium">
                        {isPrivileged
                          ? "Status: Instant Public Publication"
                          : "Status: Editorial Peer Moderation Queue"}
                      </p>
                      <button
                        type="submit"
                        disabled={status === "submitting" || wordCount > MAX_WORDS}
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                      >
                        {status === "submitting"
                          ? "Uploading & Saving..."
                          : isPrivileged
                          ? "Publish Article"
                          : "Submit For Review"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}