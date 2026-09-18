import React, { useState, useEffect } from "react";
import {
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
  FileText,
  User,
  ExternalLink,
  RotateCcw,
  History,
  Copy,
  Plus,
  Trash2,
  Info,
  ShieldCheck,
  Building2,
  Calendar,
} from "lucide-react";
import { adminEmailApi } from "../../api/publisherApi";
import { authService } from "../../services/authService";
import toast from "react-hot-toast";

const STORAGE_SENT_EMAILS_KEY = "forensic_admin_dispatched_emails";

const PRESET_TEMPLATES = [
  {
    id: "revision",
    name: "Revision Request",
    badge: "Editorial",
    subject: "Revision Required: Regarding your Manuscript Submission to Forensic Patrika",
    recipientName: "Dr. Author",
    message:
      "Dear {name},\n\nThank you for submitting your research manuscript to Forensic Patrika. Our editorial board and peer reviewers have completed the initial assessment of your paper.\n\nWhile your research presents notable merits in the field of forensic science, minor revisions and clarifications are required before we can proceed to final acceptance. Please review the detailed reviewer remarks in the portal and submit your revised draft alongside an itemized response sheet.\n\nWe look forward to receiving your revised manuscript.",
    senderName: "Forensic Patrika Editorial Board",
    senderTitle: "Chief Editorial Office",
    buttonText: "Open Author Portal",
    buttonUrl: "https://forensicpatrika.com/login",
  },
  {
    id: "acceptance",
    name: "Paper Acceptance",
    badge: "Publishing",
    subject: "Official Acceptance: Your Research Paper has been Accepted for Publication",
    recipientName: "Dr. Author",
    message:
      "Dear {name},\n\nWe are delighted to inform you that your research paper has been officially ACCEPTED for publication in Forensic Patrika (A Journal of Forensic Science).\n\nYour manuscript has completed the double-blind peer review process with flying colors. Our production team is now preparing the camera-ready galley proofs and assigning your official Digital Object Identifier (DOI).\n\nCongratulations on this milestone contribution to forensic scholarship!",
    senderName: "Dr. Indresh Kumar",
    senderTitle: "Editor-in-Chief & Publisher",
    buttonText: "View Paper Status",
    buttonUrl: "https://forensicpatrika.com/paper-status",
  },
  {
    id: "reviewer_invitation",
    name: "Reviewer Invitation",
    badge: "Peer Review",
    subject: "Invitation to Peer Review a Manuscript for Forensic Patrika",
    recipientName: "Prof. Forensic Expert",
    message:
      "Dear {name},\n\nGiven your recognized expertise in forensic sciences, we cordially invite you to serve as an expert peer reviewer for an incoming manuscript submitted to Forensic Patrika.\n\nTitle: Advanced Forensic Investigation Methodologies\nAbstract Preview: The paper investigates cutting-edge experimental paradigms in biological evidence individualization.\n\nIf you are available to evaluate this manuscript within the standard 14-day review window, please confirm your availability by clicking the link below.",
    senderName: "Editorial Review Secretariat",
    senderTitle: "Peer Review Coordinator",
    buttonText: "Accept / Decline Review",
    buttonUrl: "https://forensicpatrika.com/review",
  },
  {
    id: "call_for_papers",
    name: "Call for Papers",
    badge: "Broadcast",
    subject: "Call for Papers: Volume 10, Issue 2 - Forensic Patrika Journal",
    recipientName: "Distinguished Researcher",
    message:
      "Dear {name},\n\nForensic Patrika (ISSN Registered, Peer-Reviewed Open Access Journal) is now accepting original research papers, case reports, review articles, and technical notes for our upcoming Volume 10, Issue 2 release.\n\nKey Domain Areas:\n• Forensic DNA & Genetics\n• Digital Forensics & Cybercrime\n• Forensic Toxicology & Chemistry\n• Ballistics, Fingerprints & Questioned Documents\n\nAll accepted papers receive immediate DOI registration and broad global scholarly indexing.",
    senderName: "Forensic Patrika Publications",
    senderTitle: "Editorial Communications",
    buttonText: "Submit Manuscript Online",
    buttonUrl: "https://forensicpatrika.com/reserchform",
  },
  {
    id: "general_notice",
    name: "General Notice",
    badge: "Official",
    subject: "Important Editorial Communication from Forensic Patrika",
    recipientName: "Colleague",
    message:
      "Dear {name},\n\nWe are writing to share an important update regarding our editorial policies and upcoming scholarly issues.\n\nShould you have any questions or require administrative assistance, please feel free to reply directly to this communication or reach out through our official portal.",
    senderName: "Super Admin",
    senderTitle: "Journal Administrator",
    buttonText: "Visit Journal Website",
    buttonUrl: "https://forensicpatrika.com",
  },
];

export default function AdminEmailDispatcher() {
  const currentUser = authService.getCurrentUser() || {
    fullName: "Super Admin",
    email: "admin@forensicpatrika.com",
    role: "ADMIN",
  };

  const [formData, setFormData] = useState({
    to: "",
    recipientName: "",
    ccText: "",
    subject: "",
    message: "",
    senderName: currentUser.fullName || "Forensic Patrika Editorial",
    senderTitle: "Super Administrator • Editorial Office",
    hasButton: true,
    buttonText: "Open Journal Portal",
    buttonUrl: "https://forensicpatrika.com/login",
  });

  const [sending, setSending] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [sentHistory, setSentHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useEffect(() => {
    loadSentHistory();
  }, []);

  const loadSentHistory = () => {
    try {
      const raw = localStorage.getItem(STORAGE_SENT_EMAILS_KEY);
      if (raw) {
        setSentHistory(JSON.parse(raw));
      }
    } catch (e) {
      console.warn("Could not load sent emails history:", e);
    }
  };

  const saveSentEmail = (emailRecord) => {
    try {
      const updated = [emailRecord, ...sentHistory].slice(0, 50);
      setSentHistory(updated);
      localStorage.setItem(STORAGE_SENT_EMAILS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save sent email record:", e);
    }
  };

  const handleApplyTemplate = (templateId) => {
    const tpl = PRESET_TEMPLATES.find((t) => t.id === templateId);
    if (!tpl) return;

    setSelectedTemplate(templateId);
    setFormData((prev) => ({
      ...prev,
      subject: tpl.subject,
      recipientName: prev.recipientName || tpl.recipientName,
      message: tpl.message.replace(
        "{name}",
        prev.recipientName || tpl.recipientName || "Scholar"
      ),
      senderName: tpl.senderName || prev.senderName,
      senderTitle: tpl.senderTitle || prev.senderTitle,
      hasButton: Boolean(tpl.buttonText),
      buttonText: tpl.buttonText || "Open Portal",
      buttonUrl: tpl.buttonUrl || "https://forensicpatrika.com",
    }));
    toast.success(`Template "${tpl.name}" applied!`, { duration: 2000 });
  };

  const handleClearForm = () => {
    setFormData({
      to: "",
      recipientName: "",
      ccText: "",
      subject: "",
      message: "",
      senderName: currentUser.fullName || "Forensic Patrika Editorial",
      senderTitle: "Super Administrator • Editorial Office",
      hasButton: true,
      buttonText: "Open Journal Portal",
      buttonUrl: "https://forensicpatrika.com/login",
    });
    setSelectedTemplate("");
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    const recipient = formData.to.trim();
    if (!recipient) {
      toast.error("Recipient email address is required.");
      return;
    }

    if (!formData.subject.trim()) {
      toast.error("Subject line is required.");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Email message content cannot be empty.");
      return;
    }

    // Process CC emails array
    const ccArray = formData.ccText
      ? formData.ccText
          .split(/[,;\n]/)
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const payload = {
      to: recipient,
      recipientName: formData.recipientName.trim() || undefined,
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      senderName: formData.senderName.trim() || undefined,
      senderTitle: formData.senderTitle.trim() || undefined,
      buttonText: formData.hasButton ? formData.buttonText.trim() : undefined,
      buttonUrl: formData.hasButton ? formData.buttonUrl.trim() : undefined,
      cc: ccArray.length > 0 ? ccArray : undefined,
    };

    try {
      setSending(true);
      const loadingToast = toast.loading(`Dispatching email to ${recipient}...`);

      const res = await adminEmailApi.sendCustomEmail(payload);

      toast.dismiss(loadingToast);
      toast.success(
        res?.message || `✅ Email successfully dispatched to: ${recipient}`,
        { duration: 4500 }
      );

      // Save to local dispatched log
      saveSentEmail({
        id: "EML-" + Date.now(),
        to: recipient,
        recipientName: formData.recipientName,
        subject: formData.subject,
        message: formData.message,
        senderName: formData.senderName,
        date: new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      // Reset recipient for next dispatch but keep signature
      setFormData((prev) => ({
        ...prev,
        to: "",
        recipientName: "",
        ccText: "",
        subject: "",
        message: "",
      }));
      setSelectedTemplate("");
    } catch (err) {
      console.error("Failed to send custom email:", err);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to dispatch email. Ensure backend is online.";
      toast.error(`❌ ${errMsg}`, { duration: 5000 });
    } finally {
      setSending(false);
    }
  };

  const handleReuseFromHistory = (item) => {
    setFormData((prev) => ({
      ...prev,
      to: item.to,
      recipientName: item.recipientName || "",
      subject: item.subject,
      message: item.message,
      senderName: item.senderName || prev.senderName,
    }));
    setShowHistoryModal(false);
    toast.success(`Draft loaded from history: ${item.to}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-[#090B1E] via-[#0D163D] to-[#121B4C] rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
              <Mail size={13} />
              <span>Executive Email Dispatcher & Custom Mailer</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-serif tracking-tight text-white">
              Official Journal Communication Hub
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/80 leading-relaxed">
              Compose and send authenticated editorial emails directly to authors, reviewers, institutions, or custom recipients with official Forensic Patrika branding.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {sentHistory.length > 0 && (
              <button
                onClick={() => setShowHistoryModal(true)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <History size={14} className="text-indigo-300" />
                <span>Sent History ({sentHistory.length})</span>
              </button>
            )}

            <button
              onClick={handleClearForm}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RotateCcw size={14} className="text-slate-300" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Status Pill Strip */}
        <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-[11px] text-indigo-200/80">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <strong className="text-white">API Gateway:</strong> /api/admin/send-custom-email
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-indigo-400" />
              <strong className="text-white">Access:</strong> Bearer Token (ADMIN / PUBLISHER)
            </span>
          </div>

          <span className="bg-indigo-950/80 px-2.5 py-0.5 rounded-lg border border-indigo-700/40 font-mono text-[10px] text-indigo-300">
            Resend & SMTP Operational
          </span>
        </div>
      </div>

      {/* 1-Click Quick Template Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles size={14} className="text-indigo-600" />
            <span>1-Click Preset Editorial Templates:</span>
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Click any preset to auto-fill professional draft content
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {PRESET_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => handleApplyTemplate(tpl.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border flex items-center gap-2 ${
                selectedTemplate === tpl.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              <span>{tpl.name}</span>
              <span
                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
                  selectedTemplate === tpl.id
                    ? "bg-white/20 text-white"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
                {tpl.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout: Form Composer (Left) & Real-Time Inbox Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: EMAIL COMPOSER FORM */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
          <form onSubmit={handleSendEmail} className="space-y-4">
            
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText size={17} className="text-indigo-600" />
                <span>Compose Message</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Fill in the recipient email address, subject, and message details below.
              </p>
            </div>

            {/* Recipient Email & Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Recipient Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 text-slate-400" size={15} />
                  <input
                    type="email"
                    required
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    placeholder="author@university.edu"
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Recipient Full Name <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 text-slate-400" size={15} />
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    placeholder="Dr. Sarah Connor"
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* CC List (Optional) */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                CC Emails <span className="text-slate-400 font-normal">(Optional, comma separated)</span>
              </label>
              <input
                type="text"
                value={formData.ccText}
                onChange={(e) => setFormData({ ...formData, ccText: e.target.value })}
                placeholder="co-author@university.edu, editor@forensicpatrika.com"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
              />
            </div>

            {/* Subject Line */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Subject Line <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Regarding your Manuscript Submission..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Message Body Content */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Message Content / Body <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  {formData.message.length} chars • {formData.message.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                rows={7}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your email body here. Use paragraphs and bullet points for clean readability..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-sans"
              />
            </div>

            {/* Sender Signature Customization */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">
                Official Sender Signature:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    value={formData.senderName}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                    placeholder="Sender Name"
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    Sender Title / Designation
                  </label>
                  <input
                    type="text"
                    value={formData.senderTitle}
                    onChange={(e) => setFormData({ ...formData, senderTitle: e.target.value })}
                    placeholder="Chief Editorial Board"
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Call To Action (CTA) Button Toggle & Fields */}
            <div className="p-3.5 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="enableCTA"
                    checked={formData.hasButton}
                    onChange={(e) => setFormData({ ...formData, hasButton: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 rounded-sm border-slate-300 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="enableCTA" className="text-xs font-bold text-slate-800 cursor-pointer">
                    Include Call-to-Action (CTA) Button in Email
                  </label>
                </div>
                <span className="text-[10px] text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full font-semibold">
                  Recommended
                </span>
              </div>

              {formData.hasButton && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Button Label Text
                    </label>
                    <input
                      type="text"
                      value={formData.buttonText}
                      onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                      placeholder="Open Author Portal"
                      className="w-full px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Target URL
                    </label>
                    <input
                      type="url"
                      value={formData.buttonUrl}
                      onChange={(e) => setFormData({ ...formData, buttonUrl: e.target.value })}
                      placeholder="https://forensicpatrika.com/portal"
                      className="w-full px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleClearForm}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Clear Fields
              </button>

              <button
                type="submit"
                disabled={sending}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/25 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {sending ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Dispatching via API...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Dispatch Email Now</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* RIGHT COLUMN: REAL-TIME INBOX PREVIEW CARD */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4 sticky top-20">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
              <h3 className="text-sm font-bold text-slate-900">
                Live Recipient Inbox Preview
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
              HTML Email Mockup
            </span>
          </div>

          {/* Email Client Container */}
          <div className="bg-slate-100/90 p-3 sm:p-4 rounded-2xl border border-slate-200/90 text-xs shadow-inner space-y-3">
            
            {/* Meta Headers */}
            <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-semibold">From:</span>
                <span className="text-[11px] font-bold text-slate-800 truncate">
                  {formData.senderName || "Forensic Patrika"} &lt;editorial@forensicpatrika.com&gt;
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-semibold">To:</span>
                <span className="text-[11px] font-bold text-indigo-700 truncate">
                  {formData.to || "recipient@example.com"}
                  {formData.recipientName && ` (${formData.recipientName})`}
                </span>
              </div>
              {formData.ccText && (
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-semibold">CC:</span>
                  <span className="text-[10px] text-slate-500 font-mono truncate max-w-[200px]">
                    {formData.ccText}
                  </span>
                </div>
              )}
              <div className="pt-1.5 border-t border-slate-100 flex items-start gap-1.5">
                <span className="text-[11px] text-slate-400 font-semibold shrink-0">Subject:</span>
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {formData.subject || "Subject line will appear here..."}
                </span>
              </div>
            </div>

            {/* Rendered Email Body Box */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 space-y-4 shadow-2xs">
              
              {/* Header Logo Banner */}
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    FP
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 leading-none">FORENSIC PATRIKA</p>
                    <p className="text-[9px] text-slate-400 leading-none mt-0.5">A Journal of Forensic Science</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-400">
                  {new Date().toLocaleDateString("en-GB")}
                </span>
              </div>

              {/* Salutation */}
              <p className="font-bold text-slate-800 text-xs">
                Dear {formData.recipientName || "Scholar / Colleague"},
              </p>

              {/* Message text formatted with linebreaks */}
              <div className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                {formData.message || "Write your message content on the left to see live formatting in this email view..."}
              </div>

              {/* Rendered CTA button */}
              {formData.hasButton && formData.buttonText && (
                <div className="pt-2 pb-2 text-center">
                  <a
                    href={formData.buttonUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.preventDefault()}
                    className="inline-block px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/25 pointer-events-none"
                  >
                    {formData.buttonText} →
                  </a>
                </div>
              )}

              {/* Signature block */}
              <div className="pt-3 border-t border-slate-100 space-y-0.5">
                <p className="text-xs font-bold text-slate-900">{formData.senderName || "Editorial Board"}</p>
                <p className="text-[11px] text-indigo-600 font-semibold">{formData.senderTitle || "Chief Editorial Office"}</p>
                <p className="text-[10px] text-slate-400">Forensic Patrika • Official Scholarly Publications</p>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* DISPATCH HISTORY MODAL */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 my-8 max-h-[85vh] flex flex-col">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <History size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recently Dispatched Custom Emails</h3>
                  <p className="text-xs text-slate-500">History of emails sent from this administrative console.</p>
                </div>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {sentHistory.length > 0 ? (
                sentHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs text-indigo-700 font-mono">{item.to}</span>
                        {item.recipientName && (
                          <span className="text-[11px] text-slate-600 font-semibold">({item.recipientName})</span>
                        )}
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Calendar size={11} /> {item.date}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 truncate">{item.subject}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{item.message}</p>
                    </div>

                    <button
                      onClick={() => handleReuseFromHistory(item)}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
                    >
                      Load Draft
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400">
                  <Mail size={32} className="mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-xs">No dispatched emails recorded yet.</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  localStorage.removeItem(STORAGE_SENT_EMAILS_KEY);
                  setSentHistory([]);
                  toast.success("History cleared");
                }}
                className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
              >
                Clear History Log
              </button>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
