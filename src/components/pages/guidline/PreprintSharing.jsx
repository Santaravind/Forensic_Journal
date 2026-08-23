import React from "react";

function PreprintSharing() {
  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6l4 2"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Preprint Sharing Policy
          </h1>

          <p className="mt-3 text-lg font-medium text-indigo-700">
            FORENSIC PATRIKA: A Journal of Forensic Science
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12 text-slate-700 leading-relaxed space-y-10">

          {/* Definition */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What is a Preprint?
            </h2>

            <p>
              A preprint is defined as a complete and self-contained scientific
              manuscript that has been placed on the Internet, without peer
              review, at a reputable preprint server.
            </p>
          </section>

          {/* Policy Introduction */}
          <section>
            <p>
              <span className="font-semibold text-slate-900">
                Forensic Patrika
              </span>{" "}
              believes in the prompt sharing of scientific findings and values
              the contribution of preprint servers to increasing access to
              research early in the scientific workflow.
            </p>

            <p className="mt-4">
              Authors may also publish their research as a preprint on a
              publicly available preprint server before their submission to our
              journal, provided the preprints do not jeopardise the integrity
              of the scholarly record and conform to ethical and legal
              standards as outlined below.
            </p>
          </section>

          {/* Policy Points */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Preprint Sharing Guidelines
            </h2>

            <div className="space-y-6">

              {/* Point 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  1
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Preprint and Prior Publication
                  </h3>

                  <p>
                    Posting a manuscript as a preprint will not be considered
                    prior publication and will not affect the submission to
                    this journal.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  2
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Authors Uploading Preprints
                  </h3>

                  <p>
                    Authors uploading their manuscript as a preprint before
                    submission to this journal must notify the journal through
                    the declaration provided during manuscript submission.
                    Authors should also provide a direct link and DOI to the
                    manuscript on the preprint server.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  3
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Ethical Considerations
                  </h3>

                  <p>
                    All submissions must respect existing ethical norms,
                    guidelines, and the law. This applies particularly to
                    manuscripts dealing with human participant consent, the
                    handling of sensitive data, proprietary data or information
                    under NDA, and other legally restricted data and materials.
                  </p>

                  <p className="mt-3">
                    The responsibility for ensuring compliance with these
                    requirements rests with the author, their institution,
                    and/or their funders.
                  </p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  4
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Institutional Guidelines
                  </h3>

                  <p>
                    Any relevant guidelines provided by the author's
                    institution should also be followed when posting a
                    preprint.
                  </p>
                </div>
              </div>

              {/* Point 5 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  5
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Updating Preprints
                  </h3>

                  <p>
                    Authors of preprints that remain under peer review in
                    Forensic Patrika may update their preprint to reflect
                    content changes resulting from the review process.
                  </p>

                  <p className="mt-3">
                    Once the manuscript is published in the journal, there
                    should be a record allowing readers to consult the final,
                    published work. Authors must make it clear in both versions
                    that changes were made through the peer review process.
                  </p>
                </div>
              </div>

              {/* Point 6 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold">
                  6
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Peer-Review Status
                  </h3>

                  <p>
                    Authors must not post or share a preprint as peer-reviewed
                    or accepted until the editorial process has been completed.
                  </p>
                </div>
              </div>

              {/* Point 7 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                  7
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Linking to the Published Version
                  </h3>

                  <p>
                    When a manuscript submitted to Forensic Patrika is accepted
                    for publication in the journal, authors are encouraged to
                    add information to the original preprint that clearly
                    refers to the published version of the article, including
                    the DOI and final published citation.
                  </p>

                  <p className="mt-3">
                    Forensic Patrika reserves the right to scrutinise any
                    published preprint.
                  </p>
                </div>
              </div>

              {/* Point 8 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  8
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Ethical or Legal Conflicts
                  </h3>

                  <p>
                    If there is any ethical conflict or breach of
                    confidentiality, legal issue, privacy violation, or
                    violation of publication ethics in a published preprint
                    that would have implications for publishing a manuscript
                    in Forensic Patrika, the manuscript may be rejected without
                    the article undergoing any peer review.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Points to be Noted */}
          <section className="border-t border-slate-200 pt-10">

            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Points to be Noted Further
            </h2>

            <ol className="list-decimal pl-6 space-y-5">

              <li>
                Posting of preprints before submission is permitted and is not
                regarded as prior publication. If you posted the paper as a
                preprint, you must tell us the preprint service used and provide
                the preprint identifier or link as part of the submission
                process.
              </li>

              <li>
                Do not advertise a preprint on the journal site; it must contain
                the same content as the article that is submitted to the
                journal.
              </li>

              <li>
                Do not regard a posted preprint as a peer-reviewed or published
                version of the article. Authors are strongly advised to comply
                with any institutional ethical, legal, or financial obligations
                concerning preprinting their research.
              </li>

              <li>
                When your article has been published in Forensic Patrika, please
                update your preprint so that a link can be made from the
                published article to the published DOI, and a link can be added
                from your preprint page back to the published version of the
                article.
              </li>

            </ol>
          </section>

          {/* Important Notice */}
          <section className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6">

            <h3 className="text-lg font-bold text-indigo-900 mb-3">
              Important Notice
            </h3>

            <p className="text-slate-700 leading-relaxed">
              Forensic Patrika is likely to question a submission if it finds
              that a submitted manuscript with prior use as a preprint was
              inappropriate and caused any infringement of copyright or ethical
              codes.
            </p>

          </section>

          {/* Final Statement */}
          <section className="border-t border-slate-200 pt-8">

            <p className="text-slate-700 leading-relaxed">
              Through this policy,{" "}
              <span className="font-semibold text-slate-900">
                FORENSIC PATRIKA: A Journal of Forensic Science
              </span>{" "}
              supports the responsible sharing of scientific research while
              protecting the integrity of the scholarly record, ethical
              standards, confidentiality, and applicable legal requirements.
            </p>

          </section>

        </div>
      </div>
    </div>
  );
}

export default PreprintSharing;