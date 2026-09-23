import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FlaskConical, 
  Search, 
  FileText, 
  ShieldCheck, 
  Eye, 
  Calendar, 
  User, 
  Tag, 
  ChevronRight, 
  Sparkles,
  Award,
  AlertCircle,
  Download,
  BookOpen
} from 'lucide-react';
import toast from 'react-hot-toast';

const CASE_CATEGORIES = [
  "All Case Reports",
  "Homicide & Physical Evidence",
  "Digital & Cyber Forensics",
  "Toxicology & Poisoning",
  "Questioned Documents & Forgery",
  "Ballistics & Toolmarks",
  "Cold Cases & DNA Profiling"
];

const CURATED_CASE_STUDIES = [
  {
    id: "cs-101",
    caseId: "FP-CS-2026-042",
    title: "Cold Case Resolution: Low-Copy DNA Typing and Familial Genetic Genealogy in an Unsolved Homicide",
    investigators: "Dr. Vijay Kumar Yadav, S. Roy (Senior Forensic DNA Examiner)",
    institution: "State Forensic Science Laboratory & Special Investigation Team",
    category: "Cold Cases & DNA Profiling",
    date: "April 2026",
    evidenceType: "Degraded bone fragment & Touch DNA on clothing",
    methodology: "Single Nucleotide Polymorphism (SNP) microarray typing + Mitochondrial DNA sequencing",
    summary: "Investigation of a 14-year-old unsolved homicide. Advanced SNP microarray analysis and genealogical tree triangulation resolved the unidentified suspect profile with 99.999% allelic probability.",
    keyFindings: "Successful full STR profile regeneration from 18pg degraded nuclear DNA.",
    status: "Peer-Reviewed Case Report"
  },
  {
    id: "cs-102",
    caseId: "FP-CS-2026-039",
    title: "Steganographic Data Exfiltration and Anti-Forensic Evasion in a Multi-Million Banking Fraud",
    investigators: "Aravind Sant Singh, Indresh Kumar",
    institution: "Cybercrime Investigation Unit",
    category: "Digital & Cyber Forensics",
    date: "March 2026",
    evidenceType: "Encrypted memory dump, router NVRAM & PNG carrier payloads",
    methodology: "Least Significant Bit (LSB) steganography analysis + Timeline event reconstruction",
    summary: "Analysis of a corporate intrusion where financial transaction records were embedded inside benign social media marketing images to bypass Deep Packet Inspection firewalls.",
    keyFindings: "Extraction of complete AES-256 decryption keys from unallocated swap memory sectors.",
    status: "Published Case Study"
  },
  {
    id: "cs-103",
    caseId: "FP-CS-2026-035",
    title: "Fatal Organophosphate and Heavy Metal Co-Ingestion: A Comprehensive Post-Mortem Toxicological Assessment",
    investigators: "Dr. Abhimanyu Harshey, Dr. Neha Gupta",
    institution: "Department of Forensic Medicine and Toxicology",
    category: "Toxicology & Poisoning",
    date: "February 2026",
    evidenceType: "Gastric aspirate, blood serum & liver tissue biopsies",
    methodology: "Gas Chromatography-Mass Spectrometry (GC-MS) & Atomic Absorption Spectrophotometry",
    summary: "A complex medico-legal autopsy where deceptive natural symptoms concealed a lethal combination of monocrotophos and thallium salts. Rigorous instrumental analysis uncovered systemic organ toxicity.",
    keyFindings: "Established simultaneous quantitation limits for organophosphates and thallium in viscera.",
    status: "Peer-Reviewed Case Report"
  },
  {
    id: "cs-104",
    caseId: "FP-CS-2026-028",
    title: "High-Value Property Deed Forgery Detection Using Spectral Hyperspectral Video Comparative Analysis",
    investigators: "Dr. Prakash Chandra, Nawab John Dar",
    institution: "Document Examination Division",
    category: "Questioned Documents & Forgery",
    date: "January 2026",
    evidenceType: "Original 1998 stamp paper with disputed signature and seal impressions",
    methodology: "Video Spectral Comparator (VSC 8000) infrared luminescence and Raman spectroscopy",
    summary: "Examination of an allegedly altered land registry agreement. Raman spectroscopic ink differentiation confirmed that ink additions were made 18 years after the original document timestamp.",
    keyFindings: "Spectral differentiation of two visually identical black ballpoint inks under 785nm laser excitation.",
    status: "Published Case Study"
  }
];

export default function CaseStudy() {
  const [selectedCategory, setSelectedCategory] = useState("All Case Reports");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = CURATED_CASE_STUDIES.filter(item => {
    const matchesCategory = selectedCategory === "All Case Reports" || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.investigators.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.evidenceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caseId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 mb-4 uppercase tracking-wider shadow-xs">
            <FlaskConical size={14} className="text-emerald-600" />
            <span>Forensic Investigative Reports</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-serif mb-4 leading-tight">
            Forensic Case Studies & Reports
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Real-world medico-legal investigations, crime scene reconstruction reports, digital forensics case analyses, and expert methodologies published in <strong className="text-emerald-700">Forensic Patrika</strong>.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/caseStudyForm"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <FileText size={16} />
              <span>Submit a Case Study</span>
            </Link>
            <Link
              to="/authorIn"
              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <BookOpen size={16} />
              <span>Case Reporting Guidelines</span>
            </Link>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg shadow-slate-200/50 border border-slate-200 mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search case studies by title, investigator, evidence type, or case report ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-24 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-emerald-600 hover:text-slate-800 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 custom-scrollbar">
            {CASE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* CASE STUDIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/90 hover:border-emerald-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                    {cs.caseId}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 font-medium">
                    <Calendar size={13} /> {cs.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-serif mt-3 mb-2 leading-snug">
                  {cs.title}
                </h3>

                {/* Investigators */}
                <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 mb-1 font-medium">
                  <User size={14} className="text-emerald-600 shrink-0" />
                  <span>{cs.investigators}</span>
                </p>
                <p className="text-xs text-slate-400 italic mb-4 pl-5">
                  {cs.institution}
                </p>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100 mb-4">
                  {cs.summary}
                </p>

                {/* Evidence & Methodology Highlights */}
                <div className="space-y-2 text-xs mb-4">
                  <div className="flex items-start gap-2">
                    <strong className="text-slate-900 shrink-0">Evidence:</strong>
                    <span className="text-slate-600">{cs.evidenceType}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <strong className="text-slate-900 shrink-0">Methodology:</strong>
                    <span className="text-slate-600">{cs.methodology}</span>
                  </div>
                  <div className="flex items-start gap-2 bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
                    <strong className="text-emerald-800 shrink-0">Key Finding:</strong>
                    <span className="text-emerald-900 font-medium">{cs.keyFindings}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {cs.status}
                </span>

                <button
                  onClick={() => toast("Detailed forensic case file is accessible to registered researchers and institutional members.", { icon: "🔬" })}
                  className="px-4 py-1.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                >
                  <span>View Case Details</span>
                  <ChevronRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
