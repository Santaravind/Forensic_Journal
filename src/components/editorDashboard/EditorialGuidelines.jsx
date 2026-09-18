import React from "react";
import {
  ScrollText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BookOpen,
  Scale,
  FileCheck,
  Users,
  Award,
} from "lucide-react";

export default function EditorialGuidelines() {
  const criteria = [
    {
      title: "1. Initial Desk Screening",
      desc: "Check manuscript formatting against journal templates, verify author affiliations, and confirm research topic falls strictly within Forensic Science scope.",
      tag: "Immediate (1-2 Days)",
      color: "border-blue-200 bg-blue-50/60 text-blue-800",
    },
    {
      title: "2. Plagiarism & Originality Verification",
      desc: "Ensure manuscript similarity score is under 10% (excluding references and standard methodology citations). Any unattributed source over 3% must be flagged.",
      tag: "Threshold: < 10%",
      color: "border-amber-200 bg-amber-50/60 text-amber-800",
    },
    {
      title: "3. Double-Blind Peer Review",
      desc: "Assign minimum 2 independent domain experts. Author names and reviewer identities remain strictly blinded throughout the review lifecycle.",
      tag: "14 - 21 Days Turnaround",
      color: "border-purple-200 bg-purple-50/60 text-purple-800",
    },
    {
      title: "4. Editorial Decision Matrix",
      desc: "Synthesize reviewer reports into one of four standard decisions: Accept as-is, Minor Revisions, Major Revisions (re-review required), or Reject.",
      tag: "Finalized by Editor",
      color: "border-emerald-200 bg-emerald-50/60 text-emerald-800",
    },
  ];

  const ethicalPrinciples = [
    {
      icon: Scale,
      title: "COPE Compliance",
      text: "Forensic Patrika adheres strictly to COPE (Committee on Publication Ethics) Code of Conduct. Any allegation of data fabrication or unethical research will trigger formal retraction proceedings.",
    },
    {
      icon: Users,
      title: "Conflict of Interest Disclosure",
      text: "Editors and reviewers must recuse themselves from evaluating manuscripts submitted by close collaborators, institutional colleagues, or financial competitors.",
    },
    {
      icon: ShieldCheck,
      title: "Confidentiality & Data Integrity",
      text: "Unpublished manuscripts are confidential legal documents. Editorial board members and reviewers are strictly prohibited from sharing or utilizing unpublished data.",
    },
    {
      icon: FileCheck,
      title: "Human & Animal Research Ethics",
      text: "Case studies and experimental papers involving biological specimens or human subjects must provide Institutional Ethics Committee (IEC/IRB) approval numbers.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-indigo-200 mb-3">
            <ScrollText size={14} />
            <span>Official Editorial Standard Operating Procedures</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight leading-tight">
            Editorial Guidelines & Ethics Protocol
          </h2>
          <p className="text-indigo-100/80 text-xs sm:text-sm mt-2 leading-relaxed">
            Standard guidelines governing peer review workflows, plagiarism thresholds, ethical integrity, and editorial decision criteria for Forensic Patrika Journal.
          </p>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Manuscript Evaluation Workflow
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Step-by-step roadmap from initial submission to final editorial decision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criteria.map((c, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${c.color} space-y-2 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{c.title}</h4>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/90 border border-slate-200 shadow-2xs">
                    {c.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Ethical Principles */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Publication Ethics & COPE Compliance
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Fundamental governance mandates required for all editors, reviewers, and authors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ethicalPrinciples.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                    <Icon size={18} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-8">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
