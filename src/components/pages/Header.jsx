import React from 'react'

import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import Navbar from './Navbar';
import Hero from './Hero';
function Header() {
  return (
    <div>
         <div className="bg-blue-400 px-3 py-2 rounded fixed top-0 z-50 w-full">
              {/* top header  */}
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      
      {/* Left Content */}
      <h2 className="text-xl md:text-2xl  font-serif  text-white text-center md:text-left">
        We'd appreciate your feedback.{" "}
        <span className="text-yellow-300 font-bold">
          Tell us what you think!
        </span>
      </h2>
  
      {/* Contact Info */}
      <div className="flex flex-col sm:flex-row items-center gap-2 text-white">
        <p className="flex items-center gap-2 text-lg">
          <FaPhoneAlt  className="text-yellow-300" />
          <span>+91-8957445211</span>
        </p>
  
        <p className="flex items-center gap-2 text-lg">
          <MdMarkEmailRead className="text-yellow-300" />
          <span>f.patrika.india@gmail.com</span>
        </p>
      </div>
  
    </div>
  </div>
    <div className=''>
        <Navbar/>
    </div>

     {/* this is hero section bg-image  */}
      <Hero/>
       
       {/* this is crollebel bar  */}
      <div className="bg-[oklch(62.3%_0.214_259.815)] font-serif font-semibold text-white flex items-center overflow-hidden header-notice text-2xl">
        <span className="bg-[oklch(45.5%_0.188_100.697)] text-white px-3 py-2 mr-2 text-2xl header-notice-label rounded-r-full">CURRENT </span>
        <div className="overflow-hidden relative w-full">
          <div className="animate-marquee whitespace-nowrap py-2 ">
          welcome to Forensic Patrika  (A Journal of Forensic Science )
            <span className="text-yellow-400 ml-2 cursor-pointer " 
           
            >• न्यायिक अनुसंधानम् </span> 
             • Explore more   
              • Stay Safe 
          </div>
        </div>
      </div>
    </div>
  )
}




export default Header
