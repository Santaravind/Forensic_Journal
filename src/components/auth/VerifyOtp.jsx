import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  ArrowLeft,
  Loader2,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { authService } from "../../services/authService";
import logos from "../assets/logoss.png";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve email from route state or sessionStorage
  const [email, setEmail] = useState(() => {
    return (
      location.state?.email ||
      sessionStorage.getItem("pending_verification_email") ||
      ""
    );
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editableEmail, setEditableEmail] = useState(email);

  // Timers
  const [expirySeconds, setExpirySeconds] = useState(600); // 10 minutes
  const [cooldownSeconds, setCooldownSeconds] = useState(60); // 60s resend cooldown

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputRefs = useRef([]);

  // Sync email to sessionStorage
  useEffect(() => {
    if (email) {
      sessionStorage.setItem("pending_verification_email", email);
      setEditableEmail(email);
    }
  }, [email]);

  // Overall 10-minute expiry countdown
  useEffect(() => {
    if (expirySeconds <= 0) return;
    const interval = setInterval(() => {
      setExpirySeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [expirySeconds]);

  // 60-second Resend button cooldown
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const interval = setInterval(() => {
      setCooldownSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownSeconds]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (index, value) => {
    // Only accept numeric inputs
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Take the last entered character if multiple typed
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setErrorMessage("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      newOtp[i] = digit;
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = digit;
      }
    });
    setOtp(newOtp);
    setErrorMessage("");

    // Focus on the next empty or last input
    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSaveEmail = (e) => {
    e.preventDefault();
    if (!editableEmail || !editableEmail.includes("@")) {
      toast.error("Please provide a valid email address.");
      return;
    }
    setEmail(editableEmail);
    setIsEditingEmail(false);
    toast.success("Verification email updated.");
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (!email) {
      setErrorMessage("No email specified. Please enter your email.");
      return;
    }

    if (otpCode.length < 6) {
      setErrorMessage("Please enter the complete 6-digit OTP code.");
      return;
    }

    if (expirySeconds <= 0) {
      setErrorMessage("OTP has expired. Please request a new OTP code.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await authService.verifyOtp(email, otpCode);
      toast.success(
        response?.message || "Email verified successfully! You can now log in."
      );
      sessionStorage.removeItem("pending_verification_email");
      navigate("/login");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid OTP code or verification failed. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldownSeconds > 0 || resending) return;

    if (!email) {
      toast.error("Please enter a valid email address first.");
      return;
    }

    setResending(true);
    setErrorMessage("");

    try {
      const response = await authService.resendOtp(email);
      toast.success(response?.message || "A new 6-digit OTP has been sent!");
      setCooldownSeconds(60);
      setExpirySeconds(600); // reset 10-minute timer
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Failed to resend OTP. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-950 to-purple-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Glow Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[90px] opacity-25 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[90px] opacity-25 animate-pulse" />
      </div>

      <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden p-8 sm:p-10 text-white">
        {/* Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-yellow-400 via-red-500 to-purple-600" />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-white/10 rounded-2xl border border-white/20 p-2.5 mb-4 shadow-lg flex items-center justify-center">
            <img
              src={logos}
              alt="Forensic Patrika"
              className="w-full h-full object-contain filter brightness-110"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-400/30">
            <ShieldCheck size={14} /> Security Verification
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-wide text-white">
            Verify Your Email
          </h2>
          <p className="text-sm text-blue-200/80 mt-2 max-w-sm">
            We have dispatched a 6-digit security authorization code to verify your account credentials.
          </p>
        </div>

        {/* Recipient Email Display / Edit */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 backdrop-blur-md">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="p-2 bg-blue-600/30 rounded-xl text-blue-300">
                <Mail size={18} />
              </div>
              <div className="truncate">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Recipient Address
                </p>
                {isEditingEmail ? (
                  <form onSubmit={handleSaveEmail} className="flex items-center gap-2 mt-1">
                    <input
                      type="email"
                      value={editableEmail}
                      onChange={(e) => setEditableEmail(e.target.value)}
                      className="px-2.5 py-1 text-sm bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter email"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingEmail(false)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <p className="text-sm font-medium text-white truncate">
                    {email || <span className="text-rose-400 italic">No email set</span>}
                  </p>
                )}
              </div>
            </div>

            {!isEditingEmail && (
              <button
                type="button"
                onClick={() => setIsEditingEmail(true)}
                className="text-xs text-blue-300 hover:text-blue-100 font-medium underline underline-offset-2 transition-colors shrink-0"
              >
                Change
              </button>
            )}
          </div>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          {/* 6-Digit OTP Segmented Input */}
          <div>
            <label className="block text-center text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Enter 6-Digit Code
            </label>
            <div
              className="flex justify-center gap-2 sm:gap-3"
              onPaste={handlePaste}
            >
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-bold rounded-xl border bg-white/10 text-white focus:outline-none transition-all duration-200 ${
                    digit
                      ? "border-blue-400 bg-blue-600/20 shadow-lg shadow-blue-500/20 scale-105"
                      : "border-white/20 focus:border-blue-400 focus:bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Timers & Status Bar */}
          <div className="flex items-center justify-between text-xs text-slate-300 px-1">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className={expirySeconds <= 60 ? "text-rose-400 animate-pulse" : "text-blue-300"} />
              <span>
                Expires in:{" "}
                <span className={`font-mono font-bold ${expirySeconds <= 60 ? "text-rose-400" : "text-white"}`}>
                  {formatTime(expirySeconds)}
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={handleResend}
              disabled={cooldownSeconds > 0 || resending}
              className="flex items-center gap-1 text-blue-300 hover:text-blue-100 disabled:text-slate-500 disabled:cursor-not-allowed font-medium transition-colors"
            >
              <RefreshCw size={13} className={resending ? "animate-spin" : ""} />
              {resending
                ? "Sending..."
                : cooldownSeconds > 0
                ? `Resend in ${cooldownSeconds}s`
                : "Resend Code"}
            </button>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs">
              <AlertCircle size={16} className="shrink-0 text-rose-400" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Action Buttons */}
          <button
            type="submit"
            disabled={loading || otp.join("").length < 6 || expirySeconds <= 0}
            className="w-full py-3.5 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg transform transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <KeyRound size={18} />
            )}
            <span>{loading ? "Verifying Token..." : "Confirm & Activate Account"}</span>
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs text-blue-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
