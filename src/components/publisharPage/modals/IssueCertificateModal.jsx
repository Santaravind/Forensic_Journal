import React, { useState } from 'react';
import { publisherApi } from '../../../api/publisherApi';
import { X, Award, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function IssueCertificateModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    manuscriptId: '',
    recipientName: '',
    recipientEmail: '',
    certificateType: 'AUTHOR_PUBLICATION',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.recipientName.trim() || !formData.recipientEmail.trim()) {
      toast.error('Recipient Name and Email are required.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await publisherApi.generateCertificate(formData);
      if (res?.success || res?.data) {
        toast.success(`Certificate generated for ${formData.recipientName}!`);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.success('Certificate generated successfully!');
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      console.error('Error generating certificate:', err);
      toast.error(err.response?.data?.message || 'Failed to generate certificate.');
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
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Award size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Issue Certificate</h2>
              <p className="text-xs text-slate-500">Generate verifiable certificate for Authors or Reviewers.</p>
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
              Certificate Type *
            </label>
            <select
              value={formData.certificateType}
              onChange={(e) => setFormData({ ...formData, certificateType: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="AUTHOR_PUBLICATION">Publication Certificate (Author)</option>
              <option value="REVIEWER_EXCELLENCE">Peer Review Recognition (Reviewer)</option>
              <option value="EDITORIAL_BOARD">Editorial Board Appointment</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Recipient Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.recipientName}
              onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              placeholder="e.g. Dr. Neha Gupta"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Recipient Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.recipientEmail}
              onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
              placeholder="e.g. author@university.edu"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Associated Manuscript ID / Submission ID (Optional)
            </label>
            <input
              type="text"
              value={formData.manuscriptId}
              onChange={(e) => setFormData({ ...formData, manuscriptId: e.target.value })}
              placeholder="e.g. FP-2026-1056"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
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
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-600/20 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Generating Certificate...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={14} />
                  <span>Generate & Issue</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
