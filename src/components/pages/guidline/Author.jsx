// import React from 'react'

// function Author() {
//   return (
//    <div className="w-full bg-linear-to-b from-slate-50 to-white py-16 px-4">
//   <div className="max-w-6xl mx-auto">

//     {/* Page Header */}
//     <div className="text-center mb-12">
//       <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
//         Author Guidelines
//       </h1>
//       <p className="mt-3 text-lg font-medium text-indigo-700">
//         FORENSIC PATRIKA : A Journal of Forensic Science
//       </p>
//     </div>

//     {/* Guidelines Card */}
//     <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12 text-slate-700 leading-relaxed space-y-10">

//       {/* Intro */}
//       <p>
//         Authors are advised to carefully review and adhere to the following
//         guidelines prior to submitting a manuscript to{" "}
//         <span className="font-semibold text-slate-900">
//           FORENSIC PATRIKA : A Journal of Forensic Science
//         </span>.
//         Submissions that do not meet these requirements may be returned for
//         revision before further consideration.
//       </p>

//       {/* 1. Eligibility */}
//       <div>
//         <h2 className="text-xl font-bold text-slate-900 mb-3">
//           1. Eligibility
//         </h2>
//         <ul className="list-disc pl-6 space-y-1">
//           <li>Undergraduate, postgraduate, doctoral students, and early-career researchers are eligible to submit manuscripts.</li>
//           <li>Co-authored submissions are permitted.</li>
//           <li>All submissions must be original, unpublished, and not under consideration elsewhere.</li>
//         </ul>
//       </div>

//       {/* 2. Types of Manuscripts */}
//       <div>
//         <h2 className="text-xl font-bold text-slate-900 mb-3">
//           2. Types of Manuscripts Accepted
//         </h2>
//         <ul className="list-disc pl-6 space-y-1">
//           <li>Original research articles</li>
//           <li>Review articles</li>
//           <li>Case studies</li>
//           <li>Short communications</li>
//           <li>Conceptual or theoretical papers</li>
//         </ul>
//       </div>

//       {/* 3. Manuscript Formatting */}
//       <div>
//         <h2 className="text-xl font-bold text-slate-900 mb-3">
//           3. Manuscript Formatting (For Articles)
//         </h2>
//         <ul className="list-disc pl-6 space-y-1">
//           <li><span className="font-semibold">File format:</span> PDF (.pdf)</li>
//           <li><span className="font-semibold">Font:</span> Times New Roman</li>
//           <li><span className="font-semibold">Margins:</span> 1 inch on all sides</li>
//           <li><span className="font-semibold">Text alignment:</span> Justified</li>
//         </ul>
//       </div>

//       {/* 4. Structure */}
//       <div>
//         <h2 className="text-xl font-bold text-slate-900 mb-3">
//           4. Structure of the Manuscript
//         </h2>
//         <p className="mb-3">Manuscripts should be organized in the following sequence:</p>
//         <ol className="list-decimal pl-6 space-y-1">
//           <li>Title of the manuscript</li>
//           <li>Author name(s) and institutional affiliation(s)</li>
//           <li>Abstract (150–250 words)</li>
//           <li>Keywords (3–5)</li>
//           <li>Introduction</li>
//           <li>Literature review (if applicable)</li>
//           <li>Research methodology</li>
//           <li>Results and discussion</li>
//           <li>Conclusion</li>
//           <li>References</li>
//         </ol>
//       </div>

//       {/* 5. Citation */}
//       <div>
//         <h2 className="text-xl font-bold text-slate-900 mb-3">
//           5. Citation and Referencing
//         </h2>
//         <ul className="list-disc pl-6 space-y-1">
//           <li>Authors must maintain a consistent citation style throughout the manuscript.</li>
//           <li>Accepted referencing styles include APA, MLA, or Chicago, as specified during submission.</li>
//           <li>All sources must be appropriately cited to ensure academic integrity and avoid plagiarism.</li>
//         </ul>
//       </div>

//     </div>
//   </div>
//   <div className="w-full bg-white py-12 px-4">
//   <div className="max-w-6xl mx-auto">

//     {/* Section Title */}
//     <div className="mb-8">
//       <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
//         B. For Case Studies
//       </h2>
//       <p className="mt-3 text-slate-700 leading-relaxed">
//         Case studies submitted to{" "}
//         <span className="font-semibold text-slate-900">
//           FORENSIC PATRIKA
//         </span>{" "}
//         should present a structured, analytical, and academically sound examination
//         of cases relevant to forensic science, criminology, criminal investigation,
//         victimology, or allied disciplines. Submissions must demonstrate clarity,
//         ethical responsibility, and scholarly relevance.
//       </p>
//     </div>

//     {/* Content Card */}
//     <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 md:p-10 space-y-8 text-slate-700 leading-relaxed">

//       {/* 3. Word Limit */}
//       <div>
//         <h3 className="text-xl font-bold text-slate-900 mb-2">
//           3. Word Limit
//         </h3>
//         <p>
//           Case study manuscripts must be between{" "}
//           <span className="font-semibold">3,000 and 5,000 words</span>,
//           excluding the abstract and references. Submissions falling outside this
//           range may be returned for revision or declined unless prior approval has
//           been obtained from the editorial team.
//         </p>
//       </div>

//       {/* 4. Manuscript Structure */}
//       <div>
//         <h3 className="text-xl font-bold text-slate-900 mb-3">
//           4. Manuscript Structure
//         </h3>
//         <ul className="list-disc pl-6 space-y-2">
//           <li><span className="font-semibold">Title:</span> Clear, concise, and accurately reflective of the case and its academic relevance.</li>
//           <li><span className="font-semibold">Abstract:</span> 150–250 words summarizing the purpose, methodological approach, key findings, and academic or practical implications.</li>
//           <li><span className="font-semibold">Keywords:</span> 3–5 relevant terms.</li>
//           <li><span className="font-semibold">Introduction:</span> Background context, rationale, objectives, and relevance to forensic science or criminology.</li>
//           <li><span className="font-semibold">Case Background:</span> Factual and contextual details, including legal, social, or investigative settings, while maintaining objectivity and confidentiality.</li>
//           <li><span className="font-semibold">Methodology / Analytical Framework:</span> Systematic, evidence-based evaluation of observations, data, or outcomes.</li>
//           <li><span className="font-semibold">Discussion:</span> Interpretation of findings in relation to existing literature, legal provisions, forensic standards, or theoretical frameworks.</li>
//           <li><span className="font-semibold">Conclusion:</span> Summary of key insights and academic, practical, or policy-related implications.</li>
//         </ul>
//       </div>

//       {/* 5. Formatting Guidelines */}
//       <div>
//         <h3 className="text-xl font-bold text-slate-900 mb-3">
//           5. Formatting Guidelines
//         </h3>
//         <ul className="list-disc pl-6 space-y-2">
//           <li>Font: Times New Roman, size 12</li>
//           <li>Line spacing: 1.5</li>
//           <li>Margins: 1 inch on all sides</li>
//           <li>Text alignment: Justified</li>
//           <li>File format: .doc or .docx</li>
//           <li>Headings and subheadings must be clearly distinguished and used consistently</li>
//         </ul>
//       </div>

//       {/* 6. Ethical Considerations */}
//       <div>
//         <h3 className="text-xl font-bold text-slate-900 mb-3">
//           6. Ethical Considerations
//         </h3>
//         <p>
//           Case studies involving human participants must strictly adhere to ethical
//           research standards. Authors are required to anonymize all personal
//           identifiers unless informed consent has been obtained or the information
//           is already in the public domain. All sensitive data must be handled
//           responsibly, with due regard for privacy, dignity, and confidentiality.
//         </p>
//       </div>

//       {/* 7. Informed Consent */}
//       <div>
//         <h3 className="text-xl font-bold text-slate-900 mb-3">
//           7. Informed Consent
//         </h3>
//         <p>
//           Where applicable, authors must clearly state that informed consent was
//           obtained from individuals involved in the case. Any ethical approvals
//           granted by institutional review boards or ethics committees must be
//           explicitly mentioned in the manuscript.
//         </p>
//       </div>

//       {/* 8. Academic Integrity */}
//       <div>
//         <h3 className="text-xl font-bold text-slate-900 mb-3">
//           8. Academic Integrity and Malpractice
//         </h3>
//         <p>
//           All submissions must comply with the plagiarism policy of{" "}
//           <span className="font-semibold">FORENSIC PATRIKA</span>, with an
//           acceptable similarity index of up to{" "}
//           <span className="font-semibold">15%</span>, excluding references.
//           Academic misconduct—including fabrication, falsification, selective
//           reporting, or misrepresentation of case details—is strictly prohibited
//           and will result in immediate rejection.
//         </p>
//       </div>

//       {/* 9. Citation */}
//       <div>
//         <h3 className="text-xl font-bold text-slate-900 mb-3">
//           9. Citation and Referencing
//         </h3>
//         <ul className="list-disc pl-6 space-y-2">
//           <li>A single, consistent citation style must be used throughout the manuscript.</li>
//           <li>Accepted styles include APA, MLA, or Chicago, as specified during submission.</li>
//           <li>All legal documents, forensic reports, statutes, judgments, and secondary sources must be accurately cited.</li>
//         </ul>
//       </div>

//     </div>
//   </div>
// </div>

// </div>

//   )
// }

// export default Author


import React from 'react'
import logos from '../../assets/logoss.png'
function Author() {
  return (
   <div className="w-full bg-linear-to-b from-slate-50 to-white py-16 px-4">
  <div className="max-w-6xl mx-auto  ">

    {/* Page Header */}
    <div className="text-center mb-12 flex  ">
      <div className='w-80 '>
      <img src={logos} alt="logo pages" />
      </div>
       <div className='lg:mt-20 '>
      <h1 className="text-4xl md:text-4xl font-extrabold text-slate-900">
        Author Guidelines
      </h1>
      <p className="mt-3 text-2xl font-medium text-indigo-700">
        FORENSIC PATRIKA : A Journal of Forensic Science
      </p>
        </div>
      
    </div>
    
    {/* Guidelines Card */}
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12 text-slate-700 leading-relaxed space-y-10">
     
      {/* Intro */}
      <p>
        Authors are advised to carefully review and adhere to the following
        guidelines prior to submitting a manuscript to{" "}
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </span>.
        Submissions that do not meet these requirements may be returned for
        revision before further consideration.
      </p>

      {/* 1. Eligibility */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          1. Eligibility
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Undergraduate, postgraduate, doctoral students, and early-career researchers are eligible to submit manuscripts.</li>
          <li>Co-authored submissions are permitted.</li>
          <li>All submissions must be original, unpublished, and not under consideration elsewhere.</li>
        </ul>
      </div>

      {/* 2. Types of Manuscripts */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          2. Types of Manuscripts Accepted
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Original research articles</li>
          <li>Review articles</li>
          <li>Case studies</li>
          <li>Short communications</li>
          <li>Conceptual or theoretical papers</li>
        </ul>
      </div>

      {/* 3. Manuscript Formatting */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          3. Manuscript Formatting (For Articles)
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><span className="font-semibold">File format:</span> PDF (.pdf)</li>
          <li><span className="font-semibold">Font:</span> Times New Roman</li>
          <li><span className="font-semibold">Margins:</span> 1 inch on all sides</li>
          <li><span className="font-semibold">Text alignment:</span> Justified</li>
        </ul>
      </div>

      {/* 4. Structure */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          4. Structure of the Manuscript
        </h2>
        <p className="mb-3">Manuscripts should be organized in the following sequence:</p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Title of the manuscript</li>
          <li>Author name(s) and institutional affiliation(s)</li>
          <li>Abstract (150–250 words)</li>
          <li>Keywords (3–5)</li>
          <li>Introduction</li>
          <li>Literature review (if applicable)</li>
          <li>Research methodology</li>
          <li>Results and discussion</li>
          <li>Conclusion</li>
          <li>References</li>
        </ol>
      </div>

      {/* 5. Citation */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          5. Citation and Referencing
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Authors must maintain a consistent citation style throughout the manuscript.</li>
          <li>Accepted referencing styles include APA, MLA, or Chicago, as specified during submission.</li>
          <li>All sources must be appropriately cited to ensure academic integrity and avoid plagiarism.</li>
        </ul>
      </div>

    </div>
  </div>
  <div className="w-full bg-white py-12 px-4">
  <div className="max-w-6xl mx-auto">

    {/* Section Title */}
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
        B. For Case Studies
      </h2>
      <p className="mt-3 text-slate-700 leading-relaxed">
        Case studies submitted to{" "}
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA
        </span>{" "}
        should present a structured, analytical, and academically sound examination
        of cases relevant to forensic science, criminology, criminal investigation,
        victimology, or allied disciplines. Submissions must demonstrate clarity,
        ethical responsibility, and scholarly relevance.
      </p>
    </div>

    {/* Content Card */}
    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 md:p-10 space-y-8 text-slate-700 leading-relaxed">

      {/* 3. Word Limit */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          3. Word Limit
        </h3>
        <p>
          Case study manuscripts must be between{" "}
          <span className="font-semibold">3,000 and 5,000 words</span>,
          excluding the abstract and references. Submissions falling outside this
          range may be returned for revision or declined unless prior approval has
          been obtained from the editorial team.
        </p>
      </div>

      {/* 4. Manuscript Structure */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          4. Manuscript Structure
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-semibold">Title:</span> Clear, concise, and accurately reflective of the case and its academic relevance.</li>
          <li><span className="font-semibold">Abstract:</span> 150–250 words summarizing the purpose, methodological approach, key findings, and academic or practical implications.</li>
          <li><span className="font-semibold">Keywords:</span> 3–5 relevant terms.</li>
          <li><span className="font-semibold">Introduction:</span> Background context, rationale, objectives, and relevance to forensic science or criminology.</li>
          <li><span className="font-semibold">Case Background:</span> Factual and contextual details, including legal, social, or investigative settings, while maintaining objectivity and confidentiality.</li>
          <li><span className="font-semibold">Methodology / Analytical Framework:</span> Systematic, evidence-based evaluation of observations, data, or outcomes.</li>
          <li><span className="font-semibold">Discussion:</span> Interpretation of findings in relation to existing literature, legal provisions, forensic standards, or theoretical frameworks.</li>
          <li><span className="font-semibold">Conclusion:</span> Summary of key insights and academic, practical, or policy-related implications.</li>
        </ul>
      </div>

      {/* 5. Formatting Guidelines */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          5. Formatting Guidelines
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Font: Times New Roman, size 12</li>
          <li>Line spacing: 1.5</li>
          <li>Margins: 1 inch on all sides</li>
          <li>Text alignment: Justified</li>
          <li>File format: .doc or .docx</li>
          <li>Headings and subheadings must be clearly distinguished and used consistently</li>
        </ul>
      </div>

      {/* 6. Ethical Considerations */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          6. Ethical Considerations
        </h3>
        <p>
          Case studies involving human participants must strictly adhere to ethical
          research standards. Authors are required to anonymize all personal
          identifiers unless informed consent has been obtained or the information
          is already in the public domain. All sensitive data must be handled
          responsibly, with due regard for privacy, dignity, and confidentiality.
        </p>
      </div>

      {/* 7. Informed Consent */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          7. Informed Consent
        </h3>
        <p>
          Where applicable, authors must clearly state that informed consent was
          obtained from individuals involved in the case. Any ethical approvals
          granted by institutional review boards or ethics committees must be
          explicitly mentioned in the manuscript.
        </p>
      </div>

      {/* 8. Academic Integrity */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          8. Academic Integrity and Malpractice
        </h3>
        <p>
          All submissions must comply with the plagiarism policy of{" "}
          <span className="font-semibold">FORENSIC PATRIKA</span>, with an
          acceptable similarity index of up to{" "}
          <span className="font-semibold">15%</span>, excluding references.
          Academic misconduct—including fabrication, falsification, selective
          reporting, or misrepresentation of case details—is strictly prohibited
          and will result in immediate rejection.
        </p>
      </div>

      {/* 9. Citation */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          9. Citation and Referencing
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>A single, consistent citation style must be used throughout the manuscript.</li>
          <li>Accepted styles include APA, MLA, or Chicago, as specified during submission.</li>
          <li>All legal documents, forensic reports, statutes, judgments, and secondary sources must be accurately cited.</li>
        </ul>
      </div>

    </div>
  </div>
</div>

</div>

  )
}

export default Author
