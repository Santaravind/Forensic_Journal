import React from 'react';
import {
  BookOpen,
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Scale,
  Sparkles,
  HelpCircle,
  ExternalLink,
  Download,
  Brain,
  Lock,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReviewerGuidelines() {
  const downloadTemplate = () => {
    const templateContent = `
FORENSIC PATRIKA — OFFICIAL PEER REVIEW TEMPLATE
==================================================
Manuscript ID: [FP-2026-XXXX]
Reviewer Confidential Evaluation Report

1. QUANTITATIVE SCORING (1 to 10):
- Originality & Novelty: [ /10]
- Methodological Rigor: [ /10]
- Clarity & Organization: [ /10]
- Literature & Citations: [ /10]
- Forensic Impact: [ /10]

2. RECOMMENDATION (Check one):
[ ] Accept As Is
[ ] Accept with Minor Revisions
[ ] Major Revisions Required
[ ] Reject Manuscript

3. COMMENTS FOR THE AUTHOR:
(Include detailed observations on abstract, methodology, results, discussion, and forensic soundness)

4. CONFIDENTIAL COMMENTS FOR THE EDITOR-IN-CHIEF:
(Disclose any conflicts of interest, ethical concerns, or priority assessment)
==================================================
    `.trim();

    const blob = new Blob([templateContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Forensic_Patrika_Reviewer_Evaluation_Form.txt';
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded official reviewer evaluation form template!');
  };

  const rubrics = [
    {
      title: '1. Originality & Novelty (Weight: 20%)',
      desc: 'Does the manuscript present unique findings, an innovative forensic technique, or a novel application of existing scientific methods to criminalistics or legal inquiry?',
      highScore: 'Score 8–10: Groundbreaking methodology, unique dataset, or high scientific novelty.',
      midScore: 'Score 5–7: Incremental extension of existing literature with sound empirical data.',
      lowScore: 'Score 1–4: Highly derivative, duplicate work, or lacks clear novelty.',
    },
    {
      title: '2. Methodological Rigor & Reproducibility (Weight: 25%)',
      desc: 'Are experimental controls, statistical methods, chain-of-custody protocols, and error rates rigorously documented and reproducible by independent forensic scientists?',
      highScore: 'Score 8–10: Impeccable experimental design, robust error calculations, and transparent protocols.',
      midScore: 'Score 5–7: Minor gaps in statistical reporting or sample descriptions, rectifiable via revision.',
      lowScore: 'Score 1–4: Fatal methodological flaws, absent controls, or unscientific assumptions.',
    },
    {
      title: '3. Literature & Citation Context (Weight: 15%)',
      desc: 'Does the manuscript accurately contextualize the findings within peer-reviewed forensic literature, giving appropriate credit to foundational and recent works?',
      highScore: 'Score 8–10: Comprehensive, well-balanced citations of relevant international standards.',
      midScore: 'Score 5–7: Adequate literature review, with minor omissions of recent studies.',
      lowScore: 'Score 1–4: Self-citation bias, obsolete references, or failure to acknowledge prior work.',
    },
    {
      title: '4. Forensic Practicality & Application (Weight: 20%)',
      desc: 'How useful are the conclusions for crime laboratory analysts, ballistic examiners, digital forensic specialists, medicolegal officers, or the judiciary?',
      highScore: 'Score 8–10: Direct courtroom/laboratory applicability, solving real-world challenges.',
      midScore: 'Score 5–7: Informative findings with indirect or theoretical laboratory relevance.',
      lowScore: 'Score 1–4: Purely speculative conclusions with no demonstrable forensic application.',
    },
    {
      title: '5. Clarity, Figures & Formatting (Weight: 20%)',
      desc: 'Is the manuscript written in coherent scientific English with clear figure legends, structured abstracts, and standardized forensic nomenclature?',
      highScore: 'Score 8–10: Clear exposition, high-resolution figures, logical subheadings.',
      midScore: 'Score 5–7: Comprehensible with minor typographical or formatting inconsistencies.',
      lowScore: 'Score 1–4: Incomprehensible prose, missing axes/legends on figures.',
    },
  ];

  const ethicsRules = [
    {
      icon: Lock,
      title: 'Strict Confidentiality',
      desc: 'Never share, distribute, cite, or discuss unpublished manuscript contents or reviewer comments with unauthorized parties prior to official publication.',
    },
    {
      icon: Scale,
      title: 'Conflict of Interest Disclosure',
      desc: 'Recuse yourself immediately if you have recent collaborations, institutional co-affiliations, or personal rivalries with the authors.',
    },
    {
      icon: Brain,
      title: 'Generative AI Policy (COPE Compliant)',
      desc: 'Do not upload manuscripts or author data into public third-party AI models (e.g. public LLMs) as this violates intellectual property and confidentiality.',
    },
    {
      icon: ShieldCheck,
      title: 'Constructive & Objective Tone',
      desc: 'Ensure critique is academic, polite, and actionable. Avoid derogatory remarks; focus on strengthening the forensic rigor of the paper.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-indigo-800/60">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={14} /> COPE & ICMJE Standards
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-extrabold">
              Double-Blind Review Model
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-serif leading-snug">
            Peer Review Guidelines & Evaluation Rubrics
          </h2>

          <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
            As a peer reviewer for <span className="font-semibold text-white">Forensic Patrika</span>, you play a pivotal role in maintaining the forensic rigor, reproducibility, and academic excellence of published criminalistics research.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={downloadTemplate}
              className="px-4 py-2 bg-white text-indigo-950 font-bold rounded-xl text-xs shadow-md hover:bg-indigo-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={14} />
              <span>Download Reviewer Rubric Form</span>
            </button>
            <a
              href="https://publicationethics.org/guidance/Guidelines"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <span>COPE Ethical Guidelines</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Rubric Criteria Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
            <Award size={18} className="text-indigo-600" />
            <span>Comprehensive Evaluation Criteria & Scoring Matrix</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluate each manuscript across these 5 core domains on a 1–10 numerical scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rubrics.map((r, i) => (
            <div
              key={i}
              className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4.5 space-y-2.5 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-serif">
                {r.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {r.desc}
              </p>

              <div className="pt-2 border-t border-slate-200/60 space-y-1 text-[11px]">
                <p className="text-emerald-700 font-medium">
                  <span className="font-bold">✓ High: </span> {r.highScore}
                </p>
                <p className="text-amber-700 font-medium">
                  <span className="font-bold">• Medium: </span> {r.midScore}
                </p>
                <p className="text-rose-700 font-medium">
                  <span className="font-bold">✕ Low: </span> {r.lowScore}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ethical Conduct Standards */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
            <ShieldCheck size={18} className="text-indigo-600" />
            <span>Reviewer Ethical Conduct & AI Policy</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Strict adherence to the Committee on Publication Ethics (COPE) core practices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ethicsRules.map((e, idx) => {
            const Icon = e.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 w-fit">
                    <Icon size={18} />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">
                    {e.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {e.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
