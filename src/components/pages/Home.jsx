import React, { useState } from "react";
import logo from '../assets/logos.png'
import Content from "./home/Content";
import CaseStudy from "./home/CaseStudy";
import { useNavigate } from "react-router-dom";
import mukesh from '../assets/Mukesh.jpeg'
import vijay from '../assets/VIJAY.jpeg'
import rahul from '../assets/indresh.jpeg'
import OurTeam from "./home/OurTeam";
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
    <div className="min-h-screen bg-gray-200 py-6 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-lg border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">

          {/* LEFT IMAGE COLUMN  this working but not so good in mobile view  */}
          {/* <div className="space-y-6 border-r pr-4">
            {image.map((item) => (
              <> 
              <div
                key={item.id}
                className="h-48 border shadow-sm bg-gray-100 flex items-center justify-center"
              >
                <img
                  src={item.im}
                  alt="Forensic"
                  className="w-full h-full  object-fill"
                />
              
                   
               
              </div>
              <div className="-mt-7">
                <h1 className="text-xl  font-serif text-center">  {item.name} </h1>
                <p className="font-serif text-center text-black/60 -mt-2"> {item.title} </p>
                <p className="text-[14px] text-center text-black/80"> {item.college} </p>
              </div>
          </>
            ))}
          </div> */}
           {/*  LEFT IMAGE COLUMN */}
          <div className="space-y-8 border-r pr-0 md:pr-4 sm:border-b-4  sm:border-blue-900">
  {image.map((item) => (
    <div
      key={item.id}
      className="flex flex-col items-center text-center"
    >
      {/* Image */}
      <div className="w-full sm:w-70 md:w-full  bg-gray-100 border shadow-sm overflow-hidden rounded-md">
       <a href= {item.link}> <img
          src={item.im}
          alt="Forensic"
          className="w-full h-full object-cover"
        /></a>
      </div>

      {/* Text */}
      <div className="mt-3 px-2">
        <h1 className="text-lg md:text-xl font-serif">
          {item.name}
        </h1>

        <p className="font-serif text-sm md:text-base text-black/60">
          {item.title}
        </p>

        <p className="text-xs md:text-sm text-black/80">
          {item.college}
        </p>
      </div>
    </div>
  ))}
</div>


          
          
          {/* RIGHT CONTENT SECTION */}
<div className="md:col-span-3 space-y-8 relative p-6 bg-white">
  
  {/* CLASSIC HEADER SECTION */}
  <div className="border-b-4 border-double border-blue-900 pb-6 text-center">
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-blue-900 font-bold text-2xl md:text-4xl tracking-tight font-serif uppercase leading-tight">
        Dr. A. P. J. Abdul Kalam Institute of <br />
        <span className="text-blue-800">Forensic Science and Criminology</span>
      </h1>
      
      <div className="flex items-center gap-4 w-full justify-center">
        <div className="h-px bg-blue-900 grow hidden md:block"></div>
        <h2 className="text-gray-700 font-medium text-lg md:text-xl italic font-serif">
          Bundelkhand University, Jhansi, Uttar Pradesh, India
        </h2>
        <div className="h-px bg-blue-900 grow hidden md:block"></div>
      </div>
    </div>
  </div>

  {/* CONTENT BODY */}
  <div className="relative mt-8 group">
    {/* Decorative Logo Placement */}
    <div className="float-left mr-8 mb-4 p-2 border border-gray-200 bg-gray-50 shadow-sm rounded-sm">
      <img
        src={logo}
        alt="Patrika Logo"
        className="w-48 h-auto object-contain"
      />
    </div>

    <div className="prose prose-blue max-w-none">
      <p className="text-gray-800 text-justify font-serif leading-relaxed text-lg md:text-xl first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-blue-900">
        <strong className="text-blue-900 uppercase tracking-wide">Welcome to Forensic Patrika: A Journal of Forensic Science</strong>, 
        an academic publication platform committed to advancing scholarly research, critical inquiry, and ethical academic writing. 
        With a primary emphasis on forensic science, criminology, and related interdisciplinary domains, this platform provides 
        a structured and peer-reviewed space for students and early-career researchers to publish original research articles, 
        review papers, and analytical studies that contribute meaningfully to contemporary academic discourse.
      </p>

      <p className="text-gray-800 text-justify font-serif leading-relaxed text-lg md:text-xl mt-6 border-l-4 border-blue-100 pl-6 italic">
        The journal welcomes submissions from undergraduate, postgraduate, and doctoral scholars. 
        By fostering an academically rigorous environment, <strong className="font-bold text-blue-900">FORENSIC PATRIKA  </strong> 
          seeks to strengthen emerging academic voices and facilitate the responsible dissemination of knowledge 
        within the global scholarly community.
      </p>
    </div>
  </div>

  {/* CLASSIC SUBMIT SECTION */}
  {/* <div className="flex flex-col items-center justify-center pt-10 border-t border-gray-100">
    <button className="group relative bg-blue-900 hover:bg-blue-950 text-white text-lg font-serif tracking-widest uppercase px-12 py-4 transition-all duration-300 shadow-md hover:shadow-xl">
      <span className="relative z-10">Submit Manuscript</span>
      <div className="absolute inset-0 border border-white m-1 opacity-20 group-hover:opacity-40 transition-opacity"></div>
    </button>
    <p className="mt-4 text-sm text-gray-500 font-serif italic">Submissions undergo a double-blind peer-review process.</p>
  </div> */}

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
        {showCaseStudy && <CaseStudy />}
      </div>
               <OurTeam/>
    </>
  );
}

export default Home;
