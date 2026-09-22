import React, { useState, useEffect } from 'react';
import { publisherApi, researchPaperApi, normalizePaper } from '../../../api/publisherApi';
import { X, Upload, CheckCircle2, Loader2, Sparkles, BookOpen, Newspaper, FileText, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PublishPaperModal({ paper, queue = [], isOpen, onClose, onSuccess }) {
  const [journals, setJournals] = useState([]);
  const [issues, setIssues] = useState([]);
  const [availableManuscripts, setAvailableManuscripts] = useState([]);
  const [selectedManuscript, setSelectedManuscript] = useState(null);

  const [loadingJournals, setLoadingJournals] = useState(false);
  const [loadingIssues, setLoadingIssues] = useState(false);
  const [loadingManuscripts, setLoadingManuscripts] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [creatingQuickIssue, setCreatingQuickIssue] = useState(false);

  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    manuscriptId: '',
    submissionId: '',
    title: '',
    author: '',
    authorEmail: '',
    university: '',
    journalId: '',
    journalTitle: '',
    issueId: '',
    issueTitle: '',
    doi: `10.5958/JFSR.${currentYear}.${Math.floor(1000 + Math.random() * 9000)}`,
    publishedDate: new Date().toISOString().split('T')[0],
    startPage: '1',
    endPage: '12',
    finalPdfUrl: '',
    generateCertificates: true,
    sendNotificationEmail: true,
  });

  // Load journals and manuscripts whenever modal opens or active paper changes
  useEffect(() => {
    if (isOpen) {
      initModal();
    }
  }, [isOpen, paper]);

  const initModal = async () => {
    const currentPaper = paper || (queue.length > 0 ? queue[0] : null);
    setSelectedManuscript(currentPaper);

    const docUrl = currentPaper?.finalPdfUrl ||
      currentPaper?.manuscriptFileUrl ||
      currentPaper?.fileUrl ||
      currentPaper?.paperFileUrl ||
      currentPaper?.filePath ||
      currentPaper?.paperFile ||
      '';

    const authorName = currentPaper?.author || currentPaper?.firstAuthor?.name || 'Author';
    const authorEmail = currentPaper?.authorEmail || currentPaper?.firstAuthor?.email || '';
    const university = currentPaper?.university || currentPaper?.firstAuthor?.university || '';
    const manuscriptId = currentPaper?.id || currentPaper?.submissionId || '';
    const submissionId = currentPaper?.submissionId || manuscriptId;
    const title = currentPaper?.title || currentPaper?.paperTitle || '';

    setFormData({
      manuscriptId,
      submissionId,
      title,
      author: authorName,
      authorEmail,
      university,
      journalId: '',
      journalTitle: '',
      issueId: '',
      issueTitle: '',
      doi: `10.5958/JFSR.${currentYear}.${Math.floor(1000 + Math.random() * 9000)}`,
      publishedDate: new Date().toISOString().split('T')[0],
      startPage: currentPaper?.startPage || '1',
      endPage: currentPaper?.endPage || '12',
      finalPdfUrl: docUrl,
      generateCertificates: true,
      sendNotificationEmail: true,
    });

    await Promise.all([loadJournals(), loadAvailableManuscripts()]);
  };

  const loadAvailableManuscripts = async () => {
    if (queue && queue.length > 0) {
      setAvailableManuscripts(queue);
      return;
    }
    try {
      setLoadingManuscripts(true);
      const res = await publisherApi.getQueue(1, 50);
      const list = Array.isArray(res) ? res : res?.data || [];
      if (list.length > 0) {
        setAvailableManuscripts(list);
      } else {
        const all = await researchPaperApi.getAllPapers();
        const pendingOrAccepted = all.filter((p) => p.status !== 'Published');
        setAvailableManuscripts(pendingOrAccepted.length > 0 ? pendingOrAccepted : all);
      }
    } catch (e) {
      console.warn('Could not load queue manuscripts:', e);
    } finally {
      setLoadingManuscripts(false);
    }
  };

  const loadJournals = async () => {
    try {
      setLoadingJournals(true);
      const list = await publisherApi.getJournals();
      setJournals(list || []);

      if (list && list.length > 0) {
        const firstJournal = list[0];
        setFormData((prev) => {
          const code = firstJournal.code || 'JFSR';
          const randomDoiSuffix = Math.floor(1000 + Math.random() * 9000);
          return {
            ...prev,
            journalId: firstJournal.id,
            journalTitle: firstJournal.title,
            doi: `10.5958/${code}.${currentYear}.${randomDoiSuffix}`,
          };
        });
        await loadIssuesForJournal(firstJournal.id, firstJournal.title);
      }
    } catch (err) {
      console.error('Error fetching journals:', err);
    } finally {
      setLoadingJournals(false);
    }
  };

  const loadIssuesForJournal = async (journalId, journalTitle = '') => {
    if (!journalId) {
      setIssues([]);
      return;
    }
    try {
      setLoadingIssues(true);
      const list = await publisherApi.getIssues(journalId);
      const validIssues = list || [];
      setIssues(validIssues);

      if (validIssues.length > 0) {
        const firstIssue = validIssues[0];
        setFormData((prev) => ({
          ...prev,
          issueId: firstIssue.id,
          issueTitle: firstIssue.issueTitle || `Vol. ${firstIssue.volumeNo}, Issue ${firstIssue.issueNo}`,
        }));
      } else {
        setFormData((prev) => ({ ...prev, issueId: '', issueTitle: '' }));
      }
    } catch (err) {
      console.error('Error fetching issues:', err);
    } finally {
      setLoadingIssues(false);
    }
  };

  const handleJournalChange = async (journalId) => {
    const selected = journals.find((j) => j.id === journalId);
    const code = selected?.code || 'JFSR';
    const randomDoiSuffix = Math.floor(1000 + Math.random() * 9000);

    setFormData((prev) => ({
      ...prev,
      journalId,
      journalTitle: selected?.title || '',
      doi: `10.5958/${code}.${currentYear}.${randomDoiSuffix}`,
      issueId: '',
      issueTitle: '',
    }));

    await loadIssuesForJournal(journalId, selected?.title);
  };

  const handleIssueChange = (issueId) => {
    const selected = issues.find((i) => i.id === issueId);
    setFormData((prev) => ({
      ...prev,
      issueId,
      issueTitle: selected?.issueTitle || (selected ? `Vol. ${selected.volumeNo}, Issue ${selected.issueNo}` : ''),
    }));
  };

  const handleManuscriptSelect = (manuscriptId) => {
    const found = availableManuscripts.find((m) => (m.id === manuscriptId || m.submissionId === manuscriptId));
    if (found) {
      setSelectedManuscript(found);
      const docUrl = found.finalPdfUrl ||
        found.manuscriptFileUrl ||
        found.fileUrl ||
        found.paperFileUrl ||
        found.filePath ||
        found.paperFile ||
        '';

      setFormData((prev) => ({
        ...prev,
        manuscriptId: found.id || found.submissionId,
        submissionId: found.submissionId || found.id,
        title: found.title || found.paperTitle || '',
        author: found.author || found.firstAuthor?.name || 'Author',
        authorEmail: found.authorEmail || found.firstAuthor?.email || '',
        university: found.university || found.firstAuthor?.university || '',
        finalPdfUrl: docUrl || prev.finalPdfUrl,
      }));
    }
  };

  const handleQuickAddIssue = async () => {
    if (!formData.journalId) {
      toast.error('Please select a journal first.');
      return;
    }
    try {
      setCreatingQuickIssue(true);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const curMonth = months[new Date().getMonth()];
      const nextIssueNo = issues.length + 1;
      const newIssueData = {
        journalId: formData.journalId,
        journalTitle: formData.journalTitle,
        volumeNo: 10,
        issueNo: nextIssueNo,
        year: currentYear,
        month: curMonth,
        issueTitle: `Vol. 10, Issue ${nextIssueNo} (${curMonth} ${currentYear})`,
      };
      const res = await publisherApi.createIssue(newIssueData);
      const created = res?.data || res || newIssueData;
      toast.success(`Created ${created.issueTitle}!`);
      await loadIssuesForJournal(formData.journalId, formData.journalTitle);
    } catch (err) {
      toast.error('Failed to create quick issue.');
    } finally {
      setCreatingQuickIssue(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      toast.error('Please upload a valid .pdf, .doc, or .docx file');
      return;
    }

    try {
      setUploading(true);
      const toastId = toast.loading('Uploading camera-ready document...');
      const res = await publisherApi.uploadDocument(file, 'published_papers');
      toast.dismiss(toastId);

      const fileUrl = res?.fileUrl || res?.secure_url || res?.data?.fileUrl;
      if (fileUrl) {
        setFormData((prev) => ({ ...prev, finalPdfUrl: fileUrl }));
        toast.success('Document uploaded successfully!');
      } else {
        toast.success('File processed.');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error('File upload failed. You can paste the direct URL.');
    } finally {
      setUploading(false);
    }
  };

  const handlePublishSubmit = async (e) => {
    e.preventDefault();

    if (!formData.manuscriptId && !formData.title.trim()) {
      toast.error('Please select or specify a manuscript to publish.');
      return;
    }
    if (!formData.journalId) {
      toast.error('Please select a Target Journal.');
      return;
    }
    if (!formData.issueId) {
      toast.error('Please select or create a Volume & Issue.');
      return;
    }
    if (!formData.doi.trim()) {
      toast.error('Assigned DOI is required.');
      return;
    }
    if (!formData.finalPdfUrl.trim()) {
      toast.error('Please provide or upload the camera-ready file.');
      return;
    }

    try {
      setSubmitting(true);
      const currentSelectedJournal = journals.find((j) => j.id === formData.journalId);
      const currentSelectedIssue = issues.find((i) => i.id === formData.issueId);

      const payload = {
        ...formData,
        manuscriptId: formData.manuscriptId || `FP-${currentYear}-${Math.floor(1000 + Math.random() * 9000)}`,
        submissionId: formData.submissionId || formData.manuscriptId,
        title: formData.title || selectedManuscript?.title || 'Published Forensic Paper',
        author: formData.author || selectedManuscript?.author || 'Primary Author',
        authorEmail: formData.authorEmail || selectedManuscript?.authorEmail || '',
        university: formData.university || selectedManuscript?.university || '',
        journal: currentSelectedJournal?.title || formData.journalTitle || 'Journal of Forensic Science and Research',
        journalTitle: currentSelectedJournal?.title || formData.journalTitle || 'Journal of Forensic Science and Research',
        issue: currentSelectedIssue?.issueTitle || formData.issueTitle || `Vol. 10, Issue 2 (${currentYear})`,
        issueTitle: currentSelectedIssue?.issueTitle || formData.issueTitle || `Vol. 10, Issue 2 (${currentYear})`,
      };

      const res = await publisherApi.publishPaper(payload);
      if (res?.success || res?.data) {
        toast.success(`🎉 Manuscript published live with DOI ${payload.doi}!`);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.success('Paper published successfully!');
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      console.error('Publication error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to publish manuscript.';
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Publish Research Paper Live</h2>
              <p className="text-xs text-slate-500">Assign volume/issue, DOI metadata, and release manuscript to the live catalog.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePublishSubmit} className="space-y-4 mt-4">
          
          {/* Manuscript Selector (if no specific paper was locked) */}
          {!paper && availableManuscripts.length > 0 && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Select Manuscript from Accepted Queue *
              </label>
              <select
                value={formData.manuscriptId}
                onChange={(e) => handleManuscriptSelect(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="">-- Choose an accepted manuscript --</option>
                {availableManuscripts.map((m) => (
                  <option key={m.id || m.submissionId} value={m.id || m.submissionId}>
                    [{m.submissionId || m.id}] {m.title?.slice(0, 60)}... ({m.firstAuthor?.name || m.author || 'Author'})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Manuscript Title */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Manuscript Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Advancements in Forensic DNA Analysis..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Author Details Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Primary Author Name
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="e.g. Dr. Neha Gupta"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Author Notification Email
              </label>
              <input
                type="email"
                value={formData.authorEmail}
                onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
                placeholder="e.g. author@university.edu"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Journal and Issue Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Target Scholarly Journal *
              </label>
              <select
                value={formData.journalId}
                onChange={(e) => handleJournalChange(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="">{loadingJournals ? 'Loading journals...' : 'Select Target Journal'}</option>
                {journals.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title} ({j.code || 'JFSR'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  Volume & Issue *
                </label>
                {formData.journalId && issues.length === 0 && (
                  <button
                    type="button"
                    onClick={handleQuickAddIssue}
                    disabled={creatingQuickIssue}
                    className="text-[10px] text-indigo-600 font-bold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>Quick Add Issue</span>
                  </button>
                )}
              </div>
              <select
                value={formData.issueId}
                onChange={(e) => handleIssueChange(e.target.value)}
                required
                disabled={!formData.journalId || loadingIssues}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100 cursor-pointer"
              >
                <option value="">
                  {loadingIssues ? 'Loading issues...' : issues.length === 0 ? 'No issues found (Click Quick Add)' : 'Select Volume / Issue'}
                </option>
                {issues.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.issueTitle || `Vol. ${i.volumeNo}, Issue ${i.issueNo} (${i.month || ''} ${i.year || ''})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DOI and Page Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Assigned DOI *
              </label>
              <input
                type="text"
                value={formData.doi}
                onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-indigo-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Start Page
              </label>
              <input
                type="number"
                placeholder="e.g. 1"
                value={formData.startPage}
                onChange={(e) => setFormData({ ...formData, startPage: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                End Page
              </label>
              <input
                type="number"
                placeholder="e.g. 12"
                value={formData.endPage}
                onChange={(e) => setFormData({ ...formData, endPage: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Camera-Ready Document Upload */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Final Typeset / Camera-Ready File (.pdf, .doc, .docx) *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.finalPdfUrl}
                onChange={(e) => setFormData({ ...formData, finalPdfUrl: e.target.value })}
                placeholder="https://res.cloudinary.com/..."
                required
                className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
              <label className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-colors shrink-0">
                {uploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload size={14} />
                    <span>Upload File</span>
                  </>
                )}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Automated Options */}
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3.5 space-y-2">
            <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={formData.generateCertificates}
                onChange={(e) => setFormData({ ...formData, generateCertificates: e.target.checked })}
                className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
              <span>Auto-Generate Official PDF Certificates with Verification QR Code</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={formData.sendNotificationEmail}
                onChange={(e) => setFormData({ ...formData, sendNotificationEmail: e.target.checked })}
                className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
              <span>Send Publication Congratulations Email with DOI Link to Authors (via Resend)</span>
            </label>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Publishing Live...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={14} />
                  <span>Confirm & Publish Live</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
