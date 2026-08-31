// import { useRef, useState, useEffect } from "react";

// const CLOUDINARY_CLOUD_NAME = "j9ksfgqo";
// const CLOUDINARY_UPLOAD_PRESET = "forensic";
// const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwkfSpVPAl6Bkot8iAbjUdQP44D67HlRW4Gcy1O3H7jviN1f5qheAic93H_n9cZa8g3/exec";

// const MAX_FILE_BYTES = 5 * 1024 * 1024;

// const APPLICANT_CATEGORIES = [
//   "Student & Research Scholar",
//   "Forensic Scientist",
//   "Crime Scene Investigator",
//   "Scientific Officer",
//   "Professor & Academician",
//   "Laboratory Professional",
//   "Police & Investigation Officer",
//   "Researcher",
//   "Healthcare & Medico-Legal Professional",
//   "Other",
// ];

// const initialForm = {
//   fullName: "",
//   email: "",
//   phone: "",
//   dob: "",
//   linkedin: "",
//   role: "Intern",
//   category: APPLICANT_CATEGORIES[0],
//   about: "",
// };

// function wordCount(text) {
//   return text.trim().length ? text.trim().split(/\s+/).length : 0;
// }

// function FileInput({ label, accept, hint, file, onSelect, error }) {
//   const inputRef = useRef(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   useEffect(() => {
//     if (file && file.type.startsWith("image/")) {
//       const url = URL.createObjectURL(file);
//       setPreviewUrl(url);
//       return () => URL.revokeObjectURL(url);
//     }
//     setPreviewUrl(null);
//   }, [file]);

//   return (
//     <div>
//       <label className="block text-sm font-medium text-slate-700 mb-1">
//         {label}
//       </label>
//       <div
//         onClick={() => inputRef.current?.click()}
//         className={`relative flex items-center gap-4 rounded-lg border-2 border-dashed p-4 cursor-pointer transition-colors ${error
//           ? "border-red-300 bg-red-50/50 hover:bg-red-50"
//           : "border-slate-300 bg-slate-50/50 hover:bg-slate-100/80"
//           }`}
//       >
//         {previewUrl ? (
//           <img
//             src={previewUrl}
//             alt="Preview"
//             className="h-12 w-12 rounded-md object-cover border border-slate-200"
//           />
//         ) : (
//           <div className="h-12 w-12 rounded-md bg-slate-200/60 flex items-center justify-center text-slate-500 font-medium text-xs">
//             {file ? "FILE" : "UPLOAD"}
//           </div>
//         )}
//         <div className="flex-1 min-w-0">
//           <p className="text-sm font-medium text-slate-900 truncate">
//             {file ? file.name : "Click to select a file"}
//           </p>
//           <p className="text-xs text-slate-500 mt-0.5">{hint}</p>
//         </div>
//         <input
//           ref={inputRef}
//           type="file"
//           accept={accept}
//           className="hidden"
//           onChange={(e) => onSelect(e.target.files?.[0] || null)}
//         />
//       </div>
//       {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
//     </div>
//   );
// }

// function Field({ label, id, required = false, children }) {
//   return (
//     <div>
//       <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       {children}
//     </div>
//   );
// }

// const inputClass =
//   "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors";

// export default function Career() {
//   const [form, setForm] = useState(initialForm);
//   const [photo, setPhoto] = useState(null);
//   const [idProof, setIdProof] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [status, setStatus] = useState("idle");
//   const [statusMessage, setStatusMessage] = useState("");

//   const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

//   const aboutWords = wordCount(form.about);

//   function validate() {
//     const e = {};
//     if (!form.fullName.trim()) e.fullName = "Full name is required.";
//     if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email address.";
//     if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone)) e.phone = "Please enter a valid phone number.";
//     if (!form.dob) e.dob = "Date of birth is required.";
//     if (form.linkedin && !/linkedin\.com/i.test(form.linkedin)) {
//       e.linkedin = "Please enter a valid LinkedIn URL.";
//     }
//     if (aboutWords > 100) {
//       e.about = `Please keep this section between 30 and 100 words (currently ${aboutWords}).`;
//     }
//     if (!photo) e.photo = "Please attach a profile photo.";
//     else if (photo.size > MAX_FILE_BYTES) e.photo = "Photo must be smaller than 5MB.";
//     else if (!photo.type.startsWith("image/")) e.photo = "Photo must be an image file.";

//     if (!idProof) e.idProof = "Please attach an identity proof document.";
//     else if (idProof.size > MAX_FILE_BYTES) e.idProof = "Identity proof must be smaller than 5MB.";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   }

//   async function uploadToCloudinary(file) {
//     const body = new FormData();
//     body.append("file", file);
//     body.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
//     const res = await fetch(
//       `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
//       { method: "POST", body }
//     );
//     if (!res.ok) {
//       const errBody = await res.text().catch(() => "");
//       throw new Error(`File upload failed (${res.status}). ${errBody}`);
//     }
//     const data = await res.json();
//     return data.secure_url;
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!validate()) {
//       setStatus("error");
//       setStatusMessage("Please fix the highlighted fields below before submitting.");
//       return;
//     }

//     try {
//       setStatus("uploading");
//       setStatusMessage("Uploading attachments...");
//       const [photoUrl, idProofUrl] = await Promise.all([
//         uploadToCloudinary(photo),
//         uploadToCloudinary(idProof),
//       ]);

//       setStatus("submitting");
//       setStatusMessage("Submitting application...");

//       const res = await fetch(GOOGLE_SCRIPT_URL, {
//         method: "POST",
//         headers: { "Content-Type": "text/plain;charset=utf-8" },
//         body: JSON.stringify({
//           submittedAt: new Date().toISOString(),
//           ...form,
//           photoUrl,
//           idProofUrl,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error(`Server responded with ${res.status}.`);
//       }

//       let result;
//       try {
//         result = await res.json();
//       } catch {
//         throw new Error("Unexpected response from server.");
//       }

//       if (result.status !== "ok") {
//         throw new Error(result.message || "Submission was rejected by the server.");
//       }

//       setStatus("done");
//       setStatusMessage("Your application has been successfully submitted.");
//       setForm(initialForm);
//       setPhoto(null);
//       setIdProof(null);
//       setErrors({});
//     } catch (err) {
//       console.error("Application submission failed:", err);
//       setStatus("error");
//       setStatusMessage(
//         err.message || "An error occurred while submitting your application. Please try again."
//       );
//     }
//   }

//   if (status === "done") {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
//         <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
//           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
//             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <h2 className="text-xl font-semibold text-slate-900 mb-2">Application Submitted</h2>
//           <p className="text-sm text-slate-600 mb-6">{statusMessage}</p>
//           <button
//             onClick={() => setStatus("idle")}
//             className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
//           >
//             Submit Another Response
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-10">
//           <div className="border-b border-slate-200 pb-6 mb-8">
//             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
//               Application for Internship / Volunteer Position
//             </h1>
//             <p className="mt-2 text-sm text-slate-600 leading-relaxed">
//               Join the Forensic Patrika team. Please complete the form below to apply for upcoming internship and volunteer opportunities.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6" noValidate>
//             <div className="grid sm:grid-cols-2 gap-6">
//               <Field label="Full Name" id="fullName" required>
//                 <input
//                   id="fullName"
//                   type="text"
//                   className={inputClass}
//                   value={form.fullName}
//                   onChange={update("fullName")}
//                   placeholder="e.g. Jane Doe"
//                 />
//                 {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
//               </Field>

//               <Field label="Date of Birth" id="dob" required>
//                 <input
//                   id="dob"
//                   type="date"
//                   className={inputClass}
//                   value={form.dob}
//                   onChange={update("dob")}
//                 />
//                 {errors.dob && <p className="text-xs text-red-600 mt-1">{errors.dob}</p>}
//               </Field>

//               <Field label="Email Address" id="email" required>
//                 <input
//                   id="email"
//                   type="email"
//                   className={inputClass}
//                   value={form.email}
//                   onChange={update("email")}
//                   placeholder="jane.doe@example.com"
//                 />
//                 {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
//               </Field>

//               <Field label="Phone Number" id="phone" required>
//                 <input
//                   id="phone"
//                   type="tel"
//                   className={inputClass}
//                   value={form.phone}
//                   onChange={update("phone")}
//                   placeholder="+91 98765 43210"
//                 />
//                 {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
//               </Field>

//               <Field label="LinkedIn Profile" id="linkedin">
//                 <input
//                   id="linkedin"
//                   type="url"
//                   className={inputClass}
//                   value={form.linkedin}
//                   onChange={update("linkedin")}
//                   placeholder="https://linkedin.com/in/username"
//                 />
//                 {errors.linkedin && <p className="text-xs text-red-600 mt-1">{errors.linkedin}</p>}
//               </Field>

//               <Field label="Applying As" id="role" required>
//                 <select id="role" className={inputClass} value={form.role} onChange={update("role")}>
//                   <option value="Intern">Intern</option>
//                   <option value="Volunteer">Volunteer</option>
//                 </select>
//               </Field>
//             </div>

//             <Field label="Professional Category" id="category" required>
//               <select id="category" className={inputClass} value={form.category} onChange={update("category")}>
//                 {APPLICANT_CATEGORIES.map((c) => (
//                   <option key={c} value={c}>{c}</option>
//                 ))}
//               </select>
//             </Field>

//             <Field label="Professional career/studies" id="about" >
//               <textarea
//                 id="about"
//                 rows={4}
//                 className={inputClass}
//                 value={form.about}
//                 onChange={update("about")}
//                 placeholder="Provide a summary of your background and interest in forensic science (30–100 words)..."
//               />
//               <div className="flex justify-between items-center mt-1.5">
//                 <span className="text-xs text-red-600">{errors.about || ""}</span>
//                 <span
//                   className={`text-xs ${aboutWords < 30 || aboutWords > 100 ? "text-amber-600 font-medium" : "text-slate-500"
//                     }`}
//                 >
//                   {aboutWords} / 100 words
//                 </span>
//               </div>
//             </Field>

//             <div className="grid sm:grid-cols-2 gap-6 pt-2">
//               <FileInput
//                 label="Profile Photograph"
//                 accept="image/*"
//                 hint="JPG or PNG format, up to 5MB"
//                 file={photo}
//                 onSelect={setPhoto}
//                 error={errors.photo}
//               />
//               <FileInput
//                 label="Identity Proof"
//                 accept="image/*,application/pdf"
//                 hint="Government ID, Student ID, or Passport (up to 5MB)"
//                 file={idProof}
//                 onSelect={setIdProof}
//                 error={errors.idProof}
//               />
//             </div>

//             {status === "error" && (
//               <div className="rounded-md bg-red-50 p-4 border border-red-200">
//                 <p className="text-sm text-red-700">{statusMessage}</p>
//               </div>
//             )}

//             <div className="pt-4 border-t border-slate-200">
//               <button
//                 type="submit"
//                 disabled={status === "uploading" || status === "submitting"}
//                 className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 {status === "uploading" || status === "submitting" ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                     </svg>
//                     {statusMessage}
//                   </span>
//                 ) : (
//                   "Submit Application"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useRef, useState, useEffect } from "react";
import logo from "../../assets/logoss.png"
const CLOUDINARY_CLOUD_NAME = "j9ksfgqo";
const CLOUDINARY_UPLOAD_PRESET = "forensic";
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwkfSpVPAl6Bkot8iAbjUdQP44D67HlRW4Gcy1O3H7jviN1f5qheAic93H_n9cZa8g3/exec";

const MAX_FILE_BYTES = 5 * 1024 * 1024;

const APPLICANT_CATEGORIES = [
  "Student & Research Scholar",
  "Forensic Scientist",
  "Crime Scene Investigator",
  "Scientific Officer",
  "Professor & Academician",
  "Laboratory Professional",
  "Police & Investigation Officer",
  "Researcher",
  "Healthcare & Medico-Legal Professional",
  "Other",
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  linkedin: "",
  role: "Intern",
  category: APPLICANT_CATEGORIES[0],
  about: "",
};

function wordCount(text) {
  return text.trim().length ? text.trim().split(/\s+/).length : 0;
}

function FileInput({ label, accept, hint, file, onSelect, error }) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [file]);

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        className={`relative flex items-center gap-4 rounded-lg border-2 border-dashed p-4 cursor-pointer transition-colors ${
          error
            ? "border-red-300 bg-red-50/50 hover:bg-red-50"
            : "border-slate-300 bg-slate-50/50 hover:bg-slate-100/80"
        }`}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="h-12 w-12 rounded-md object-cover border border-slate-200"
          />
        ) : (
          <div className="h-12 w-12 rounded-md bg-slate-200/60 flex items-center justify-center text-slate-500 font-medium text-xs">
            {file ? "FILE" : "UPLOAD"}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 truncate">
            {file ? file.name : "Click to select a file"}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">{hint}</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onSelect(e.target.files?.[0] || null)}
        />
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function Field({ label, id, required = false, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors";

export default function Career() {
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const aboutWords = wordCount(form.about);

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone)) e.phone = "Please enter a valid phone number.";
    if (!form.dob) e.dob = "Date of birth is required.";
    if (form.linkedin && !/linkedin\.com/i.test(form.linkedin)) {
      e.linkedin = "Please enter a valid LinkedIn URL.";
    }
    if (aboutWords > 100) {
      e.about = `Please keep this section between 30 and 100 words (currently ${aboutWords}).`;
    }
    if (!photo) e.photo = "Please attach a profile photo.";
    else if (photo.size > MAX_FILE_BYTES) e.photo = "Photo must be smaller than 5MB.";
    else if (!photo.type.startsWith("image/")) e.photo = "Photo must be an image file.";

    if (!idProof) e.idProof = "Please attach an identity proof document.";
    else if (idProof.size > MAX_FILE_BYTES) e.idProof = "Identity proof must be smaller than 5MB.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function uploadToCloudinary(file) {
    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body }
    );
    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      throw new Error(`File upload failed (${res.status}). ${errBody}`);
    }
    const data = await res.json();
    return data.secure_url;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields below before submitting.");
      return;
    }

    try {
      setStatus("uploading");
      setStatusMessage("Uploading attachments...");
      const [photoUrl, idProofUrl] = await Promise.all([
        uploadToCloudinary(photo),
        uploadToCloudinary(idProof),
      ]);

      setStatus("submitting");
      setStatusMessage("Submitting application...");

      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          submittedAt: new Date().toISOString(),
          ...form,
          photoUrl,
          idProofUrl,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}.`);
      }

      let result;
      try {
        result = await res.json();
      } catch {
        throw new Error("Unexpected response from server.");
      }

      if (result.status !== "ok") {
        throw new Error(result.message || "Submission was rejected by the server.");
      }

      setStatus("done");
      setStatusMessage("Your application has been successfully submitted.");
      setForm(initialForm);
      setPhoto(null);
      setIdProof(null);
      setErrors({});
    } catch (err) {
      console.error("Application submission failed:", err);
      setStatus("error");
      setStatusMessage(
        err.message || "An error occurred while submitting your application. Please try again."
      );
    }
  }

  if (status === "done") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Application Submitted</h2>
          <p className="text-sm text-slate-600 mb-6">{statusMessage}</p>
          <button
            onClick={() => setStatus("idle")}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid lg:grid-cols-12 min-h-[750px]">
          
          {/* LEFT SIDE: Branding / Info Banner */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              {/* Logo Header */}
              <div className="flex items-center gap-3 mb-10">
                <div className="h-24 w-24 rounded-xl bg-purple-600/20 border border-blue-400/30 flex items-center justify-center backdrop-blur-sm">
                  {/* Replace with your actual <img> if available */}
                  <span className="text-blue-400 font-bold text-4xl font-serif"><img src={logo} alt="fp" /></span>
                </div>
                <div>
                  <h2 className="text-lg font-bold tracking-wide font-serif text-slate-100">
                    FORENSIC PATRIKA
                  </h2>
                  <p className="text-xs text-blue-300 uppercase tracking-wider font-semibold">
                    Journal of Forensic Science
                  </p>
                </div>
              </div>

              {/* Main Left Content */}
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
                We're Hiring Interns & Volunteers
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                Join the FP Team
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Contribute to academic publishing, forensic research dissemination, and legal science awareness. Gain hands-on experience working with industry professionals and academics.
              </p>

              {/* Highlights List */}
              <ul className="space-y-3 text-sm text-slate-300 border-t border-slate-800 pt-6">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                  <span>Work alongside experienced forensic experts</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                  <span>Enhance your editorial & research portfolio</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                  <span>Receive official certificates & recognition</span>
                </li>
              </ul>
            </div>

            {/* Footer note on left panel */}
            <div className="relative z-10 mt-12 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
              <p>© Forensic Patrika. All rights reserved.</p>
            </div>
          </div>

          {/* RIGHT SIDE: Career Application Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
            <div className="border-b border-slate-200 pb-6 mb-8">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Application for Internship / Volunteer Position
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Please complete the form below to apply for upcoming opportunities.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Full Name" id="fullName" required>
                  <input
                    id="fullName"
                    type="text"
                    className={inputClass}
                    value={form.fullName}
                    onChange={update("fullName")}
                    placeholder="Enter your name"
                  />
                  {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                </Field>

                <Field label="Date of Birth" id="dob" required>
                  <input
                    id="dob"
                    type="date"
                    className={inputClass}
                    value={form.dob}
                    onChange={update("dob")}
                  />
                  {errors.dob && <p className="text-xs text-red-600 mt-1">{errors.dob}</p>}
                </Field>

                <Field label="Email Address" id="email" required>
                  <input
                    id="email"
                    type="email"
                    className={inputClass}
                    value={form.email}
                    onChange={update("email")}
                    placeholder="email@gmail.com"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </Field>

                <Field label="Phone Number" id="phone" required>
                  <input
                    id="phone"
                    type="tel"
                    className={inputClass}
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+9156XXXXX679"
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </Field>

                <Field label="LinkedIn Profile" id="linkedin">
                  <input
                    id="linkedin"
                    type="url"
                    className={inputClass}
                    value={form.linkedin}
                    onChange={update("linkedin")}
                    placeholder="https://linkedin.com/in/username"
                  />
                  {errors.linkedin && <p className="text-xs text-red-600 mt-1">{errors.linkedin}</p>}
                </Field>

                <Field label="Applying As" id="role" required>
                  <select id="role" className={inputClass} value={form.role} onChange={update("role")}>
                    <option value="Intern">Intern</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                </Field>
              </div>

              <Field label="Professional Category" id="category" required>
                <select id="category" className={inputClass} value={form.category} onChange={update("category")}>
                  {APPLICANT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>

              <Field label="Professional career/studies" id="about">
                <textarea
                  id="about"
                  rows={4}
                  className={inputClass}
                  value={form.about}
                  onChange={update("about")}
                  placeholder="Provide a summary of your background and interest in forensic science (30–100 words)..."
                />
                <div className="flex justify-between items-center mt-1.5">
                  <span className="text-xs text-red-600">{errors.about || ""}</span>
                  <span
                    className={`text-xs ${
                      aboutWords < 30 || aboutWords > 100 ? "text-amber-600 font-medium" : "text-slate-500"
                    }`}
                  >
                    {aboutWords} / 100 words
                  </span>
                </div>
              </Field>

              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <FileInput
                  label="Profile Photograph"
                  accept="image/*"
                  hint="JPG or PNG format, up to 5MB"
                  file={photo}
                  onSelect={setPhoto}
                  error={errors.photo}
                />
                <FileInput
                  label="Identity Proof"
                  accept="image/*,application/pdf"
                  hint="Government ID, Student ID, or Passport (up to 5MB)"
                  file={idProof}
                  onSelect={setIdProof}
                  error={errors.idProof}
                />
              </div>

              {status === "error" && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <p className="text-sm text-red-700">{statusMessage}</p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={status === "uploading" || status === "submitting"}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {status === "uploading" || status === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {statusMessage}
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}