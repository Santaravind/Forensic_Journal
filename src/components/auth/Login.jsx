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
} from "lucide-react";
import logos from "../assets/logoss.png"; // Make sure the path is correct

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

    // Your Auth Logic Here
    setTimeout(
      () => setStatus({ loading: false, error: null, success: true }),
      1500,
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Animated Background Elements (Matching Register Page) */}
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
          {/* Left Side - Branding (Matching Register Page) */}
          <div className="relative hidden md:block p-8 bg-linear-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm">
            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="items-center space-x-3 mb-10 text-center">
                <div className=" bg-white/10 rounded-2xl shadow-lg inline-block mb-2 border border-white/20 hover:border-0 hover:bg-white/5">
                  <img
                    src={logos}
                    alt="Logo"
                    className="w-30 h-30 object-contain transition-all duration-300 ease-in-out hover:scale-125  "
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
                  Welcome Back to the <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-red-500">
                    Evidence Laboratory
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
                  {" "}
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
