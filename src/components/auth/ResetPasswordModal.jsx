import React, { useState, useEffect } from "react";
import {
  Lock,
  Mail,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  Clock,
  RefreshCw,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { authService } from "../../services/authService";

export default function ResetPasswordModal({ isOpen, onClose, defaultEmail = "", onComplete }) {
  const [step, setStep] = useState("REQUEST_EMAIL"); // 'REQUEST_EMAIL' | 'VERIFY_AND_RESET'
  const [email, setEmail] = useState(() => {
    return defaultEmail || sessionStorage.getItem("reset_email") || "";
  });
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  // Timers: 10 minutes total OTP validity, 60 seconds resend cooldown
  const [timer, setTimer] = useState(600);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (defaultEmail) {
      setEmail(defaultEmail);
    }
  }, [defaultEmail]);

  // 10-minute countdown for OTP validity
  useEffect(() => {
    let interval;
    if (step === "VERIFY_AND_RESET" && timer > 0) {
      interval = setInterval(() => setTimer((t) => Math.max(0, t - 1)), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // 60-second cooldown timer for resending OTP
  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => setResendCooldown((c) => Math.max(0, c - 1)), 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Step 1: Request Password Reset OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please provide a valid registered email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await authService.forgotPassword(email);
      sessionStorage.setItem("reset_email", email);
      setStep("VERIFY_AND_RESET");
      setTimer(600);
      setResendCooldown(60);
      setOtp("");
      toast.success(
        res?.message || "Password reset OTP sent! Please check your email inbox."
      );
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to send password reset code. Please check your email and try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Set New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length < 6) {
      setError("Please enter the complete 6-digit OTP code.");
      return;
    }

    if (timer <= 0) {
      setError("OTP code has expired. Please request a new one.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await authService.resetPassword({
        email,
        otp: otp.trim(),
        newPassword,
      });

      toast.success(
        res?.message || "Password updated successfully! You can now log in."
      );
      sessionStorage.removeItem("reset_email");
      handleClose();
      if (onComplete) onComplete();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to reset password. Please check your OTP and try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || resending) return;

    setResending(true);
    setError("");
    try {
      const res = await authService.forgotPassword(email);
      setTimer(600);
      setResendCooldown(60);
      toast.success(res?.message || "A fresh 6-digit OTP code has been sent to your email.");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to resend OTP. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setResending(false);
    }
  };

  const handleClose = () => {
    setError("");
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-6 sm:p-8">
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            {step === "REQUEST_EMAIL" ? <Lock size={24} /> : <KeyRound size={24} />}
          </div>
          <h3 className="text-xl font-bold text-gray-900 font-serif">
            {step === "REQUEST_EMAIL" ? "Reset Password" : "Enter OTP & New Password"}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {step === "REQUEST_EMAIL"
              ? "Enter your registered email to receive a 6-digit verification code."
              : `A 6-digit code was sent to ${email}. Code valid for ${formatTimer(timer)}.`}
          </p>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs mb-4">
            <AlertCircle size={15} className="shrink-0 text-red-500" />
            <p>{error}</p>
          </div>
        )}

        {/* Step 1: Request Email Form */}
        {step === "REQUEST_EMAIL" ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="author@forensic.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all bg-gray-50/50 text-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : null}
              <span>{loading ? "Sending Reset Code..." : "Send Reset Code"}</span>
            </button>
          </form>
        ) : (
          /* Step 2: Verify OTP & Reset Password Form */
          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* Recipient info & Timer Banner */}
            <div className="flex items-center justify-between p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900">
              <div className="truncate mr-2">
                <span className="font-semibold">{email}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0 font-mono font-bold text-blue-700">
                <Clock size={13} className={timer <= 60 ? "text-red-500 animate-pulse" : ""} />
                <span className={timer <= 60 ? "text-red-600" : ""}>{formatTimer(timer)}</span>
              </div>
            </div>

            {/* 6-Digit OTP Code Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                6-Digit Verification Code
              </label>
              <div className="relative">
                <KeyRound
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-base tracking-widest font-mono text-center border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all bg-gray-50/50 text-gray-900 font-bold"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  required
                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all bg-gray-50/50 text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  required
                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all bg-gray-50/50 text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex="-1"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || otp.length < 6 || timer === 0}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : null}
              <span>{loading ? "Updating Password..." : "Reset Password"}</span>
            </button>

            {/* Action Links: Change Email / Resend Code */}
            <div className="flex items-center justify-between text-xs pt-2">
              <button
                type="button"
                onClick={() => setStep("REQUEST_EMAIL")}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={13} />
                <span>Change Email</span>
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || resending}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 disabled:text-gray-400 font-medium transition-colors"
              >
                <RefreshCw size={12} className={resending ? "animate-spin" : ""} />
                <span>
                  {resending
                    ? "Sending..."
                    : resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Resend Code"}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

