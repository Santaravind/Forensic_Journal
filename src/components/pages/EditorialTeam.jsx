import React from 'react'
import { FaUserTie, FaGraduationCap } from 'react-icons/fa';
import logo from '../assets/logos.png'
import vijay from '../assets/VIJAY.jpeg'
import indresh from '../assets/indresh.jpeg'
import hrigiv from '../assets/hrigvi.jpeg'
import sant from '../assets/Arvind.png'
function EditorialTeam() {
  const editorialTeam = {
  leadership: [
    { id: 1, name: "Dr. Vijay Kumar Yadav", post: "Founder", position: "Editor-in-Chief", image: vijay },
    { id: 2, name: "Indresh Kumar", post: "CO-Founder", position: "Publisher", image: indresh },
  ],
  coEditors: [
    { id: 3, name: "Dr. Murali Manohar Yadav", position: "Co-Editor-in-Chief", image: logo },
    { id: 4, name: "Dr. Akash Kumar", position: "Co-Editor-in-Cy hief", image:logo },
  ],
  editorialStaff: [
    { id: 5, name: "Dr. Abhimanyu Harshey", position: "Managing Editor", image:logo },
    { id: 6, name: "Dr. Prakash Chandra", position: "Associate Editor", image: logo },
    { id: 7, name: "Mr. Shantanu Singh", position: "Section Editor", image: logo },
  ],
  specialRoles: [
    { id: 8, name: "Nawab John Dar", position: "International Editorial Head", image: logo },
  ],
  sideStaff: [
    { id: 9, name: "Ms. Richa Jaiswal", position: "Reviewers", image :logo },
    { id: 10, name: "Ms. Ankita Sikoria", position: "Communication Officer",image:logo },
    { id: 11, name: "Hrigvi Singh Banafar", position: "Publication Manager",image:hrigiv },
    { id: 12, name: "Aravind Sant Singh", position: "Technical Head" , image:sant },
  ]
};
  

  
  const MemberCard = ({ member, size = "large" }) => (
    <div className="flex flex-col items-center text-center p-4 transition-transform hover:scale-105">
      <div className={`relative mb-3 rounded-full border-4 border-blue-600 p-1 shadow-lg overflow-hidden ${size === 'large' ? 'w-36 h-36' : 'w-40 h-40'}`}>
        <img 
          src={member.image ||''} 
          alt={member.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <h3 className={`${size === 'large' ? 'text-sm' : 'text-xs'} font-bold text-gray-900 uppercase`}>{member.name}</h3>
      <p className="text-[10px] font-semibold text-blue-700 leading-tight">{member.post}</p>
      <p className="text-[10px] text-gray-600 font-medium">{member.position}</p>
    </div>
  );

  return (
    <section className="bg-white py-16 px-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Editorial Team Structure</h1>
        <div className="mt-4 inline-block bg-yellow-400 px-6 py-1">
          <h2 className="text-3xl font-bold text-black">Forensic Patrika</h2>
        </div>
        <p className="text-xl font-bold mt-2 text-gray-800">(A Journal of Forensic Science)</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Hierarchy (Left 9 columns) */}
        <div className="col-span-12 lg:col-span-9 space-y-12">
          
          {/* Tier 1: Leadership */}
          <div className="flex justify-around items-start max-w-2xl mx-auto">
            {editorialTeam.leadership.map(m => <MemberCard key={m.id} member={m} />)}
          </div>

          {/* Tier 2: Co-Editors & Staff Grid */}
          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Left Column: Co-Editors */}
            <div className="flex flex-col items-center gap-12">
               <MemberCard member={editorialTeam.coEditors[0]} />
               <MemberCard member={editorialTeam.coEditors[1]} />
            </div>

            {/* Middle Column: Editorial Staff */}
            <div className="flex flex-col items-center gap-8 border-l border-r border-gray-100">
               {editorialTeam.editorialStaff.map(m => <MemberCard key={m.id} member={m} />)}
            </div>
          </div>

          {/* Tier 3: International Head */}
          <div className="flex justify-end pr-20">
             <MemberCard member={editorialTeam.specialRoles[0]} />
          </div>
        </div>

        {/* Sidebar Staff (Right 3 columns) */}
        <div className="col-span-12 lg:col-span-3 border-l border-gray-200 flex flex-col gap-6 justify-center">
          {editorialTeam.sideStaff.map(m => (
            <MemberCard key={m.id} member={m} size="small" />
          ))}
        </div>
      </div>
    </section>
  
    
  )
}

export default EditorialTeam
