

// import { useState } from 'react';
// import logo from '../assets/logoss.png';

// export default function ForensicJournalLogin() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });

//   const handleChange = (e) => {
//     const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//     setFormData({
//       ...formData,
//       [e.target.name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login submitted:', formData);
//     alert('Login successful! Welcome back to Forensic Patrika.');
//   };

//   return (
//     <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      
//       {/* Main Container */}
//       <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl shadow-2xl bg-white/5 backdrop-blur-lg border border-white/10">
        
//         {/* Left Side: Branding & Info */}
//         <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-purple-600/20 to-transparent border-r border-white/10">
//           <div className="mb-8">
//             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-6">
//                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//             </div>
//             <img src={logo} alt="Logo" className="h-12 object-contain mb-4 opacity-90" />
//             <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">
//               Forensic <span className="text-purple-400">Patrika</span>
//             </h1>
//             <p className="text-purple-100/70 text-lg leading-relaxed max-w-sm">
//               The premier digital gateway for forensic research, evidence analysis, and scholarly education.
//             </p>
//           </div>

//           <div className="space-y-4">
//             {['Research', 'Analysis', 'Education'].map((item) => (
//               <div key={item} className="flex items-center space-x-3 text-purple-200">
//                 <div className="h-1 w-1 bg-purple-400 rounded-full" />
//                 <span className="text-sm font-medium uppercase tracking-widest">{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Side: Form */}
//         <div className="p-8 md:p-12 lg:p-16 bg-white flex flex-col justify-center">
//           <div className="mb-10 lg:hidden text-center">
//              <h1 className="text-3xl font-bold text-gray-900">Forensic Patrika</h1>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
//             <p className="text-gray-500">Welcome back! Please enter your details.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 outline-none transition-all"
//                   placeholder="name@institution.com"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 outline-none transition-all"
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between py-2">
//               <label className="flex items-center cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   name="rememberMe"
//                   checked={formData.rememberMe}
//                   onChange={handleChange}
//                   className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                 />
//                 <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
//               </label>
//               <a href="#" className="text-sm font-semibold text-purple-600 hover:text-purple-700">Forgot password?</a>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-purple-700 transform transition-all active:scale-[0.98] shadow-xl shadow-purple-500/10 flex items-center justify-center space-x-2"
//             >
//               <span>Sign In to Dashboard</span>
//             </button>

//             <div className="relative my-8">
//               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
//               <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="px-3 bg-white text-gray-400">Secure Access</span></div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <button type="button" className="flex items-center justify-center py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
//                 <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-2" alt="Google" />
//                 <span className="text-sm font-medium text-gray-700">Google</span>
//               </button>
//               <button type="button" className="flex items-center justify-center py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
//                 <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-5 w-5 mr-2" alt="Facebook" />
//                 <span className="text-sm font-medium text-gray-700">Facebook</span>
//               </button>
//             </div>

//             <p className="text-center text-sm text-gray-500 mt-8">
//               New to the journal? <a href="#" className="font-bold text-purple-600 hover:underline">Create an account</a>
//             </p>
//           </form>
//         </div>
//       </div>

//       {/* Footer Branding */}
//       <div className="fixed bottom-6 text-purple-200/50 text-xs tracking-widest uppercase">
//         © 2024 Forensic Patrika • Integrity in Research
//       </div>
//     </div>
//   );
// }




 //new idea unlock
import React, { useState } from "react";
import { User, BookOpen, ShieldCheck, FileText } from "lucide-react";

export default function Login() {
  const [step, setStep] = useState("role");
  const [selectedRole, setSelectedRole] = useState("");

  const roles = [
    { name: "author", label: "Author", icon: <User size={32} /> },
    { name: "reviewer", label: "Reviewer", icon: <BookOpen size={32} /> },
    { name: "editor", label: "Editor", icon: <ShieldCheck size={32} /> },
    { name: "publisher", label: "Publisher", icon: <FileText size={32} /> },
    { name: "reader", label: "Reader", icon: <FileText size={32} /> }
  ];

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      {/* ROLE SELECTION */}
      {step === "role" && (
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/20 to-blue-500/20 border border-white/20 p-10 rounded-3xl shadow-2xl w-[520px] text-center animate-fadeIn">
          
          <h2 className="text-2xl font-semibold text-white mb-2">
            Please select your role
          </h2>
          <p className="text-gray-300 text-sm mb-8">
            Choose how you want to continue
          </p>

          <div className="grid grid-cols-2 gap-5 mb-8">
            {roles.map((r) => (
              <div
                key={r.name}
                onClick={() => setSelectedRole(r.name)}
                className={`p-6 rounded-xl flex flex-col items-center cursor-pointer transition-all duration-300 transform
                  ${
                    selectedRole === r.name
                      ? "bg-blue-500/20 border border-blue-400 scale-105"
                      : "bg-white/5 border border-white/10 hover:scale-105 hover:bg-white/10"
                  }`}
              >
                <div className="mb-3 text-blue-400">{r.icon}</div>
                <p className="text-white font-medium">{r.label}</p>
              </div>
            ))}
          </div>

          <button
            disabled={!selectedRole}
            onClick={() => setStep("login")}
            className={`w-full py-3 rounded-full font-semibold transition-all duration-300
              ${
                selectedRole
                  ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
          >
            Continue
          </button>
        </div>
      )}

      {/* LOGIN FORM */}
      {step === "login" && (
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-[400px] text-center animate-fadeIn">
          
          <h2 className="text-xl font-semibold text-white mb-4">
            {selectedRole.toUpperCase()} Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Login
          </button>

          <button
            onClick={() => setStep("role")}
            className="mt-3 text-sm text-blue-300"
          >
            ← Change Role
          </button>
        </div>
      )}
    </div>
  );
}
