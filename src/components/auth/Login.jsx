




 //new idea unlock
// import React, { useState } from "react";
// import { User, BookOpen, ShieldCheck, FileText } from "lucide-react";

// export default function Login() {
//   const [step, setStep] = useState("role");
//   const [selectedRole, setSelectedRole] = useState("");

//   const roles = [
//     { name: "author", label: "Author", icon: <User size={32} /> },
//     { name: "reviewer", label: "Reviewer", icon: <BookOpen size={32} /> },
//     { name: "editor", label: "Editor", icon: <ShieldCheck size={32} /> },
//     { name: "publisher", label: "Publisher", icon: <FileText size={32} /> },
//     { name: "reader", label: "Reader", icon: <FileText size={32} /> }
//   ];

//   return (
//     <div className="h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">

//       {/* ROLE SELECTION */}
//       {step === "role" && (
//         <div className="backdrop-blur-xl bg-linear-to-br from-white/20 to-blue-500/20 border border-white/20 p-10 rounded-3xl shadow-2xl w-130 text-center animate-fadeIn">
          
//           <h2 className="text-2xl font-semibold text-white mb-2">
//             Please select your role
//           </h2>
//           <p className="text-gray-300 text-sm mb-8">
//             Choose how you want to continue
//           </p>

//           <div className="grid grid-cols-2 gap-5 mb-8">
//             {roles.map((r) => (
//               <div
//                 key={r.name}
//                 onClick={() => setSelectedRole(r.name)}
//                 className={`p-6 rounded-xl flex flex-col items-center cursor-pointer transition-all duration-300 transform
//                   ${
//                     selectedRole === r.name
//                       ? "bg-blue-500/20 border border-blue-400 scale-105"
//                       : "bg-white/5 border border-white/10 hover:scale-105 hover:bg-white/10"
//                   }`}
//               >
//                 <div className="mb-3 text-blue-400">{r.icon}</div>
//                 <p className="text-white font-medium">{r.label}</p>
//               </div>
//             ))}
//           </div>

//           <button
//             disabled={!selectedRole}
//             onClick={() => setStep("login")}
//             className={`w-full py-3 rounded-full font-semibold transition-all duration-300
//               ${
//                 selectedRole
//                   ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
//                   : "bg-gray-400 text-gray-200 cursor-not-allowed"
//               }`}
//           >
//             Continue
//           </button>
//         </div>
//       )}

//       {/* LOGIN FORM */}
//       {step === "login" && (
//         <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-100 text-center animate-fadeIn">
          
//           <h2 className="text-xl font-semibold text-white mb-4">
//             {selectedRole.toUpperCase()} Login
//           </h2>

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-3 mb-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
//           />

//           <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
//             Login
//           </button>

//           <button
//             onClick={() => setStep("role")}
//             className="mt-3 text-sm text-blue-300"
//           >
//             ← Change Role
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { 
  User, BookOpen, ShieldCheck, FileText, 
  Loader2, Lock, Mail, ChevronRight, AlertCircle 
} from "lucide-react";

const ROLES = [
  { id: "author", label: "Author", icon: User, color: "text-emerald-400" },
  { id: "reviewer", label: "Reviewer", icon: BookOpen, color: "text-amber-400" },
  { id: "editor", label: "Editor", icon: ShieldCheck, color: "text-blue-400" },
  { id: "publisher", label: "Publisher", icon: FileText, color: "text-purple-400" },
  { id: "reader", label: "Reader", icon: User, color: "text-slate-400" }
];

export default function Login() {
  // --- Business Logic State ---
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  // --- Handlers ---
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

    try {
      // const response = await axios.post("http://localhost:8080/api/auth/login", {
      //   ...formData,
      //   role: selectedRole,
      // });

      localStorage.setItem("token", response.data.token);
      setStatus({ loading: false, error: null, success: true });
      
      // Redirect logic here
      console.log("Login Success:", response.data);
    } catch (err) {
      setStatus({
        loading: false,
        error: err.response?.data?.message || "Authentication failed. check your credentials.",
        success: false
      });
    }
  };
  // bg-[oklch(52.5%_0.223_3.958)] 

  return (
    <div className="min-h-screen bg-[oklch(52.5%_0.223_3.958)] flex items-center justify-center p-4 font-sans selection:bg-blue-500/30">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative w-full max-w-[440px]">
        <div className="bg-sky-600/40 backdrop-blur-3xl border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-8 md:p-10">
          
          {/* Header */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 mb-6 shadow-lg shadow-blue-500/20">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Portal Sign-In</h1>
            <p className="text-white/80 mt-2 text-sm">Select your workspace role to begin</p>
          </header>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Role Selection - 5 items layout */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`group relative flex flex-col items-center p-3 rounded-2xl border transition-all duration-300 ${
                      isSelected 
                        ? "bg-[oklch(54.1%_0.281_293.009)] border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]" 
                        : "bg-[oklch(42.4%_0.199_265.638)] border-white/5 hover:border-white/20 hover:bg-[oklch(62.7%_0.194_149.214)]"
                    }`}
                  >
                    <Icon className={`mb-2 transition-colors ${isSelected ? role.color : "text-slate-500"}`} size={22} />
                    <span className={`text-[14px]  font-bold uppercase tracking-tighter ${isSelected ? "text-white/80" : "text-white/60"}`}>
                      {role.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="Security password"
                  required
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Status Messages */}
            {status.error && (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={14} />
                <p>{status.error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.loading || !selectedRole}
              className="group relative w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:grayscale text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-blue-900/20 overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {status.loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <span>Enter Dashboard</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          <footer className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-slate-500 text-xs">
              Secure Enterprise Access &copy; 2026
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}

