import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaFacebook, FaYoutube, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiArrowUpRight, FiArrowRight, FiGlobe, FiShield, FiBookOpen } from "react-icons/fi";
import logo from '../assets/logoss.png';

const Footer = () => {
  const quickLinks = [
    { name: "Submit Research Paper", to: "/reserchform" },
    { name: "Submit Case Study", to: "/caseStudyForm" },
    { name: "Track Submission Status", to: "/paper-status" },
    { name: "Browse Published Articles", to: "/article" },
    { name: "Verify Certificate", to: "/verify-certificate/FP-CERT-DEMO" },
    { name: "Research Insights & Blog", to: "/blog" },
  ];

  const editorialLinks = [
    { name: "About the Journal", to: "/about" },
    { name: "Editorial Board Structure", to: "/editorial" },
    { name: "Publication Procedure", to: "/publication" },
    { name: "Peer Review Process", to: "/peer" },
    { name: "Open Access Statement", to: "/open" },
    { name: "Author Instructions", to: "/authorIn" },
  ];

  const ethicalLinks = [
    { name: "Ethics & Malpractice Policy", to: "/ethics" },
    { name: "Plagiarism Screening Protocol", to: "/plag" },
    { name: "Artificial Intelligence Policy", to: "/ai" },
    { name: "Informed Consent & Privacy", to: "/informed" },
    { name: "Rights & Permissions", to: "/right" },
    { name: "Career & Internship Portal", to: "/career" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BRAND & NAVIGATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full bg-white p-1 flex items-center justify-center shadow-md">
                <img
                  src={logo}
                  alt="Forensic Patrika"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight font-serif block group-hover:text-indigo-400 transition-colors">
                  Forensic Patrika
                </span>
                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase block">
                  A Journal of Forensic Science • न्यायिक अनुसंधानम्
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              A peer-reviewed, open-access scholarly journal dedicated to advancing scientific research, critical inquiry, forensic methodologies, and ethical academic publishing.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-indigo-400 text-sm" />
                <a href="mailto:f.patrika.india@gmail.com" className="hover:text-white transition-colors">
                  f.patrika.india@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FiShield className="text-indigo-400 text-sm" />
                <span>ISSN / Publication Peer-Reviewed Standards Compliant</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Author Links */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
              Submissions
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <FiArrowRight className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all text-xs" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Editorial & Board */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
              Editorial Board
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {editorialLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <FiArrowRight className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all text-xs" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Ethics & Policy */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
              Ethics & Scope
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {ethicalLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <FiArrowRight className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all text-xs" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-2">
            <FiGlobe className="text-indigo-400 text-sm" />
            <span>Open Access Scholarly Platform • India & Global</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 text-slate-400">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
              aria-label="Twitter / X"
            >
              <FaXTwitter size={16} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook size={16} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube size={16} />
            </a>
          </div>

          {/* Copyright */}
          <div>
            © {new Date().getFullYear()} Forensic Patrika. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

