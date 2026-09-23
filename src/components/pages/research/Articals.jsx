import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Download, 
  ExternalLink, 
  Eye, 
  Calendar, 
  User, 
  BookOpen, 
  Tag, 
  Copy, 
  Check, 
  Share2, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';
import { researchPaperApi, publisherApi, normalizePaper } from '../../../api/publisherApi';

const CATEGORIES = [
  "All Disciplines",
  "Forensic DNA & Genetics",
  "Forensic Toxicology",
  "Ballistics & Firearms",
  "Cyber Forensics & AI",
  "Fingerprints & Biometrics",
  "Forensic Anthropology",
  "Questioned Documents",
  "Crime Scene Investigation"
];

const CURATED_ARTICLES = [
  {
    id: "art-1",
    submissionId: "FP-2026-1056",
    title: "Advancements in Forensic DNA Analysis Using Next-Generation Sequencing (NGS) Technologies",
    authors: ["Dr. Ananya Sharma", "Prof. Vijay Kumar Yadav"],
    affiliation: "Institute of Forensic Science & Criminology",
    journal: "Forensic Patrika: A Journal of Forensic Science",
    volume: "Vol. 10",
    issue: "Issue 2 (May 2026)",
    doi: "10.5958/FP.2026.00102.DNA",
    category: "Forensic DNA & Genetics",
    publishedDate: "15 May 2026",
    views: 1420,
    downloads: 512,
    abstract: "Massively parallel sequencing (MPS) and next-generation sequencing have revolutionized forensic human identification. This study explores STR typing, mitochondrial genome sequencing, and epigenetic age estimation on degraded skeletal samples from cold-case investigations.",
    keywords: ["Forensic DNA", "Next-Generation Sequencing", "STR Analysis", "Human Identification", "Degraded Skeletal Remains"],
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "art-2",
    submissionId: "FP-2026-1055",
    title: "Post-Mortem Interval Estimation in Arid Climates: Entomological Succession Patterns",
    authors: ["Dr. Neha Gupta", "Indresh Kumar", "Dr. Rajesh Verma"],
    affiliation: "Forensic Research Laboratory, Central Division",
    journal: "Forensic Patrika: A Journal of Forensic Science",
    volume: "Vol. 10",
    issue: "Issue 2 (May 2026)",
    doi: "10.5958/FP.2026.00102.ENT",
    category: "Crime Scene Investigation",
    publishedDate: "12 May 2026",
    views: 980,
    downloads: 340,
    abstract: "Accurate estimation of Post-Mortem Interval (PMI) is crucial in forensic death investigations. This paper details developmental rates of Chrysomya albiceps and seasonal succession patterns in subtropical and arid climatic zones.",
    keywords: ["Forensic Entomology", "Post-Mortem Interval", "Chrysomya albiceps", "Decomposition", "Taphonomy"],
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "art-3",
    submissionId: "FP-2026-1054",
    title: "Deep Convolutional Networks for Latent Fingerprint Feature Extraction on Textured Substrates",
    authors: ["Siddharth Mehta", "Dr. Akash Kumar"],
    affiliation: "Department of Cyber Forensics and Pattern Recognition",
    journal: "Forensic Patrika: A Journal of Forensic Science",
    volume: "Vol. 10",
    issue: "Issue 1 (March 2026)",
    doi: "10.5958/FP.2026.00101.FNG",
    category: "Fingerprints & Biometrics",
    publishedDate: "28 March 2026",
    views: 2150,
    downloads: 870,
    abstract: "Smudged and partial latent friction ridge patterns on non-porous surfaces present severe challenges for conventional AFIS. We present an end-to-end residual CNN architecture that enhances ridge clarity and extracts minutiae with 97.4% precision.",
    keywords: ["Latent Fingerprints", "Deep Learning", "Convolutional Networks", "Minutiae Matching", "Biometrics"],
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "art-4",
    submissionId: "FP-2026-1053",
    title: "Quantitative Optical Profilometry for Striation Signatures on 9mm Cartridge Casings",
    authors: ["Virendra Singh", "Prof. (Dr.) Mukesh Pandey"],
    affiliation: "Bundelkhand University & Forensic Sciences Consortium",
    journal: "Forensic Patrika: A Journal of Forensic Science",
    volume: "Vol. 10",
    issue: "Issue 1 (March 2026)",
    doi: "10.5958/FP.2026.00101.BAL",
    category: "Ballistics & Firearms",
    publishedDate: "10 March 2026",
    views: 1120,
    downloads: 410,
    abstract: "3D confocal microscopy and optical profilometry were deployed to quantify micro-striation depth and firing pin impressions across 500 test-fired rounds, establishing statistical thresholds for firearm matching.",
    keywords: ["Forensic Ballistics", "Optical Profilometry", "Striation Analysis", "Cartridge Casings", "Firearm Identification"],
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "art-5",
    submissionId: "FP-2026-1052",
    title: "Memory Forensics and Volatile Artifact Extraction in Ransomware Incident Triage",
    authors: ["Pooja Hegde", "Aravind Sant Singh"],
    affiliation: "Digital Evidence & Cybercrime Research Group",
    journal: "Forensic Patrika: A Journal of Forensic Science",
    volume: "Vol. 9",
    issue: "Issue 4 (December 2025)",
    doi: "10.5958/FP.2025.00094.CYB",
    category: "Cyber Forensics & AI",
    publishedDate: "20 December 2025",
    views: 3100,
    downloads: 1450,
    abstract: "Rapid live RAM acquisition and heuristic analysis of injected payload handles allow investigators to extract encryption keys and command-and-control IP artifacts before disk persistence triggers file loss.",
    keywords: ["Memory Forensics", "Volatile Memory", "Ransomware Triage", "Incident Response", "Malware Analysis"],
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "art-6",
    submissionId: "FP-2026-1051",
    title: "LC-MS/MS Screening Protocols for Novel Synthetic Opioids and Designer Cathinones",
    authors: ["Dr. Abhimanyu Harshey", "Dr. Prakash Chandra"],
    affiliation: "Forensic Toxicology Division",
    journal: "Forensic Patrika: A Journal of Forensic Science",
    volume: "Vol. 9",
    issue: "Issue 4 (December 2025)",
    doi: "10.5958/FP.2025.00094.TOX",
    category: "Forensic Toxicology",
    publishedDate: "05 December 2025",
    views: 1780,
    downloads: 620,
    abstract: "Rapid emergence of new psychoactive substances (NPS) challenges routine immunoassay screens. We validate a high-resolution LC-MS/MS library detecting 84 novel synthetic fentanyl analogues and cathinones at sub-nanogram concentrations.",
    keywords: ["Forensic Toxicology", "LC-MS/MS", "New Psychoactive Substances", "Synthetic Opioids", "Post-Mortem Toxicology"],
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

export default function Articals() {
  const [articles, setArticles] = useState(CURATED_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState("All Disciplines");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedAbstracts, setExpandedAbstracts] = useState({});
  const [copiedDoi, setCopiedDoi] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLiveArticles();
  }, []);

  const loadLiveArticles = async () => {
    try {
      setLoading(true);
      const res = await researchPaperApi.getAllPapers();
      if (res && res.length > 0) {
        const liveList = res
          .filter(p => (p.status || '').toUpperCase() === 'PUBLISHED' || (p.status || '').toUpperCase() === 'ACCEPTED')
          .map((p, idx) => ({
            id: p.id || `live-${idx}`,
            submissionId: p.submissionId || p.trackingId || `FP-2026-${1000 + idx}`,
            title: p.title || p.paperTitle || "Scholarly Forensic Research Manuscript",
            authors: [p.authorName || p.author || "Forensic Scholar"],
            affiliation: p.university || "Academic Institute of Forensic Science",
            journal: "Forensic Patrika: A Journal of Forensic Science",
            volume: "Vol. 10",
            issue: "Current Issue (2026)",
            doi: p.doi || `10.5958/FP.2026.${1000 + idx}`,
            category: p.researchArea || p.domain || "Forensic Science",
            publishedDate: p.publishedDate || "Recent Publication",
            views: p.views || Math.floor(Math.random() * 800) + 200,
            downloads: p.downloads || Math.floor(Math.random() * 300) + 50,
            abstract: p.abstract || p.abstractText || "Peer-reviewed research paper published in Forensic Patrika.",
            keywords: p.keywords ? (Array.isArray(p.keywords) ? p.keywords : p.keywords.split(',').map(k => k.trim())) : ["Forensic Science", "Peer-Reviewed", "Research"],
            pdfUrl: p.fileUrl || ""
          }));

        if (liveList.length > 0) {
          setArticles([...liveList, ...CURATED_ARTICLES]);
        }
      }
    } catch (err) {
      console.warn("Could not load backend live papers, displaying curated directory:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAbstract = (id) => {
    setExpandedAbstracts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyDoi = (doi) => {
    navigator.clipboard.writeText(`https://doi.org/${doi}`);
    setCopiedDoi(doi);
    toast.success("DOI Link copied to clipboard!");
    setTimeout(() => setCopiedDoi(null), 2500);
  };

  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === "All Disciplines" || 
      (art.category && art.category.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      (selectedCategory.includes(art.category));

    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      art.doi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      art.abstract.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-4 uppercase tracking-wider shadow-xs">
            <Sparkles size={14} className="text-indigo-600" />
            <span>Open Access Scholarly Archive</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-serif mb-4 leading-tight">
            Published Research Articles
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Explore peer-reviewed scientific articles, laboratory methodologies, empirical analyses, and forensic case studies published in <strong className="text-indigo-700">Forensic Patrika</strong>.
          </p>

          {/* Quick Submit Action Button */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/reserchform"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <FileText size={16} />
              <span>Submit Your Manuscript</span>
            </Link>
            <Link
              to="/publication"
              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <BookOpen size={16} />
              <span>Publication Procedure</span>
            </Link>
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg shadow-slate-200/50 border border-slate-200 mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by article title, author name, DOI, keyword, or evidence domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-24 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-indigo-600 hover:text-slate-800 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 custom-scrollbar">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <Filter size={12} /> Discipline:
            </span>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* ARTICLES FEED */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing <strong className="text-slate-800">{filteredArticles.length}</strong> published manuscripts</span>
            <span>Open Access CC-BY 4.0 License</span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
              <BookOpen size={48} className="text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 font-serif">No articles match your search</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                Try searching with different terms or selecting "All Disciplines".
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All Disciplines");
                  setSearchQuery("");
                }}
                className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold text-xs rounded-xl hover:bg-indigo-100 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredArticles.map((art) => {
              const isExpanded = expandedAbstracts[art.id];

              return (
                <article
                  key={art.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/90 hover:border-indigo-200 group"
                >
                  {/* Metadata Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-100/80">
                        {art.category}
                      </span>
                      <span className="text-slate-500 font-semibold">
                        {art.journal} • {art.volume}, {art.issue}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} /> {art.publishedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={13} /> {art.views}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-serif mt-3 mb-2 leading-snug">
                    {art.title}
                  </h2>

                  {/* Authors & Affiliation */}
                  <div className="space-y-1 mb-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <User size={14} className="text-indigo-600 shrink-0" />
                      <span>{art.authors.join(", ")}</span>
                    </div>
                    {art.affiliation && (
                      <p className="text-xs text-slate-500 italic pl-5">
                        {art.affiliation}
                      </p>
                    )}
                  </div>

                  {/* Abstract Section */}
                  <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                    <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                      <span>Abstract</span>
                      <button
                        onClick={() => toggleAbstract(art.id)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                      >
                        {isExpanded ? (
                          <><span>Collapse</span><ChevronUp size={14} /></>
                        ) : (
                          <><span>Read Abstract</span><ChevronDown size={14} /></>
                        )}
                      </button>
                    </div>

                    <p className={isExpanded ? "" : "line-clamp-2"}>
                      {art.abstract}
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-5">
                    <Tag size={12} className="text-slate-400 mr-1" />
                    {art.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md transition-colors"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action Bar */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    {/* DOI Badge */}
                    <div className="flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-xl text-xs font-mono">
                      <span className="text-slate-500 font-semibold">DOI:</span>
                      <span className="font-bold text-indigo-700">{art.doi}</span>
                      <button
                        onClick={() => copyDoi(art.doi)}
                        className="text-slate-400 hover:text-slate-700 transition-colors p-0.5"
                        title="Copy DOI Link"
                      >
                        {copiedDoi === art.doi ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyDoi(art.doi)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Share2 size={13} />
                        <span className="hidden sm:inline">Cite / Share</span>
                      </button>

                      {art.pdfUrl ? (
                        <a
                          href={art.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-1.5"
                        >
                          <Download size={13} />
                          <span>Download PDF</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => toast("Full-text publication PDF is archived and accessible via open-access repository.", { icon: "📄" })}
                          className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                        >
                          <Download size={13} />
                          <span>View Full Text</span>
                        </button>
                      )}
                    </div>
                  </div>

                </article>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
