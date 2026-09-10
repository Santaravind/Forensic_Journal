import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Send, 
  Loader2, 
  AlertCircle,
  Tag,
  MapPin
} from 'lucide-react';
import { researchPaperApi, publisherApi } from '../../api/publisherApi';
import toast from 'react-hot-toast';

export default function ManuscriptDetailModal({ 
  paper, 
  isOpen, 
  onClose, 
  onStatusUpdated,
  onOpenEmailModal
}) {
  const [updating, setUpdating] = useState(false);
  const [editorialNotes, setEditorialNotes] = useState('');

  if (!isOpen || !paper) return null;

  const authorsList = Array.isArray(paper.authors) 
    ? paper.authors 
    : (typeof paper.authors === 'string' ? (() => { try { return JSON.parse(paper.authors); } catch { return []; } })() : []);

  const firstAuthor = authorsList[0] || paper.firstAuthor || {
    name: paper.author || 'Author',
    email: paper.authorEmail || paper.email || 'N/A',
    university: paper.university || paper.organization || 'University/Institute',
    contactNumber: paper.mobileNumber || paper.contactNumber || 'N/A'
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      const res = await researchPaperApi.updatePaperStatus(paper.id || paper.submissionId, newStatus, editorialNotes);
      toast.success(`Manuscript status updated to ${newStatus.replace('_', ' ')}!`);
      if (onStatusUpdated) onStatusUpdated();
      onClose();
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.error(err.response?.data?.message || 'Status updated in preview mode.');
      if (onStatusUpdated) onStatusUpdated();
      onClose();
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || 'NEW_SUBMISSION').toUpperCase();
    if (s.includes('ACCEPT')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (s.includes('REVIEW')) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (s.includes('REVISE') || s.includes('REVISION')) return 'bg-amber-100 text-amber-700 border-amber-200';
    if (s.includes('REJECT')) return 'bg-rose-100 text-rose-700 border-rose-200';
    if (s.includes('PUBLISH')) return 'bg-purple-100 text-purple-700 border-purple-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  const fileUrl = paper.fileUrl || paper.paperFileUrl || paper.manuscriptFileUrl || paper.paperFile;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono font-bold text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100">
                {paper.submissionId || paper.id || 'FP-2026-XXXX'}
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${getStatusBadge(paper.status)}`}>
                {paper.status || 'New Submission'}
              </span>
              {paper.researchArea && (
                <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Tag size={12} /> {paper.researchArea}
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug mt-1">
              {paper.title || paper.paperTitle || paper.caseTitle || 'Manuscript Title'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-6 mt-5 text-xs sm:text-sm">
          
          {/* Abstract */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText size={15} className="text-indigo-600" />
              <span>Abstract</span>
            </h4>
            <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 text-slate-700 leading-relaxed">
              {paper.abstract || 'No abstract provided for this paper submission.'}
            </p>
          </div>

          {/* Keywords */}
          {paper.keywords && (
            <div>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1.5">Keywords</h4>
              <div className="flex flex-wrap gap-1.5">
                {(typeof paper.keywords === 'string' ? paper.keywords.split(',') : paper.keywords).map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 bg-indigo-50/70 text-indigo-700 font-medium text-xs rounded-lg border border-indigo-100">
                    {kw.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Authors Details Section */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <User size={15} className="text-indigo-600" />
              <span>Author(s) & Affiliations</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{firstAuthor.name || 'Primary Author'}</span>
                  <span className="text-[10px] font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded">First Author</span>
                </div>
                <p className="text-slate-500 text-xs flex items-center gap-1.5">
                  <Building2 size={13} /> {firstAuthor.university || firstAuthor.designation || 'Institutional Affiliation'}
                </p>
                <p className="text-slate-500 text-xs flex items-center gap-1.5">
                  <Mail size={13} /> {firstAuthor.email || 'N/A'}
                </p>
                {firstAuthor.contactNumber && (
                  <p className="text-slate-500 text-xs flex items-center gap-1.5">
                    <Phone size={13} /> {firstAuthor.contactNumber}
                  </p>
                )}
              </div>

              {authorsList.slice(1).map((author, idx) => (
                <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{author.name || `Co-Author ${idx + 2}`}</span>
                    <span className="text-[10px] font-semibold text-slate-500">Co-Author</span>
                  </div>
                  <p className="text-slate-500 text-xs flex items-center gap-1.5">
                    <Building2 size={13} /> {author.university || 'Affiliation'}
                  </p>
                  <p className="text-slate-500 text-xs flex items-center gap-1.5">
                    <Mail size={13} /> {author.email || 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Address & Submission Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            <div>
              <span className="text-slate-400 text-xs block mb-1 font-semibold flex items-center gap-1">
                <MapPin size={13} /> Address for Communication:
              </span>
              <p className="text-slate-700 text-xs">
                {[paper.addressLine1, paper.cityDistrict, paper.state, paper.country, paper.postalCode].filter(Boolean).join(', ') || 'Not specified'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 text-xs block mb-1 font-semibold flex items-center gap-1">
                <Clock size={13} /> Submission Date:
              </span>
              <p className="text-slate-700 text-xs font-semibold">
                {paper.submittedAt || paper.created_at || paper.date || new Date().toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>

          {/* Download Manuscript Document */}
          <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-bold text-slate-900 text-xs sm:text-sm">Manuscript Document File</p>
              <p className="text-[11px] text-slate-500">Camera-ready uploaded .doc, .docx, or .pdf</p>
            </div>
            <div className="flex items-center gap-2">
              {fileUrl ? (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Download size={14} />
                  <span>Download File</span>
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">No file attached</span>
              )}
              {onOpenEmailModal && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenEmailModal(firstAuthor, paper);
                  }}
                  className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Mail size={14} className="text-blue-600" />
                  <span>Email Author</span>
                </button>
              )}
            </div>
          </div>

          {/* Editorial Action & Status Transition Controls */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Editorial Decision & Workflow State</h4>
            
            <textarea
              rows={2}
              value={editorialNotes}
              onChange={(e) => setEditorialNotes(e.target.value)}
              placeholder="Optional: Enter editorial feedback or internal remarks for this status transition..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                disabled={updating}
                onClick={() => handleUpdateStatus('UNDER_REVIEW')}
                className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Clock size={13} />
                <span>Send to Review</span>
              </button>

              <button
                type="button"
                disabled={updating}
                onClick={() => handleUpdateStatus('ACCEPTED')}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <CheckCircle2 size={13} />
                <span>Accept Paper</span>
              </button>

              <button
                type="button"
                disabled={updating}
                onClick={() => handleUpdateStatus('REVISION_REQUIRED')}
                className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <AlertCircle size={13} />
                <span>Need Revision</span>
              </button>

              <button
                type="button"
                disabled={updating}
                onClick={() => handleUpdateStatus('REJECTED')}
                className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <XCircle size={13} />
                <span>Reject</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
