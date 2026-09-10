import React, { useState, useEffect } from 'react';
import { publisherApi } from '../../../api/publisherApi';
import { X, Upload, CheckCircle2, Loader2, Sparkles, BookOpen, Newspaper } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PublishPaperModal({ paper, isOpen, onClose, onSuccess }) {
  const [journals, setJournals] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loadingJournals, setLoadingJournals] = useState(false);
  const [loadingIssues, setLoadingIssues] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    manuscriptId: paper?.id || '',
    journalId: '',
    issueId: '',
    doi: `10.5958/JFSR.${new Date().getFullYear()}.${Math.floor(1000 + Math.random() * 9000)}`,
    publishedDate: new Date().toISOString().split('T')[0],
    startPage: '',
    endPage: '',
    finalPdfUrl: paper?.manuscriptFileUrl || '',
    generateCertificates: true,
    sendNotificationEmail: true,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        manuscriptId: paper?.id || prev.manuscriptId,
        finalPdfUrl: paper?.manuscriptFileUrl || prev.finalPdfUrl,
        doi: prev.doi || `10.5958/JFSR.${new Date().getFullYear()}.${Math.floor(1000 + Math.random() * 9000)}`,
      }));
      loadJournals();
    }
  }, [isOpen, paper]);

  const loadJournals = async () => {
    try {
      setLoadingJournals(true);
      const res = await publisherApi.getJournals();
      const list = res?.data || res || [];
      setJournals(list);
      if (list.length > 0 && !formData.journalId) {
        handleJournalChange(list[0].id);
      }
    } catch (err) {
      console.error('Error fetching journals:', err);
    } finally {
      setLoadingJournals(false);
    }
  };

  const handleJournalChange = async (journalId) => {
    setFormData((prev) => ({ ...prev, journalId, issueId: '' }));
    if (!journalId) {
      setIssues([]);
      return;
    }
    try {
      setLoadingIssues(true);
      const res = await publisherApi.getIssues(journalId);
      const list = res?.data || res || [];
      setIssues(list);
      if (list.length > 0) {
        setFormData((prev) => ({ ...prev, issueId: list[0].id }));
      }
    } catch (err) {
      console.error('Error fetching issues:', err);
    } finally {
      setLoadingIssues(false);
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
    if (!formData.manuscriptId && !paper?.id) {
      toast.error('Please select or specify a manuscript to publish.');
      return;
    }
    if (!formData.journalId || !formData.issueId || !formData.doi || !formData.finalPdfUrl) {
      toast.error('Please fill all required publication fields.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        manuscriptId: paper?.id || formData.manuscriptId,
      };

      const res = await publisherApi.publishPaper(payload);
      if (res?.success || res?.data) {
        toast.success('🎉 Manuscript published live! Certificates & author email dispatched.');
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
              <h2 className="text-lg font-bold text-slate-900">Publish Research Paper</h2>
              <p className="text-xs text-slate-500">Assign volume/issue, DOI metadata, and release the manuscript live.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePublishSubmit} className="space-y-4 mt-4">
          
          {/* Paper Title (Read-only or Input) */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Manuscript Title
            </label>
            <input
              type="text"
              disabled={Boolean(paper?.title)}
              value={paper?.title || formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Advancements in Forensic DNA Analysis..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Journal and Issue Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Target Journal *
              </label>
              <select
                value={formData.journalId}
                onChange={(e) => handleJournalChange(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">{loadingJournals ? 'Loading journals...' : 'Select Journal'}</option>
                {journals.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title} ({j.code || 'Journal'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Volume & Issue *
              </label>
              <select
                value={formData.issueId}
                onChange={(e) => setFormData({ ...formData, issueId: e.target.value })}
                required
                disabled={!formData.journalId || loadingIssues}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100"
              >
                <option value="">
                  {loadingIssues ? 'Loading issues...' : issues.length === 0 ? 'No issues found (Create one first)' : 'Select Issue'}
                </option>
                {issues.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.issueTitle || `Vol. ${i.volumeNo}, Issue ${i.issueNo}`}
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
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Start Page
              </label>
              <input
                type="number"
                placeholder="e.g. 101"
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
                placeholder="e.g. 112"
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
                placeholder="https://..."
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
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
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
                  <span>Publishing...</span>
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
