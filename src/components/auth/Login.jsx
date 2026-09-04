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
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import logos from "../assets/logoss.png";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { authService } from "../../services/authService";
import ResetPasswordModal from "./ResetPasswordModal";

const ROLES = [
  { id: "USER", label: "Author / Reader", icon: User, color: "text-emerald-400" },
  { id: "REVIEWER", label: "Reviewer", icon: BookOpen, color: "text-amber-400" },
  { id: "EDITOR", label: "Editor", icon: ShieldCheck, color: "text-blue-400" },
  { id: "PUBLISHER", label: "Publisher", icon: FileText, color: "text-purple-400" },
  { id: "INSTITUTE", label: "Institute", icon: User, color: "text-slate-400" },
  { id: "ADMIN", label: "Admin", icon: BookOpen, color: "text-rose-400" },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("USER");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    isUnverified: false,
  });
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status.error) setStatus({ loading: false, error: null, isUnverified: false });
  };

  // Standard Database / JWT Login
  const handleLogin = async (e) => {
    e.preventDefault();

    setStatus({ loading: true, error: null, isUnverified: false });

    try {
      await authService.login({
        email: formData.email,
        password: formData.password,
        role: selectedRole,
      });

      toast.success("Welcome back! Login successful.");
      setStatus({ loading: false, error: null, isUnverified: false });

      // Route according to user role
      const roleUpper = selectedRole.toUpperCase();
      if (roleUpper === "ADMIN") navigate("/admin");
      else if (roleUpper === "EDITOR") navigate("/editer");
      else if (roleUpper === "REVIEWER") navigate("/review");
      else if (roleUpper === "PUBLISHER") navigate("/publisher");
      else navigate("/");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Invalid email or password. Please try again.";

      const isUnverified =
        errorMsg.toLowerCase().includes("not verified") ||
        errorMsg.toLowerCase().includes("verify the otp") ||
        errorMsg.toLowerCase().includes("unverified");

      if (isUnverified) {
        sessionStorage.setItem("pending_verification_email", formData.email);
      }

      setStatus({
        loading: false,
        error: errorMsg,
        isUnverified,
      });

      toast.error(errorMsg);
    }
  };

  // Google OAuth Login - Strictly Author / Reader (USER) Role Only
  const handleGoogleLogin = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        email: decoded.email || "google-user@email.com",
        fullName: decoded.name || "Google User",
        isGoogleUser: true,
        googleId: decoded.sub,
        picture: decoded.picture || null,
        role: "USER", // Strictly restricted to Author / Reader role only
        roleLabel: "Author / Reader",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      window.dispatchEvent(new Event("userChanged"));
      toast.success("Welcome! Logged in as Author / Reader with Google.");
      navigate("/");
    } catch {
      setStatus({ ...status, error: "Google login failed. Please try again." });
      toast.error("Google authentication failed.");
    }
  };

  const handleGoogleError = () => {
    setStatus({ ...status, error: "Google login failed. Please try again." });
  };

  // ORCID ID integration
  const handleOrcID = (e) => {
    e.preventDefault();
    window.open("https://orcid.org/signin", "_blank");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Main Glass Card */}
      <div className="relative w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-yellow-400 via-red-500 to-purple-600" />

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Branding */}
          <div className="relative hidden md:block p-8 bg-linear-to-br from-blue-950/60 to-purple-950/60 backdrop-blur-sm">
            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="items-center space-x-3 mb-8 text-center">
                <div className="bg-white/10 rounded-2xl shadow-lg inline-block mb-3 p-2 border border-white/20 hover:scale-105 transition-transform duration-300">
                  <img
                    src={logos}
                    alt="Logo"
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <h1 className="text-3xl font-extrabold text-white uppercase tracking-wider font-serif">
                  Forensic Patrika
                </h1>
                <p className="text-blue-200 text-xs mt-1 font-medium">
                  Official Academic Publishing Portal
                </p>
              </div>

              <div className="space-y-5">
                <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight font-serif">
                  Advancing Forensic Science <br />
                  <span className="text-transparent text-xl lg:text-2xl bg-clip-text bg-linear-to-r from-yellow-400 to-red-400">
                    Research : Explore, Learn, Discover
                  </span>
                </h2>
                <p className="text-blue-100/80 text-sm leading-relaxed">
                  Access your dedicated dashboard, track manuscript progress, submit peer reviews, and engage with global forensic scholars.
                </p>

                <div className="flex space-x-3 pt-2">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                    <Fingerprint className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                    <Microscope className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                    <Scale className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-6 sm:p-10 md:p-12 bg-white/95 backdrop-blur-xl flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <div className="mb-6 text-center">
                <h3 className="text-3xl font-bold font-serif text-gray-900 mb-1">
                  Portal Login
                </h3>
                <p className="text-gray-500 text-xs">
                  Choose your role and enter verified credentials
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Role Selection Grid */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    Account Role
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {ROLES.map((role) => {
                      const Icon = role.icon;
                      const isSelected = selectedRole === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setSelectedRole(role.id)}
                          className={`flex flex-col items-center p-2.5 rounded-xl border transition-all duration-200 ${
                            isSelected
                              ? "bg-blue-50 border-blue-600 shadow-sm scale-102"
                              : "bg-gray-50 border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <Icon
                            className={`mb-1 ${isSelected ? role.color : "text-gray-400"}`}
                            size={18}
                          />
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wide text-center leading-tight ${
                              isSelected ? "text-blue-700" : "text-gray-600"
                            }`}
                          >
                            {role.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                      size={16}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-gray-900 bg-gray-50/50 focus:bg-white"
                      placeholder="john@forensic.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsResetModalOpen(true)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                      size={16}
                    />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-gray-900 bg-gray-50/50 focus:bg-white"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {/* Error Notice & Unverified OTP Prompt */}
                {status.error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={15} className="shrink-0 text-red-600" />
                      <p>{status.error}</p>
                    </div>

                    {status.isUnverified && (
                      <button
                        type="button"
                        onClick={() =>
                          navigate("/verify-otp", {
                            state: { email: formData.email },
                          })
                        }
                        className="w-full mt-1.5 py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <span>Verify Your Email with OTP Now</span>
                        <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
                >
                  {status.loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <span>Sign In to Dashboard</span>
                  )}
                  {!status.loading && <ChevronRight size={16} />}
                </button>

                {/* Divider */}
                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-400 uppercase tracking-wider text-[10px]">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Sign-in */}
                <div className="flex flex-col items-center gap-1.5 w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={handleGoogleError}
                    theme="outline"
                    size="large"
                    shape="rectangular"
                    width="320"
                    text="signin_with"
                  />
                  <span className="text-[10px] text-gray-500 font-medium">
                    (Author / Reader Access)
                  </span>
                </div>

                {/* ORCID ID */}
                <div className="flex justify-center w-full">
                  <button
                    type="button"
                    onClick={handleOrcID}
                    className="flex items-center gap-2 px-4 py-2 bg-[#A6CE39] hover:bg-[#95ba32] text-white font-medium rounded-md shadow-sm transition-colors duration-200 text-xs tracking-wide"
                  >
                    <span className="w-4 h-4 bg-white text-[#A6CE39] rounded-full inline-flex items-center justify-center text-[10px] font-bold font-sans">
                      iD
                    </span>
                    Continue with ORCID iD
                  </button>
                </div>

                <p className="text-center text-gray-500 text-xs pt-1">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Register Now
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Password Modal */}
      <ResetPasswordModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        defaultEmail={formData.email}
      />
    </div>
  );
}