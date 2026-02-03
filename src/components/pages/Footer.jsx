import React from 'react';
import { FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiArrowUpRight, FiArrowRight, FiGlobe } from "react-icons/fi";

const Footer = () => {
  const footerSections = [
    {
      title: "Useful links",
      links: [
        { name: "Submit your paper", icon: <FiArrowRight /> },
        { name: "Shop Books & Journals", icon: <FiArrowUpRight /> },
        { name: "Open access", icon: <FiArrowRight /> },
        { name: "View all products", icon: <FiArrowRight /> },
        { name: "Forensic Connect", icon: <FiArrowRight /> },
      ],
    },
    {
      title: "About",
      links: [
        { name: "About the Institute", icon: <FiArrowRight /> },
        { name: "Careers", icon: <FiArrowRight /> },
        { name: "Global Press Office", icon: <FiArrowRight /> },
        { name: "Advertising & Reprints", icon: <FiArrowUpRight /> },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Customer support", icon: <FiArrowRight /> },
        { name: "Resource center", icon: <FiArrowUpRight /> },
      ],
    },
  ];

  return (
    <footer className="bg-white/60 text-black border-t border-gray-200 mt-10 shadow font-serif pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* MAIN NAVIGATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-lg mb-6 uppercase tracking-widest border-b border-black pb-2 inline-block">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="group flex items-center gap-2 text-[15px] hover:text-blue-900 transition-colors duration-200"
                    >
                      <span className="border-b border-transparent group-hover:border-blue-900">
                        {link.name}
                      </span>
                      <span className="text-gray-400 group-hover:text-blue-900 transition-transform group-hover:translate-x-1">
                        {link.icon}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* LANGUAGE / REGION */}
          <div className="flex items-center gap-2 text-sm font-medium hover:text-blue-900 cursor-pointer transition-colors">
            <FiGlobe className="text-lg" />
            <span>India | English</span>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex items-center gap-8">
            <a href="#" className="text-xl hover:text-blue-700 transition-all hover:scale-110"><FaLinkedin /></a>
            <a href="#" className="text-xl hover:text-black transition-all hover:scale-110"><FaXTwitter /></a>
            <a href="#" className="text-xl hover:text-blue-600 transition-all hover:scale-110"><FaFacebook /></a>
            <a href="#" className="text-xl hover:text-red-600 transition-all hover:scale-110"><FaYoutube /></a>
          </div>
        </div>

        {/* COPYRIGHT SUBTEXT */}
        <div className="mt-8 text-center text-[11px] text-gray-400 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Happy Digital Bharat . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
