import React from 'react'
import logo from './../../assets/logoss.png'

import { ClipboardCheck, Users, Edit3, CheckCircle, FileSearch, GraduationCap } from 'lucide-react';

const Peer = () => {
  const steps = [
    {
      title: "Initial Editorial Screening",
      desc: "A Journal of Forensic Journey follows a structured and transarent peer - review process toensure academic quality, fairness, and rigorous yet constructive evaluation. All submitted manuscripts firstundergo an initial editorial screening to assess their relevance, originality, and compliance with submission guidelines",
      icon: <FileSearch className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Collaborative Review",
      desc: "The review process is conducted by a diverse panel of qualified student reviewers and experienced faculty members, integrating emerging scholarly perspectives with established academic expertise. Each manuscript is assessed on the basis of research quality, methodological rigor, clarity of argumentation, adherence to ethical standards, and overall contribution to the field.",
      icon: <Users className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Constructive Feedback",
      desc: "Reviewers evaluate methodological rigor and ethical standards, providing feedback designed to strengthen the manuscript.Emphasis is placed on constructive feedback aimed at strenthening the manuscript rather than discouraging authors. Reviewers are required to uphold confidentiality, objectivity, and academic integrity throughout the evaluation process.",      icon: <Edit3 className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Final Decision",
      desc: "Authors may be requested to revise their manuscripts in response to reviewer feedback, and final publication decisions made by the editorial team after thorough consideration of all evaluations.Our platform remains committed to maintaining a supportive yet rigourous peer-review envirnment that upholdsscholarly standards while actively encouraging student-led research",
      icon: <CheckCircle className="w-6 h-6 text-indigo-600" />,
    }
  ];

  return (
    <div className="w-full bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Logo */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="mb-8 p-4 ">
             {/* Replace with your actual {logo} variable */}
             
             
            <div className="w-60 h-12  flex items-center justify-center ">
                <img src={logo} alt="log" /></div>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-4" >
            Peer-Review Process
          </h2>
          <p className="mt-3 text-indigo-700 font-semibold tracking-wide uppercase text-sm">
            Forensic Patrika : A Journal of Forensic Journey
          </p>
        </div>

        {/* Process Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="h-full bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  {step.icon}
                </div>
                <div className="absolute top-8 right-8 text-4xl font-black text-slate-100 group-hover:text-indigo-50 transition-colors">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Highlight Card */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-6">
                <GraduationCap className="w-4 h-4" /> STUDENT-LED RESEARCH FOCUS
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-snug">
                A supportive yet rigorous environment that <span className="text-indigo-400">upholds scholarly standards</span> while encouraging new voices.
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reviewers are required to uphold confidentiality, objectivity, and academic integrity. 
                Emphasis is placed on <span className="text-white italic">constructive feedback</span>, 
                aimed at strengthening the manuscript rather than discouraging authors.
              </p>
            </div>
            <div className="hidden lg:block w-px h-40 bg-slate-800"></div>
            <div className="w-full md:w-auto flex flex-col gap-4">
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Status</p>
                <p className="font-mono text-indigo-400">Strictly Confidential</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Methodology</p>
                <p className="font-mono text-indigo-400">Double-Layer Evaluation</p>
              </div>
            </div>
          </div>
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};



export default Peer
