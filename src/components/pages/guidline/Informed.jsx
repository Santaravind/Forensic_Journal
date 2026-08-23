import React from "react";

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
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12 space-y-8 text-slate-700 leading-relaxed">

          {/* Introduction */}
          <section>
            <p>
              As specified under case study submissions,{" "}
              <span className="font-semibold text-slate-900">
                FORENSIC PATRIKA : A Journal of Forensic Science
              </span>{" "}
              requires strict compliance with informed consent and ethical
              approval standards for all manuscripts involving human
              participants or identifiable case material. Authors must clearly
              and explicitly state within the manuscript that informed consent
              was obtained from all individuals involved in the case study,
              where applicable.
            </p>
          </section>

          {/* Voluntary and Informed Consent */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Voluntary and Informed Consent
            </h2>

            <p>
              Informed consent must be voluntary, informed, and appropriately
              documented. Authors are responsible for ensuring that participants
              were fully aware of the nature, objectives, and potential academic
              use of the research or case analysis.
            </p>

            <p className="mt-4">
              Participation must be free from coercion, and individuals must
              have been informed of their right to withdraw consent at any
              stage without penalty or adverse consequence.
            </p>
          </section>

          {/* Ethical Approval */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Ethical Approval and Clearance
            </h2>

            <p>
              Where ethical clearance is required, authors must explicitly
              disclose approvals obtained from institutional review boards,
              ethics committees, or equivalent authorities.
            </p>

            <p className="mt-4">
              The name of the approving body, along with relevant reference or
              approval details, must be clearly stated in the manuscript.
            </p>

            <div className="mt-5 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6">
              <p>
                Where ethical approval was not required, authors must provide a
                clear and justified explanation in accordance with institutional,
                legal, or disciplinary guidelines.
              </p>
            </div>
          </section>

          {/* Privacy and Confidentiality */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Privacy, Dignity and Confidentiality
            </h2>

            <p>
              <span className="font-semibold text-slate-900">
                FORENSIC PATRIKA : A Journal of Forensic Science
              </span>{" "}
              places particular emphasis on the protection of privacy, dignity,
              and confidentiality of individuals involved in case studies.
            </p>

            <p className="mt-4">
              All identifying information—including names, locations,
              photographs, or institutional affiliations—must be fully
              anonymized unless explicit written permission has been obtained
              from the concerned individuals or the information is already
              available in the public domain.
            </p>
          </section>

          {/* Author Responsibility */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Responsibility of Authors
            </h2>

            <p>
              The responsibility for ensuring full ethical compliance rests
              solely with the author(s).
            </p>

            <div className="mt-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6">
              <p>
                Failure to obtain or disclose informed consent,
                misrepresentation of ethical approval, or any breach of
                participant confidentiality constitutes a serious violation of
                publication ethics.
              </p>
            </div>
          </section>

          {/* Consequences */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Ethical Violations and Consequences
            </h2>

            <p>
              Any such misconduct identified at any stage of submission, peer
              review, or post-publication will result in immediate rejection or
              retraction of the manuscript.
            </p>

            <p className="mt-4">
              Further action may be taken in accordance with the journal’s
              publication malpractice policy.
            </p>
          </section>

          {/* Final Commitment */}
          <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 md:p-8 text-white">
            <h2 className="text-xl font-bold mb-4">
              Commitment to Ethical Research
            </h2>

            <p className="text-slate-300 leading-relaxed">
              Through this policy,{" "}
              <span className="font-semibold text-white">
                FORENSIC PATRIKA : A Journal of Forensic Science
              </span>{" "}
              reaffirms its commitment to ethical research conduct and
              responsible academic publishing, ensuring that all case studies
              are conducted and presented in a manner that upholds human
              rights, academic integrity, and institutional accountability.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default Informed;