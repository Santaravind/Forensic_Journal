import React from "react";
import logo from '../assets/logos.png'

function Home() {
  const image=[
    {
      id:1,
    im:logo,
    name:"sant"
  },
    {
      id:2,
    im:logo,
    name:"sant"
  },
    {
      id:3,
    im:logo,
    name:"sant"
  },
    ]
  return (
    <div className="min-h-screen bg-gray-200 py-6 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-lg border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">

          {/* LEFT IMAGE COLUMN */}
          <div className="space-y-6 border-r pr-4">
            {image.map((item) => (
              <> 
              <div
                key={item.id}
                className="h-44 border shadow-sm bg-gray-100 flex items-center justify-center"
              >
                <img
                  src={item.im}
                  alt="Forensic"
                  className="w-full h-full object-cover"
                />
              
                   
               
              </div>
              <div className="-mt-7">
                <p> Name : {item.name}</p>
              </div>
          </>
            ))}
          </div>

          {/* RIGHT CONTENT SECTION */}
          
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
        By fostering an academically rigorous environment, <strong className="font-bold text-blue-900">FORENSIC PATRIKA</strong> 
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
  );
}

export default Home;
