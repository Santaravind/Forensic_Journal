import React from 'react'

function Privacy() {
  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white py-16 px-4">
  <div className="max-w-6xl mx-auto">

    {/* Page Header */}
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
        Privacy Statement
      </h1>
      <p className="mt-3 text-lg font-medium text-indigo-700">
        FORENSIC PATRIKA : A Journal of Forensic Science
      </p>
    </div>

    {/* Content Card */}
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12 space-y-6 text-slate-700 leading-relaxed">

      <p>
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </span>{" "}
        is committed to safeguarding the privacy and personal information of
        its authors, reviewers, and readers. The journal recognizes the
        importance of protecting personal data and ensuring transparency in
        its collection and use.
      </p>

      <p>
        Any personal data collected through the website—including names,
        institutional affiliations, corresponding email addresses, and
        submitted manuscripts—is used solely for editorial communication,
        peer-review processes, publication activities, and other legitimate
        academic purposes.
      </p>

      <p>
        Personal information provided to{" "}
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </span>{" "}
        will not be sold, shared, or disclosed to third parties without the
        explicit consent of the individual concerned, except where such
        disclosure is necessary for editorial operations or required under
        applicable legal obligations.
      </p>

      <p>
        All submitted manuscripts and reviewer reports are treated as strictly
        confidential and are accessible only to authorized members of the
        editorial and review team. Confidentiality is maintained throughout
        the submission, review, and publication process.
      </p>

      <p>
        The platform employs reasonable administrative and technical safeguards
        to protect personal data from unauthorized access, misuse, alteration,
        or loss. By submitting a manuscript or registering with{" "}
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </span>, users consent to the collection and use of their information in
        accordance with this Privacy Statement.
      </p>

      <p>
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </span>{" "}
        reserves the right to amend or update this Privacy Statement as
        necessary to reflect changes in operational practices, technological
        developments, or legal and regulatory requirements.
      </p>

    </div>
  </div>
</div>

  )
}

export default Privacy
