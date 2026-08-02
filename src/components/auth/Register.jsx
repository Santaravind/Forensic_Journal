
import { cache, useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { GiFingerPrint, GiMicroscope, GiScales } from "react-icons/gi";
import logos from "../assets/logoss.png";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import{toast} from 'react-hot-toast';
import axios from 'axios'
const SPECIALIZATIONS = [
  "Reader",
  "Digital Forensics",
  "Cyber Crime Investigation",
  "Forensic Accounting",
  "DNA Analysis",
  "Toxicology",
  "Ballistics",
  "Fingerprint Analysis",
  "Document Examination",
  "Others",
];

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    organization: "",
    domain: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ loading: false, error: null });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    setFormData({
      fullName: "",
      email: "",
     mobileNo: "",
      organization: "",
      domain: "",
      password: "",
      confirmPassword: "",
    });
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        if (!u?.email) localStorage.removeItem("user");
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  //orcid id login
  const handleOrcID = (e) => {
    e.preventDefault();
    window.open("https://orcid.org/signin", "_blank");
  };
  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  // register throw method 
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    setStatus({ loading: false, error: "Passwords do not match." });
    return;
  }

  setStatus({ loading: true, error: null });
     console.log(formData);
  try {
    await axios.post(`${apiUrl}/auth/register`, formData); 
    toast.success("Registration successful!");
    navigate("/login");
  } catch (error) {
    console.log(error);
    setStatus({ loading: false, error: "Something went wrong during registration. Please try again." });
    toast.error("Something went wrong during registration. Try again!");
  }
};



 //google register
  const handleGoogleRegister = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: decoded.email || "google-user@email.com",
          fullName: decoded.name || "Google User",
          isGoogleUser: true,
          googleId: decoded.sub,
          picture: decoded.picture || null,
          emailVerified: decoded.email_verified || false,
        }),
      );
      navigate("/");
    } catch {
      setStatus({
        loading: false,
        error: "Failed to process Google registration. Please try again.",
      });
    }
  };

  const handleGoogleError = () =>
    setStatus({
      loading: false,
      error: "Google registration failed. Please try again.",
    });

  // Modern input focus states with micro-shadow offsets
  const inputClass =
    "w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all duration-200 text-gray-800 bg-gray-50/50 focus:bg-white placeholder-gray-400";

  return (
    <>
      <style>{`
        @keyframes blob {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(40px, -40px) scale(1.15); }
          66%  { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-2 relative overflow-hidden font-sans">
        {/* Dynamic Abstract Mesh Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-25 animate-blob" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-25 animate-blob animation-delay-2000" />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-15 animate-blob animation-delay-4000" />
        </div>

        {/* Card Frame */}
        <div className="relative w-full max-w-6xl bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-h-screen flex flex-col md:flex-row transition-all duration-300">
          {/* Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 z-10" />

          {/* Left Panel: Brand Showcase */}
          <div className="hidden md:flex md:w-5/12 flex-col justify-between p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mb-6 hover:bg-white/10 transition-all cursor-pointer">
                <img
                  src={logos}
                  alt="Forensic Patrika"
                  className="w-6 h-6 object-contain filter brightness-110"
                />
                <span className="text-xs font-semibold text-blue-200 tracking-wide uppercase">
                  Official Portal
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
                Forensic Patrika
              </h1>
              <p className="text-slate-400 text-xs font-medium">
                India's Premier Forensic Science Platform
              </p>
            </div>

            <div className="relative z-10 my-auto py-8">
              <h2 className="text-3xl font-bold text-white mb-3 tracking-tight leading-snug">
                Welcome 
                <br />
                <span className="text-transparent text-2xl bg-clip-text bg-linear-to-r from-blue-400 via-indigo-300 to-purple-400">  
              Promoting Scientific Excellence and Innovation in Forensic Research  
                </span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Access verified peer-reviewed publications, advanced
                methodologies, and coordinate alongside elite industry
                researchers.
              </p>
            </div>

            {/* Metrics Footer */}
            <div className="relative z-10 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["500+", "Papers"],
                  ["10k+", "Readers"],
                  ["50+", "Authors"],
                ].map(([val, label]) => (
                  <div
                    key={label}
                    className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-2.5 border border-white/[0.05] group hover:border-white/10 transition-colors"
                  >
                    <p className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {val}
                    </p>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2 pt-1">
                {[
                  {
                    Icon: GiFingerPrint,
                    color: "text-amber-400",
                    bg: "bg-amber-400/10",
                  },
                  {
                    Icon: GiMicroscope,
                    color: "text-blue-400",
                    bg: "bg-blue-400/10",
                  },
                  {
                    Icon: GiScales,
                    color: "text-emerald-400",
                    bg: "bg-emerald-400/10",
                  },
                ].map(({ Icon, color, bg }, i) => (
                  <div
                    key={i}
                    className={`p-2 ${bg} rounded-xl border border-white/5 shadow-inner hover:scale-110 transition-transform cursor-help`}
                  >
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Form */}
          <div className="w-full md:w-7/12 p-6 md:p-10 overflow-y-auto max-h-[110vh] bg-white flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              {/* Header Context */}
              <div className="mb-6">
                <h3 className="text-4xl text-center font-bold mt-8 text-slate-900 tracking-tight">
                  Create Account
                </h3>
                <p className="text-slate-500 text-sm mt-3">
                  {/* Get configured within the global investigator registry. */}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form Input Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <div className="relative group">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Dr. John Doe"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative group">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@forensic.com"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="tel"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Organization
                    </label>
                    <div className="relative group">
                      <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="State Forensic Lab"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Specialization / Domain
                  </label>
                  <div className="relative group">
                    <GiMicroscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10" />
                    <select
                      name="domain"
                      value={formData.domain}
                      onChange={handleChange}
                      required
                      className={`${inputClass} appearance-none bg-gray-50/50 cursor-pointer`}
                    >
                      <option value="" disabled className="text-slate-400">
                        Select expert domain
                      </option>
                      {SPECIALIZATIONS.map((s) => (
                        <option key={s} value={s} className="text-slate-800">
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <div className="relative group">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        className={`${inputClass} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 active:scale-95 transition-transform"
                        tabIndex="-1"
                      >
                        {showPassword ? (
                          <FiEyeOff className="w-4 h-4" />
                        ) : (
                          <FiEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Confirm Identity
                    </label>
                    <div className="relative group">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded-md focus:ring-blue-500/20 transition-all accent-blue-600 cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-slate-500 leading-normal select-none cursor-pointer"
                  >
                    I verify my compliance credentials and agree to the{" "}
                    <a
                      href="#"
                      className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors"
                    >
                      Terms of Service
                    </a>{" "}
                    &{" "}
                    <a
                      href="#"
                      className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors"
                    >
                      Privacy Framework
                    </a>
                    .
                  </label>
                </div>

                {/* State-driven Notice Box */}
                {status.error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-medium animate-pulse">
                    {status.error}
                  </div>
                )}

                {/* Core Action Button */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none mt-2"
                >
                  {status.loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Authorizing...
                    </span>
                  ) : (
                    "Register for Forensic Patrika"
                  )}
                </button>

                {/* Visual Intersect Divider */}
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-100" />
                  <span className="flex-shrink mx-3 text-slate-400 text-[11px] font-medium uppercase tracking-wider">
                    Third Party Verification
                  </span>
                  <div className="flex-grow border-t border-slate-100" />
                </div>

                {/* Google Single Sign-on Container */}
                <div className="flex justify-center w-full transform transition-transform hover:scale-[1.01] active:scale-[0.99]">
                  <GoogleLogin
                    onSuccess={handleGoogleRegister}
                    onError={handleGoogleError}
                    theme="outline"
                    size="large"
                    shape="pill"
                    width="340"
                    text="signup_with"
                  />
                </div>

                <div className="flex justify-center w-full transform transition-transform hover:scale-[1.01] active:scale-[0.99]">
                  <button
                    onClick={handleOrcID}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#A6CE39] hover:bg-[#95ba32] text-white font-medium rounded-md shadow-sm transition-colors duration-200 text-sm tracking-wide"
                  >
                    {/* Optional: Add ORCID Icon SVG here */}
                    <span className="w-4 h-4 bg-white text-[#A6CE39] rounded-full inline-flex items-center justify-center text-[10px] font-bold font-sans">
                      iD
                    </span>
                    Continue with ORCID iD -
                  </button>
                </div>
                <p className="text-center text-slate-500 text-xs pt-2">
                  Already mapped in our system?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors"
                  >
                    Sign in here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;