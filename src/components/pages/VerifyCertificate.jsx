import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { researchPaperApi } from '../../api/publisherApi';
import { ShieldCheck, CheckCircle2, XCircle, Loader2, ArrowLeft, Download, FileText, Calendar, BookOpen, User } from 'lucide-react';
import logo from '../assets/logoss.png';

export default function VerifyCertificate() {
  const { qrCode } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (qrCode) {
      loadVerification(qrCode);
    } else {
      setLoading(false);
      setError('No verification code provided.');
    }
  }, [qrCode]);

  const loadVerification = async (code) => {
    try {
      setLoading(true);
      setError(null);
      const res = await researchPaperApi.verifyCertificate(code);
      if (res?.success && res?.data) {
        setResult(res.data);
      } else if (res?.valid !== false && (res?.certificateNo || res?.recipientName)) {
        setResult(res);
      } else {
        setResult(null);
        setError(res?.message || 'Certificate verification failed.');
      }
    } catch (err) {
      console.error('Certificate verification error:', err);
      setError(err.response?.data?.message || 'Unable to verify certificate with the official registry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-100 via-indigo-50/30 to-slate-100 flex flex-col items-center justify-center p-4 py-12">
      
      {/* Top Brand */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white shadow-md p-1 flex items-center justify-center overflow-hidden">
          <img src={logo} alt="Logo" className="w-8 h-8 object-cover rounded-full" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 leading-tight">Forensic Patrika</h2>
          <p className="text-xs text-indigo-600 font-semibold">Institutional Certificate Registry</p>
        </div>
      </div>

      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 text-center relative overflow-hidden">
        
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

        {loading ? (
          <div className="py-16 space-y-4">
            <Loader2 size={40} className="animate-spin text-indigo-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Verifying Certificate Authenticity...</h3>
            <p className="text-xs text-slate-500">Checking cryptographically against Forensic Patrika Records</p>
          </div>
        ) : result && !error ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-full mb-2">
                VERIFIED AUTHENTIC
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">Certificate of Publication</h1>
              <p className="text-xs text-slate-500 mt-1">Officially issued and registered by Forensic Patrika Editorial Board</p>
            </div>

            {/* Certificate Details Card */}
            <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-3.5 border border-slate-200/70 text-xs sm:text-sm">
              <div className="flex items-start justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Certificate No:</span>
                <span className="font-mono font-bold text-slate-900">{result.certificateNo || result.certificate_no}</span>
              </div>

              <div className="flex items-start justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <User size={14} className="text-indigo-600" /> Recipient:
                </span>
                <span className="font-bold text-slate-800 text-right">{result.recipientName || result.recipient_name}</span>
              </div>

              <div className="pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium block mb-1 flex items-center gap-1.5">
                  <FileText size={14} className="text-indigo-600" /> Research Paper Title:
                </span>
                <span className="font-semibold text-slate-900 block bg-white p-2.5 rounded-lg border border-slate-200/60 leading-snug">
                  {result.paperTitle || result.title || 'Advancements in Forensic Science'}
                </span>
              </div>

              <div className="flex items-start justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <BookOpen size={14} className="text-indigo-600" /> Journal & Issue:
                </span>
                <span className="font-semibold text-slate-800 text-right">
                  {result.journalTitle || result.journal} {result.issueTitle ? `(${result.issueTitle})` : ''}
                </span>
              </div>

              {result.doi && (
                <div className="flex items-start justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Digital Object Identifier (DOI):</span>
                  <span className="font-mono font-bold text-indigo-600">{result.doi}</span>
                </div>
              )}

              <div className="flex items-start justify-between">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Calendar size={14} className="text-indigo-600" /> Issue Date:
                </span>
                <span className="font-semibold text-slate-700">{result.issueDate || result.issue_date || result.date || 'May 2026'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {(result.certificatePdfUrl || result.certificate_pdf_url) && (
                <a
                  href={result.certificatePdfUrl || result.certificate_pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Download size={16} />
                  <span>Download Official PDF</span>
                </a>
              )}
              <Link
                to="/"
                className="w-full sm:w-auto px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft size={16} />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-6 animate-in fade-in duration-300">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <XCircle size={36} />
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-full mb-2">
                VERIFICATION FAILED
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Invalid or Unrecognized Certificate</h1>
              <p className="text-xs text-rose-600 mt-2 max-w-sm mx-auto">
                {error || 'The QR verification hash could not be validated against the Forensic Patrika publishing database.'}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 text-left">
              <p className="font-semibold text-slate-700 mb-1">Notice to Institutions & Verifiers:</p>
              <p>If you believe this is an error, please contact the publishing office with the certificate details at <strong>publisher@forensicpatrika.com</strong>.</p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Forensic Patrika</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
