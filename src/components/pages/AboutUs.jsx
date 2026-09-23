// import React from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   BookOpen, 
//   ShieldCheck, 
//   GraduationCap, 
//   Globe, 
//   Award, 
//   FileText, 
//   Microscope, 
//   Fingerprint, 
//   Binary, 
//   Scale, 
//   CheckCircle2 
// } from 'lucide-react';
// import logo from '../assets/logoss.png';

// const AboutUs = () => {
//   const pillars = [
//     {
//       title: "Forensic Biology & DNA",
//       desc: "Massively parallel sequencing, STR profiling, mitochondrial DNA genetics, and degraded sample identification.",
//       icon: Microscope,
//       color: "bg-blue-50 text-blue-600"
//     },
//     {
//       title: "Digital & Cyber Forensics",
//       desc: "Volatile memory analysis, mobile forensic artifacts, malware reverse engineering, and cryptographic fraud detection.",
//       icon: Binary,
//       color: "bg-indigo-50 text-indigo-600"
//     },
//     {
//       title: "Forensic Toxicology & Chemistry",
//       desc: "LC-MS/MS, GC-MS detection of novel psychoactive substances, post-mortem pharmacology, and illicit poison analysis.",
//       icon: FlaskConicalIcon,
//       color: "bg-purple-50 text-purple-600"
//     },
//     {
//       title: "Pattern Evidence & Ballistics",
//       desc: "Latent fingerprint AI enhancement, 3D firearm striation profilometry, toolmarks, and document authentication.",
//       icon: Fingerprint,
//       color: "bg-emerald-50 text-emerald-600"
//     }
//   ];

//   function FlaskConicalIcon(props) {
//     return <Scale {...props} />;
//   }

//   return (
//     <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
//       <div className="max-w-6xl mx-auto space-y-12">
        
//         {/* HERO / SECTION HEADER */}
//         <div className="text-center max-w-3xl mx-auto">
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-4 uppercase tracking-wider shadow-xs">
//             <BookOpen size={14} className="text-indigo-600" />
//             <span>Institutional Journal Profile</span>
//           </div>

//           <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-serif mb-4 leading-tight">
//             About Forensic Patrika
//           </h1>
//           <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
//             <strong className="text-indigo-700">Forensic Patrika: A Journal of Forensic Science</strong> (न्यायिक अनुसंधानम्) is a peer-reviewed, open-access scholarly publication platform dedicated to advancing empirical research, scientific rigor, and ethical academic writing across forensic science and criminology.
//           </p>
//         </div>

//         {/* MAIN 2-COLUMN EDITORIAL GRID */}
//         <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
//           {/* COLUMN 1: MISSION & SCHOLARLY INCLUSION */}
//           <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6">
//             <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
//               <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
//                 <span className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-bold">
//                   <GraduationCap size={20} />
//                 </span>
//                 <div>
//                   <h3 className="text-lg font-bold text-slate-900 font-serif">Mission & Scholarly Vision</h3>
//                   <p className="text-xs text-indigo-600 font-semibold">Quality-Driven Academic Publishing</p>
//                 </div>
//               </div>

//               <p>
//                 Founded on the fundamental principle that meaningful scientific scholarship is defined by research quality, empirical validity, and methodological soundness rather than hierarchy, <strong>Forensic Patrika</strong> provides an inclusive, structured platform for undergraduate, postgraduate, doctoral, and early-career investigators alongside seasoned academicians.
//               </p>

//               <p>
//                 The journal bridges the critical divide between theoretical laboratory research and practical investigative application, supporting first-time authors through constructive peer-review mentorship and adherence to global publishing ethics.
//               </p>
//             </div>

//             <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 text-xs text-indigo-900 space-y-1">
//               <p className="font-bold flex items-center gap-1.5 text-indigo-800">
//                 <CheckCircle2 size={14} className="text-indigo-600" />
//                 <span>Open Access Commitment:</span>
//               </p>
//               <p>All published articles and case reports are freely accessible without subscription barriers under CC-BY 4.0 licensing.</p>
//             </div>
//           </div>

//           {/* COLUMN 2: ACADEMIC STEWARDSHIP */}
//           <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6">
//             <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
//               <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
//                 <span className="p-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold">
//                   <Award size={20} />
//                 </span>
//                 <div>
//                   <h3 className="text-lg font-bold text-slate-900 font-serif">Academic Stewardship</h3>
//                   <p className="text-xs text-blue-600 font-semibold">Institutional Heritage & Leadership</p>
//                 </div>
//               </div>

//               <p>
//                 Developed under the academic guidance of the <strong>Dr. A.P.J. Abdul Kalam Institute of Forensic Science & Criminology</strong>, the journal reflects a steadfast dedication to evidence-based science, scientific criminal investigation, and ethical practice in law enforcement and jurisprudence.
//               </p>

//               <p>
//                 Aligned with the scholarly vision of <strong>Bundelkhand University, Jhansi</strong>, the platform fosters an environment of intellectual curiosity, cross-disciplinary innovation, and international research collaboration.
//               </p>
//             </div>

//             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
//               <p className="font-bold text-slate-900">Dr. A.P.J. Abdul Kalam Institute of Forensic Science & Criminology</p>
//               <p className="text-slate-500">Bundelkhand University, Jhansi (Uttar Pradesh), India</p>
//             </div>
//           </div>

//         </div>

//         {/* PILLARS & INTERDISCIPLINARY DOMAINS */}
//         <div>
//           <div className="text-center mb-8">
//             <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
//               Interdisciplinary Publication Scope
//             </h2>
//             <p className="text-xs sm:text-sm text-slate-500 mt-1">
//               Cultivating solution-oriented forensic methodologies across modern science domains
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {pillars.map((pillar, idx) => {
//               const IconComp = pillar.icon;
//               return (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 flex flex-col"
//                 >
//                   <div className={`w-12 h-12 rounded-2xl ${pillar.color} flex items-center justify-center mb-4`}>
//                     <IconComp size={24} />
//                   </div>
//                   <h3 className="font-bold text-slate-900 text-base mb-2 font-serif">
//                     {pillar.title}
//                   </h3>
//                   <p className="text-xs text-slate-600 leading-relaxed">
//                     {pillar.desc}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* BOTTOM SCHOLARLY COMMITMENT BANNER */}
//         <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
//           <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
//             <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full uppercase tracking-wider">
//               Publication Integrity
//             </span>

//             <h3 className="text-2xl sm:text-3xl font-bold font-serif leading-snug">
//               Rigorous Peer Review, Ethical Authorship & Transparency
//             </h3>

//             <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
//               Forensic Patrika strictly adheres to anti-plagiarism screening protocols (maximum 15% similarity index), double-blind peer review evaluations, COPE (Committee on Publication Ethics) guidelines, and fair retraction and corrections standards.
//             </p>

//             <div className="pt-2 flex flex-wrap justify-center gap-4">
//               <Link
//                 to="/reserchform"
//                 className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-2"
//               >
//                 <FileText size={16} />
//                 <span>Submit Your Research</span>
//               </Link>
//               <Link
//                 to="/editorial"
//                 className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-semibold border border-slate-700 transition-all flex items-center gap-2"
//               >
//                 <GraduationCap size={16} />
//                 <span>Meet Editorial Board</span>
//               </Link>
//             </div>
//           </div>
//           <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AboutUs;

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
             {/* Institutional Profile */}
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
              <strong>Forensic Patrika: A Journal of Forensic Science</strong> is a peer-reviewed academic journal dedicated to advancing scholarly research, critical inquiry, and ethical publishing across forensic science and related interdisciplinary fields. Founded on the principle that meaningful scholarship is defined by quality rather than experience or hierarchy, the journal fosters inclusive academic participation. It supports emerging researchers in contributing meaningfully to the global scholarly community.
            </p>
            <p>
              Our mission is to make scholarly publishing accessible, transparent, and academically rigorous for undergraduate, postgraduate, doctoral, and early-career researchers. Through a structured peer-review process, the journal provides a professional platform for publishing original research articles, review papers, and interdisciplinary studies while promoting ethical publishing practices and academic integrity.
            </p>
            {/* <blockquote className="border-l-4 border-blue-900 pl-6 italic text-blue-900 font-medium my-8">
              “Curiosity is the first step for research, integrity is what takes it forward"
            </blockquote> */}
          </div>

          {/* COLUMN 2: ACADEMIC GUIDANCE */}
           {/* <div className="space-y-6 bg-stone-50 p-6 border border-stone-200 shadow-sm">
            <h3 className="text-xl font-bold text-blue-900 border-b pb-2 mb-4">
              Academic Stewardship
              </h3>
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
          </div> */}
         </div> 

        {/* BOTTOM SECTION: PEER REVIEW COMMITMENT */}
        {/* <div className="mt-16 bg-blue-900 text-white p-8 md:p-12 rounded-sm shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6 tracking-wide uppercase">Our Scholarly Standards</h3>
            <p className="text-blue-100 leading-loose">
              Through a structured peer review process involving students and faculty members, the platform aims to uphold academic standards whie nurturing emerging researchers. FORENSIC SCIENCE : A JOURNAL OF FORENSIC SCIENCE stands as a representation of the department and university's dedication to responsible scholarship, critical engagement, and the dissemination of research that contributes to the advancement of forensic science and criminology at both national and global levels.
            </p>
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default AboutUs;
