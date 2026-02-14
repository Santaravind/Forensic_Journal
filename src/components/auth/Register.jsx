


import { useState } from "react";
import { Fingerprint, Microscope, Scale, FileText, Mail, Phone, MapPin, User, Lock, Eye, EyeOff } from 'lucide-react';
import logos from '../assets/logoss.png'
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    specialization: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Form submitted:', formData);
  };

  const specializations = [
    'Digital Forensics',
    'Cyber Crime Investigation',
    'Forensic Accounting',
    'DNA Analysis',
    'Toxicology',
    'Ballistics',
    'Fingerprint Analysis',
    'Document Examination'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        
        {/* Decorative Header Strip */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600"></div>
        
        <div className="grid md:grid-cols-2 gap-0">
          
          {/* Left Side - Hero Section */}
          <div className="relative hidden md:block p-12 bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm">
            <div className="relative z-10 h-full flex flex-col">
              
              {/* Logo and Title */}
              <div className=" items-center space-x-3 mb-10">
                <div className="p-3 bg-linear-to-br from-yellow-300 to-red-300 rounded-2xl shadow-lg">
                  <Scale className="w-8 h-8 text-white" />
                  <img src={logos} alt="Logo image" />
                </div>
                <div className="">
                  <h1 className="text-3xl font-bold text-white text-center uppercase mt-2">Forensic Patrika</h1>
                  <p className="text-blue-200 text-sm text-center">Patrika • Official</p>
                </div>
              </div>

              {/* Hero Content */}
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                  Unveiling Truth,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                    One Case at a Time
                  </span>
                </h2>
                
                <p className="text-blue-100 text-lg mb-8">
                  Join India's premier forensic science journal. Connect with leading experts, access cutting-edge research, and contribute to the advancement of forensic science.
                </p>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <p className="text-2xl font-bold text-white">500+</p>
                    <p className="text-blue-200 text-sm">Research Papers</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <p className="text-2xl font-bold text-white">10k+</p>
                    <p className="text-blue-200 text-sm">Active Readers</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <p className="text-2xl font-bold text-white">50+</p>
                    <p className="text-blue-200 text-sm">Expert Authors</p>
                  </div>
                </div>

                {/* Forensic Icons */}
                <div className="flex space-x-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <Fingerprint className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <Microscope className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <FileText className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="p-8 md:p-12 bg-white/95 backdrop-blur-xl">
            <div className="max-w-md mx-auto">
              
              {/* Mobile Logo */}
              <div className="md:hidden flex items-center space-x-3 mb-8">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Forensic Patrika</h2>
                  <p className="text-gray-500 text-xs">Official Registration</p>
                </div>
              </div>

              {/* Form Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h3>
                <p className="text-gray-600">Join the forensic community today</p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Dr. John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="john@forensic.com"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                {/* Organization */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization/Institute
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Forensic Science Laboratory"
                      required
                    />
                  </div>
                </div>

                {/* Specialization */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <div className="relative">
                    <Microscope className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                      required
                    >
                      <option value="">Select specialization</option>
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:underline">Terms</a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] focus:ring-4 focus:ring-blue-500/50"
                >
                  Register for Forensic Patrika
                </button>

                {/* Login Link */}
                <p className="text-center text-gray-600 text-sm">
                  Already have an account?{' '}
                  <a href="#" className="text-blue-600 font-semibold hover:underline">
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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
};

export default Register;