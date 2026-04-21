import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logos.png";
const categories = [
  // "Student",
  // "Researcher",
  // "Media Personnel",
  // "Professor",
  // "Others",
  "Serology",
  "Toxicology",
  "Ballistics",
  "Genetics",
  "Fingerprint",
  "Anthropology",
  "Cyber Forensics",
  "Others"
];

function Case() {
  const navigate = useNavigate();

  const navi=(e)=>{
    e.preventDefault();
    navigate("/caseStudyForm");
    window.scrollTo(0, 0);
    // () => navigate("/caseStudyForm")

  }

  return (
    <div className="min-h-screen bg-[#FCFCFC] px-6 py-12 font-serif text-slate-900">
      {/* HEADER: Refined with a bottom border and cleaner alignment */}
      <header className="max-w-7xl mx-auto border-b border-slate-200 pb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <img
          src={logo}
          alt="Patrika Logo"
          className="w-24 h-24 md:w-32 md:h-32 object-contain hover:grayscale-0 transition duration-500"
        />
        <div className="text-center md:text-right">
          <h1 className="text-5xl font-black tracking-tighter italic text-slate-900">
            ARTICLE
          </h1>
          <p className="font-sans text-[14px] uppercase tracking-[0.3em] text-slate-400 mt-1">
            The Case Study Publication Portal
          </p>
        </div>
      </header>

      {/* CATEGORY GRID: Editorial Card Style */}
      <main className="max-w-6xl mx-auto mt-12">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-sans font-bold text-xs uppercase tracking-widest text-indigo-600">
            Select Category
          </h2>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={navi}
              className="group relative h-40 flex flex-col items-center justify-center bg-white border border-slate-200 rounded-xl p-6 transition-all duration-300 hover:border-indigo-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:cursor-pointer"
            >
              {/* Subtle number indicator */}
              <span className="absolute top-4 left-4 font-sans text-[10px] text-slate-300 group-hover:text-indigo-400 font-bold transition-colors">
                0{index + 1}
              </span>

              {/* Category Label */}
              <span className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {cat}
              </span>

              {/* Hidden Hover Indicator */}
              <span className="mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all font-sans text-[10px] font-bold uppercase tracking-widest text-indigo-500 ">
              Click to Open Research Publish Form →
              </span>

              {/* Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-indigo-600 group-hover:w-full transition-all duration-300 rounded-b-xl" />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Case;
