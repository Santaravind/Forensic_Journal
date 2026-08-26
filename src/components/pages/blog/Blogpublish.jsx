import React, { useState } from "react";

function Blogpublish() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    author: "",
    publishDate: new Date().toISOString().split("T")[0],
    content: "",
  });

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const categories = [
    "Forensic Science",
    "Cyber Security",
    "Criminology",
    "Legal & Ethics",
    "Case Studies",
  ];

  // Calculate word count for the 500-word limit
  const wordCount = formData.content
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setError("");

    if (files.length > 2) {
      setError("You can upload a maximum of 2 images.");
      return;
    }

    // Validate size limit (5MB per image)
    const MAX_SIZE = 5 * 1024 * 1024;
    for (let file of files) {
      if (file.size > MAX_SIZE) {
        setError(`"${file.name}" exceeds the 5MB size limit.`);
        return;
      }
    }

    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (wordCount > 500) {
      setError("Content exceeds the maximum limit of 500 words.");
      return;
    }

    // Build Payload for Backend API Call
    const payload = new FormData();
    payload.append("category", formData.category);
    payload.append("title", formData.title);
    payload.append("author", formData.author);
    payload.append("publishDate", formData.publishDate);
    payload.append("content", formData.content);

    images.forEach((img) => payload.append("images", img));

    // Send payload to Spring Boot / Express backend:
    // fetch('/api/blogs', { method: 'POST', body: payload })

    console.log("Submitting Payload:", { ...formData, images });
    alert("Blog post submitted successfully for review!");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Submit an Article
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Please review the writing policies below before publishing your contribution to Forensic Patrika.
          </p>
        </div>

        {/* Writing Policy Banner */}
        <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 text-xs text-indigo-950">
          <h2 className="font-semibold uppercase tracking-wider text-indigo-700">
            Blog Writing Policy
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-slate-600">
            <li>Submissions must not exceed <strong>500 words</strong>.</li>
            <li>Maintain original content with verified sources and citations.</li>
            <li>Maximum of <strong>2 images</strong> (JPG, PNG) up to <strong>5MB each</strong>.</li>
          </ul>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase">
                Category
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase">
                Author Name
              </label>
              <input
                type="text"
                name="author"
                required
                placeholder="Sant"
                value={formData.author}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Article Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase">
                Article Title
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Enter a descriptive title..."
                value={formData.title}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase">
                Publish Date
              </label>
              <input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* File Upload (Max 2 images, 5MB max each) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase">
                Upload Images (Max 2, up to 5MB each)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="mt-2 w-full text-xs text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
              />
            </div>
          </div>

          {/* Article Body Content */}
          <div>
            <div className="flex justify-between">
              <label className="block text-xs font-semibold text-slate-700 uppercase">
                Article Body
              </label>
              <span
                className={`text-xs ${
                  wordCount > 500 ? "font-bold text-red-500" : "text-slate-400"
                }`}
              >
                {wordCount} / 500 words
              </span>
            </div>
            <textarea
              name="content"
              rows={8}
              required
              placeholder="Write your article content here..."
              value={formData.content}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Blogpublish;