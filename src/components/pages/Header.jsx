import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import Navbar from './Navbar';
import Hero from './Hero';

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div>
      {/* Fixed Unified Header Container */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Top Info Bar */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white px-3 py-1.5 shadow-xs text-xs sm:text-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
            
            {/* Left Feedback notice */}
            <h2 className="font-medium text-center sm:text-left text-xs sm:text-sm">
              We'd appreciate your feedback.{" "}
              <span className="text-yellow-300 font-bold ml-1">
                Tell us what you think!
              </span>
            </h2>

            {/* Contact Info */}
            <div className="flex items-center gap-3 sm:gap-5 text-xs text-slate-100">
              {/* <a 
                href="tel:+91XXXXXXXXXX" 
                className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors"
              >
                <FaPhoneAlt className="text-yellow-300 text-[11px]" />
                <span>+91-XXXXXXXXXX</span>
              </a> */}

              <a 
                href="mailto:f.patrika.india@gmail.com" 
                className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors"
              >
                <MdMarkEmailRead className="text-yellow-300 text-sm" />
                <span>f.patrika.india@gmail.com</span>
              </a>
            </div>

          </div>
        </div>

        {/* Floating Navbar Container */}
        <div className="pt-1.5 sm:pt-2">
          <Navbar />
        </div>
      </header>

      {/* Spacer for non-homepage routes so page content is never hidden behind fixed header */}
      {!isHomePage && (
        <div className="h-28 sm:h-32 md:h-36" aria-hidden="true" />
      )}

      {/* Hero Section (Home page only) */}
      {isHomePage && <Hero />}

      {/* Current Notices Marquee (Home page only) */}
      {isHomePage && (
        <div className="bg-slate-900 font-serif font-semibold text-white flex items-center overflow-hidden border-y border-slate-800 text-sm sm:text-base shadow-inner">
          <span className="bg-amber-500 text-slate-950 font-bold px-4 py-2 mr-2 shrink-0 rounded-r-full flex items-center gap-1 text-xs sm:text-sm uppercase tracking-wider">
            CURRENT
          </span>
          <div className="overflow-hidden relative w-full py-2">
            <div className="animate-marquee whitespace-nowrap text-slate-200">
              Welcome to Forensic Patrika (A Journal of Forensic Science)
              <span className="text-yellow-400 font-bold mx-3">• न्यायिक अनुसंधानम् •</span>
              Peer-Reviewed Open Access Scholarly Journal
              <span className="text-yellow-400 font-bold mx-3">•</span>
              Call for Papers: Volume 10 Issue 2 Now Accepting Submissions
              <span className="text-yellow-400 font-bold mx-3">• Explore More •</span>
              Stay Safe & Publish Responsibly
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
