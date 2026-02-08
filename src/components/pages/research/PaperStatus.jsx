import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { BookOpen, Scale, Users, Award, ShieldCheck, Microscope, MicroscopeIcon, BookOpenIcon, ShieldCheckIcon, Users2, Globe, Lightbulb } from 'lucide-react';


const PaperStatus = () => {



// const pillars = [
//     {
//       title: "Interdisciplinary Research",
//       desc: "Integrating law, psychology, digital forensics, biology, and toxicology to influence modern investigative methodologies.",
//       icon: <Microscope className="w-6 h-6 text-blue-600" />
//     },
//     {
//       title: "Ethical Standards",
//       desc: "Strict adherence to plagiarism screening, ethical guidelines, and structured peer-review to ensure scholarly credibility.",
//       icon: <ShieldCheck className="w-6 h-6 text-blue-600" />
//     },
//     {
//       title: "Academic Mentorship",
//       desc: "A developmental space supporting first-time researchers and students through constructive feedback and publication standards.",
//       icon: <Users className="w-6 h-6 text-blue-600" />
//     }
//   ];

  const [submissionId, setSubmissionId] = useState('');
  const [status, setStatus] = useState(null); // Options: 'under_process', 'under_review', 'accepted'
  const [loading, setLoading] = useState(false);

  // Mock API call - Replace with your actual backend endpoint
  const checkStatus = async () => {
    if (!submissionId) return;
    setLoading(true);
    
    try {
      // const response = await fetch(`your-api-url/${submissionId}`);
      // const data = await response.json();
      
      // Simulating API delay and response
      setTimeout(() => {
        setStatus('under_process'); // This would come from your backend
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching status:", error);
      setLoading(false);
    }
  };

  const steps = [
    { id: 'under_process', label: 'Under Process', icon: '⏳' },
    { id: 'under_review', label: 'Under Review', icon: '📖' },
    { id: 'accepted', label: 'Accepted', icon: '📋' },
  ];

  const getStepIndex = (currentStatus) => steps.findIndex(s => s.id === currentStatus);

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50g px-4 py-8">
  <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
    Check Status
  </h1>

  {/* Search Bar */}
  <div className="relative w-full max-w-md mb-4 text-center">
    <input
      type="text"
      placeholder="Enter Submission I'd"
      className="
        w-full
        bg-white/60
        px-12
        py-3 sm:py-4
        rounded-full
        border-none
        shadow-lg
        focus:ring-2 focus:ring-blue-400
        outline-none
        text-sm sm:text-base
      "
      value={submissionId}
      onChange={(e) => setSubmissionId(e.target.value)}
    />

    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
      <IoIosSearch />
    </span>
  </div>

  <button
    onClick={checkStatus}
    className="
      bg-blue-600 hover:bg-blue-700
      text-white font-semibold
      mt-6
      py-2.5 sm:py-3
      px-8 sm:px-10
      rounded-full
      transition-all duration-200
      text-lg sm:text-2xl
    "
  >
    {loading ? 'Searching...' : 'Search'}
  </button>

  {/* Stepper UI */}
  <div className="mt-16 flex flex-col sm:flex-row items-center w-full max-w-2xl gap-10 sm:gap-0 relative">
    {steps.map((step, index) => {
      const isActive = getStepIndex(status) >= index;
      const isCurrent = status === step.id;

      return (
        <div
          key={step.id}
          className="flex-1 flex flex-col items-center relative z-10"
        >
          {/* Circle Icon */}
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl transition-colors duration-500 border-2 ${
              isActive
                ? 'bg-green-200 border-green-400'
                : 'bg-white border-gray-100 shadow-md'
            }`}
          >
            {step.icon}
          </div>

          <p className="mt-4 font-semibold text-gray-700 text-sm sm:text-base text-center">
            {step.label}
          </p>

          {/* Connecting Line (only horizontal on desktop) */}
          {index !== steps.length - 1 && (
            <div className="hidden sm:block absolute top-8 left-1/2 w-full h-1 -z-10 bg-gray-200">
              <div
                className={`h-full bg-blue-500 transition-all duration-500 ${
                  isActive ? 'w-full' : 'w-0'
                }`}
              ></div>
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>


{/* text part */}
    <div className="w-full bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Forensic Patrika
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-indigo-600"></span>
            <span className="text-indigo-700 font-semibold uppercase tracking-widest text-sm md:text-base">
              A Journal of Forensic Science
            </span>
            <span className="h-px w-8 bg-indigo-600"></span>
          </div>
        </div>

        {/* Main Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Top Feature: Bridge between Theory & Practice */}
          <div className="lg:col-span-12 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-center">
            <div className="bg-indigo-50 p-6 rounded-2xl">
              <MicroscopeIcon className="w-12 h-12 text-indigo-600" />
            </div>
            <div>
              <p className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed">
                "Bridging the gap between <span className="text-indigo-600 font-bold">theoretical research</span> and 
                <span className="text-indigo-600 font-bold"> practical application</span> within forensic and investigative sciences."
              </p>
            </div>
          </div>

          {/* Interdisciplinary & Ethics Section */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-4">
                <BookOpenIcon className="w-6 h-6 text-indigo-600" /> Interdisciplinary Scope
              </h3>
              <p className="text-slate-600 leading-relaxed">
                 The journal actively encourages interdisciplinary collaboration by welcoming research that integrates law, psychology, digital forensics, forensic biology, toxicology, cybercrime studies, criminal justice, and emerging technological innovations influencing modern investigative methodologies. Through this inclusive academic framework, the journal aspires to cultivate holistic, analytical, and solution-oriented research perspectives.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-4">
                <ShieldCheckIcon className="w-6 h-6 text-indigo-600" /> Integrity & Ethics
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Forensic Patrika is committed to maintaining transparency, academic integrity, and ethical publishing standards through a structured peer-review process designed to ensure research quality, originality, and scholarly credibility. The journal strictly adheres to plagiarism-screening protocols, ethical research guidelines, and responsible authorship practices in order to uphold the trust and reliability expected within both academic and professional communities.
              </p>
            </div>
          </div>

          {/* Mentorship & Vision Sidebar */}
          <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users2 className="w-8 h-8 text-indigo-400" />
                <h3 className="text-xl font-bold">Nurturing Scholars</h3>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
               The platform also functions as a developmental academic space, supporting first-time researchers and student scholars by promoting constructive peer-review feedback, mentorship opportunities, and exposure to structured scholarly publication standards.Promoting constructive peer-review feedback, mentorship opportunities, and exposure to structured scholarly publication standards. By encouraging intellectual curiosity, critical thinking, and evidence-based research, the journal aims to nurture the next generation of professionals in forensic science and criminology.

               With a strong commitment to knowledge accessibility and academic inclusivity, Forensic Patrika aspires to establish itself as a recognized and credible scholarly resource, contributing to policy discourse, forensic advancements, and educational development. The journal envisions building a collaborative global research network that fosters innovative thinking, scientific responsibility, and the continuous evolution of forensic science and criminal investigation studies.
              </p>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">✓ Exposure to publication standards</li>
                <li className="flex items-center gap-2">✓ Intellectual curiosity & critical thinking</li>
                <li className="flex items-center gap-2">✓ Evidence-based research cultivation</li>
              </ul>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-indigo-400" />
                <h3 className="font-bold">Global Network</h3>
              </div>
              <p className="text-sm text-slate-400 italic">
                Establishing a recognized scholarly resource contributing to policy discourse and forensic advancements globally.
              </p>
            </div>
          </div>

        </div>

        {/* Final Vision Quote */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <Lightbulb className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-600 text-lg italic">
            "Fostering innovative thinking, scientific responsibility, and the continuous evolution of forensic science and criminal investigation studies."
          </p>
        </div>
        
      </div>
    </div>

    </>
    
  );
};


export default PaperStatus
