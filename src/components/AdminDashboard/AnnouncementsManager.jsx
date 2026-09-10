import React, { useState, useEffect } from "react";
import {
  Megaphone,
  Plus,
  Bell,
  Calendar,
  User,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Clock,
  Sparkles,
  Users,
} from "lucide-react";
import { publisherApi } from "../../api/publisherApi";
import toast from "react-hot-toast";

export default function AnnouncementsManager() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    targetRole: "ALL",
    expiresAt: "",
  });

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await publisherApi.getAnnouncements();
      const list = Array.isArray(res) ? res : res?.data || [];
      setAnnouncements(list);
    } catch (err) {
      console.warn("Could not load announcements from backend:", err);
      // Fallback default announcements
      setAnnouncements([
        {
          id: "ann-1",
          title: "Call for Papers: Special Volume on Cybercrime Forensics 2026",
          content: "We invite original research papers, case studies, and reviews for our upcoming special issue. Deadline for submissions is August 31, 2026.",
          targetRole: "AUTHORS",
          createdByName: "Chief Editor",
          createdAt: "2026-05-10T10:00:00Z",
          isActive: true,
        },
        {
          id: "ann-2",
          title: "Editorial Guidelines & Citation Update (APA 7th Edition)",
          content: "All incoming manuscript submissions must follow APA 7th edition formatting and include high-resolution figure attachments.",
          targetRole: "ALL",
          createdByName: "Super Admin",
          createdAt: "2026-05-01T08:30:00Z",
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error("Please fill in the announcement title and message");
      return;
    }

    try {
      setActionLoading(true);
      await publisherApi.createAnnouncement(formData);
      toast.success("Announcement broadcasted successfully!");
      setIsNewModalOpen(false);
      setFormData({
        title: "",
        content: "",
        targetRole: "ALL",
        expiresAt: "",
      });
      loadAnnouncements();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create announcement");
    } finally {
      setActionLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    switch ((role || "").toUpperCase()) {
      case "AUTHORS":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "REVIEWERS":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "EDITORS":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              Broadcasts & Public Notices
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              {announcements.length} Live Notices
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Post editorial updates, submission deadlines, and official announcements across the journal platform.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadAnnouncements}
            className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors cursor-pointer"
            title="Refresh"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-indigo-600" : ""} />
          </button>

          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus size={14} />
            <span>Create Announcement</span>
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.length > 0 ? (
          announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-indigo-200 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Megaphone size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {ann.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <User size={11} />
                        {ann.createdByName || "Admin"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {ann.createdAt ? new Date(ann.createdAt).toLocaleDateString() : "Active"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getRoleBadge(ann.targetRole)}`}>
                    Target: {ann.targetRole || "ALL"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 size={11} /> Active
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {ann.content}
              </p>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
            <Megaphone size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-slate-700 text-sm">No announcements posted yet.</p>
            <p className="text-xs text-slate-400 mt-0.5">Click "Create Announcement" to post your first notice.</p>
          </div>
        )}
      </div>

      {/* New Announcement Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Broadcast New Announcement</h3>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Call for Papers: Vol. 12 Issue 1"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Audience *</label>
                  <select
                    value={formData.targetRole}
                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="ALL">All Users (Public)</option>
                    <option value="AUTHORS">Authors Only</option>
                    <option value="REVIEWERS">Reviewers Only</option>
                    <option value="EDITORS">Editorial Board</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Expiration Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Announcement Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the full announcement or call-for-papers details here..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs transition-colors cursor-pointer"
                >
                  {actionLoading ? "Broadcasting..." : "Broadcast Notice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
