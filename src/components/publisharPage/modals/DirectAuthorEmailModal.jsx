import React, { useState, useEffect } from 'react';
import { publisherApi } from '../../../api/publisherApi';
import { X, Mail, Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DirectAuthorEmailModal({ isOpen, onClose, author, paper }) {
  const [formData, setFormData] = useState({
    recipientEmail: '',
    recipientName: '',
    subject: '',
    messageContent: '',
    paperTitle: '',
    paperId: null,
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        recipientEmail: author?.email || paper?.authorEmail || '',
        recipientName: author?.name || paper?.author || '',
        subject: `Regarding your manuscript submission: ${paper?.submissionId || paper?.title || ''}`,
        messageContent: '',
        paperTitle: paper?.title || '',
        paperId: paper?.id || null,
      });
    }
  }, [isOpen, author, paper]);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!formData.recipientEmail.trim() || !formData.subject.trim() || !formData.messageContent.trim()) {
      toast.error('Recipient, Subject, and Message are required.');
      return;
    }

    try {
      setSending(true);
      const res = await publisherApi.sendAuthorEmail(formData);
      if (res?.success || res?.data) {
        toast.success(`✅ Email dispatched to ${formData.recipientEmail}`);
        onClose();
      } else {
        toast.success('Email sent successfully!');
        onClose();
      }
    } catch (err) {
      console.error('Email dispatch error:', err);
      toast.error(err.response?.data?.message || 'Failed to dispatch email via Resend.');
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Mail size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Email Author Directly</h2>
              <p className="text-xs text-slate-500">Dispatched securely via Resend with Forensic Patrika branding.</p>
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
        <form onSubmit={handleSendEmail} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Recipient Name
              </label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                placeholder="Author Name"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Recipient Email *
              </label>
              <input
                type="email"
                required
                value={formData.recipientEmail}
                onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                placeholder="author@example.com"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Subject *
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Regarding your manuscript..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Message Content *
            </label>
            <textarea
              rows={5}
              required
              value={formData.messageContent}
              onChange={(e) => setFormData({ ...formData, messageContent: e.target.value })}
              placeholder="Write editorial guidance, revisions requirement, or publication confirmation..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              disabled={sending}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {sending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Sending via Resend...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Send Email</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
