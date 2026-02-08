import React from 'react'

function Plagiarism() {
  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white py-16 px-4">
  <div className="max-w-6xl mx-auto">

    {/* Page Header */}
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
        Plagiarism Policy
      </h1>
      <p className="mt-3 text-lg font-medium text-indigo-700">
        FORENSIC PATRIKA : A Journal of Forensic Science
      </p>
    </div>

    {/* Policy Card */}
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12 space-y-6 text-slate-700 leading-relaxed">

      <p>
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </span>{" "}
        is firmly committed to upholding the highest standards of academic
        integrity and ethical research practices. All manuscripts submitted
        for publication must be original works of the author(s) and must not
        have been previously published or simultaneously submitted to any
        other journal or platform.
      </p>

      <p>
        Authors are solely responsible for ensuring that all ideas, data,
        arguments, and textual content derived from other sources are
        accurately cited and properly acknowledged. Failure to do so
        constitutes a breach of academic integrity.
      </p>

      <p>
        As part of the editorial evaluation process, all submissions are
        subjected to plagiarism detection screening. The acceptable
        similarity index for manuscripts submitted to{" "}
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </span>{" "}
        is up to <span className="font-semibold">15%</span>, excluding
        references, direct quotations, and properly cited material.
      </p>

      <p>
        Manuscripts exceeding this threshold, or those found to contain
        unattributed copying, self-plagiarism, data fabrication,
        falsification, or misrepresentation of sources, will be treated as
        violations of publication ethics.
      </p>

      <p>
        Manuscripts identified as containing significant plagiarism will be
        rejected outright and will not proceed to the peer-review process.
        In cases where plagiarism is detected after publication,{" "}
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </span>{" "}
        reserves the right to retract the article and take appropriate
        corrective or disciplinary measures.
      </p>

      <p>
        Authors are strongly encouraged to review their work thoroughly prior
        to submission and to adhere strictly to ethical research and citation
        practices in order to preserve the credibility and integrity of the
        scholarly record.
      </p>

    </div>
  </div>
</div>

  )
}

export default Plagiarism
