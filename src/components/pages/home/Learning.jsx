
// import React, { useState } from "react";
// // ✅ Simple data (NO subcategory nesting)
// const data = {
//   "Forensic Science": [
//     { title: "Forensic Assignment", img: "/navpic.jpg" },
//     { title: "Biosensors Intro", img: "https://via.placeholder.com/150" },
//     { title: "Arduino Coding", img: "https://via.placeholder.com/150" },
//     { title: "Crime Analysis", img: "https://via.placeholder.com/150" }
//   ],
//   "Serology": [
//     { title: "Blood Analysis", img: "https://via.placeholder.com/150" },
//     { title: "DNA Basics", img: "https://via.placeholder.com/150" }
//   ],
//   "Toxicology": [
//     { title: "Poison Study", img: "https://via.placeholder.com/150" }
//   ],
//   "Ballistics": [],
//   "Fingerprint": [],
//   "Biosensors": [],
//   "Cyber Forensics": [],
//   "Anthropology": [],
//   "Genetics": [],
//   "Case Study": [],
//   "Crime Investigation": [],
//   "Other": []
// };

// export default function Learning() {
//      const categories = Object.keys(data);

//   const [selected, setSelected] = useState("Forensic Science");
//   const [open, setOpen] = useState(null);

//   return (
//     <div className="flex h-screen bg-gray-100">

//       {/* 🔹 Sidebar */}
//       <div className="w-1/4 bg-white p-4 shadow-md overflow-y-auto">
//         <h2 className="text-lg font-bold mb-4">Product Categories</h2>

//         {categories.map((cat) => (
//           <div key={cat}>

//             {/* ✅ Parent Category */}
//             <div
//               onClick={() => {
//                 setSelected(cat);
//                 setOpen(open === cat ? null : cat);
//               }}
//               className={`flex justify-between p-2 cursor-pointer rounded mb-2 ${
//                 selected === cat
//                   ? "bg-blue-500 text-white"
//                   : "hover:bg-gray-200"
//               }`}
//             >
//               <span>{cat}</span>
//               <span>({data[cat].length})</span>
//             </div>

//             {/* ✅ Same-style dropdown (IMPORTANT) */}
//             {open === cat &&
//               data[cat].map((item, i) => (
//                 <div
//                   key={i}
//                   className="flex justify-between p-2 ml-3 cursor-pointer rounded mb-2 hover:bg-gray-200 text-sm"
//                 >
//                   <span>{item.title}</span>
//                 </div>
//               ))}
//           </div>
//         ))}
//       </div>

//       {/* 🔹 Content */}
//       <div className="w-3/4 p-6">
//         <h2 className="text-xl font-bold mb-4">{selected}</h2>

//         <div className="grid grid-cols-3 gap-4">
//           {(data[selected] || []).map((item, index) => (
//             <div key={index} className="bg-white p-4 shadow rounded">

//               {/* Image Fix */}
//               <div className="w-full h-40 overflow-hidden rounded">
//                 <img
//                   src={item.img}
//                   alt={item.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <h3 className="mt-2 font-semibold">{item.title}</h3>

//               <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
//                 View
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }



import React, { useState } from "react";
import learning from '../../assets/Learn.jpeg'
import learn from '../../assets/Learnguid.jpeg'
import bio from '../../assets/bio.jpeg'
import learn2 from '../../assets/learn2.jpeg'
// Agar icons use karna chahte hain to 'lucide-react' install kar sakte hain
// Nahi to generic tags bhi pro lagenge with this CSS.

const data = {
  "Forensic Science": [
    { title: "Forensic Patrika", img: learn2,price: 100, 
      originalPrice: 399 , desc: "Detailed analysis of evidence." },
    { title: "Biosensors Intro", img: bio,price: 150, 
      originalPrice: 399 , desc: "Basics of biological sensors." },
    { title: "Arduino Coding", img: learning,price: 200, 
      originalPrice: 399 , desc: "Embedded systems for labs." },
    { title: "Crime Analysis", img: learning,price: 200, 
      originalPrice: 399 , desc: "Pattern recognition in crimes." }
  ],
  "Serology": [
    { title: "Blood Analysis", img: "https://via.placeholder.com/150", desc: "Study of bodily fluids." },
    { title: "DNA Basics", img: "https://via.placeholder.com/150", desc: "Genetic identification." }
  ],
  "Toxicology": [
    { title: "Poison Study", img: "https://via.placeholder.com/150", desc: "Chemical substance effects." }
  ],
  "Ballistics": [],
  "Fingerprint": [],
  "Biosensors": [],
  "Cyber Forensics": [],
  "Anthropology": [],
  "Genetics": [],
  "Case Study": [],
  "Crime Investigation": [],
  "Other": []
};

export default function LearningResources() {
  const categories = Object.keys(data);
  const [selected, setSelected] = useState("Forensic Science");
  const [open, setOpen] = useState("Forensic Science");

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      
      {/*  Sidebar: Sleek & Sticky */}
      <div className="w-1/4 bg-white border-r border-slate-200 p-6 shadow-[4px_0_24px_rgba(0,0,0,0.02)] overflow-y-auto">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-800">Forensic<span className="text-indigo-600">Patrika</span></h2>
        </div>

        <nav className="space-y-1">
          {categories.map((cat) => (
            <div key={cat} className="group">
              {/* Parent Category */}
              <div
                onClick={() => {
                  setSelected(cat);
                  setOpen(open === cat ? null : cat);
                }}
                className={`flex justify-between items-center px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 border-2 ${
                  selected === cat
                    ? "bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm"
                    : "bg-transparent border-transparent hover:bg-slate-100 text-slate-600"
                }`}
              >
                <span className={`font-semibold text-[15px] ${selected === cat ? 'scale-105' : ''}`}>{cat}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${selected === cat ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                  {data[cat].length}
                </span>
              </div>

              {/* Dropdown Items (Subtle dot indicator) */}
              {open === cat && (
                <div className="mt-1 ml-4 border-l-2 border-slate-100 space-y-1 animate-in slide-in-from-top-2 duration-300">
                  {data[cat].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2 px-4 cursor-pointer text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/*  Content Area: Clean & Spacious */}
      <div className="w-3/4 p-10 overflow-y-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500 mb-1">Resource Library</p>
            <h1 className="text-4xl font-black text-slate-900">{selected}</h1>
          </div>
          <div className="text-slate-400 text-sm italic">Showing {data[selected]?.length || 0} resources</div>
        </header>

        {data[selected]?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data[selected].map((item, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  {/* <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  /> */}
                   {/* 🔹 Blurred Background (fills space) */}
  <img
    src={item.img}
    alt=""
    className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
  />
                  {/* 🔹 Main Image (full visible) */}
  <img
    src={item.img}
    alt={item.title}
    className="relative w-full h-full object-contain"
  />

                  
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">Explore Module</span>
                  </div>
                </div>

                <div className="p-5">

  {/* Title */}
  <h3 className="text-base font-semibold text-slate-800 group-hover:text-indigo-600 transition">
    {item.title}
  </h3>

  {/* 🔹 Price Section */}
  <div className="mt-2 flex items-center gap-2">
    
    {/* Current Price */}
    <span className="text-lg font-bold text-slate-900">
      ₹{item.price}
    </span>

    {/* Original Price */}
    <span className="text-sm text-slate-400 line-through">
      ₹{item.originalPrice}
    </span>

    {/* Discount */}
    <span className="text-xs font-semibold text-green-600">
      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
    </span>
    
  </div>

  {/* 🔹 Buttons */}
  <div className="mt-4 flex items-center justify-between">
    
    {/* View Details */}
    <button className="text-sm font-semibold text-indigo-600 hover:translate-x-1 transition">
      View Details →
    </button>

    {/* Buy Now */}
    <button className="text-xs font-bold bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition">
      BUY NOW
    </button>

  </div>

</div>



              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-3xl">
             <div className="text-slate-300 text-5xl mb-4">📭</div>
             <p className="text-slate-400 font-medium">No resources found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}