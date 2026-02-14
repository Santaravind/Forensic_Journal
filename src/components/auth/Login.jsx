// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
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
//             Welcome Back 👋
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
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

//             <div className="flex justify-between items-center text-sm">
//               <label className="flex items-center gap-2 text-gray-600">
//                 <input type="checkbox" className="accent-blue-500" /> Remember me
//               </label>
//               <span className="text-blue-500 cursor-pointer hover:underline">Forgot Password?</span>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
//             >
//               Login
//             </button>
//           </form>

//           <p className="text-center text-gray-500 text-sm mt-6">
//             Don’t have an account? <span className="text-blue-500 cursor-pointer hover:underline">Register</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from 'react';

export default function ForensicJournalLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    alert('Login successful! Welcome back to Forensic Patrika.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Forensic Patrika
          </h1>
          <p className="text-purple-200 text-lg">
            Welcome Back!
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30">
            <p className="text-sm text-purple-300">🔬 Research • 📊 Analysis • 🎓 Education</p>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign In to Your Account</h2>
            <p className="text-gray-600">Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Sign In</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Don't have an account? <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Register here</a>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-purple-200 text-sm">
          <p>© 2024 Forensic Patrika. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}