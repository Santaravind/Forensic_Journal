import React, { useState, useEffect } from 'react';
import { publisherApi } from '../../../api/publisherApi';
import { X, Newspaper, Loader2, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreateIssueModal({ isOpen, onClose, onSuccess }) {
  const [journals, setJournals] = useState([]);
  const [loadingJournals, setLoadingJournals] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    journalId: '',
    volumeNo: '1',
    issueNo: '1',
    issueTitle: '',
    year: currentYear,
    month: months[new Date().getMonth()],
  });

  useEffect(() => {
    if (isOpen) {
      loadJournals();
    }
  }, [isOpen]);

  const loadJournals = async () => {
    try {
      setLoadingJournals(true);
      const res = await publisherApi.getJournals();
      const list = res?.data || res || [];
      setJournals(list);
      if (list.length > 0 && !formData.journalId) {
        setFormData((prev) => ({ ...prev, journalId: list[0].id }));
      }
    } catch (err) {
      console.error('Error fetching journals:', err);
    } finally {
      setLoadingJournals(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.journalId) {
      toast.error('Please select a journal.');
      return;
    }

    try {
      setSubmitting(true);
      const autoTitle = formData.issueTitle.trim() || `Vol. ${formData.volumeNo}, Issue ${formData.issueNo} (${formData.month} ${formData.year})`;
      const payload = {
        ...formData,
        volumeNo: parseInt(formData.volumeNo, 10),
        issueNo: parseInt(formData.issueNo, 10),
        year: parseInt(formData.year, 10),
        issueTitle: autoTitle,
      };

      const res = await publisherApi.createIssue(payload);
      if (res?.success || res?.data) {
        toast.success(`Issue "${autoTitle}" created successfully!`);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.success('Issue created!');
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      console.error('Error creating issue:', err);
      toast.error(err.response?.data?.message || 'Failed to create issue.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <Newspaper size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Publish New Issue</h2>
              <p className="text-xs text-slate-500">Create a new Volume / Issue container under a Journal.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Select Journal *
            </label>
            <select
              required
              value={formData.journalId}
              onChange={(e) => setFormData({ ...formData, journalId: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">{loadingJournals ? 'Loading journals...' : 'Select Journal'}</option>
              {journals.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} ({j.code})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Volume No. *
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.volumeNo}
                onChange={(e) => setFormData({ ...formData, volumeNo: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Issue No. *
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.issueNo}
                onChange={(e) => setFormData({ ...formData, issueNo: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Month *
              </label>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Year *
              </label>
              <input
                type="number"
                min="2020"
                max="2050"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Custom Issue Title (Optional)
            </label>
            <input
              type="text"
              value={formData.issueTitle}
              onChange={(e) => setFormData({ ...formData, issueTitle: e.target.value })}
              placeholder={`e.g. Vol. ${formData.volumeNo}, Issue ${formData.issueNo} (${formData.month} ${formData.year})`}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Actions */}
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
              disabled={submitting}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Creating Issue...</span>
                </>
              ) : (
                <>
                  <PlusCircle size={14} />
                  <span>Create Issue</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
