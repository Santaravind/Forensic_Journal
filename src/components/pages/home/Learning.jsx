import React, { useState } from "react";
import crime from "../../assets/crimeseen.jpeg";
import reserch from "../../assets/Research.jpeg"
const data = {
  "Forensic Science": [
    {
      title: "Crime Scene Management",
      img: crime,
      desc: "Crime scene management and field procedures guide.",
      price: "₹379",
      button: "https://rzp.io/rzp/Z7M7BS7E",
    },
    {
      title: "Research Guide",
      img: reserch,
      desc: "Foundations of Research From Ideas to Publications FORENSIC PATRIKA : A Complete Handbook on Research Methodology, Data Analysis, and Academic Writing",
      price: "₹379",
      button: "",
    },
  ],
  Serology: [
    {
      title: "Blood Analysis",
      img: "https://via.placeholder.com/150",
      desc: "Study of bodily fluids and serological testing.",
      price: "₹499",
      button: "", // No link provided -> shows "Coming Soon"
    },
    {
      title: "DNA Basics",
      img: "https://via.placeholder.com/150",
      desc: "Genetic identification techniques.",
      price: "₹499",
    },
  ],
  Toxicology: [
    {
      title: "Poison Study",
      img: "https://via.placeholder.com/150",
      desc: "Chemical substance effects and detection.",
      price: "₹499",
    },
  ],
  Ballistics: [],
  Fingerprint: [],
  Biosensors: [],
  "Cyber Forensics": [],
  Anthropology: [],
  Genetics: [],
  "Case Study": [],
  "Crime Investigation": [],
  Other: [],
};

export default function LearningResources() {
  const categories = Object.keys(data);
  const [selected, setSelected] = useState("Forensic Science");
  const [open, setOpen] = useState("Forensic Science");

  // Handles checkout link or fallback notice
  const handledBuy = (e, buttonUrl) => {
    e.preventDefault();

    if (buttonUrl && buttonUrl.trim() !== "") {
      window.open(buttonUrl, "_blank", "noopener,noreferrer");
    } else {
      alert("This resource is coming soon!");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-slate-200 p-6 shadow-[4px_0_24px_rgba(0,0,0,0.02)] overflow-y-auto">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            F
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-800">
            Forensic<span className="text-indigo-600">Patrika</span>
          </h2>
        </div>

        <nav className="space-y-1">
          {categories.map((cat) => (
            <div key={cat} className="group">
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
                <span
                  className={`font-semibold text-[15px] ${
                    selected === cat ? "scale-105" : ""
                  }`}
                >
                  {cat}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    selected === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                  }`}
                >
                  {data[cat].length}
                </span>
              </div>

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

      {/* Content Area */}
      <div className="w-3/4 p-10 overflow-y-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500 mb-1">
              Resource Library
            </p>
            <h1 className="text-4xl font-black text-slate-900">{selected}</h1>
          </div>
          <div className="text-slate-400 text-sm italic">
            Showing {data[selected]?.length || 0} resources
          </div>
        </header>

        {data[selected]?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {data[selected].map((item, index) => {
              const numericPrice = parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0;
              const originalPrice = numericPrice * 2;

              return (
                <div
                  key={index}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="relative w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                      {item.desc}
                    </p>

                    <div className="mt-6 border-t pt-4">
                      <div className="p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl font-bold text-slate-900">
                            {item.price}
                          </span>

                          {numericPrice > 0 && (
                            <span className="text-sm text-slate-400 line-through">
                              ₹{originalPrice}
                            </span>
                          )}

                          <span className="ml-auto bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                            50% OFF
                          </span>
                        </div>

                        <div className="h-px bg-slate-100 mb-4"></div>

                        <div className="flex items-center justify-between">
                          <button className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition flex items-center gap-1">
                            View Details
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                              →
                            </span>
                          </button>

                          <button
                            onClick={(e) => handledBuy(e, item.button)}
                            className="relative px-5 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200"
                          >
                            BUY NOW
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-3xl">
            <div className="text-slate-300 text-5xl mb-4">📭</div>
            <p className="text-slate-400 font-medium">
              No resources found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}