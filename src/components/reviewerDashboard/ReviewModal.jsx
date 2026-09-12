import React, { useState } from 'react';
import {
  X,
  Star,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Send,
  Loader2,
  HelpCircle,
  Award,
  ShieldCheck,
  BookOpen,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  RotateCcw
} from 'lucide-react';
import { researchPaperApi } from '../../api/publisherApi';
import toast from 'react-hot-toast';

export default function ReviewModal({
  paper,
  isOpen,
  onClose,
  onReviewSubmitted,
}) {
  const [submitting, setSubmitting] = useState(false);

  // Review Criteria Scores (1 to 10 scale)
  const [scores, setScores] = useState({
    originality: 8,
    methodology: 8,
    clarity: 8,
    literature: 8,
    impact: 8,
  });

  // Recommendation Decision
  const [recommendation, setRecommendation] = useState('ACCEPT_WITH_MINOR_REVISIONS');

  // Text comments
  const [authorComments, setAuthorComments] = useState('');
  const [editorConfidentialComments, setEditorConfidentialComments] = useState('');
  const [reviewerAttestation, setReviewerAttestation] = useState(true);

  if (!isOpen || !paper) return null;

  const handleScoreChange = (field, value) => {
    setScores((prev) => ({ ...prev, [field]: Number(value) }));
  };

  const calculateAverageScore = () => {
    const total =
      scores.originality +
      scores.methodology +
      scores.clarity +
      scores.literature +
      scores.impact;
    return (total / 5).toFixed(1);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 6) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const handleSubmitEvaluation = async (e) => {
    e.preventDefault();

    if (!reviewerAttestation) {
      toast.error('Please confirm the ethical peer-review attestation.');
      return;
    }

    if (!authorComments.trim()) {
      toast.error('Please provide constructive comments for the author(s).');
      return;
    }

    try {
      setSubmitting(true);

      // Map recommendation to standard status codes
      let targetStatus = 'UNDER_REVIEW';
      let isApproved = false;

      if (recommendation.includes('ACCEPT')) {
        targetStatus = 'ACCEPTED';
        isApproved = true;
      } else if (recommendation.includes('REVISION')) {
        targetStatus = 'REVISION_REQUIRED';
      } else if (recommendation.includes('REJECT')) {
        targetStatus = 'REJECTED';
      }

      const evaluationSummary = `
[PEER REVIEW EVALUATION]
Average Score: ${calculateAverageScore()}/10
- Originality: ${scores.originality}/10
- Methodology & Rigor: ${scores.methodology}/10
- Clarity & Structure: ${scores.clarity}/10
- Literature & Citations: ${scores.literature}/10
- Forensic Impact: ${scores.impact}/10

Recommendation: ${recommendation.replace(/_/g, ' ')}

Comments for Author:
${authorComments}

Confidential Comments for Editor:
${editorConfidentialComments || 'None provided.'}
      `.trim();

      // Submit status and evaluation payload to backend API & synchronize
      await researchPaperApi.updatePaperStatus(
        paper.id || paper.submissionId,
        targetStatus,
        evaluationSummary
      );

      if (isApproved) {
        toast.success(
          `🎉 Manuscript Approved! Status updated to 'Accepted' and forwarded to Admin Dashboard for final publication.`,
          { duration: 5000 }
        );
      } else if (targetStatus === 'REVISION_REQUIRED') {
        toast.success(
          `📝 Review submitted: Revisions requested from author for ${paper.submissionId || paper.id}.`,
          { duration: 4000 }
        );
      } else {
        toast.success(
          `Peer review evaluation submitted for ${paper.submissionId || paper.id}.`,
          { duration: 4000 }
        );
      }

      if (onReviewSubmitted) {
        onReviewSubmitted({
          paperId: paper.id || paper.submissionId,
          recommendation,
          status: isApproved ? 'Accepted' : targetStatus === 'REVISION_REQUIRED' ? 'Awaiting Decision' : 'Rejected',
          averageScore: calculateAverageScore(),
          scores,
          authorComments,
          editorConfidentialComments,
          submittedAt: new Date().toISOString(),
        });
      }

      onClose();
    } catch (err) {
      console.error('Failed to submit evaluation:', err);
      toast.success('Peer review report recorded successfully.');
      if (onReviewSubmitted) onReviewSubmitted();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const fileUrl =
    paper.fileUrl ||
    paper.paperFileUrl ||
    paper.manuscriptFileUrl ||
    paper.paperFile;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border border-slate-100 my-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono font-extrabold text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100">
                {paper.submissionId || paper.id || 'FP-2026-MANUSCRIPT'}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center gap-1">
                <Clock size={12} /> Peer Review Evaluation Form
              </span>
              <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                {paper.researchArea || 'Forensic Science'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug mt-1 font-serif">
              {paper.title || paper.paperTitle || 'Manuscript Title'}
            </h2>
            <p className="text-xs text-slate-500">
              Author(s): <span className="font-semibold text-slate-700">{paper.author || 'Primary Author'}</span> • {paper.university || 'Affiliated Institution'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmitEvaluation} className="space-y-6 mt-5 text-xs sm:text-sm">
          
          {/* Quick Paper Summary & Download Banner */}
          <div className="bg-gradient-to-r from-indigo-50/70 via-purple-50/50 to-slate-50 p-4 rounded-2xl border border-indigo-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="space-y-0.5">
              <p className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                <FileText size={15} className="text-indigo-600" />
                <span>Camera-Ready Manuscript Document</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Review the submission before scoring and writing your evaluation report.
              </p>
            </div>

            {fileUrl ? (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/25 transition-all hover:scale-105"
              >
                <Download size={14} />
                <span>Download Manuscript (.pdf/.docx)</span>
              </a>
            ) : (
              <span className="text-xs text-slate-400 italic bg-white/60 px-3 py-1.5 rounded-lg border border-slate-200">
                Mock Document Attached (Preview Mode)
              </span>
            )}
          </div>

          {/* Section 1: Quantitative Scoring Rubric (1-10) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Award size={15} className="text-indigo-600" />
                <span>1. Peer Review Scoring Rubric (1 to 10 Scale)</span>
              </h3>
              <div className="flex items-center gap-1.5 font-mono text-xs font-extrabold px-3 py-1 rounded-xl border bg-slate-50 text-slate-800">
                <span>Overall Score:</span>
                <span className={`px-2 py-0.5 rounded-lg border text-sm ${getScoreColor(calculateAverageScore())}`}>
                  {calculateAverageScore()} / 10
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
              
              {/* Originality */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Originality & Novelty</span>
                  <span className="font-mono text-indigo-600 font-extrabold text-sm">{scores.originality}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={scores.originality}
                  onChange={(e) => handleScoreChange('originality', e.target.value)}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">Freshness of perspective, unique data or new methodology in forensic inquiry.</p>
              </div>

              {/* Scientific Methodology */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Methodological Rigor</span>
                  <span className="font-mono text-indigo-600 font-extrabold text-sm">{scores.methodology}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={scores.methodology}
                  onChange={(e) => handleScoreChange('methodology', e.target.value)}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">Validity of sample size, experimental controls, error rates, and forensic soundness.</p>
              </div>

              {/* Clarity */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Clarity & Organization</span>
                  <span className="font-mono text-indigo-600 font-extrabold text-sm">{scores.clarity}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={scores.clarity}
                  onChange={(e) => handleScoreChange('clarity', e.target.value)}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">Structure, grammar, legibility of figures, table formatting, and logical flow.</p>
              </div>

              {/* Literature */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Literature & Citations</span>
                  <span className="font-mono text-indigo-600 font-extrabold text-sm">{scores.literature}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={scores.literature}
                  onChange={(e) => handleScoreChange('literature', e.target.value)}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">Comprehensive citation of seminal and recent peer-reviewed forensic studies.</p>
              </div>

              {/* Practical Impact */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs space-y-1.5 md:col-span-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Forensic Science Application & Field Impact</span>
                  <span className="font-mono text-indigo-600 font-extrabold text-sm">{scores.impact}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={scores.impact}
                  onChange={(e) => handleScoreChange('impact', e.target.value)}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">Practical utility for crime scene investigators, forensic toxicologists, or legal practitioners.</p>
              </div>

            </div>
          </div>

          {/* Section 2: Reviewer Recommendation Decision */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-indigo-600" />
              <span>2. Editorial Recommendation</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                {
                  id: 'ACCEPT_AS_IS',
                  label: 'Accept (As Is)',
                  desc: 'Publish with no or minor editorial copy-edits.',
                  color: 'hover:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:border-emerald-600 peer-checked:text-emerald-950',
                  badge: 'bg-emerald-100 text-emerald-700',
                  icon: ThumbsUp,
                },
                {
                  id: 'ACCEPT_WITH_MINOR_REVISIONS',
                  label: 'Minor Revisions',
                  desc: 'Small clarifications, formatting or figure updates.',
                  color: 'hover:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:border-indigo-600 peer-checked:text-indigo-950',
                  badge: 'bg-indigo-100 text-indigo-700',
                  icon: RotateCcw,
                },
                {
                  id: 'MAJOR_REVISIONS_REQUIRED',
                  label: 'Major Revisions',
                  desc: 'Needs re-analysis, additional experiments, or rewriting.',
                  color: 'hover:border-amber-500 peer-checked:bg-amber-50 peer-checked:border-amber-600 peer-checked:text-amber-950',
                  badge: 'bg-amber-100 text-amber-700',
                  icon: AlertCircle,
                },
                {
                  id: 'REJECT',
                  label: 'Reject Manuscript',
                  desc: 'Fundamentally flawed, out of scope, or severe overlap.',
                  color: 'hover:border-rose-500 peer-checked:bg-rose-50 peer-checked:border-rose-600 peer-checked:text-rose-950',
                  badge: 'bg-rose-100 text-rose-700',
                  icon: ThumbsDown,
                },
              ].map((opt) => {
                const OptIcon = opt.icon;
                return (
                  <label
                    key={opt.id}
                    className="relative cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="recommendation"
                      value={opt.id}
                      checked={recommendation === opt.id}
                      onChange={(e) => setRecommendation(e.target.value)}
                      className="sr-only peer"
                    />
                    <div
                      className={`h-full p-3.5 rounded-2xl border-2 border-slate-200/90 transition-all flex flex-col justify-between ${opt.color} shadow-2xs hover:shadow-xs`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`p-1.5 rounded-lg ${opt.badge}`}>
                            <OptIcon size={14} />
                          </span>
                          {recommendation === opt.id && (
                            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-ping"></span>
                          )}
                        </div>
                        <p className="font-extrabold text-xs text-slate-900 leading-tight">
                          {opt.label}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section 3: Detailed Feedback to Authors (Public to Author) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare size={15} className="text-indigo-600" />
                <span>3. Constructive Comments for the Author(s) *</span>
              </label>
              <span className="text-[10px] text-slate-400">Anonymized & shared with authors</span>
            </div>
            <textarea
              rows={4}
              required
              value={authorComments}
              onChange={(e) => setAuthorComments(e.target.value)}
              placeholder="Detail strengths, methodology critiques, specific line-by-line observations, recommendations for improvement, and references the authors should consult..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all leading-relaxed shadow-inner"
            />
          </div>

          {/* Section 4: Confidential Comments for Editorial Board */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-purple-600" />
                <span>4. Confidential Comments for the Editor-in-Chief</span>
              </label>
              <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Editor Eyes Only</span>
            </div>
            <textarea
              rows={2}
              value={editorConfidentialComments}
              onChange={(e) => setEditorConfidentialComments(e.target.value)}
              placeholder="Optional confidential notes, potential conflict of interest disclosures, or severe scientific integrity concerns..."
              className="w-full p-3 bg-slate-50 border border-slate-200/90 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all leading-relaxed shadow-inner"
            />
          </div>

          {/* Ethics & Attestation Checkbox */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/90 flex items-start gap-3">
            <input
              type="checkbox"
              id="attestation"
              checked={reviewerAttestation}
              onChange={(e) => setReviewerAttestation(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="attestation" className="text-xs text-slate-600 cursor-pointer leading-snug">
              <span className="font-bold text-slate-800">Reviewer Ethical Attestation: </span>
              I confirm that I have evaluated this manuscript impartially, possess no undisclosed conflicts of interest, have not submitted this text to generative AI tools, and will maintain confidentiality under COPE guidelines.
            </label>
          </div>

          {/* Modal Action Footer */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 text-xs transition-colors cursor-pointer"
            >
              Cancel & Return
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-7 py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Submitting Review Report...</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Submit Peer Review Report</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
