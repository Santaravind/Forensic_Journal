import React, { useState } from "react";
import axios from "axios";

const CATEGORIES = [
  "Forensic Science",
  "Cyber Security",
  "Criminology",
  "Legal & Ethics",
  "Case Studies",
];

const MAX_WORDS = 500;
const MAX_IMAGES = 2;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const CLOUDINARY_CLOUD_NAME = "j9ksfgqo";
const CLOUDINARY_UPLOAD_PRESET = "forensic";

export default function Blogpublish() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    author: "",
    publishDate: new Date().toISOString().split("T")[0],
    content: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [uploadProgress, setUploadProgress] = useState(0);

  const wordCount = formData.content.trim()
    ? formData.content
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length
    : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setError("");

    if (files.length + images.length > MAX_IMAGES) {
      setError(`You can only upload up to ${MAX_IMAGES} images in total.`);
      return;
    }

    for (let file of files) {
      if (file.size > MAX_FILE_SIZE) {
        setError(`"${file.name}" exceeds the 5MB size limit.`);
        return;
      }
    }

    const updatedImages = [...images, ...files];
    setImages(updatedImages);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  async function uploadToCloudinary(file) {
    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body }
    );
    
    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      throw new Error(`File upload failed (${res.status}). ${errBody}`);
    }
    
    const data = await res.json();
    return data.secure_url;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUploadProgress(0);

    if (wordCount > MAX_WORDS) {
      setError(`Content exceeds the maximum limit of ${MAX_WORDS} words.`);
      return;
    }

    try {
      setStatus("submitting");

      // Step 1: Upload images to Cloudinary and get URLs
      let imageUrls = [];
      if (images.length > 0) {
        console.log("Uploading images to Cloudinary...");
        
        // Upload all images with progress tracking
        const uploadPromises = images.map(async (image, index) => {
          const progress = ((index) / images.length) * 100;
          setUploadProgress(progress);
          console.log(`Uploading image ${index + 1}/${images.length}...`);
          
          const url = await uploadToCloudinary(image);
          
          const newProgress = ((index + 1) / images.length) * 100;
          setUploadProgress(newProgress);
          console.log(`Image ${index + 1} uploaded:`, url);
          
          return url;
        });
        
        imageUrls = await Promise.all(uploadPromises);
        console.log("All images uploaded successfully:", imageUrls);
      }

      // Step 2: Send blog data with Cloudinary URLs to your backend API
      const blogData = {
        category: formData.category,
        title: formData.title,
        author: formData.author,
        publishDate: formData.publishDate,
        content: formData.content,
        images: imageUrls, // Send the Cloudinary URLs
      };

      console.log("Sending to backend:", blogData);

      const response = await axios.post(`${apiUrl}/blogpost`, blogData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Success response:", response.data);

      setStatus("success");
      setFormData({
        category: "",
        title: "",
        author: "",
        publishDate: new Date().toISOString().split("T")[0],
        content: "",
      });
      
      // Clean up image previews
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      setImages([]);
      setImagePreviews([]);
      setUploadProgress(0);
      
    } catch (err) {
      console.error("Failed to submit blog post:", err);
      setStatus("error");
      setError(
        err.response?.data?.message || 
        err.message || 
        "An error occurred while submitting. Please try again.",
      );
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-12 min-h-[700px]">
          {/* LEFT PANEL: Branding & Writing Guidelines */}
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header Badge */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center font-serif text-lg font-bold text-blue-400">
                  FP
                </div>
                <div>
                  <h2 className="font-serif text-base font-bold text-slate-100 tracking-wide">
                    FORENSIC PATRIKA
                  </h2>
                  <p className="text-[10px] font-semibold text-blue-300 uppercase tracking-wider">
                    Editorial Submission
                  </p>
                </div>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white mb-3 leading-snug">
                Publish Your Research & Perspective
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed mb-8">
                Share domain insights, case analysis, and research findings with
                our academic and professional community.
              </p>

              {/* Submission Policy Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-800/50 p-5 backdrop-blur-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Submission Guidelines
                </h3>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span>
                      <strong>Word Limit:</strong> Maximum 500 words. Keep
                      analysis concise and focused.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span>
                      <strong>Attribution:</strong> Cite primary sources and
                      reference verified case material.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span>
                      <strong>Media Attachments:</strong> Up to 2
                      high-resolution images (5MB max each).
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-400">
              Submissions undergo peer review prior to publication on
              `/blogpost`.
            </div>
          </div>

          {/* RIGHT PANEL: Main Form */}
          <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-center">
            <div className="border-b border-slate-100 pb-5 mb-6">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Article Submission Form
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the required metadata and editorial details below.
              </p>
            </div>

            {/* Status Notifications */}
            {status === "success" && (
              <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-800 flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-emerald-600 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Article submitted successfully! Your post has been dispatched
                  to <strong>/blogpost</strong>.
                </span>
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-xs text-red-700 flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-red-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Upload Progress Bar */}
            {status === "submitting" && uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mb-6">
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Uploading images...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category & Author Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="author"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Author Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="author"
                    type="text"
                    name="author"
                    required
                    placeholder="e.g. Dr. Aravind Singh"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>
              </div>

              {/* Title & Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Article Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    required
                    placeholder="Enter an informative title..."
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="publishDate"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Publish Date
                  </label>
                  <input
                    id="publishDate"
                    type="date"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>
              </div>

              {/* Article Content Textarea */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="content"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                  >
                    Article Content <span className="text-red-500">*</span>
                  </label>
                  <span
                    className={`text-xs font-medium ${wordCount > MAX_WORDS ? "text-red-600" : "text-slate-400"}`}
                  >
                    {wordCount} / {MAX_WORDS} words
                  </span>
                </div>
                <textarea
                  id="content"
                  name="content"
                  rows={7}
                  required
                  placeholder="Compose your article here..."
                  value={formData.content}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                    wordCount > MAX_WORDS
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                  }`}
                />
              </div>

              {/* Media Attachments Drop Area */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Attachments (Max 2 Images, 5MB each)
                </label>

                {images.length < MAX_IMAGES && (
                  <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="text-xs text-slate-600">
                      <span className="font-semibold text-blue-600">
                        Click to upload
                      </span>{" "}
                      or drag images here
                    </div>
                  </div>
                )}

                {/* Image Preview Grid */}
                {imagePreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {imagePreviews.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-md overflow-hidden border border-slate-200 h-20 bg-slate-100"
                      >
                        <img
                          src={src}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full p-1 transition-colors"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Action Button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={status === "submitting" || wordCount > MAX_WORDS}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      {uploadProgress > 0 && uploadProgress < 100 
                        ? `Uploading ${Math.round(uploadProgress)}%` 
                        : "Submitting..."}
                    </span>
                  ) : (
                    "Publish Article"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}