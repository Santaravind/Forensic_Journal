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
const EditorialTeam = () => {
  const editorialTeam = {
    leadership: [
      {
        id: 1,
        name: "Dr. Vijay Kumar Yadav",
        post: "Founder",
        position: "Editor-in-Chief",
        initials: "VK",
      },
      {
        id: 2,
        name: "Indresh Kumar",
        post: "Co-Founder",
        position: "Publisher",
        initials: "IK",
      },
    ],
    seniorEditors: [
      {
        id: 3,
        name: "Dr. Murali Manohar Yadav",
        position: "Co-Editor-in-Chief",
        initials: "MM",
      },
      {
        id: 4,
        name: "Dr. Akash Kumar",
        position: "Co-Editor-in-Chief",
        initials: "AK",
      },
      {
        id: 8,
        name: "Nawab John Dar",
        position: "Intl. Editorial Head",
        initials: "NJ",
      },
    ],
    editorialStaff: [
      {
        id: 5,
        name: "Dr. Abhimanyu Harshey",
        position: "Managing Editor",
        initials: "AH",
      },
      {
        id: 6,
        name: "Dr. Prakash Chandra",
        position: "Associate Editor",
        initials: "PC",
      },
      {
        id: 7,
        name: "Mr. Shantanu Singh",
        position: "Section Editor",
        initials: "SS",
      },
      {
        id: 11,
        name: "Hrigvi Singh Banafar",
        position: "Publication Manager",
        initials: "HS",
      },
    ],
    support: [
      {
        id: 9,
        name: "Ms. Richa Jaiswal",
        position: "Reviewer",
        initials: "RJ",
      },
      {
        id: 10,
        name: "Ms. Ankita Sikoria",
        position: "Communication Officer",
        initials: "AS",
      },
      {
        id: 12,
        name: "Aravind Sant Singh",
        position: "Technical Head",
        initials: "AS",
      },
    ],
  };

  const Card = ({ member, featured = false }) => (
    <div
      className={`relative group flex flex-col items-center p-6 bg-white rounded-2xl transition-all duration-300 hover:shadow-xl border ${featured ? "border-slate-800 ring-1 ring-slate-800" : "border-slate-100 shadow-sm"}`}
    >
      {/* Decorative Role Badge */}
      <div
        className={`absolute -top-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm ${featured ? "bg-slate-800 text-white" : "bg-blue-50 text-blue-700"}`}
      >
        {member.position}
      </div>

      {/* Avatar Placeholder */}
      <div
        className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center text-xl font-semibold border-2 transition-transform group-hover:scale-110 ${featured ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-blue-50 border-blue-100 text-blue-600"}`}
      >
        {member.initials}
      </div>

      <h3 className="text-sm font-bold text-slate-900 text-center leading-tight">
        {member.name}
      </h3>
      {member.post && (
        <span className="mt-1 text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
          {member.post}
        </span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-20">
          <span className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase bg-blue-50 px-4 py-2 rounded-full">
            A Journal of Forensic Science
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Forensic Patrika
          </h1>
          <p className="mt-2 text-slate-500 font-medium text-lg italic">
            Editorial Team Structure
          </p>
          <div className="mt-6 w-20 h-1.5 bg-slate-800 mx-auto rounded-full"></div>
        </header>

        {/* Leadership Tier */}
        <section className="mb-16">
          <div className="flex flex-col items-center mb-8">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
              Board Leadership
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {editorialTeam.leadership.map((m) => (
              <Card key={m.id} member={m} featured={true} />
            ))}
          </div>
        </section>

        {/* Tree Connection Line (Visual Only) */}
        <div className="hidden md:block w-px h-12 bg-slate-200 mx-auto -mt-8 mb-8"></div>

        {/* Senior Editors Tier */}
        <section className="mb-16">
          <div className="flex flex-col items-center mb-8">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
              Senior Editorial Board
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 gap-6 max-w-4xl mx-auto">
            {editorialTeam.seniorEditors.map((m) => (
              <Card key={m.id} member={m} />
            ))}
          </div>
        </section>

        {/* Editorial Staff Tier */}
        <section className="mb-16">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-full h-px bg-slate-200 max-w-3xl mb-8"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
              Operational Staff
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {editorialTeam.editorialStaff.map((m) => (
              <Card key={m.id} member={m} />
            ))}
          </div>
        </section>

        {/* Support & International Tier */}
        <section>
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-full h-px bg-slate-200 max-w-3xl mb-8"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
              International & Technical Support
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-8 text-center">
            {editorialTeam.support.map((m) => (
              <div
                key={m.id}
                className="p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition-colors"
              >
                <div className="text-[9px] font-bold text-blue-600 uppercase mb-2 truncate justify-center items-center">
                  {m.position}
                </div>
                <div className="text-2xs font-bold text-slate-800">{m.name}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditorialTeam;
