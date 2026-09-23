// import React from "react";
// import { Link } from "react-router-dom";
// import { 
//   Award, 
//   ShieldCheck, 
//   BookOpen, 
//   UserCheck, 
//   GraduationCap, 
//   Globe, 
//   Mail, 
//   ExternalLink,
//   Sparkles,
//   Layers,
//   FileCheck
// } from "lucide-react";
// import logo from "../assets/logoss.png";
// import vijay from "../assets/VIJAY.jpeg";
// import indresh from "../assets/indresh.jpeg";
// import hrigvi from "../assets/hrigvi.jpeg";
// import mukesh from "../assets/Mukesh.jpeg";
// import { FcUndo } from "react-icons/fc";

// export default function EditorialTeam() {
//   const patron = {
//     name: "Prof. (Dr.) Mukesh Pandey",
//     role: "Chief Patron & Academic Visionary",
//     position: "Hon'ble Vice Chancellor",
//     institution: "Bundelkhand University, Jhansi (U.P.), India",
//     image: mukesh,
//     initials: "MP",
//     desc: "Guiding institutional excellence, interdisciplinary research cultivation, and academic governance."
//   };

//   const leadership = [
//     {
//       name: "Dr. Vijay Kumar Yadav",
//       post: "Founder",
//       role: "Editor-in-Chief",
//       institution: "Coordinator & Head, Institute of Forensic Science & Criminology",
//       image: vijay,
//       initials: "VY",
//       profileUrl: "https://ums.bujhansi.ac.in/bujhansi/frmViewCampusFacultyProfile.aspx?FacultyID=39",
//       expertise: "Forensic DNA, Molecular Biology, Medico-Legal Jurisprudence"
//     },
//     {
//       name: "Indresh Kumar",
//       post: "Co-Founder",
//       role: "Publisher & Managing Director",
//       institution: "Forensic Patrika Publishing Bureau",
//       image: indresh,
//       initials: "IK",
//       profileUrl: "https://www.happydigitalbharat.com/indresh",
//       expertise: "Academic Publishing, Research Dissemination, Digital Systems"
//     }
//   ];

//   const seniorEditors = [
//     {
//       name: "Dr. Murali Manohar Yadav",
//       role: "Co-Editor-in-Chief",
//       institution: "Institute of Forensic Science & Criminology",
//       initials: "MY",
//       expertise: "Forensic Toxicology, Chemical Profiling"
//     },
//     {
//       name: "Dr. Akash Kumar",
//       role: "Co-Editor-in-Chief",
//       institution: "Department of Forensic Sciences",
//       initials: "AK",
//       profileUrl: "https://ums.bujhansi.ac.in/BUJhansi/frmViewCampusFacultyProfile.aspx?FacultyID=494",
//       expertise: "Digital Evidence, Crime Scene Reconstruction"
//     },
//     {
//       name: "Nawab John Dar",
//       role: "International Editorial Head",
//       institution: "Global Forensic Research Network",
//       initials: "NJ",
//       expertise: "International Medico-Legal Standards"
//     }
//   ];

//   const editorialStaff = [
//     {
//       name: "Dr. Abhimanyu Harshey",
//       role: "Managing Editor",
//       institution: "Forensic Science Research Laboratory",
//       initials: "AH",
//       expertise: "Questioned Documents, Fingerprint Analytics"
//     },
//     {
//       name: "Dr. Prakash Chandra",
//       role: "Associate Editor",
//       institution: "Forensic Serology & Toxicology Unit",
//       initials: "PC",
//       expertise: "Biochemical Forensics, LC-MS Protocols"
//     },
//     {
//       name: "Hrigvi Singh Banafar",
//       role: "Publication Manager",
//       institution: "Forensic Patrika Operations",
//       image: hrigvi,
//       initials: "HS",
//       expertise: "Editorial Screening, Quality Assurance"
//     }
//   ];

//   const supportTeam = [
//     {
//       name: "Aravind Sant Singh",
//       role: "Technical Head & Systems Architect",
//       institution: "Forensic Patrika Digital Systems",
//       initials: "AS"
//     },
//     {
//       name: "Ms. Ankita Sikoria",
//       role: "Author Communications Officer",
//       institution: "Forensic Patrika Editorial Office",
//       initials: "AS"
//     },
//     {
//       name: "Ms. Richa Jaiswal",
//       role: "Review Board Coordinator",
//       institution: "Peer Review Operations",
//       initials: "RJ"
//     },
//     {
//       name: "Mr. Shantanu Singh",
//       role: "Sectional Reviewer",
//       institution: "Forensic Physics & Ballistics",
//       initials: "SS"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
//       <div className="max-w-6xl mx-auto">

//         {/* HEADER SECTION */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-4 uppercase tracking-wider shadow-xs">
//             <ShieldCheck size={14} className="text-indigo-600" />
//             <span>Academic Governance & Peer-Review Council</span>
//           </div>

//           <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-serif mb-4 leading-tight">
//             Editorial Board Structure
//           </h1>
//           <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
//             Distinguished scholars, researchers, forensic experts, and academicians overseeing the scientific integrity and peer-review process of <strong className="text-indigo-700">Forensic Patrika</strong>.
//           </p>
//         </div>

//         {/* PATRON SECTION */}
//         <div className="mb-14">
//           <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/90 max-w-3xl mx-auto relative overflow-hidden group hover:shadow-xl transition-all duration-300">
//             <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-indigo-600 to-blue-600"></div>

//             <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
//               <div className="relative shrink-0">
//                 <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-indigo-50 flex items-center justify-center">
//                   {patron.image ? (
//                     <img
//                       src={patron.image}
//                       alt={patron.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-2xl font-bold text-indigo-700 font-serif">{patron.initials}</span>
//                   )}
//                 </div>
//                 <span className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs uppercase">
//                   Patron
//                 </span>
//               </div>

//               <div className="space-y-1.5 flex-1">
//                 <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
//                   {patron.role}
//                 </span>
//                 <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
//                   {patron.name}
//                 </h3>
//                 <p className="text-sm font-semibold text-indigo-700">
//                   {patron.position}
//                 </p>
//                 <p className="text-xs text-slate-500">
//                   {patron.institution}
//                 </p>
//                 <p className="text-xs text-slate-600 pt-2 border-t border-slate-100 italic">
//                   "{patron.desc}"
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* BOARD LEADERSHIP & FOUNDERS */}
//         <section className="mb-16">
//           <div className="text-center mb-8">
//             <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
//               Board Leadership
//             </span>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//             {leadership.map((member, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-indigo-300 flex flex-col items-center text-center group"
//               >
//                 <div className="relative mb-4">
//                   <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-indigo-50 shadow-md bg-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
//                     {member.image ? (
//                       <img
//                         src={member.image}
//                         alt={member.name}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-2xl font-bold text-indigo-600">{member.initials}</span>
//                     )}
//                   </div>
//                   <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
//                     {member.post}
//                   </span>
//                 </div>

//                 <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-serif mt-2">
//                   {member.name}
//                 </h3>
//                 <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mt-1">
//                   {member.role}
//                 </p>
//                 <p className="text-xs text-slate-500 mt-1 mb-3">
//                   {member.institution}
//                 </p>

//                 {member.expertise && (
//                   <p className="text-[11px] text-slate-600 bg-slate-50 py-1.5 px-3 rounded-xl border border-slate-100 mb-4">
//                     <strong className="text-slate-800">Domain:</strong> {member.expertise}
//                   </p>
//                 )}

//                 {member.profileUrl && (
//                   <a
//                     href={member.profileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
//                   >
//                     <span>View Academic Profile</span>
//                     <ExternalLink size={12} />
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* SENIOR EDITORIAL BOARD */}
//         <section className="mb-16">
//           <div className="text-center mb-8">
//             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
//               Senior Editorial Board
//             </span>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             {seniorEditors.map((member, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-slate-200/90 text-center flex flex-col items-center justify-between"
//               >
//                 <div className="w-16 h-16 rounded-full bg-indigo-50 border-2 border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg font-serif mb-3">
//                   {member.initials}
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-slate-900 text-sm">{member.name}</h4>
//                   <p className="text-xs font-semibold text-indigo-600 mt-0.5">{member.role}</p>
//                   <p className="text-xs text-slate-400 mt-1">{member.institution}</p>
//                   {member.expertise && (
//                     <span className="inline-block text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md mt-2 border border-slate-100">
//                       {member.expertise}
//                     </span>
//                   )}
//                 </div>
//                 {member.profileUrl && (
//                   <a
//                     href={member.profileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mt-3 text-[11px] font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1"
//                   >
//                     <span>Faculty Link</span>
//                     <ExternalLink size={10} />
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* OPERATIONAL EDITORS */}
//         <section className="mb-16">
//           <div className="text-center mb-8">
//             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
//               Editorial Operations & Production
//             </span>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             {editorialStaff.map((member, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-slate-200/90 text-center flex flex-col items-center justify-between"
//               >
//                 <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 border-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-base mb-3 shadow-xs">
//                   {member.image ? (
//                     <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
//                   ) : (
//                     member.initials
//                   )}
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-slate-900 text-sm">{member.name}</h4>
//                   <p className="text-xs font-semibold text-indigo-600 mt-0.5">{member.role}</p>
//                   <p className="text-xs text-slate-400 mt-1">{member.institution}</p>
//                   {member.expertise && (
//                     <span className="inline-block text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md mt-2 border border-slate-100">
//                       {member.expertise}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* TECHNICAL & REVIEW ADVISORY */}
//         <section className="mb-16">
//           <div className="text-center mb-8">
//             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
//               Technical & Advisory Support
//             </span>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
//             {supportTeam.map((member, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 text-center"
//               >
//                 <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs mx-auto mb-2">
//                   {member.initials}
//                 </div>
//                 <h5 className="font-bold text-xs text-slate-800 leading-snug">{member.name}</h5>
//                 <p className="text-[10px] font-semibold text-indigo-600 mt-0.5">{member.role}</p>
//                 <p className="text-[10px] text-slate-400 mt-1">{member.institution}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* SCHOLARLY STANDARDS COMMITMENT CARD */}
//         <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
//           <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
//               <FileCheck size={14} /> Peer-Review Integrity
//             </div>
//             <h3 className="text-2xl sm:text-3xl font-bold font-serif">
//               Our Commitment to Academic Rigor & Objectivity
//             </h3>
//             <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
//               Forensic Patrika operates under double-blind peer review protocols. Reviewers and editors are committed to objective evaluation, confidentiality, conflict of interest disclosure, and fostering student-led and professional scholarship in forensic science and criminology.
//             </p>
//             <div className="pt-2 flex justify-center gap-4">
//               <Link
//                 to="/peer"
//                 className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
//               >
//                 Read Peer-Review Policy
//               </Link>
//               <Link
//                 to="/ethics"
//                 className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-all"
//               >
//                 Ethics & Malpractice
//               </Link>
//             </div>
//           </div>
//           <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
//         </div>

//       </div>
//     </div>
//   );
// }

// import React from 'react'
// import { FaUserTie, FaGraduationCap } from 'react-icons/fa';
// import logo from '../assets/logos.png'
// import vijay from '../assets/VIJAY.jpeg'
// import indresh from '../assets/indresh.jpeg'
// import hrigiv from '../assets/hrigvi.jpeg'
// import sant from '../assets/Arvind.png'
// function EditorialTeam() {
//   const editorialTeam = {
//   leadership: [
//     { id: 1, name: "Dr. Vijay Kumar Yadav", post: "Founder", position: "Editor-in-Chief", image: vijay },
//     { id: 2, name: "Indresh Kumar", post: "CO-Founder", position: "Publisher", image: indresh },
//   ],
//   coEditors: [
//     { id: 3, name: "Dr. Murali Manohar Yadav", position: "Co-Editor-in-Chief", image: logo },
//     { id: 4, name: "Dr. Akash Kumar", position: "Co-Editor-in-Cy hief", image:logo },
//   ],
//   editorialStaff: [
//     { id: 5, name: "Dr. Abhimanyu Harshey", position: "Managing Editor", image:logo },
//     { id: 6, name: "Dr. Prakash Chandra", position: "Associate Editor", image: logo },
//     { id: 7, name: "Mr. Shantanu Singh", position: "Section Editor", image: logo },
//   ],
//   specialRoles: [
//     { id: 8, name: "Nawab John Dar", position: "International Editorial Head", image: logo },
//   ],
//   sideStaff: [
//     { id: 9, name: "Ms. Richa Jaiswal", position: "Reviewers", image :logo },
//     { id: 10, name: "Ms. Ankita Sikoria", position: "Communication Officer",image:logo },
//     { id: 11, name: "Hrigvi Singh Banafar", position: "Publication Manager",image:hrigiv },
//     { id: 12, name: "Aravind Sant Singh", position: "Technical Head"  },
//   ]
// };

//   const MemberCard = ({ member, size = "large" }) => (
//     <div className="flex flex-col items-center text-center p-4 transition-transform hover:scale-105">
//       <div className={`relative mb-3 rounded-full border-4 border-blue-600 p-1 shadow-lg overflow-hidden ${size ==='large' ? 'w-36 h-36' : 'w-34 h-34'}`}>
//         <img
//           src={member.image ||''}
//           alt={member.name}
//           className="w-full h-full object-cover rounded-full"
//         />
//       </div>
//       <h3 className={`${size === 'large' ? 'text-sm' : 'text-xs'} font-bold text-gray-900 uppercase`}>{member.name}</h3>
//       <p className="text-[10px] font-semibold text-blue-700 leading-tight">{member.post}</p>
//       <p className="text-[10px] text-gray-600 font-medium">{member.position}</p>
//     </div>
//   );

//   return (
//     <>
//     <section className="bg-white py-16 px-4 max-w-7xl mx-auto">
//       {/* Header Section */}
//       <div className="text-center mb-16">
//         <h1 className="text-4xl font-black text-gray-900 tracking-tight">Editorial Team Structure</h1>
//         <div className="mt-4 inline-block bg-yellow-400 px-6 py-1 rounded-lg">
//           <h2 className="text-3xl font-bold text-black">Forensic Patrika</h2>
//         </div>
//         <p className="text-xl font-bold mt-2 text-gray-800">(A Journal of Forensic Science)</p>
//       </div>

//       <div className="grid grid-cols-12 gap-8">
//         {/* Main Hierarchy (Left 9 columns) */}
//         <div className="col-span-12 lg:col-span-9 space-y-12">

//           {/* Tier 1: Leadership */}
//           <div className="flex justify-around items-start max-w-2xl mx-auto">
//             {editorialTeam.leadership.map(m => <MemberCard key={m.id} member={m} />)}
//           </div>

//           {/* Tier 2: Co-Editors & Staff Grid */}
//           <div className="grid grid-cols-2 gap-4 items-center">
//             {/* Left Column: Co-Editors */}
//             <div className="flex flex-col items-center gap-12">
//                <MemberCard member={editorialTeam.coEditors[0]} />
//                <MemberCard member={editorialTeam.coEditors[1]} />
//             </div>

//             {/* Middle Column: Editorial Staff */}
//             <div className="flex flex-col items-center gap-8 border-l border-r border-gray-100">
//                {editorialTeam.editorialStaff.map(m => <MemberCard key={m.id} member={m} />)}
//             </div>
//           </div>

//           {/* Tier 3: International Head */}
//           <div className="flex justify-end pr-20">
//              <MemberCard member={editorialTeam.specialRoles[0]} />
//           </div>
//         </div>

//         {/* Sidebar Staff (Right 3 columns) */}
//         <div className="col-span-12 lg:col-span-3 border-l border-gray-200 flex flex-col gap-6 justify-center">
//           {editorialTeam.sideStaff.map(m => (
//             <MemberCard key={m.id} member={m} size="small" />
//           ))}
//         </div>
//       </div>
//     </section>

//     </>

//   )
// }

// export default EditorialTeam

import React from "react";
import logo from "../assets/logos.png";
import { Users, Mail, Sparkles } from 'lucide-react';

export default function EditorialTeam() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4 py-12 text-center">
      {/* Visual Accent Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6 border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
        <Sparkles size={16} />
        <span>Under Construction</span>
      </div>

      {/* Main Title & Subtitle */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight max-w-xl">
        Meet Our Editorial Team
      </h1>
      <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
        We're currently assembling a passionate crew of writers, editors, and creators. Check back soon for launch updates!
      </p>

      {/* Visual Graphic Element */}
      <div className="my-10 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-500/10 blur-2xl rounded-full"></div>
        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
          <Users className="w-16 h-16 text-indigo-600 dark:text-indigo-400 animate-pulse" />
        </div>
      </div>

      {/* Optional Email Waitlist / CTA */}
      {/* <div className="w-full max-w-sm flex flex-col sm:flex-row gap-2 mt-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
        <button
          type="button"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm active:scale-[0.98]"
        >
          Notify Me
        </button>
      </div> */}
    </div>
  );
}

// export default EditorialTeam

//   const editorialTeam = {
//     leadership: [
//       {
//         id: 1,
//         name: "Dr. Vijay Kumar Yadav",
//         post: "Founder",
//         position: "Editor-in-Chief",
//         initials: "VK",
//       },
//       {
//         id: 2,
//         name: "Indresh Kumar",
//         post: "Co-Founder",
//         position: "Publisher",
//         initials: "IK",
//       },
//     ],
//     seniorEditors: [
//       {
//         id: 3,
//         name: "Dr. Murali Manohar Yadav",
//         position: "Co-Editor-in-Chief",
//         initials: "MM",
//       },
//       {
//         id: 4,
//         name: "Dr. Akash Kumar",
//         position: "Co-Editor-in-Chief",
//         initials: "AK",
//       },
//       {
//         id: 8,
//         name: "Nawab John Dar",
//         position: "Intl. Editorial Head",
//         initials: "NJ",
//       },
//     ],
//     editorialStaff: [
//       {
//         id: 5,
//         name: "Dr. Abhimanyu Harshey",
//         position: "Managing Editor",
//         initials: "AH",
//       },
//       {
//         id: 6,
//         name: "Dr. Prakash Chandra",
//         position: "Associate Editor",
//         initials: "PC",
//       },
//       // {
//       //   id: 7,
//       //   name: "Mr. Shantanu Singh",
//       //   position: "Section Editor",
//       //   initials: "SS",
//       // },
//       {
//         id: 11,
//         name: "Hrigvi Singh Banafar",
//         position: "Publication Manager",
//         initials: "HS",
//       },
//     ],
//     support: [
//     //   {
//     //     id: 9,
//     //     name: "Ms. Richa Jaiswal",
//     //     position: "Reviewer",
//     //     initials: "RJ",
//     //   },
//     //   {
//     //     id: 10,
//     //     name: "Ms. Ankita Sikoria",
//     //     position: "Communication Officer",
//     //     initials: "AS",
//     //   },
//       {
//         id: 12,
//         name: "Aravind Sant Singh",
//         position: "Technical Head",
//         initials: "AS",
//       },
//     ],
//   };

//   const Card = ({ member, featured = false }) => (
//     <div
//       className={`relative group flex flex-col items-center p-6 bg-white rounded-2xl transition-all duration-300 hover:shadow-xl border ${featured ? "border-slate-800 ring-1 ring-slate-800" : "border-slate-100 shadow-sm"}`}
//     >
//       {/* Decorative Role Badge */}
//       <div
//         className={`absolute -top-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm ${featured ? "bg-slate-800 text-white" : "bg-blue-50 text-blue-700"}`}
//       >
//         {member.position}
//       </div>

//       {/* Avatar Placeholder */}
//       <div
//         className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center text-xl font-semibold border-2 transition-transform group-hover:scale-110 ${featured ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-blue-50 border-blue-100 text-blue-600"}`}
//       >
//         {member.initials}
//       </div>

//       <h3 className="text-sm font-bold text-slate-900 text-center leading-tight">
//         {member.name}
//       </h3>
//       {member.post && (
//         <span className="mt-1 text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
//           {member.post}
//         </span>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 py-16 px-4 font-sans">
//       <div className="max-w-6xl mx-auto">
//         {/* Header Section */}
//         <header className="text-center mb-20">
//           <span className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase bg-blue-50 px-4 py-2 rounded-full">
//             A Journal of Forensic Science
//           </span>
//           <h1 className="mt-6 text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
//             Forensic Patrika
//           </h1>
//           <p className="mt-2 text-slate-500 font-medium text-lg italic">
//             Editorial Team Structure
//           </p>
//           <div className="mt-6 w-20 h-1.5 bg-slate-800 mx-auto rounded-full"></div>
//         </header>

//         {/* Leadership Tier */}
//         <section className="mb-16">
//           <div className="flex flex-col items-center mb-8">
//             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
//               Board Leadership
//             </span>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
//             {editorialTeam.leadership.map((m) => (
//               <Card key={m.id} member={m} featured={true} />
//             ))}
//           </div>
//         </section>

//         {/* Tree Connection Line (Visual Only) */}
//         <div className="hidden md:block w-px h-12 bg-slate-200 mx-auto -mt-8 mb-8"></div>

//         {/* Senior Editors Tier */}
//         <section className="mb-16">
//           <div className="flex flex-col items-center mb-8">
//             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
//               Senior Editorial Board
//             </span>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 gap-6 max-w-4xl mx-auto">
//             {editorialTeam.seniorEditors.map((m) => (
//               <Card key={m.id} member={m} />
//             ))}
//           </div>
//         </section>

//         {/* Editorial Staff Tier */}
//         <section className="mb-16">
//           <div className="flex flex-col items-center mb-8 text-center">
//             <div className="w-full h-px bg-slate-200 max-w-3xl mb-8"></div>
//             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
//               Operational Staff
//             </span>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//             {editorialTeam.editorialStaff.map((m) => (
//               <Card key={m.id} member={m} />
//             ))}
//           </div>
//         </section>

//         {/* Support & International Tier */}
//         <section>
//           <div className="flex flex-col items-center mb-8 text-center">
//             <div className="w-full h-px bg-slate-200 max-w-3xl mb-8"></div>
//             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
//               International & Technical Support
//             </span>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-8 text-center">
//             {editorialTeam.support.map((m) => (
//               <div
//                 key={m.id}
//                 className="p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition-colors"
//               >
//                 <div className="text-[9px] font-bold text-blue-600 uppercase mb-2 truncate justify-center items-center">
//                   {m.position}
//                 </div>
//                 <div className="text-2xs font-bold text-slate-800">{m.name}</div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );

// };
// export default EditorialTeam;
