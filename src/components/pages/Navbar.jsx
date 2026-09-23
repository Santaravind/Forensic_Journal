import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaChevronDown,
  FaFileAlt,
  FaBookOpen,
  FaUserGraduate,
  FaShieldAlt,
  FaBalanceScale,
  FaLock,
  FaUserCheck,
  FaRobot,
  FaCopyright,
  FaExclamationCircle,
  FaUndoAlt,
  FaShareAlt,
  FaFlask,
  FaCompass,
  FaClipboardList,
  FaNewspaper,
  FaUserTie,
  FaPlusCircle,
  FaListUl,
} from "react-icons/fa";
import logo from "../assets/logoss.png";
import { authService } from "../../services/authService";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const navRef = useRef(null);
  const userMenuRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load and sync user data
  useEffect(() => {
    const checkUser = () => {
      try {
        const currentUser = authService.getCurrentUser();
        const authenticated = authService.isAuthenticated();
        if (currentUser && authenticated) {
          setUser(currentUser);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    window.addEventListener("userChanged", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("userChanged", checkUser);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenUserMenu(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Desktop dropdown hover handlers with safe debounce
  const handleMouseEnter = (label) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const toggleDropdownClick = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const toggleMobileSubmenu = (label) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Logout handler
  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsLoggedIn(false);
    setOpenUserMenu(false);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const menuItems = [
    { to: "/", label: "Home", icon: <FaHome className="text-blue-600" /> },
    { to: "/about", label: "About Us" },
    {
      label: "Research",
      submenu: [
        { to: "/article", label: "Articles", icon: <FaFileAlt className="text-indigo-500" />, desc: "Peer-reviewed research articles" },
        { to: "/case-study", label: "Case Study", icon: <FaFlask className="text-emerald-500" />, desc: "Investigative forensic case reports" },
        { to: "/paper-status", label: "Paper Status", icon: <FaCompass className="text-amber-500" />, desc: "Track submission status by ID" },
      ],
    },
    { to: "/editorial", label: "Editorial Board" },
    {
      label: "Guidelines",
      isMega: true,
      submenu: [
        { to: "/peer", label: "Peer Review Policy", icon: <FaBalanceScale className="text-blue-500" /> },
        { to: "/open", label: "Open Access Policy", icon: <FaBookOpen className="text-emerald-500" /> },
        { to: "/author", label: "Author Guidelines", icon: <FaUserGraduate className="text-purple-500" /> },
        { to: "/plag", label: "Plagiarism Policy", icon: <FaShieldAlt className="text-red-500" /> },
        { to: "/ethics", label: "Ethics & Malpractice", icon: <FaClipboardList className="text-teal-500" /> },
        { to: "/privacy", label: "Privacy Statement", icon: <FaLock className="text-slate-500" /> },
        { to: "/informed", label: "Informed Consent", icon: <FaUserCheck className="text-cyan-500" /> },
        { to: "/ai", label: "Artificial Intelligence", icon: <FaRobot className="text-indigo-500" /> },
        { to: "/right", label: "Rights & Permissions", icon: <FaCopyright className="text-orange-500" /> },
        { to: "/appeals", label: "Appeals & Complaints", icon: <FaExclamationCircle className="text-rose-500" /> },
        { to: "/correct", label: "Corrections & Retractions", icon: <FaUndoAlt className="text-amber-500" /> },
        { to: "/preprint", label: "Preprint Sharing", icon: <FaShareAlt className="text-violet-500" /> },
      ],
    },
    { to: "/publication", label: "Publication Procedure" },
    {
      label: "Instructions",
      submenu: [
        { to: "/authorIn", label: "Author Instructions", icon: <FaClipboardList className="text-indigo-500" />, desc: "Formatting and submission specifications" },
      ],
    },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <div className="w-full relative z-40" ref={navRef}>
      <nav className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-5">
        <div className=" bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg rounded-2xl md:rounded-full px-3 sm:px-4 py-1.5 transition-all duration-300">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Brand Logo & Title */}
             <NavLink 
              to="/"
              className="flex items-center gap-2 sm:gap-3 group shrink-0"
              onClick={() => setIsMenuOpen(false)}
            >
              {/* <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-50 border border-slate-200/80 p-0.5 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
                <img
                  src={logo}
                  alt="Forensic Patrika Logo"
                  className="w-full h-full object-contain"
                />
              </div> */}
              {/* // <div className="flex flex-col">
              //   <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight leading-tight group-hover:text-blue-700 transition-colors font-serif">
              //     Forensic Patrika
              //   </span>
              //   <span className="text-[9px] sm:text-[10px] font-semibold text-blue-600 leading-none hidden xs:inline-block tracking-wider uppercase">
              //     A Journal of Forensic Science
              //   </span>
               </div> */}
            </NavLink> 

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {menuItems.map((item) =>
                item.submenu ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => toggleDropdownClick(item.label)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        activeDropdown === item.label
                          ? "text-blue-700 bg-blue-50/80"
                          : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                      }`}
                      aria-expanded={activeDropdown === item.label}
                    >
                      <span>{item.label}</span>
                      <FaChevronDown
                        className={`text-[10px] transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180 text-blue-600" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Desktop Dropdown Content */}
                    {activeDropdown === item.label && (
                      <div
                        className={`absolute left-0 top-full pt-2 z-50 animate-fadeIn ${
                          item.isMega ? "w-[440px] -left-20 xl:left-0" : "w-64"
                        }`}
                      >
                        <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 overflow-hidden">
                          {item.isMega ? (
                            <div>
                              <div className="px-3 py-1.5 mb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                                <span>Journal Policies & Ethics</span>
                                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">12 Guidelines</span>
                              </div>
                              <div className="grid grid-cols-2 gap-1 max-h-[380px] overflow-y-auto pr-1">
                                {item.submenu.map((sub) => (
                                  <NavLink
                                    key={sub.to}
                                    to={sub.to}
                                    onClick={() => setActiveDropdown(null)}
                                    className={({ isActive }) =>
                                      `flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                                        isActive
                                          ? "bg-blue-50 text-blue-700 font-bold"
                                          : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                                      }`
                                    }
                                  >
                                    <span className="text-xs shrink-0">{sub.icon}</span>
                                    <span className="truncate">{sub.label}</span>
                                  </NavLink>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1">
                              {item.submenu.map((sub) => (
                                <NavLink
                                  key={sub.to}
                                  to={sub.to}
                                  onClick={() => setActiveDropdown(null)}
                                  className={({ isActive }) =>
                                    `flex items-start gap-3 p-2.5 rounded-xl text-xs font-semibold transition-colors ${
                                      isActive
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                                    }`
                                  }
                                >
                                  <div className="mt-0.5 p-1.5 bg-slate-100 text-slate-700 rounded-lg shrink-0">
                                    {sub.icon}
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold text-slate-800">{sub.label}</div>
                                    {sub.desc && (
                                      <div className="text-[11px] font-normal text-slate-500 leading-tight mt-0.5">
                                        {sub.desc}
                                      </div>
                                    )}
                                  </div>
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "text-blue-700 bg-blue-50 font-bold"
                          : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </div>

            {/* Desktop Auth / User Action */}
            <div className="hidden lg:flex items-center gap-3" ref={userMenuRef}>
              {isLoggedIn && user ? (
                <div className="relative">
                  <button
                    onClick={() => setOpenUserMenu(!openUserMenu)}
                    className="flex items-center gap-2 p-1.5 pl-3 pr-2 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all text-left"
                    aria-label="User profile menu"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800 leading-tight max-w-[100px] truncate">
                        {user.fullName || user.email?.split("@")[0] || "User"}
                      </span>
                      <span className="text-[10px] text-blue-600 font-semibold leading-none capitalize">
                        {(user.role || "USER").toLowerCase() === "user" ? "Author" : user.role?.toLowerCase()}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {user.fullName ? user.fullName[0].toUpperCase() : <FaUserCircle className="text-base" />}
                    </div>
                    <FaChevronDown
                      className={`text-[9px] text-slate-400 transition-transform duration-200 ${
                        openUserMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Profile Dropdown */}
                  {openUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white/98 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-200 p-2 z-50 animate-fadeIn">
                      <div className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/60 rounded-xl mb-1">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {user.fullName || "Forensic Scholar"}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          <span className="inline-block text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
                            {(user.role || "USER").toUpperCase() === "USER" ? "Author / Researcher" : user.role}
                          </span>
                          {user.isGoogleUser && (
                            <span className="inline-block text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                              Google
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        {/* Author Actions */}
                        {((user.role || "").toUpperCase() === "USER" || user.isGoogleUser) && (
                          <>
                            <NavLink
                              to="/my-submissions"
                              onClick={() => setOpenUserMenu(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl transition-colors"
                            >
                              <FaListUl className="text-blue-500 text-xs" />
                              <span>My Submissions</span>
                            </NavLink>
                            <NavLink
                              to="/reserchform"
                              onClick={() => setOpenUserMenu(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl transition-colors"
                            >
                              <FaPlusCircle className="text-emerald-500 text-xs" />
                              <span>Submit Research Paper</span>
                            </NavLink>
                            <NavLink
                              to="/caseStudyForm"
                              onClick={() => setOpenUserMenu(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl transition-colors"
                            >
                              <FaFlask className="text-purple-500 text-xs" />
                              <span>Submit Case Study</span>
                            </NavLink>
                          </>
                        )}

                        {/* Elevated Dashboards */}
                        {(user.role || "").toUpperCase() === "PUBLISHER" && (
                          <NavLink
                            to="/publisher"
                            onClick={() => setOpenUserMenu(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-pink-700 bg-pink-50 hover:bg-pink-100 rounded-xl transition-colors"
                          >
                            <FaNewspaper className="text-pink-600" />
                            <span>Publisher Portal</span>
                          </NavLink>
                        )}
                        {(user.role || "").toUpperCase() === "EDITOR" && (
                          <NavLink
                            to="/editer"
                            onClick={() => setOpenUserMenu(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
                          >
                            <FaBalanceScale className="text-emerald-600" />
                            <span>Editor Dashboard</span>
                          </NavLink>
                        )}
                        {(user.role || "").toUpperCase() === "ADMIN" && (
                          <NavLink
                            to="/admin"
                            onClick={() => setOpenUserMenu(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
                          >
                            <FaShieldAlt className="text-indigo-600" />
                            <span>Admin Dashboard</span>
                          </NavLink>
                        )}
                        {(user.role || "").toUpperCase() === "REVIEWER" && (
                          <NavLink
                            to="/review"
                            onClick={() => setOpenUserMenu(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
                          >
                            <FaUserGraduate className="text-purple-600" />
                            <span>Reviewer Dashboard</span>
                          </NavLink>
                        )}

                        <div className="pt-1 mt-1 border-t border-slate-100">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <FaSignOutAlt className="text-red-500" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <NavLink
                    to="/login"
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>

            {/* Mobile Controls (Quick profile + Hamburger) */}
            <div className="flex lg:hidden items-center gap-2">
              {isLoggedIn && user ? (
                <NavLink
                  to="/my-submissions"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs"
                >
                  {user.fullName ? user.fullName[0].toUpperCase() : <FaUserCircle />}
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200"
                >
                  Login
                </NavLink>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-slate-100 focus:outline-hidden transition-colors"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden absolute left-2 right-2 sm:left-4 sm:right-4 top-full mt-2 z-50 animate-fadeIn">
            <div className="bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/90 p-4 max-h-[calc(100vh-140px)] overflow-y-auto">
              
              {/* Authenticated User Status Box */}
              {isLoggedIn && user && (
                <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                        {user.fullName ? user.fullName[0].toUpperCase() : "U"}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 truncate max-w-[160px]">
                          {user.fullName || user.email}
                        </span>
                        <span className="text-[10px] font-semibold text-blue-600">
                          {(user.role || "USER").toUpperCase() === "USER" ? "Author" : user.role}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-1.5 text-xs text-red-600 bg-white hover:bg-red-50 rounded-lg border border-red-200 flex items-center gap-1 font-semibold"
                    >
                      <FaSignOutAlt />
                      <span>Out</span>
                    </button>
                  </div>

                  {/* Fast Action Buttons for Authors */}
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-blue-200/60">
                    <NavLink
                      to="/my-submissions"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-center py-1.5 px-2 bg-white text-blue-700 text-xs font-bold rounded-xl shadow-2xs border border-blue-100 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      My Papers
                    </NavLink>
                    <NavLink
                      to="/reserchform"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-center py-1.5 px-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-2xs hover:bg-blue-700 transition-colors"
                    >
                      Submit Paper
                    </NavLink>
                  </div>

                  {/* Elevated Role Dashboard Quick Links */}
                  {(user.role || "").toUpperCase() === "PUBLISHER" && (
                    <NavLink
                      to="/publisher"
                      onClick={() => setIsMenuOpen(false)}
                      className="block mt-2 text-center py-1.5 px-2 bg-pink-600 text-white text-xs font-bold rounded-xl"
                    >
                      Open Publisher Portal
                    </NavLink>
                  )}
                  {(user.role || "").toUpperCase() === "EDITOR" && (
                    <NavLink
                      to="/editer"
                      onClick={() => setIsMenuOpen(false)}
                      className="block mt-2 text-center py-1.5 px-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                    >
                      Open Editor Dashboard
                    </NavLink>
                  )}
                  {(user.role || "").toUpperCase() === "ADMIN" && (
                    <NavLink
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block mt-2 text-center py-1.5 px-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
                    >
                      Open Admin Dashboard
                    </NavLink>
                  )}
                  {(user.role || "").toUpperCase() === "REVIEWER" && (
                    <NavLink
                      to="/review"
                      onClick={() => setIsMenuOpen(false)}
                      className="block mt-2 text-center py-1.5 px-2 bg-purple-600 text-white text-xs font-bold rounded-xl"
                    >
                      Open Reviewer Dashboard
                    </NavLink>
                  )}
                </div>
              )}

              {/* Navigation Items List */}
              <div className="flex flex-col space-y-1">
                {menuItems.map((item) =>
                  item.submenu ? (
                    <div key={item.label} className="border-b border-slate-100 last:border-0 pb-1">
                      <button
                        onClick={() => toggleMobileSubmenu(item.label)}
                        className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-slate-800 font-bold text-sm hover:bg-slate-50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.label}</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded-full">
                            {item.submenu.length}
                          </span>
                          <FaChevronDown
                            className={`text-xs text-slate-400 transition-transform duration-200 ${
                              mobileExpanded[item.label] ? "rotate-180 text-blue-600" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {/* Expanded Submenu Accordion */}
                      {mobileExpanded[item.label] && (
                        <div className="ml-3 my-1 pl-3 border-l-2 border-blue-200 space-y-1 py-1">
                          {item.submenu.map((sub) => (
                            <NavLink
                              key={sub.to}
                              to={sub.to}
                              onClick={() => setIsMenuOpen(false)}
                              className={({ isActive }) =>
                                `flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold transition-colors ${
                                  isActive
                                    ? "bg-blue-50 text-blue-700 font-bold"
                                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                                }`
                              }
                            >
                              <span className="text-xs shrink-0">{sub.icon}</span>
                              <span className="truncate">{sub.label}</span>
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 py-2.5 px-3 rounded-xl text-sm font-bold transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                            : "text-slate-800 hover:text-blue-600 hover:bg-slate-50"
                        }`
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  )
                )}
              </div>

              {/* Guest Authentication Action Buttons */}
              {!isLoggedIn && (
                <div className="grid grid-cols-2 gap-3 pt-4 mt-3 border-t border-slate-100">
                  <NavLink
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    Register
                  </NavLink>
                </div>
              )}

            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
