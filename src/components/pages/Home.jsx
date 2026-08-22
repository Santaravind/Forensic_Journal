import React, { useState } from "react";
import logo from '../assets/logos.png'
import Content from "./home/Content";

import { useNavigate } from "react-router-dom";
import mukesh from '../assets/Mukesh.jpeg'
import vijay from '../assets/VIJAY.jpeg'
import rahul from '../assets/indresh.jpeg'
import OurTeam from "./home/OurTeam";
import Case from "./home/Case";
function Home() {
  const navigate = useNavigate();
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [activeTab, setActiveTab] = React.useState('Articles in Press');

const tabs = [
  { id: 'articles', label: 'Articles in Press', pulse: true },
  { id: 'case', label: 'Case Study', pulse: true },
  { id: 'cited', label: 'Top Cited', pulse: true },
  { id: 'popular', label: 'Most Popular', pulse: true },
];

 const handleArticle = () => {
    setShowCaseStudy(true);
  };

  const image=[
    {
      id:1,
    im:mukesh,
    link:"",
    name:"Prof (Dr.) Mukesh Pandey",
    title:'Vice Chancellor',
    college:'Bundelkhand University, Jhansi Uttar Pradesh(India)'
  },
    {
      id:2,
    im:vijay,
    link:'https://ums.bujhansi.ac.in/bujhansi/frmViewCampusFacultyProfile.aspx?FacultyID=39',
     name:"DR. VIJAY KUMAR YADAV ",
    title:'Coordinator/Head',
    college:'Dr. A.P.J Abdul Kalam Institute of Forensic Science and Criminology'
  },
    {
      id:3,
    im:rahul,
    link:"",
    name:"Indresh Kumar",
    title:"Founder and CEO - Forensic Patrika" 

  },
    ]
      
  return (
    <>  
    <div className="min-h-screen bg-gray-200 py-6 px-4 md:py-10 md:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg border border-gray-300 p-6 md:p-10 space-y-8 relative">
        
        {/* CLASSIC HEADER SECTION */}
        <div className="border-b-4 border-double border-blue-900 pb-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-blue-900 font-bold text-2xl sm:text-3xl md:text-5xl tracking-tight font-serif uppercase leading-tight">
              {/* Dr. A. P. J. Abdul Kalam Institute of <br /> */}
              <span className="text-blue-800">
                {/* Forensic Science and Criminology */}
                </span>
            </h1>

            <div className="flex items-center gap-4 w-full justify-center mt-2">
              <div className="h-px bg-blue-900 grow hidden md:block"></div>
              <h2 className="text-gray-700 font-medium text-lg md:text-2xl italic font-serif">
                {/* Bundelkhand University, Jhansi, Uttar Pradesh, India */}
              </h2>
              <div className="h-px bg-blue-900 grow hidden md:block"></div>
            </div>
          </div>
        </div>

        {/* CONTENT BODY SECTION */}
        <div className="relative mt-8">
          {/* Decorative Logo Placement */}
          <div className="float-none sm:float-left sm:mr-8 mb-6 sm:mb-4 p-3 border border-gray-200 bg-gray-50 shadow-sm rounded-sm max-w-xs mx-auto sm:mx-0">
            <img
              src={logo}
              alt="Patrika Logo"
              className="w-full sm:w-52 h-auto object-contain"
            />
          </div>

          <div className="prose prose-blue max-w-none space-y-6">
            <p className="text-gray-800 text-justify font-serif leading-relaxed text-lg md:text-xl first-letter:text-5xl md:first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-blue-900">
              <strong className="text-blue-900 uppercase tracking-wide">
                Welcome to Forensic Patrika: A Journal of Forensic Science
              </strong>
              , an academic publication platform committed to advancing scholarly
              research, critical inquiry, and ethical academic writing. With a
              primary emphasis on forensic science, criminology, and related
              interdisciplinary domains, this platform provides a structured and
              peer-reviewed space for students and early-career researchers to
              publish original research articles, review papers, and analytical
              studies that contribute meaningfully to contemporary academic
              discourse.
            </p>

            <p className="text-gray-800 text-justify font-serif leading-relaxed text-lg md:text-xl border-l-4 border-blue-900 pl-6 italic bg-blue-50/40 py-2">
              The journal welcomes submissions from undergraduate, postgraduate,
              and doctoral scholars. By fostering an academically rigorous
              environment,{" "}
              <strong className="font-bold text-blue-900">
                FORENSIC PATRIKA
              </strong>{" "}
              seeks to strengthen emerging academic voices and facilitate the
              responsible dissemination of knowledge within the global scholarly
              community.
            </p>

            <p className="text-gray-800 text-justify font-serif leading-relaxed text-lg md:text-xl border-l-4 border-blue-900 pl-6 italic bg-blue-50/40 py-2">
              In addition to promoting academic excellence, Forensic Patrika: A
              Journal of Forensic Science seeks to bridge the gap between theoretical
              research and practical application within forensic and investigative
              sciences. The journal actively encourages interdisciplinary
              collaboration by welcoming research that integrates law, psychology,
              digital forensics, forensic biology, toxicology, cybercrime studies,
              criminal justice, and emerging technological innovations influencing
              modern investigative methodologies. Through this inclusive academic
              framework, the journal aspires to cultivate holistic, analytical, and
              solution-oriented research perspectives.
            </p>

            <p className="text-gray-800 text-justify font-serif leading-relaxed text-lg md:text-xl border-l-4 border-blue-900 pl-6 italic bg-blue-50/40 py-2">
              Forensic Patrika is committed to maintaining transparency, academic
              integrity, and ethical publishing standards through a structured
              peer-review process designed to ensure research quality, originality,
              and scholarly credibility. The journal strictly adheres to
              plagiarism-screening protocols, ethical research guidelines, and
              responsible authorship practices in order to uphold the trust and
              reliability expected within both academic and professional
              communities.
            </p>

            <p className="text-gray-800 text-justify font-serif leading-relaxed text-lg md:text-xl border-l-4 border-blue-900 pl-6 italic bg-blue-50/40 py-2">
              The platform also functions as a developmental academic space,
              supporting first-time researchers and student scholars by promoting
              constructive peer-review feedback, mentorship opportunities, and
              exposure to structured scholarly publication standards.
            </p>
          </div>
        </div>

      </div>
    </div>

{/* this for navigation */}
   <Content/>

  <div className="flex flex-wrap gap-6 ml-2 mr-3 border-b-4 border-gray-200 pb-4">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => {
          setActiveTab(tab.label);
          handleArticle(tab.id);
          setShowCaseStudy(true)
        }}
        className={`
          group relative flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer
          ${activeTab === tab.label 
            ? 'bg-blue-50 text-blue-600 shadow-md ring-1 ring-blue-200' 
            : 'bg-white text-gray-600 hover:text-blue-600 hover:shadow-xl hover:-translate-y-1 border border-gray-100'
          }
        `}
      >
        {/* The Indicator Dot - Fixed Logic */}
        <span className="relative flex h-3 w-3">
          {tab.pulse && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-3 w-3 ${tab.pulse ? 'bg-green-500' : 'bg-gray-300'}`}></span>
        </span>

        <span className="text-lg tracking-tight">{tab.label}</span>
        
        {/* Underline decoration for active tab */}
        {activeTab === tab.label && (
          <div className="absolute -bottom-4 left-0 w-full h-1 bg-blue-600 rounded-t-full" />
        )}
      </button>
    ))}
  </div>

    
    <div className="mt-6 ml-5 border-white shadow px-2 py-2 mr-3">
        {showCaseStudy && <Case/>}
      </div>
               <OurTeam/>
    </>
  );
}

export default Home;
