// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] relative overflow-hidden">
//       {/* LIGHT BACKGROUND */}
//       <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f1f5f9] to-[#e2e8f0]"></div>

//       {/* soft light orbs */}
//       <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
//       <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl"></div>
//       <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>

//       {/* card */}
//       <div className="relative w-full max-w-lg p-[2px] rounded-3xl bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl">
//           <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-2">
//             Forensic Patrika
//           </h2>
//           <p className="text-center text-gray-500 mb-8">
//             Premium Secure Registration
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="text-sm text-gray-600">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your full name"
//                 className="w-full mt-2 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition"
//               />
//             </div>

//             <div>
//               <label className="text-sm text-gray-600">Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className="w-full mt-2 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none transition"
//               />
//             </div>

//             <div className="relative">
//               <label className="text-sm text-gray-600">Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter password"
//                 className="w-full mt-2 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition"
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-[38px] cursor-pointer text-gray-500 hover:text-blue-500"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </span>
//             </div>

//             <div>
//               <label className="text-sm text-gray-600">Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm password"
//                 className="w-full mt-2 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
//             >
//               Create Account
//             </button>
//           </form>

//           <p className="text-center text-gray-500 text-sm mt-6">
//             Already registered? <span className="text-blue-500 cursor-pointer hover:underline">Login</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }






// export default function Register() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     institution: '',
//     designation: '',
//     specialization: '',
//     experience: '',
//     researchInterest: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     alert('Registration successful! Welcome to Forensic Patrika.');
//   };

//   return (
// <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
//               <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//             </div>
//           </div>
//           <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
//             Forensic Patrika
//           </h1>
//           <p className="text-purple-200 text-lg">
//             Join India's Premier Forensic Science Journal
//           </p>
//           <div className="mt-4 inline-block px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30">
//             <p className="text-sm text-purple-300">🔬 Research • 📊 Analysis • 🎓 Education</p>
//           </div>
//         </div>

//         {/* Registration Form Card */}
//         <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10">
//           <div className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-2">Register Your Account</h2>
//             <p className="text-gray-600">Fill in your details to become a part of our forensic community</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Information Section */}
//             <div className="border-l-4 border-blue-500 pl-4 mb-6">
//               <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Full Name */}
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="Dr. Rajesh Kumar"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="your.email@example.com"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Phone */}
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="+91 98765 43210"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Institution */}
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Institution/Organization <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     name="institution"
//                     value={formData.institution}
//                     onChange={handleChange}
//                     className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="AIIMS Delhi"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Professional Information Section */}
//             <div className="border-l-4 border-cyan-500 pl-4 mb-6 mt-8">
//               <h3 className="text-lg font-semibold text-gray-700 mb-4">Professional Details</h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Designation */}
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Designation <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="designation"
//                   value={formData.designation}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
//                   required
//                 >
//                   <option value="">Select Designation</option>
//                   <option value="professor">Professor</option>
//                   <option value="associate-professor">Associate Professor</option>
//                   <option value="assistant-professor">Assistant Professor</option>
//                   <option value="researcher">Researcher</option>
//                   <option value="forensic-expert">Forensic Expert</option>
//                   <option value="lab-director">Lab Director</option>
//                   <option value="student">Student</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               {/* Specialization */}
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Specialization <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="specialization"
//                   value={formData.specialization}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
//                   required
//                 >
//                   <option value="">Select Specialization</option>
//                   <option value="forensic-medicine">Forensic Medicine</option>
//                   <option value="forensic-pathology">Forensic Pathology</option>
//                   <option value="forensic-toxicology">Forensic Toxicology</option>
//                   <option value="forensic-serology">Forensic Serology</option>
//                   <option value="forensic-anthropology">Forensic Anthropology</option>
//                   <option value="cyber-forensics">Cyber Forensics</option>
//                   <option value="dna-analysis">DNA Analysis</option>
//                   <option value="ballistics">Ballistics</option>
//                   <option value="document-examination">Document Examination</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               {/* Experience */}
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Years of Experience
//                 </label>
//                 <input
//                   type="number"
//                   name="experience"
//                   value={formData.experience}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="5"
//                   min="0"
//                 />
//               </div>

//               {/* Research Interest */}
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Primary Research Interest
//                 </label>
//                 <input
//                   type="text"
//                   name="researchInterest"
//                   value={formData.researchInterest}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="DNA Profiling"
//                 />
//               </div>
//             </div>

//             {/* Security Section */}
//             <div className="border-l-4 border-purple-500 pl-4 mb-6 mt-8">
//               <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Security</h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Password */}
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Password <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Terms and Conditions */}
//             <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 required
//               />
//               <label htmlFor="terms" className="text-sm text-gray-700">
//                 I agree to the <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Privacy Policy</a> of Forensic Patrika
//               </label>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
//               >
//                 <span>Complete Registration</span>
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </button>
//             </div>

//             {/* Login Link */}
//             <div className="text-center pt-4">
//               <p className="text-gray-600">
//                 Already have an account? <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Login here</a>
//               </p>
//             </div>
//           </form>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-8 text-purple-200 text-sm">
//           <p>© 2024 Forensic Patrika. All rights reserved.</p>
//         </div>
//       </div>
//     </div>
//   );
// }




// deepseek wala page
import { useState } from "react";
import { Fingerprint, Microscope, Scale, FileText, Mail, Phone, MapPin, User, Lock, Eye, EyeOff } from 'lucide-react';

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
              <div className="flex items-center space-x-3 mb-12">
                <div className="p-3 bg-gradient-to-br from-yellow-400 to-red-500 rounded-2xl shadow-lg">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Forensic</h1>
                  <p className="text-blue-200 text-sm">Patrika • Official</p>
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