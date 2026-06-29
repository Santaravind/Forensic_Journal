
import React, { useState } from "react";
import {
  User,
  BookOpen,
  ShieldCheck,
  FileText,
  Loader2,
  Lock,
  Mail,
  ChevronRight,
  AlertCircle,
  Scale,
  Fingerprint,
  Microscope,
  LogOut,
} from "lucide-react";
import logos from "../assets/logoss.png";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

const ROLES = [
  { id: "author", label: "Author", icon: User, color: "text-emerald-400" },
  {
    id: "reviewer",
    label: "Reviewer",
    icon: BookOpen,
    color: "text-amber-400",
  },
  { id: "editor", label: "Editor", icon: ShieldCheck, color: "text-blue-400" },
  {
    id: "publisher",
    label: "Publisher",
    icon: FileText,
    color: "text-purple-400",
  },
  { id: "reader", label: "Reader", icon: User, color: "text-slate-400" },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status.error) setStatus({ ...status, error: null });
  };

 const handleLogin = async (e) => {
  e.preventDefault();
  if (!selectedRole) {
    setStatus({ ...status, error: "Please select a professional role." });
    return;
  }
  setStatus({ loading: true, error: null, success: false });

  // Simulate login
  setTimeout(() => {
    setStatus({ loading: false, error: null, success: true });
    // Store user info in localStorage with proper structure
    const userData = { 
      email: formData.email,
      fullName: formData.email.split('@')[0], // Generate name from email
      role: selectedRole,
      isGoogleUser: false 
    };
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('User stored in localStorage:', userData); // Debug log
    navigate("/");
  }, 1500);
};

const handleGoogleLogin = (credentialResponse) => {
  console.log("Google Login Success:", credentialResponse);
  // Store user info in localStorage
  const userData = { 
    email: credentialResponse.email || 'google-user@email.com',
    fullName: credentialResponse.name || 'Google User',
    isGoogleUser: true,
    googleId: credentialResponse.sub
  };
  localStorage.setItem('user', JSON.stringify(userData));
  console.log('Google user stored in localStorage:', userData); // Debug log
  navigate("/");
};

//orcid id login
 const handleOrcID = (e) => {
  e.preventDefault();
  window.open("https://orcid.org/signin", "_blank");
};

  
  

  const handleGoogleError = () => {
    console.log("Google Login Failed");
    setStatus({ ...status, error: "Google login failed. Please try again." });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Decorative Header Strip */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-yellow-400 via-red-500 to-purple-600"></div>

        <div className="grid md:grid-cols-2 gap-0 font-serif">
          {/* Left Side - Branding */}
          <div className="relative hidden md:block p-8 bg-linear-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm">
            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="items-center space-x-3 mb-10 text-center">
                <div className="bg-white/10 rounded-2xl shadow-lg inline-block mb-2 border border-white/20 hover:border-0 hover:bg-white/5">
                  <img
                    src={logos}
                    alt="Logo"
                    className="w-30 h-30 object-contain transition-all duration-300 ease-in-out hover:scale-125"
                  />
                </div>
                <h1 className="text-3xl font-bold text-white uppercase tracking-wider">
                  Forensic Patrika
                </h1>
                <p className="text-blue-200 text-sm mt-1">
                  Official Portal Login
                </p>
              </div>

              <div className="space-y-6 font-serif">
                <h2 className="text-3xl font-bold text-white leading-tight">
                   Advancing Forensic Science  <br />
                  <span className="text-transparent text-2xl bg-clip-text bg-linear-to-r from-yellow-400 to-red-500">
              Research : Explore, Learn, Discover
                  </span>
                </h2>
                <p className="text-blue-100 opacity-80">
                  Access your forensic dashboard, manage research papers, and
                  collaborate with the scientific community.
                </p>

                <div className="flex space-x-4 pt-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <Fingerprint className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <Microscope className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <Scale className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-8 md:p-12 bg-white/95 backdrop-blur-xl">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-center font-serif text-gray-800 mb-2">
                  Login
                </h3>
                <p className="text-gray-600 text-center">
                  Select your role and enter credentials
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Role Selection Grid */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {ROLES.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-300 ${
                          isSelected
                            ? "bg-blue-50 border-blue-500 shadow-sm scale-105"
                            : "bg-gray-50 border-gray-100 hover:border-blue-200"
                        }`}
                      >
                        <Icon
                          className={`mb-1 ${isSelected ? role.color : "text-gray-400"}`}
                          size={20}
                        />
                        <span
                          className={`text-[10px] font-bold uppercase ${isSelected ? "text-blue-600" : "text-gray-500"}`}
                        >
                          {role.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="john@forensic.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Forgot?
                    </a>
                  </div>
                  <div className="relative group">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {status.error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs">
                    <AlertCircle size={14} />
                    <p>{status.error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {status.loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Sign In to Dashboard"
                  )}
                  {!status.loading && <ChevronRight size={18} />}
                </button>

                {/* Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                {/* Google Login Button */}
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={handleGoogleError}
                    theme="outline"
                    size="large"
                    shape="rectangular"
                    width="100%"
                    text="signin_with"
                  />
                </div>
           <div className="flex justify-center w-full transform transition-transform hover:scale-[1.01] active:scale-[0.99]">
                <button onClick={handleOrcID} className="flex items-center gap-2 px-5 py-2.5 bg-[#A6CE39] hover:bg-[#95ba32] text-white font-medium rounded-md shadow-sm transition-colors duration-200 text-sm tracking-wide">
             {/* Optional: Add ORCID Icon SVG here */}
               <span className="w-4 h-4 bg-white text-[#A6CE39] rounded-full inline-flex items-center justify-center text-[10px] font-bold font-sans">iD</span>
                 Continue with ORCID iD -
                </button>
          </div>
                <p className="text-center text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Register Now
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import {
//   FiUser, FiBookOpen, FiShield, FiFileText,
//   FiLoader, FiLock, FiMail, FiChevronRight, FiAlertCircle,
// } from "react-icons/fi";
// import { GiFingerPrint, GiMicroscope, GiScales } from "react-icons/gi";
// import logos from "../assets/logoss.png";
// import { GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const ROLES = [
//   { id: "author",    label: "Author",    icon: FiUser,     color: "text-emerald-400" },
//   { id: "reviewer",  label: "Reviewer",  icon: FiBookOpen, color: "text-amber-400"   },
//   { id: "editor",    label: "Editor",    icon: FiShield,   color: "text-blue-400"    },
//   { id: "publisher", label: "Publisher", icon: FiFileText, color: "text-purple-400"  },
//   { id: "reader",    label: "Reader",    icon: FiUser,     color: "text-slate-400"   },
// ];

// export default function Login() {
//   const [selectedRole, setSelectedRole] = useState("");
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [status, setStatus] = useState({ loading: false, error: null, success: false });
//   const navigate = useNavigate();

//   useEffect(() => {
//     setFormData({ email: "", password: "" });
//     try {
//       const raw = localStorage.getItem("user");
//       if (raw) {
//         const u = JSON.parse(raw);
//         if (!u?.email) localStorage.removeItem("user");
//       }
//     } catch {
//       localStorage.removeItem("user");
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
//     if (status.error) setStatus((s) => ({ ...s, error: null }));
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (!selectedRole) {
//       setStatus({ loading: false, error: "Please select a professional role.", success: false });
//       return;
//     }
//     setStatus({ loading: true, error: null, success: false });
//     setTimeout(() => {
//       localStorage.setItem("user", JSON.stringify({
//         email: formData.email,
//         fullName: formData.email.split("@")[0],
//         role: selectedRole,
//         isGoogleUser: false,
//       }));
//       navigate("/");
//     }, 1500);
//   };

//   const handleGoogleLogin = (credentialResponse) => {
//     try {
//       const decoded = jwtDecode(credentialResponse.credential);
//       localStorage.setItem("user", JSON.stringify({
//         email: decoded.email || "google-user@email.com",
//         fullName: decoded.name || "Google User",
//         isGoogleUser: true,
//         googleId: decoded.sub,
//         picture: decoded.picture || null,
//         emailVerified: decoded.email_verified || false,
//       }));
//       navigate("/");
//     } catch {
//       setStatus({ loading: false, error: "Failed to process Google login. Please try again.", success: false });
//     }
//   };

//   const handleGoogleError = () => {
//     setStatus({ loading: false, error: "Google login failed. Please try again.", success: false });
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes blob {
//           0%   { transform: translate(0px, 0px) scale(1); }
//           33%  { transform: translate(30px, -50px) scale(1.1); }
//           66%  { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob { animation: blob 7s infinite; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>

//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-6 relative overflow-hidden font-sans">

//         {/* Blobs */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
//           <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
//         </div>

//         {/* Card */}
//         <div className="relative w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//           <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600" />

//           <div className="grid md:grid-cols-2">

//             {/* Left – Branding */}
//             <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-blue-900/50 to-purple-900/50">
//               <div className="text-center mb-10">
//                 <div className="inline-block bg-white/10 rounded-2xl border border-white/20 mb-3 p-2 hover:bg-white/5 transition-all duration-300">
//                   <img
//                     src={logos}
//                     alt="Forensic Patrika Logo"
//                     style={{ width: 112, height: 112 }}
//                     className="object-contain hover:scale-110 transition-transform duration-300"
//                   />
//                 </div>
//                 <h1 className="text-3xl font-bold text-white uppercase tracking-wider">
//                   Forensic Patrika
//                 </h1>
//                 <p className="text-blue-200 text-sm mt-1">Official Portal Login</p>
//               </div>

//               <div className="space-y-4">
//                 <h2 className="text-3xl font-bold text-white leading-tight font-serif">
//                   Welcome Back to the<br />
//                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
//                     Evidence Laboratory
//                   </span>
//                 </h2>
//                 <p className="text-blue-100 opacity-80 text-sm leading-relaxed">
//                   Access your forensic dashboard, manage research papers, and collaborate with the scientific community.
//                 </p>
//                 <div className="flex space-x-4 pt-4">
//                  {[
//   { Icon: GiFingerPrint, color: "text-yellow-400" },  // capital P here too
//   { Icon: GiMicroscope,  color: "text-blue-400"   },
//   { Icon: GiScales,      color: "text-emerald-400" },
// ].map(({ Icon, color }, i) => (
//   <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/10">
//     <Icon className={`w-6 h-6 ${color}`} />
//   </div>
// ))}
//                 </div>
//               </div>
//             </div>

//             {/* Right – Form */}
//             <div className="p-8 md:p-12 bg-white">
//               <div className="max-w-md mx-auto">
//                 <div className="mb-8 text-center">
//                   <h3 className="text-3xl font-bold text-gray-800 font-serif mb-1">Login</h3>
//                   <p className="text-gray-500 text-sm">Select your role and enter credentials</p>
//                 </div>

//                 <form onSubmit={handleLogin} className="space-y-5">
//                   {/* Role Grid */}
//                   <div className="grid grid-cols-3 gap-2">
//                     {ROLES.map(({ id, label, icon: Icon, color }) => {
//                       const sel = selectedRole === id;
//                       return (
//                         <button
//                           key={id}
//                           type="button"
//                           onClick={() => setSelectedRole(id)}
//                           className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-200 ${
//                             sel
//                               ? "bg-blue-50 border-blue-500 scale-105 shadow-sm"
//                               : "bg-gray-50 border-gray-200 hover:border-blue-300"
//                           }`}
//                         >
//                           <Icon className={`mb-1 ${sel ? color : "text-gray-400"}`} size={20} />
//                           <span className={`text-[10px] font-bold uppercase tracking-wide ${sel ? "text-blue-600" : "text-gray-500"}`}>
//                             {label}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                     <div className="relative group">
//                       <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
//                       <input
//                         type="email" name="email" value={formData.email} onChange={handleChange}
//                         placeholder="john@forensic.com" required
//                         className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
//                       />
//                     </div>
//                   </div>

//                   {/* Password */}
//                   <div>
//                     <div className="flex justify-between mb-1">
//                       <label className="block text-sm font-medium text-gray-700">Password</label>
//                       <a href="#" className="text-xs text-blue-600 hover:underline">Forgot?</a>
//                     </div>
//                     <div className="relative group">
//                       <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
//                       <input
//                         type="password" name="password" value={formData.password} onChange={handleChange}
//                         placeholder="••••••••" required
//                         className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
//                       />
//                     </div>
//                   </div>

//                   {/* Error */}
//                   {status.error && (
//                     <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs">
//                       <FiAlertCircle size={14} />
//                       <p>{status.error}</p>
//                     </div>
//                   )}

//                   {/* Submit */}
//                   <button
//                     type="submit" disabled={status.loading}
//                     className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
//                   >
//                     {status.loading
//                       ? <FiLoader className="animate-spin" size={18} />
//                       : <><span>Sign In to Dashboard</span><FiChevronRight size={18} /></>
//                     }
//                   </button>

//                   {/* Divider */}
//                   <div className="relative my-2">
//                     <div className="absolute inset-0 flex items-center">
//                       <div className="w-full border-t border-gray-200" />
//                     </div>
//                     <div className="relative flex justify-center text-xs">
//                       <span className="px-3 bg-white text-gray-400">Or continue with</span>
//                     </div>
//                   </div>

//                   <div className="flex justify-center">
//                     <GoogleLogin
//                       onSuccess={handleGoogleLogin} onError={handleGoogleError}
//                       theme="outline" size="large" shape="rectangular" width="360" text="signin_with"
//                     />
//                   </div>

//                   <p className="text-center text-gray-500 text-sm">
//                     Don't have an account?{" "}
//                     <a href="/register" className="text-blue-600 font-semibold hover:underline">Register Now</a>
//                   </p>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }