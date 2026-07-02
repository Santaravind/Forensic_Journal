

import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUserCircle, FaBars, FaTimes, FaPhone, FaSignOutAlt } from "react-icons/fa";
import logo from '../assets/logoss.png'
import { MdMarkEmailRead } from "react-icons/md";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const navigate = useNavigate();

  // Get user from localStorage with better error handling
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check user on mount and when localStorage changes
  useEffect(() => {
    const checkUser = () => {
      try {
        const userData = localStorage.getItem('user');
        console.log('Raw user data from localStorage:', userData); // Debug log
        
        if (userData) {
          const parsedUser = JSON.parse(userData);
          console.log('Parsed user:', parsedUser); // Debug log
          
          // Check if user has email or is valid
          if (parsedUser && parsedUser.email) {
            setUser(parsedUser);
            setIsLoggedIn(true);
          } else {
            setUser(null);
            setIsLoggedIn(false);
          }
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    checkUser();

    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', checkUser);
    
    return () => {
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  const toggleMobileDropdown = (label) => {
    setMobileDropdown(mobileDropdown === label ? null : label);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Logout function
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Update state
    setUser(null);
    setIsLoggedIn(false);
    // Close any open dropdowns
    setOpen(false);
    setIsMenuOpen(false);
    // Navigate to login page
    navigate('/login');
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

  { to: "/editorial", label: "Editorial Team" },
  { 
     label: "Guidelines" ,
    submenu:[
      {to: "/peer" , label: "Peer Review Policy"},
      {to: "/open" , label: "Open Access Policy"},
      {to: "/author" , label: "Author guidelines"},
      {to: "/plag" , label: "Plagiarism Policy"},
      {to: "/ethics" , label: "Ethics and malpractice Policy"},
      {to: "/privacy" , label: "Privacy statement"},
      {to: "/informed" , label: "Informed consent"},
    ]
  },
  { to: "/publication", label: "Publication Procedure" },
  { to: "/blog", label: "Blog" },
  // { to: "/review", label: "Review" },
];

  const menuItems = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/about", label: "About Us" },
    { 
      label: "Research",
      submenu: [
        { to: "/article", label: "Article" },
        { to: "/case-study", label: "Case Study" },
        { to: "/paper-status", label: "Paper Status" },
      ],
    },
    { to: "/editorial", label: "Editorial Team" },
    { 
      label: "Guidelines",
      submenu: [
        { to: "/peer", label: "Peer Review Policy" },
        { to: "/open", label: "Open Access Policy" },
        { to: "/author", label: "Author guidelines" },
        { to: "/plag", label: "Plagiarism Policy" },
        { to: "/ethics", label: "Ethics and malpractice Policy" },
        { to: "/privacy", label: "Privacy statement" },
        { to: "/informed", label: "Informed consent" },
      ]
    },
    { to: "/publication", label: "Publication Procedure" },
   { 
      label: "Instuction",
      submenu: [
        { to: "/authorIn", label: "Author" },
        
      ],
    },
    { to: "/blog", label: "Blog" },
  ];

  // Debug log to see if user is logged in
  // console.log('Is user logged in?', isLoggedIn);
  // console.log('User data:', user);

  return (
    <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-4 mt-30 lg:mt-10 transition-transform duration-300 ease-in-out">
      
      {/* Logo – OUTSIDE Navbar */}
      <div className="flex items-center mt-5">
        <div className="rounded-full h-40 w-40 flex items-center justify-center drop-shadow-md">
          {/* <img
            src={logo}
            alt="Patrika Logo"
            className="h-40 w-auto object-contain"
          /> */}
        </div>
      </div>

          <NavLink
            to="/register"
            className="block px-4 py-2 text-sm font-semibold hover:bg-indigo-50"
            onClick={() => setOpen(false)}
          >
            Register
          </NavLink>
          <NavLink
            to="/review"
            className="block px-4 py-2 text-sm font-semibold hover:bg-indigo-50"
            onClick={() => setOpen(false)}
          >
            Review
          </NavLink>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col gap-3">
            {menuItems.map((item) =>
              item.submenu ? (
                <div key={item.label} className="px-4">
                  <button
                    onClick={() => toggleMobileDropdown(item.label)}
                    className="w-full flex justify-between items-center font-semibold text-gray-700 py-2"
                  >
                    {item.label}
                    <span className="text-sm">
                      {mobileDropdown === item.label ? "−" : "+"}
                    </span>
                  </button>
                  {mobileDropdown === item.label && (
                    <div className="ml-4 mt-1 flex flex-col gap-1">
                      {item.submenu.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          onClick={() => {
                            closeMenu();
                            setMobileDropdown(null);
                          }}
                          className="px-4 py-2 rounded-lg font-semibold hover:bg-pink-100"
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className="px-4 py-2 rounded-xl font-semibold hover:bg-pink-100"
                >
                  {item.label}
                </NavLink>
              )
            )}

            {/* Mobile Auth Links */}
            <div className="border-t pt-3">
              {isLoggedIn && user ? (
                <>
                  {/* User Info in Mobile */}
                  <div className="px-4 py-2 mb-2">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.fullName || user.email || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email || 'No email'}
                    </p>
                    {user.isGoogleUser && (
                      <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                        Google
                      </span>
                    )}
                  </div>
                  
                  {/* Dashboard Link (Optional) */}
                  <NavLink
                    to="/"
                    onClick={closeMenu}
                    className="block px-4 py-2 font-semibold hover:text-indigo-700"
                  >
                    Home
                  </NavLink>
                  
                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt className="text-red-500" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/register"
                    onClick={closeMenu}
                    className="block px-4 py-2 font-semibold hover:text-indigo-700"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={closeMenu}
                    className="block px-4 py-2 font-semibold hover:text-indigo-700"
                  >
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={closeMenu}
          className="px-4 py-2 rounded-xl font-semibold hover:bg-pink-100"
        >
          {item.label}
        </NavLink>
      )
    )}

    {/* Auth links */}
    <div className="border-t pt-3">
      <NavLink
        to="/register"
        onClick={closeMenu}
        className="block px-4 py-2 font-semibold hover:text-indigo-700"
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        onClick={closeMenu}
        className="block px-4 py-2 font-semibold hover:text-indigo-700"
      >
        Login
      </NavLink>
      <NavLink
        to="/review"
        onClick={closeMenu}
        className="block px-4 py-2 font-semibold hover:text-indigo-700"
      >
        Review
      </NavLink>
    </div>

  </div>
</div>

    </div>
  </div>
</nav>

  );
}
