// import React from 'react'
// import { LuNotebookPen } from "react-icons/lu";
// import { BsFingerprint } from "react-icons/bs";
// import { GoGoal } from "react-icons/go";
// import { FaAddressBook } from "react-icons/fa";
// import { FcMoneyTransfer } from "react-icons/fc";
// import CaseStudy from './CaseStudy';

// function Content() {
//     const btn=[
//            { icon: <LuNotebookPen className="text-lg" />, label: "Publish With Us", page: '' },
//               { icon: <BsFingerprint className="text-lg" />, label: "Case Study", page: ''},
//               { icon: <FaAddressBook className="text-lg" />, label: "Learning Resources", page: '' },
//               { icon: <GoGoal className="text-lg" />, label: "Achievement Ranking", page: '' },
//               { icon: <FcMoneyTransfer className="text-lg" />, label: "Donation", page: '' },
//        ]
          
//   return (
//     <>
//        <div>
//     <div className='text-xl flex gap-2 justify-between mr-4 ml-2  '>
//       {
//         btn.map((item,index)=>(
//           <div key={index} className=" bg-amber-50 flex border-2 border-pink-200 rounded-lg shadow  px-2 py-3 mt-3">
//             <button className="text-bold font-serif text-2xl flex gap-2 px-3 "
//             onClick={()=>""}
//             >
//               {item.icon}
//               {item.label}
//             </button>
//               </div>            
//         ))
//       }
//     </div>
//     <CaseStudy/>
//     </div>
//     </>
//   )
// }

// export default Content


import React, { useState } from "react";
import { LuNotebookPen } from "react-icons/lu";
import { BsFingerprint } from "react-icons/bs";
import { GoGoal } from "react-icons/go";
import { FaAddressBook } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";

import Publicus from "./Publicus";
import Case from "./Case.jsx"

function Content() {
  // 1. State to track the active section
  const [activeTab, setActiveTab] = useState("Case Study");

  const btn = [
     { icon: <BsFingerprint />, label: "Case Study" },
    { icon: <LuNotebookPen />, label: "Publish With Us" },
    { icon: <FaAddressBook />, label: "Learning Resources" },
    { icon: <GoGoal />, label: "Achievement " },
    { icon: <FcMoneyTransfer />, label: "Donation" },
  ];

  // 2. Logic to render content based on selection
  const renderActiveContent = () => {
    switch (activeTab) {
      case "Case Study":
        return <Case/>
      case "Publish With Us":
        return <Publicus/>;
      case "Learning Resources":
        return <div> Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae unde molestiae nobis, odit voluptatem rerum tempore sint, voluptatum inventore et molestias reiciendis minima iusto libero obcaecati, deserunt impedit deleniti fuga?</div>;
      default:
        return (
          <div className="p-10 text-center font-serif text-gray-500">
            Section for {activeTab} is currently under review.
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* CLASSIC TAB NAVIGATION */}
      <div className="flex flex-wrap gap-2 border-b border-blue-900 pb-2 mb-8">
        {btn.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(item.label)}
            className={`
              flex items-center gap-3 px-6 py-3 font-serif transition-all duration-300
              ${activeTab === item.label 
                ? "bg-blue-900 text-white shadow-md transform -translate-y-1" 
                : "bg-stone-50 text-blue-900 hover:bg-stone-100 border border-stone-200"
              }
            `}
          >
            <span className={activeTab === item.label ? "text-white" : "text-blue-800"}>
              {item.icon}
            </span>
            <span className="text-sm font-bold uppercase tracking-wider">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div className="bg-white min-h-100 border border-gray-100 shadow-sm rounded-sm p-4 mt-3">
         <div className="border-b-4 border-black/40 text-4xl  mt-3.5">
        <h1 className=" uppercase font-serif " >Recent</h1>
      </div>
        {renderActiveContent()}
      </div>
    </div>
  );
}

export default Content;