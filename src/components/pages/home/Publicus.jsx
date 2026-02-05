import { useNavigate } from "react-router-dom";
import logo from "../../assets/logos.png"; // update path

const categories = [
     "Serology",
  "Toxicology",
  "Ballistics",
  "Genetics",
  "Fingerprint",
  "Anthropology",
  "Cyber Forensics",
  "Others",
];

function Publicus() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white px-6 py-10 font-serif">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <img
          src={logo}
          alt="Patrika Logo"
          className="w-32 h-32 object-contain"
        />

        <h1 className="text-4xl font-bold tracking-widest">
          ARTICLE
        </h1>

        <div className="w-32" /> {/* spacing balance */}
      </div>

      {/* CATEGORY GRID */}
      <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => navigate('/reserchform')}
            className="
              h-28 rounded-2xl
              bg-linear-to-r from-blue-500 to-cyan-400
              text-black text-lg font-medium
              flex items-center justify-center
              shadow-md
              hover:scale-105 hover:shadow-xl
              transition duration-300
            "
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}



export default Publicus
