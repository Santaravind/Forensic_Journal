import React from 'react';
import logo from '../assets/logos.png'
const AboutUs = () => {
  return (
    <div className="bg-[#fdfdfb] min-h-screen py-12 px-6 md:px-12 font-serif text-gray-900">
      <div className="max-w-5xl mx-auto">
       
        
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
           {/* <img src={logo} alt="logo" className=' w-50 h-50' /> */}
          <h2 className="text-blue-900 text-sm font-bold tracking-[0.3em] uppercase mb-4">
             Institutional Profile
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold border-y-2 border-blue-900 py-6 inline-block">
            About Forensic Patrika
          </h1>
        </div>

        {/* MAIN EDITORIAL GRID */}
        <div className="grid md:grid-cols-2 gap-12 leading-relaxed text-justify">
          
          {/* COLUMN 1: MISSION & VISION */}
          <div className="space-y-6">
            <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-blue-900 first-letter:mr-3 first-letter:float-left">
              <strong>Forensic Patrika: A Journal of Forensic Science</strong> is an academic publication platform 
              committed to supporting and showcasing student-led research across diverse disciplines. 
              Founded on the principle that meaningful scholarship should not be constrained by experience 
              or hierarchy, the platform seeks to foster inclusive academic participation.
            </p>
            <p>
              Our mission is to make the process of research publication accessible, transparent, 
              and supportive for undergraduate, postgraduate, and early-career scholars. The journal 
              offers a structured space for the dissemination of original research, review articles, 
              and interdisciplinary studies.
            </p>
            <blockquote className="border-l-4 border-blue-900 pl-6 italic text-blue-900 font-medium my-8">
              "A platform where student voices are valued, research is nurtured, and knowledge is disseminated responsibly."
            </blockquote>
          </div>

          {/* COLUMN 2: ACADEMIC GUIDANCE */}
          <div className="space-y-6 bg-stone-50 p-6 border border-stone-200 shadow-sm">
            <h3 className="text-xl font-bold text-blue-900 border-b pb-2 mb-4">Academic Stewardship</h3>
            <p className="text-sm md:text-base">
              The journal is developed under the academic guidance of the <strong>Dr. APJ Abdul Kalam 
              Institute of Forensic Science and Criminology</strong>. The institute is dedicated to 
              advancing scientific inquiry, evidence-based research, and ethical practice in the 
              study of crime, law, and forensic investigation.
            </p>
            <p className="text-sm md:text-base">
              Aligned with the academic vision of <strong>Bundelkhand University</strong>, the journal 
              reflects the institution's commitment to knowledge creation and scholarly integrity. 
              The university fosters an environment that values academic excellence and 
              interdisciplinary collaboration.
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION: PEER REVIEW COMMITMENT */}
        <div className="mt-16 bg-blue-900 text-white p-8 md:p-12 rounded-sm shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6 tracking-wide uppercase">Our Scholarly Standards</h3>
            <p className="text-blue-100 leading-loose">
              Through a structured peer review process involving students and faculty members, the platform aims to uphold academic standards whie nurturing emerging researchers. FORENSIC SCIENCE : A JOURNAL OF FORENSIC SCIENCE stands as a representation of the department and university's dedication to responsible scholarship, critical engagement, and the dissemination of research that contributes to the advancement of forensic science and criminology at both national and global levels.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;