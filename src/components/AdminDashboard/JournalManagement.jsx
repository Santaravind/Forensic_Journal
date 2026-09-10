import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Plus,
  Layers,
  FileText,
  Calendar,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Sparkles,
  ExternalLink,
  Tag,
} from "lucide-react";
import { publisherApi } from "../../api/publisherApi";
import toast from "react-hot-toast";

export default function JournalManagement() {
  const [journals, setJournals] = useState([]);
  const [issues, setIssues] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal states
  const [isNewJournalOpen, setIsNewJournalOpen] = useState(false);
  const [isNewIssueOpen, setIsNewIssueOpen] = useState(false);

  // New Journal Form
  const [newJournal, setNewJournal] = useState({
    title: "",
    code: "",
    issnPrint: "",
    issnOnline: "",
    description: "",
    aimsScope: "",
    coverImageUrl: "",
  });

  // New Issue Form
  const [newIssue, setNewIssue] = useState({
    journalId: "",
    volumeNo: new Date().getFullYear() - 2015,
    issueNo: 1,
    year: new Date().getFullYear(),
    month: "May",
    issueTitle: "",
  });

  useEffect(() => {
    loadJournals();
  }, []);

  const loadJournals = async () => {
    try {
      setLoading(true);
      const res = await publisherApi.getJournals();
      const list = Array.isArray(res) ? res : res?.data || [];
      setJournals(list);
      if (list.length > 0 && !selectedJournal) {
        setSelectedJournal(list[0]);
        loadIssues(list[0].id);
      }
    } catch (err) {
      console.warn("Could not load journals from API:", err);
      // Fallback default journal for display
      const defaultJournal = {
        id: "j-1",
        title: "Journal of Forensic Science and Research (JFSR)",
        code: "JFSR",
        issnPrint: "2456-9872",
        issnOnline: "2456-9880",
        description: "Premier peer-reviewed open access journal covering forensic pathology, toxicology, cyber forensics, and criminology.",
        aimsScope: "Forensic Pathology, Toxicology, DNA Fingerprinting, Cyber Forensics",
        totalIssues: 12,
        totalPapers: 148,
        isActive: true,
      };
      setJournals([defaultJournal]);
      setSelectedJournal(defaultJournal);
    } finally {
      setLoading(false);
    }
  };

  const loadIssues = async (journalId) => {
    try {
      const res = await publisherApi.getIssues(journalId);
      const list = Array.isArray(res) ? res : res?.data || [];
      setIssues(list);
    } catch (err) {
      console.warn("Could not load issues:", err);
      setIssues([
        {
          id: "iss-1",
          journalId: journalId || "j-1",
          volumeNo: 11,
          issueNo: 2,
          year: 2026,
          month: "May",
          issueTitle: "Special Edition: AI in Digital Forensics",
          isPublished: true,
          paperCount: 8,
        },
        {
          id: "iss-2",
          journalId: journalId || "j-1",
          volumeNo: 11,
          issueNo: 1,
          year: 2026,
          month: "February",
          issueTitle: "Advances in Toxicology & Trace Analysis",
          isPublished: true,
          paperCount: 12,
        },
      ]);
    }
  };

  const handleSelectJournal = (j) => {
    setSelectedJournal(j);
    loadIssues(j.id);
  };

  const handleCreateJournal = async (e) => {
    e.preventDefault();
    if (!newJournal.title || !newJournal.code) {
      toast.error("Please provide a journal title and unique code");
      return;
    }

    try {
      setActionLoading(true);
      await publisherApi.createJournal(newJournal);
      toast.success("New journal created successfully!");
      setIsNewJournalOpen(false);
      setNewJournal({
        title: "",
        code: "",
        issnPrint: "",
        issnOnline: "",
        description: "",
        aimsScope: "",
        coverImageUrl: "",
      });
      loadJournals();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create journal");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateIssue = async (e) => {
    e.preventDefault();
    const jId = selectedJournal?.id || newIssue.journalId;
    if (!jId) {
      toast.error("Please select a journal first");
      return;
    }

    try {
      setActionLoading(true);
      await publisherApi.createIssue({
        ...newIssue,
        journalId: jId,
      });
      toast.success("New issue created successfully!");
      setIsNewIssueOpen(false);
      setNewIssue({
        journalId: "",
        volumeNo: new Date().getFullYear() - 2015,
        issueNo: 1,
        year: new Date().getFullYear(),
        month: "May",
        issueTitle: "",
      });
      loadIssues(jId);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create issue");
    } finally {
      setActionLoading(false);
    }
  };

  const handlePublishIssue = async (issueId) => {
    try {
      setActionLoading(true);
      await publisherApi.publishIssue(issueId);
      toast.success("Issue published successfully!");
      if (selectedJournal) loadIssues(selectedJournal.id);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to publish issue");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Actions */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              Journals, Volumes & Issue Releases
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              ISSN Registered
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure official Forensic Patrika journals, manage volumes, and schedule issue releases for indexing.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadJournals}
            className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors cursor-pointer"
            title="Refresh"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-indigo-600" : ""} />
          </button>

          <button
            onClick={() => setIsNewJournalOpen(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus size={14} />
            <span>Add Journal</span>
          </button>

          <button
            onClick={() => setIsNewIssueOpen(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Sparkles size={14} />
            <span>New Issue Release</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Journal List & Issue Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Journal Catalog */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Journals ({journals.length})
            </h3>
          </div>

          <div className="space-y-3">
            {journals.map((j) => {
              const isSelected = selectedJournal?.id === j.id;
              return (
                <div
                  key={j.id || j.code}
                  onClick={() => handleSelectJournal(j)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white border-indigo-500 ring-2 ring-indigo-500/10 shadow-md"
                      : "bg-white border-slate-200/90 hover:border-indigo-200 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                        {j.code?.substring(0, 3) || "JNL"}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">
                          {j.title}
                        </h4>
                        <span className="text-[10px] font-mono text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded-md mt-1 inline-block">
                          CODE: {j.code}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={10} /> Active
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-3 leading-relaxed">
                    {j.description || "Official forensic scientific research journal."}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Print ISSN: <strong className="text-slate-700">{j.issnPrint || "Pending"}</strong></span>
                    <span>Online ISSN: <strong className="text-slate-700">{j.issnOnline || "Pending"}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Journal Issues & Volumes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                  Selected Journal Archive
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedJournal?.title || "Select a Journal"}
                </h3>
              </div>

              <button
                onClick={() => setIsNewIssueOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus size={13} />
                <span>Create New Issue</span>
              </button>
            </div>

            {/* Issues Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                    <th className="py-3 px-4">Volume & Issue</th>
                    <th className="py-3 px-4">Release Period</th>
                    <th className="py-3 px-4">Theme / Special Title</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {issues.length > 0 ? (
                    issues.map((iss) => (
                      <tr key={iss.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                          Vol. {iss.volumeNo}, Issue {iss.issueNo}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                          {iss.month} {iss.year}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 max-w-xs font-medium">
                          {iss.issueTitle || "Regular Issue Publication"}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {iss.isPublished ? (
                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[11px] inline-flex items-center gap-1">
                              <CheckCircle2 size={11} /> Published Live
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-bold text-[11px]">
                              In Progress
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          {!iss.isPublished && (
                            <button
                              onClick={() => handlePublishIssue(iss.id)}
                              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-1"
                            >
                              <Sparkles size={11} />
                              <span>Publish Issue</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        <BookOpen size={28} className="mx-auto text-slate-300 mb-1.5" />
                        <p className="font-semibold text-slate-600 text-xs">No issues registered for this journal yet.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Modal 1: Add New Journal */}
      {isNewJournalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Register New Academic Journal</h3>
              <button
                onClick={() => setIsNewJournalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateJournal} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Journal Full Title *</label>
                <input
                  type="text"
                  required
                  value={newJournal.title}
                  onChange={(e) => setNewJournal({ ...newJournal, title: e.target.value })}
                  placeholder="e.g., Journal of Forensic Science & Cyber Investigation"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Code / Acronym *</label>
                  <input
                    type="text"
                    required
                    value={newJournal.code}
                    onChange={(e) => setNewJournal({ ...newJournal, code: e.target.value.toUpperCase() })}
                    placeholder="e.g., JFSCI"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Print ISSN</label>
                  <input
                    type="text"
                    value={newJournal.issnPrint}
                    onChange={(e) => setNewJournal({ ...newJournal, issnPrint: e.target.value })}
                    placeholder="xxxx-xxxx"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Online ISSN</label>
                  <input
                    type="text"
                    value={newJournal.issnOnline}
                    onChange={(e) => setNewJournal({ ...newJournal, issnOnline: e.target.value })}
                    placeholder="xxxx-xxxx"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newJournal.description}
                  onChange={(e) => setNewJournal({ ...newJournal, description: e.target.value })}
                  placeholder="Short summary of journal scope..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewJournalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs transition-colors cursor-pointer"
                >
                  {actionLoading ? "Creating..." : "Create Journal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Add New Issue */}
      {isNewIssueOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Schedule New Issue Release</h3>
              <button
                onClick={() => setIsNewIssueOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateIssue} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Journal *</label>
                <select
                  value={newIssue.journalId || selectedJournal?.id || ""}
                  onChange={(e) => setNewIssue({ ...newIssue, journalId: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                >
                  {journals.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} ({j.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Volume No *</label>
                  <input
                    type="number"
                    required
                    value={newIssue.volumeNo}
                    onChange={(e) => setNewIssue({ ...newIssue, volumeNo: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Issue No *</label>
                  <input
                    type="number"
                    required
                    value={newIssue.issueNo}
                    onChange={(e) => setNewIssue({ ...newIssue, issueNo: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Month *</label>
                  <select
                    value={newIssue.month}
                    onChange={(e) => setNewIssue({ ...newIssue, month: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {[
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Year *</label>
                  <input
                    type="number"
                    required
                    value={newIssue.year}
                    onChange={(e) => setNewIssue({ ...newIssue, year: parseInt(e.target.value) || 2026 })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Special Issue Title (Optional)</label>
                <input
                  type="text"
                  value={newIssue.issueTitle}
                  onChange={(e) => setNewIssue({ ...newIssue, issueTitle: e.target.value })}
                  placeholder="e.g., Forensic Pathology Special Issue"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewIssueOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs transition-colors cursor-pointer"
                >
                  {actionLoading ? "Scheduling..." : "Schedule Issue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
