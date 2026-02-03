// import { NavLink } from "react-router-dom";
// import { FaHome, FaUserCircle } from "react-icons/fa";
// import logo from '../assets/logoss.png'
// export default function Navbar() {
//   return (
//     <nav className="w-full bg-pink-100 border-t-4 border-indigo-700 shadow-sm rounded-lg">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between h-20">

//           {/* Left – Logo */}
//           <div className="flex items-center gap-3">
//             <img
//               src={logo}
//               width={200}
//               height={200}
//               alt="Patrika Logo"
//               className="h-30 w-30 p-2"
//             />
//           </div>

//           {/* Center – Menu */}
//           <div className="hidden lg:flex items-center gap-8 font-bold">
//             <NavLink
//               to="/"
//               className="flex items-center gap-2 font-bold text-lg text-black hover:text-indigo-700"
//             >
//               <FaHome /> Home
//             </NavLink>

//             <NavLink to="/about" className="font-bold text-lg hover:text-indigo-700">
//               About Us
//             </NavLink>

//             <NavLink to="/research" className="font-bold text-lg hover:text-indigo-700">
//               Research
//             </NavLink>

//             <NavLink to="/editorial" className="font-bold text-lg hover:text-indigo-700">
//               Editorial Team
//             </NavLink>

//             <NavLink to="/guideline" className="font-bold text-lg hover:text-indigo-700">
//               Guidelines
//             </NavLink>

//             <NavLink to="/publication" className="font-bold text-lg hover:text-indigo-700">
//               Publication Procedure
//             </NavLink>

//             <NavLink to="/blog" className="font-bold text-lg hover:text-indigo-700">
//               Blog
//             </NavLink>
//           </div>

//           {/* Right – Auth */}
//           <div className="flex items-center gap-3">
//             <FaUserCircle className="text-4xl" />
//             <div className="flex flex-col text-sm font-semibold">
//               <NavLink to="/register" className="hover:text-indigo-700">
//                 Register
//               </NavLink>
//               <NavLink to="/login" className="hover:text-indigo-700">
//                 Login
//               </NavLink>
//             </div>
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserCircle, FaBars, FaTimes, FaPhone } from "react-icons/fa";
import logo from '../assets/logoss.png'
import { MdMarkEmailRead } from "react-icons/md";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

 useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const menuItems = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/about", label: "About Us" },
    { to: "/research", label: "Research" },
    { to: "/editorial", label: "Editorial Team" },
    { to: "/guideline", label: "Guidelines" },
    { to: "/publication", label: "Publication Procedure" },
    { to: "/blog", label: "Blog" },
  ];

  return (
<nav className="fixed top-0 z-50 w-full flex items-center justify-between px-4 mt-30 lg:mt-10">
  
  {/* Logo – OUTSIDE Navbar */}
  <div className="flex items-center mt-5">
  <div className=" rounded-full h-40 w-40 flex items-center justify-center drop-shadow-md">
    {/* <img
      src={logo}
      alt="Patrika Logo"
      className="h-40 w-auto object-contain"
    /> */}
  </div>
</div>



  {/* Navbar */}
  <div className="flex-1 max-w-6xl ml-6 bg-white/90 backdrop-blur-md shadow-lg lg:rounded-full sm:rounded-lg md:rounded-lg px-6">
    <div className="flex items-center justify-between h-16">

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-10">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 font-semibold text-base transition-colors duration-200
              ${isActive ? "text-indigo-700" : "text-gray-800 hover:text-indigo-600"}`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Desktop Auth */}
      {/* <div className="hidden lg:flex items-center gap-3">
        <FaUserCircle className="text-3xl text-gray-700" />
        <div className="flex flex-col text-sm font-semibold leading-tight">
          <NavLink to="/register" className="hover:text-indigo-700">
            Register
          </NavLink>
          <NavLink to="/login" className="hover:text-indigo-700">
            Login
          </NavLink>
        </div>
      </div> */}
         <div className="hidden lg:flex items-center relative" ref={menuRef}>
      {/* User Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-700 hover:text-indigo-700 transition"
      >
        <FaUserCircle className="text-3xl" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 w-40 bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
          <NavLink
            to="/login"
            className="block px-4 py-2 text-sm font-semibold hover:bg-indigo-50"
            onClick={() => setOpen(false)}
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="block px-4 py-2 text-sm font-semibold hover:bg-indigo-50"
            onClick={() => setOpen(false)}
          >
            Register
          </NavLink>
        </div>
      )}
    </div>

      {/* Mobile Controls */}
      <div className="lg:hidden flex items-center gap-3">
        {/* <FaUserCircle className="text-3xl text-gray-700" /> */}
        <button
          onClick={toggleMenu}
          className="text-gray-700 hover:text-indigo-700 p-2"
        >
          {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    <div
      className={`lg:hidden transition-all duration-300 ${
        isMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden"
      }`}
    >
      <div className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={closeMenu}
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl font-semibold transition
              ${isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-pink-100"}`
            }
          >
            {item.label}
          </NavLink>
        ))}

        <div className="border-t pt-3">
          <NavLink to="/register" onClick={closeMenu} className="block px-4 py-2 font-semibold hover:text-indigo-700">
            Register
          </NavLink>
          <NavLink to="/login" onClick={closeMenu} className="block px-4 py-2 font-semibold hover:text-indigo-700">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  </div>
</nav>

  );
}