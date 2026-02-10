
//this is our original and working code 
// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// import { FaUser, FaFileAlt, FaAddressCard, FaArrowRight, FaArrowLeft, FaUpload, FaCheckCircle } from 'react-icons/fa';

// const ResearchPaperForm = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Paper Details
//     paperTitle: '',
//     researchArea: '',
//     countryCode: '',
//     paperFile: null,
//     abstract: '',
//     keywords: '',
    
//     // Author Details
//     authorCategory: '',
//     numberOfAuthors: '1',
//     authors: [
//       {
//         name: '',
//         designation: '',
//         university: '',
//         contactNumber: '',
//         email: '',
//         isFirstAuthor: true
//       },
//       {
//         name: '',
//         designation: '',
//         university: '',
//         contactNumber: '',
//         email: '',
//         isFirstAuthor: false
//       },
//       {
//         name: '',
//         designation: '',
//         university: '',
//         contactNumber: '',
//         email: '',
//         isFirstAuthor: false
//       },
//       {
//         name: '',
//         designation: '',
//         university: '',
//         contactNumber: '',
//         email: '',
//         isFirstAuthor: false
//       },
//       {
//         name: '',
//         designation: '',
//         university: '',
//         contactNumber: '',
//         email: '',
//         isFirstAuthor: false
//       }
//     ],
    
//     // Address of Communication
//     addressLine1: '',
//     addressLine2: '',
//     cityDistrict: '',
//     state: '',
//     country: '',
//     postalCode: '',
//     agreeTerms: false,
//     captchaAnswer: '',
//     referenceCode: '',
//     specialMessage: ''
//   });

//   const researchAreas = [
//     'Computer Science',
//     'Electrical Engineering',
//     'Mechanical Engineering',
//     'Civil Engineering',
//     'Biotechnology',
//     'Medical Sciences',
//     'Physics',
//     'Chemistry',
//     'Mathematics',
//     'Economics',
//     'Business Management',
//     'Social Sciences',
//     'Arts & Humanities',
//     'Environmental Science',
//     'Other'
//   ];

//   const countryCodes = [
//     { code: '+1', country: 'USA' },
//     { code: '+91', country: 'India' },
//     { code: '+44', country: 'UK' },
//     { code: '+61', country: 'Australia' },
//     { code: '+49', country: 'Germany' },
//     { code: '+33', country: 'France' },
//     { code: '+81', country: 'Japan' },
//     { code: '+86', country: 'China' },
//     { code: '+65', country: 'Singapore' },
//     { code: '+971', country: 'UAE' }
//   ];

//   const countries = [
//     'United States',
//     'India',
//     'United Kingdom',
//     'Australia',
//     'Germany',
//     'France',
//     'Japan',
//     'China',
//     'Singapore',
//     'United Arab Emirates',
//     'Other'
//   ];

//   const handleInputChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : 
//               type === 'file' ? files[0] : value
//     }));
//   };

//   const handleAuthorChange = (index, field, value) => {
//     const updatedAuthors = [...formData.authors];
//     updatedAuthors[index] = {
//       ...updatedAuthors[index],
//       [field]: value
//     };
//     setFormData(prev => ({ ...prev, authors: updatedAuthors }));
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && (file.type === 'application/msword' || 
//                  file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
//       setFormData(prev => ({ ...prev, paperFile: file }));
//     } else {
//       alert('Please upload only .doc or .docx files');
//       toast.error("Please upload only .doc or .docx files")
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Prepare data for API submission
//     const submissionData = new FormData();
    
//     // Add all form data
//     Object.keys(formData).forEach(key => {
//       if (key === 'authors') {
//         submissionData.append(key, JSON.stringify(formData[key]));
//       } else if (key === 'paperFile' && formData[key]) {
//         submissionData.append(key, formData[key]);
//       } else {
//         submissionData.append(key, formData[key]);
//       }
//     });

//     // Here you would call your API
//     console.log('Submitting data:', Object.fromEntries(submissionData));
     
//     // Example API call:
//     // try {
//     //   const response = await fetch('your-backend-api-endpoint', {
//     //     method: 'POST',
//     //     body: submissionData
//     //   });
//     //   const result = await response.json();
//     //   console.log('Submission successful:', result);
//     // } catch (error) {
//     //   console.error('Submission failed:', error);
//     // }
//   };

//   const nextStep = () => {
//     setStep(step + 1);
//     window.scrollTo(0, 0);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//     window.scrollTo(0, 0);
//   };

//   const renderStepIndicator = () => {
//     const steps = [
//       { number: 1, icon: <FaFileAlt />, label: 'Paper Details' },
//       { number: 2, icon: <FaUser />, label: 'Author Details' },
//       { number: 3, icon: <FaAddressCard />, label: 'Address' }
//     ];

//     return (
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           {steps.map((s, index) => (
//             <React.Fragment key={s.number}>
//               <div className="flex flex-col items-center">
//                 <div className={`
//                   w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold
//                   ${step >= s.number 
//                     ? 'bg-blue-600 text-white' 
//                     : 'bg-gray-200 text-gray-500'}
//                   ${step === s.number ? 'ring-4 ring-blue-200' : ''}
//                 `}>
//                   {step > s.number ? <FaCheckCircle /> : s.icon}
//                 </div>
//                 <span className="mt-2 text-sm font-medium">{s.label}</span>
//               </div>
//               {index < steps.length - 1 && (
//                 <div className={`flex-1 h-1 mx-4 ${step > s.number ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderStep1 = () => (
//     <div className="space-y-6">
//       <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//         <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
//           <FaFileAlt className="mr-2" />
//           Important Instructions
//         </h3>
//         <p className="text-blue-700">
//           Fill in all the required details properly. The certificate will be generated based on the information you provide. 
//           Make sure your 1st Author email and mobile number are active, as notifications will be sent there.
//         </p>
//       </div>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Paper Title <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="paperTitle"
//             value={formData.paperTitle}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Full Title of Your Paper"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Research Area <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="researchArea"
//             value={formData.researchArea}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//           >
//             <option value="">Please select your research area</option>
//             {researchAreas.map(area => (
//               <option key={area} value={area}>{area}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Country Code <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="countryCode"
//             value={formData.countryCode}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//           >
//             <option value="">Select country code for mobile number</option>
//             {countryCodes.map(({ code, country }) => (
//               <option key={code} value={code}>{code} ({country})</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Upload Paper <span className="text-red-500">*</span>
//           </label>
//           <div className="mt-1 flex items-center">
//             <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
//               <span className="px-4 py-2 border border-gray-300 rounded-lg flex items-center">
//                 <FaUpload className="mr-2" />
//                 Choose File
//               </span>
//               <input
//                 type="file"
//                 className="sr-only"
//                 onChange={handleFileUpload}
//                 accept=".doc,.docx"
//               />
//             </label>
//             <span className="ml-4 text-sm text-gray-600">
//               {formData.paperFile ? formData.paperFile.name : 'No file chosen'}
//             </span>
//           </div>
//           <p className="mt-1 text-sm text-gray-500">File type: .doc or .docx only</p>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Abstract <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             name="abstract"
//             value={formData.abstract}
//             onChange={handleInputChange}
//             rows={6}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Copy your complete Abstract Here"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Keywords
//           </label>
//           <input
//             type="text"
//             name="keywords"
//             value={formData.keywords}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Keywords of your paper (comma-separated)"
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep2 = () => (
//     <div className="space-y-6">
//       <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//         <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center">
//           <FaUser className="mr-2" />
//           Author Details
//         </h3>
//         <p className="text-yellow-700">
//           NOTE: 1st author's email and mobile number must be correct. All notifications will be sent to them. 
//           If your paper/article has more than five authors, please send it to f.patrika.india@gmail.com
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Author Category <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="authorCategory"
//             value={formData.authorCategory}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//           >
//             <option value="">Please select author category</option>
//             <option value="student">Student</option>
//             <option value="researcher">Researcher</option>
//             <option value="professor">Professor</option>
//             <option value="industry_professional">Industry Professional</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Number of Authors <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="numberOfAuthors"
//             value={formData.numberOfAuthors}
//             onChange={(e) => {
//               handleInputChange(e);
//               // Reset additional authors when number changes
//               const num = parseInt(e.target.value);
//               const updatedAuthors = [...formData.authors];
//               for (let i = 1; i < updatedAuthors.length; i++) {
//                 if (i >= num) {
//                   updatedAuthors[i] = {
//                     name: '',
//                     designation: '',
//                     university: '',
//                     contactNumber: '',
//                     email: '',
//                     isFirstAuthor: false
//                   };
//                 }
//               }
//               setFormData(prev => ({ ...prev, authors: updatedAuthors }));
//             }}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//           >
//             {[1, 2, 3, 4, 5].map(num => (
//               <option key={num} value={num}>{num}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="space-y-6">
//         {formData.authors.slice(0, parseInt(formData.numberOfAuthors)).map((author, index) => (
//           <div key={index} className="bg-gray-50 p-4 rounded-lg border">
//             <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//               {index === 0 ? (
//                 <>
//                   <FaUser className="mr-2 text-green-600" />
//                   <span className="text-green-600">Author {index + 1} (1st Author)</span>
//                 </>
//               ) : (
//                 <>
//                   <FaUser className="mr-2 text-gray-600" />
//                   <span>Author {index + 1}</span>
//                 </>
//               )}
//             </h4>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name {index === 0 && <span className="text-red-500">*</span>}
//                 </label>
//                 <input
//                   type="text"
//                   value={author.name}
//                   onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Full Name"
//                   required={index === 0}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Designation {index === 0 && <span className="text-red-500">*</span>}
//                 </label>
//                 <input
//                   type="text"
//                   value={author.designation}
//                   onChange={(e) => handleAuthorChange(index, 'designation', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Designation"
//                   required={index === 0}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   University/Company {index === 0 && <span className="text-red-500">*</span>}
//                 </label>
//                 <input
//                   type="text"
//                   value={author.university}
//                   onChange={(e) => handleAuthorChange(index, 'university', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="University/Company"
//                   required={index === 0}
//                 />
//               </div>

//               {index === 0 && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Contact Number <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       value={author.contactNumber}
//                       onChange={(e) => handleAuthorChange(index, 'contactNumber', e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Contact Number"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       value={author.email}
//                       onChange={(e) => handleAuthorChange(index, 'email', e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Email Address"
//                       required
//                     />
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderStep3 = () => (
//     <div className="space-y-6">
//       <div className="bg-green-50 p-4 rounded-lg border border-green-200">
//         <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
//           <FaAddressCard className="mr-2" />
//           Address of Communication
//         </h3>
//       </div>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Address Line 1 <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="addressLine1"
//             value={formData.addressLine1}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Address Line 1"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Address Line 2
//           </label>
//           <input
//             type="text"
//             name="addressLine2"
//             value={formData.addressLine2}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Address Line 2"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               City/District <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="cityDistrict"
//               value={formData.cityDistrict}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="City/District"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               State <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="state"
//               value={formData.state}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="State"
//               required
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Country <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="country"
//               value={formData.country}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="">Select Country</option>
//               {countries.map(country => (
//                 <option key={country} value={country}>{country}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Postal Code <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="postalCode"
//               value={formData.postalCode}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Postal Code"
//               required
//             />
//           </div>
//         </div>

//         <div className="bg-gray-50 p-4 rounded-lg">
//           <div className="flex items-start">
//             <input
//               type="checkbox"
//               name="agreeTerms"
//               checked={formData.agreeTerms}
//               onChange={handleInputChange}
//               className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               required
//             />
//             <label className="ml-2 block text-sm text-gray-900">
//               Agree with Terms and Conditions <span className="text-red-500">*</span>
//             </label>
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Solve the Math Captcha: 2 + 0 = <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="captchaAnswer"
//               value={formData.captchaAnswer}
//               onChange={handleInputChange}
//               className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Your answer"
//               required
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Reference Code if Any:
//             </label>
//             <input
//               type="text"
//               name="referenceCode"
//               value={formData.referenceCode}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Reference Code"
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Special Message for Editor if Any:
//             </label>
//             <textarea
//               name="specialMessage"
//               value={formData.specialMessage}
//               onChange={handleInputChange}
//               rows={3}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Special Message"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
//             <h1 className="text-3xl font-bold">Paper Submission Form</h1>
//             <p className="mt-2 opacity-90">International Journal of Research</p>
//           </div>

//           <div className="p-6 md:p-8">
//             {renderStepIndicator()}

//             <form onSubmit={handleSubmit}>
//               {step === 1 && renderStep1()}
//               {step === 2 && renderStep2()}
//               {step === 3 && renderStep3()}

//               <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
//                 {step > 1 ? (
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center"
//                   >
//                     <FaArrowLeft className="mr-2" />
//                     Previous
//                   </button>
//                 ) : (
//                   <div></div>
//                 )}

//                 {step < 3 ? (
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center"
//                   >
//                     Next
//                     <FaArrowRight className="ml-2" />
//                   </button>
//                 ) : (
//                   <button
//                     type="submit"
//                     className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center"
//                   >
//                     <FaCheckCircle className="mr-2" />
//                     Submit Paper
//                   </button>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>

//         <div className="mt-6 text-center text-gray-600 text-sm">
//           <p>All fields marked with <span className="text-red-500">*</span> are required</p>
//           <p className="mt-2">For papers with more than 5 authors, please email to: f.patrika.india@gmail.com</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResearchPaperForm;
import React, { useState } from 'react';
import { 
  FaUser, 
  FaFileAlt, 
  FaAddressCard, 
  FaArrowRight, 
  FaArrowLeft, 
  FaUpload, 
  FaCheckCircle,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaCheck,
  FaPaperPlane
} from 'react-icons/fa';
import {toast } from 'react-hot-toast'

const ResearchPaperForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Paper Details
    paperTitle: '',
    researchArea: '',
    countryCode: '',
    mobileNumber:'',
    paperFile: null,
    abstract: '',
    keywords: '',
    
    // Author Details
    authorCategory: '',
    numberOfAuthors: '1',
    authors: [
      {
        name: '',
        designation: '',
        university: '',
        contactNumber: '',
        email: '',
        isFirstAuthor: true
      },
      {
        name: '',
        designation: '',
        university: '',
        contactNumber: '',
        email: '',
        isFirstAuthor: false
      },
      {
        name: '',
        designation: '',
        university: '',
        contactNumber: '',
        email: '',
        isFirstAuthor: false
      },
      {
        name: '',
        designation: '',
        university: '',
        contactNumber: '',
        email: '',
        isFirstAuthor: false
      },
      {
        name: '',
        designation: '',
        university: '',
        contactNumber: '',
        email: '',
        isFirstAuthor: false
      }
    ],
    
    // Address of Communication
    addressLine1: '',
    addressLine2: '',
    cityDistrict: '',
    state: '',
    country: '',
    postalCode: '',
    agreeTerms: false,
    captchaAnswer: '',
    referenceCode: '',
    specialMessage: '',
    
    // Submission ID (generated on success)
    submissionId: ''
  });

  const researchAreas = [
     "Serology",
  "Toxicology",
  "Ballistics",
  "Genetics",
  "Fingerprint",
  "Anthropology",
  "Cyber Forensics",  
  "Others",
  ];

  const countryCodes = [
    { code: '+1', country: 'USA' },
    { code: '+91', country: 'India' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Australia' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+81', country: 'Japan' },
    { code: '+86', country: 'China' },
    { code: '+65', country: 'Singapore' },
    { code: '+971', country: 'UAE' }
  ];

  const countries = [
    'United States',
    'India',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'China',
    'Singapore',
    'United Arab Emirates',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files[0] : value
    }));
  };

  const handleAuthorChange = (index, field, value) => {
    const updatedAuthors = [...formData.authors];
    updatedAuthors[index] = {
      ...updatedAuthors[index],
      [field]: value
    };
    setFormData(prev => ({ ...prev, authors: updatedAuthors }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/msword' || 
                 file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFormData(prev => ({ ...prev, paperFile: file }));
    } else {
    //   alert('Please upload only .doc or .docx files');
      toast.error("Please upload only .doc or .docx files")
    }
  };

  const validateForm = () => {
    // Basic validation for step 1
    if (step === 1) {
      if (!formData.paperTitle.trim()) {
        // alert('Please enter paper title');
        toast.error("Please enter paper title");
        return false;
      }
      if (!formData.researchArea) {
        toast.error('Please select research area');
        return false;
      }
      if (!formData.paperFile) {
        toast.error('Please upload your paper');
        return false;
      }
      if (!formData.abstract.trim()) {
        toast.error('Please enter abstract');
        return false;
      }
    }
    
    // Validation for step 2
    if (step === 2) {
      if (!formData.authorCategory) {
        toast.error('Please select author category');
        return false;
      }
      const firstAuthor = formData.authors[0];
      if (!firstAuthor.name.trim() || !firstAuthor.email.trim() || !firstAuthor.contactNumber.trim()) {
        toast.error('Please fill all required fields for the first author');
        return false;
      }
      if (!/^\S+@\S+\.\S+$/.test(firstAuthor.email)) {
        toast.error('Please enter a valid email for the first author');
        return false;
      }
    }
    
    // Validation for step 3
    if (step === 3) {
      if (!formData.agreeTerms) {
        toast.error('Please agree to the terms and conditions');
        return false;
      }
      if (formData.captchaAnswer !== '2') {
        toast.error('Please solve the captcha correctly (2 + 0 = 2)');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Prepare data for API submission
    const submissionData = new FormData();
    
    // Add all form data
    Object.keys(formData).forEach(key => {
      if (key === 'authors') {
        submissionData.append(key, JSON.stringify(formData[key]));
      } else if (key === 'paperFile' && formData[key]) {
        submissionData.append(key, formData[key]);
      } else if (key !== 'submissionId') { // Don't include submissionId in initial submission
        submissionData.append(key, formData[key]);
      }
    });

    // Simulate API call with timeout
    try {
      // Replace this with your actual API call
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({
          success: true,
          submissionId: 'SUB-' + Date.now(),
          message: 'Paper submitted successfully',
        
        }), 2000)
      );
      
      // Actual API call would look like:
      /*
      const response = await fetch('your-backend-api-endpoint', {
        method: 'POST',
        body: submissionData
      });
      const result = await response.json();
      */
      
      if (response.success) {
        // Generate a submission ID (in real app, this comes from backend)
        const submissionId = response.submissionId || 'SUB-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        setFormData(prev => ({ ...prev, submissionId }));
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateForm()) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const goToHome = () => {
    // Reset form and go to home
    window.location.href = '/'; // Or use your router
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, icon: <FaFileAlt />, label: 'Paper Details' },
      { number: 2, icon: <FaUser />, label: 'Author Details' },
      { number: 3, icon: <FaAddressCard />, label: 'Address' }
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => (
            <React.Fragment key={s.number}>
              <div className="flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold
                  ${step >= s.number 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'}
                  ${step === s.number ? 'ring-4 ring-blue-200' : ''}
                `}>
                  {step > s.number ? <FaCheckCircle /> : s.icon}
                </div>
                <span className="mt-2 text-sm font-medium">{s.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 ${step > s.number ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
          <FaFileAlt className="mr-2" />
          Important Instructions
        </h3>
        <p className="text-purple-700">
          Fill in all the required details properly. 
          The Next process will be  based on the information you provide. 
          Make sure your 1st Author email and mobile number are active, as notifications will be sent there.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paper Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="paperTitle"
            value={formData.paperTitle}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Full Title of Your Paper"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Research Area <span className="text-red-500">*</span>
          </label>
          <select
            name="researchArea"
            value={formData.researchArea}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Please select your research area</option>
            {researchAreas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country Code <span className="text-red-500">*</span>
          </label>
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select country code for mobile number</option>
            {countryCodes.map(({ code, country }) => (
              <option key={code} value={code}>{code} ({country})</option>
            ))}
          </select>
        </div> */}
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Mobile Number <span className="text-red-500">*</span>
  </label>

  <div className="flex gap-2">
    {/* Country Code */}
    <select
      name="countryCode"
      value={formData.countryCode}
      onChange={handleInputChange}
      className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      required
    >
      <option value="">Code</option>
      {countryCodes.map(({ code, country }) => (
        <option key={code} value={code}>
          {code} ({country})
        </option>
      ))}
    </select>

    {/* Mobile Number */}
    <input
      type="tel"
      name="mobileNumber"
      value={formData.mobileNumber}
      onChange={handleInputChange}
      placeholder="Enter mobile number"
      className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      required
      maxLength={10}
    />
  </div>
</div>

       

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Abstract <span className="text-red-500">*</span>
          </label>
          <textarea
            name="abstract"
            value={formData.abstract}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="The abstract is a brief summary of the main manuscript. It highlights the research topic, objective, methodology, key findings, and the significance of the study"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keywords
          </label>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Keywords of your paper (comma-separated)"
          />
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Paper <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex items-center">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
              <span className="px-4 py-2 border border-gray-300 rounded-lg flex items-center">
                <FaUpload className="mr-2" />
                Choose File
              </span>
              <input
                type="file"
                className="sr-only"
                onChange={handleFileUpload}
                accept=".doc,.docx"
              />
            </label>
            <span className="ml-4 text-sm text-gray-600">
              {formData.paperFile ? formData.paperFile.name : 'No file chosen'}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">File type: .doc or .docx only</p>
        </div>
      </div>
    </div>
  );

//   Auther section 
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center">
          <FaUser className="mr-2" />
          Author Details
        </h3>
        <p className="text-red-700">
          NOTE: 1st author's email and mobile number must be correct. All notifications will be sent to them. 
          If your paper/article has more than five authors, please send it to f.patrika.india@gmail.com
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author Category <span className="text-red-500">*</span>
          </label>
          <select
            name="authorCategory"
            value={formData.authorCategory}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Please select author category</option>
            <option value="student">Student</option>
            <option value="researcher">Researcher</option>
            <option value="professor">Professor</option>
            <option value="industry_professional">Industry Professional</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Authors <span className="text-red-500">*</span>
          </label>
          <select
            name="numberOfAuthors"
            value={formData.numberOfAuthors}
            onChange={(e) => {
              handleInputChange(e);
              const num = parseInt(e.target.value);
              const updatedAuthors = [...formData.authors];
              for (let i = 1; i < updatedAuthors.length; i++) {
                if (i >= num) {
                  updatedAuthors[i] = {
                    name: '',
                    designation: '',
                    university: '',
                    contactNumber: '',
                    email: '',
                    isFirstAuthor: false
                  };
                }
              }
              setFormData(prev => ({ ...prev, authors: updatedAuthors }));
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {formData.authors.slice(0, parseInt(formData.numberOfAuthors)).map((author, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              {index === 0 ? (
                <>
                  <FaUser className="mr-2 text-green-600" />
                  <span className="text-green-600">Author {index + 1} (1st Author)</span>
                </>
              ) : (
                <>
                  <FaUser className="mr-2 text-gray-600" />
                  <span>Author {index + 1}</span>
                </>
              )}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name {index === 0 && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={author.name}
                  onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Full Name"
                  required={index === 0}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation {index === 0 && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={author.designation}
                  onChange={(e) => handleAuthorChange(index, 'designation', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Designation"
                  required={index === 0}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  University/Company {index === 0 && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={author.university}
                  onChange={(e) => handleAuthorChange(index, 'university', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="University/Company"
                  required={index === 0}
                />
              </div>

              {index === 0 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={author.contactNumber}
                      onChange={(e) => handleAuthorChange(index, 'contactNumber', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contact Number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={author.email}
                      onChange={(e) => handleAuthorChange(index, 'email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
          <FaAddressCard className="mr-2" />
          Address of Communication
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Address Line 1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2
          </label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Address Line 2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City/District <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cityDistrict"
              value={formData.cityDistrict}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="City/District"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="State"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Postal Code"
              required
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label className="ml-2 block text-sm text-gray-900">
              Agree with Terms and Conditions <span className="text-red-500">*</span>
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Solve the Math Captcha: 2 + 0 = <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="captchaAnswer"
              value={formData.captchaAnswer}
              onChange={handleInputChange}
              className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your answer"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reference Code if Any:
            </label>
            <input
              type="text"
              name="referenceCode"
              value={formData.referenceCode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Reference Code"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Message for Editor if Any:
            </label>
            <textarea
              name="specialMessage"
              value={formData.specialMessage}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Special Message"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccessPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
            <div className="w-24 h-24 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <FaCheck className="text-5xl" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Submission Successful!</h1>
            <p className="text-xl opacity-90">Your research paper has been submitted successfully</p>
          </div>

          {/* Success Content */}
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Congratulations, {formData.authors[0].name || 'Author'}!
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Your paper "<span className="font-semibold text-blue-600">{formData.paperTitle}</span>" 
                has been successfully submitted for review.
              </p>
              
              {/* Confetti Effect */}
              <div className="flex justify-center space-x-2 mb-8">
                {['🎉', '✨', '🎊', '👏', '📝', '🎓'].map((emoji, i) => (
                  <span key={i} className="text-3xl animate-bounce" style={{animationDelay: `${i * 0.1}s`}}>
                    {emoji}
                  </span>
                ))}
              </div>
            </div>

            {/* Submission Details */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaPaperPlane className="mr-3 text-blue-600" />
                Submission Details
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-40">Submission ID:</span>
                  <span className="font-mono text-lg font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded">
                    {formData.submissionId}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-40">Paper Title:</span>
                  <span className="text-gray-800">{formData.paperTitle}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-40">Research Area:</span>
                  <span className="text-gray-800">{formData.researchArea}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-40">Submitted On:</span>
                  <span className="text-gray-800">{new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What Happens Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <span className="font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Initial Review</h4>
                  <p className="text-sm text-gray-600">Your paper will undergo initial screening within 3-5 working days</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <span className="font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Peer Review</h4>
                  <p className="text-sm text-gray-600">Expert review process may take 2-4 weeks</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                    <span className="font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Notification</h4>
                  <p className="text-sm text-gray-600">You'll receive email updates at {formData.authors[0].email}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email us at</p>
                    <p className="font-medium">f.patrika.india@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Number</p>
                    <p className="font-medium">+91-XXXXXXXXXX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={goToHome}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <FaHome className="mr-3" />
                Go to Home Page
              </button>
              <button
                onClick={() => window.print()}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Print Confirmation
              </button>
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                Thank you for submitting to International Journal of Research. 
                <span className="block mt-1 text-sm">
                  You will receive a confirmation email shortly. Keep your submission ID <strong>{formData.submissionId}</strong> for future reference.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isSubmitted) {
    return renderSuccessPage();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h1 className="text-3xl font-bold text-center">Paper Submission Form</h1>
            <p className="mt-2 opacity-90 text-center text-2xl">Forensic Patrika(A Journal of Forensic Science)</p>
          </div>

          <div className="p-6 md:p-8">
            {renderStepIndicator()}

            <form onSubmit={handleSubmit}>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    <FaArrowLeft className="mr-2" />
                    Previous
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Next
                    <FaArrowRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 flex items-center transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="mr-2" />
                        Submit Paper
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>All fields marked with <span className="text-red-500">*</span> are required</p>
          <p className="mt-2">For papers with more than 5 authors, please email to: f.patrika.india@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default ResearchPaperForm;