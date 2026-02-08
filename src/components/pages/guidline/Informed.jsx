import React from 'react'

function Informed() {
  return (
   <div className="w-full bg-gradient-to-b from-slate-50 to-white py-16 px-4">
  <div className="max-w-6xl mx-auto">

    {/* Page Header */}
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
        Informed Consent
      </h1>
      <p className="mt-3 text-lg font-medium text-indigo-700">
        FORENSIC PATRIKA : A Journal of Forensic Science
      </p>
    </div>

    {/* Content Card */}
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12 space-y-6 text-slate-700 leading-relaxed">

      <p>
        As specified under case study submissions,{" "}
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </span>{" "}
        requires strict compliance with informed consent and ethical approval
        standards for all manuscripts involving human participants or identifiable
        case material. Authors must clearly and explicitly state within the manuscript
        that informed consent was obtained from all individuals involved in the case
        study, where applicable.
      </p>

      <p>
        Informed consent must be voluntary, informed, and appropriately documented.
        Authors are responsible for ensuring that participants were fully aware of
        the nature, objectives, and potential academic use of the research or case
        analysis. Participation must be free from coercion, and individuals must have
        been informed of their right to withdraw consent at any stage without penalty
        or adverse consequence.
      </p>

      <p>
        Where ethical clearance is required, authors must explicitly disclose
        approvals obtained from institutional review boards, ethics committees, or
        equivalent authorities. The name of the approving body, along with relevant
        reference or approval details, must be clearly stated in the manuscript.
        Where ethical approval was not required, authors must provide a clear and
        justified explanation in accordance with institutional, legal, or
        disciplinary guidelines.
      </p>

      <p>
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </span>{" "}
        places particular emphasis on the protection of privacy, dignity, and
        confidentiality of individuals involved in case studies. All identifying
        information—including names, locations, photographs, or institutional
        affiliations—must be fully anonymized unless explicit written permission has
        been obtained from the concerned individuals or the information is already
        available in the public domain.
      </p>

      <p>
        The responsibility for ensuring full ethical compliance rests solely with
        the author(s). Failure to obtain or disclose informed consent,
        misrepresentation of ethical approval, or any breach of participant
        confidentiality constitutes a serious violation of publication ethics.
      </p>

      <p>
        Any such misconduct identified at any stage of submission, peer review, or
        post-publication will result in immediate rejection or retraction of the
        manuscript, and further action may be taken in accordance with the journal’s
        publication malpractice policy.
      </p>

      <p>
        Through this policy,{" "}
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </span>{" "}
        reaffirms its commitment to ethical research conduct and responsible academic
        publishing, ensuring that all case studies are conducted and presented in a
        manner that upholds human rights, academic integrity, and institutional
        accountability.
      </p>

    </div>
  </div>
</div>

  )
}

export default Informed
