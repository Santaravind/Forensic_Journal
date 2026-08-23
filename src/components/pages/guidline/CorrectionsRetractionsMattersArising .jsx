import React from "react";

function CorrectionsRetractionsMattersArising() {
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
                d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Corrections, Retractions & Matters Arising
          </h1>

          <p className="mt-3 text-lg font-medium text-indigo-700">
            FORENSIC PATRIKA: A Journal of Forensic Science
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12 text-slate-700 leading-relaxed mb-8">
          <p>
            <span className="font-semibold text-slate-900">
              Forensic Patrika
            </span>{" "}
            is devoted to the accuracy, scholarly integrity, and accuracy of
            the scientific literature. Should any errors be encountered,
            concerns arise, or there appears to be unethical conduct or
            misconduct about any article, the journal will respond through
            proper channels as outlined in ethical publishing guidelines,
            including, but not limited to, corrections, retraction,
            expressions of concern, editorial notes, content removal, or
            posting items arising on an article.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">

          {/* Corrections and Retractions */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Corrections and Retractions
              </h2>
            </div>

            <div className="p-8 md:p-10 text-slate-700 leading-relaxed space-y-5">

              <p>
                <span className="font-semibold text-slate-900">
                  Forensic Patrika
                </span>{" "}
                understands that papers published from time to time may need
                corrections or retraction. Corrections or retraction decisions
                will take account of the nature of the problem, its effect on
                the validity of the work, and any available evidence.
              </p>

              <p>
                Concern over any article may be brought to the attention of the
                journal by authors, reviewers, readers, editors, or institutions.
              </p>

              <p>
                Such issues will be judged impartially and confidentially and
                will take into account the ethical standards and editorial
                policy of the journal.
              </p>

              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-5 rounded-r-lg">
                <p>
                  Any resulting notice will be published to inform all
                  concerned and maintain the integrity of the scholarly record.
                </p>
              </div>

            </div>
          </section>

          {/* Expressions of Concern */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Editorial Expressions of Concern and Editor's Notes
              </h2>
            </div>

            <div className="p-8 md:p-10 text-slate-700 leading-relaxed space-y-5">

              <p>
                If the concerns do not necessarily warrant retraction of a
                work, but more comprehensive investigations are still in
                process or progress, the journal may publish an{" "}
                <span className="font-semibold text-slate-900">
                  Editorial Expression of Concern
                </span>{" "}
                or an{" "}
                <span className="font-semibold text-slate-900">
                  Editor's Note
                </span>
                .
              </p>

              <p>
                Expressions of concern and notes inform the readership that a
                manuscript might not be dependable and that evidence continues
                to be compiled, which could later influence the interpretation
                or conclusions presented.
              </p>

              <p>
                The notice may subsequently be modified, updated, or retracted
                as further information becomes available.
              </p>

            </div>
          </section>

          {/* Removal of Published Content */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Removal of Published Content
              </h2>
            </div>

            <div className="p-8 md:p-10 text-slate-700 leading-relaxed space-y-5">

              <p>
                <span className="font-semibold text-slate-900">
                  Forensic Patrika
                </span>{" "}
                endeavours to maintain the academic record and does not
                ordinarily withdraw previously published material.
              </p>

              <p>
                Material may be withdrawn only in rare circumstances, which
                may include:
              </p>

              <ul className="list-disc pl-6 space-y-3">
                <li>
                  Fulfilling a legal requirement or court order.
                </li>

                <li>
                  Violation of the journal's copyright policy or privacy
                  standards.
                </li>

                <li>
                  Publication of content that is defamatory.
                </li>

                <li>
                  Content that poses an imminent risk to public safety.
                </li>

                <li>
                  Dissemination of confidential or previously restricted
                  information improperly.
                </li>
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg mt-5">
                <p>
                  Should removal be necessary, the journal will leave an
                  explanation for the decision posted, where legally permitted,
                  after an appropriate investigation.
                </p>
              </div>

            </div>
          </section>

          {/* Matters Arising */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Matters Arising
              </h2>
            </div>

            <div className="p-8 md:p-10 text-slate-700 leading-relaxed space-y-5">

              <p>
                <span className="font-semibold text-slate-900">
                  Matters Arising
                </span>{" "}
                is a formalised outlet to address new scholarly debate,
                seeking elucidation, clarification, correction, or comment on
                work already published.
              </p>

              <p>
                Any reader, investigator, or author themselves can present
                well-reasoned viewpoints, issues, additional insights, or
                corrections that can fruitfully foster further scientific
                debate.
              </p>

              <p>
                All submissions under the Matters Arising designation are
                expected to be factually based, of the utmost scientific rigor,
                and have a clear relationship with the published manuscript.
              </p>

              <p>
                Should the need arise, the journal will typically solicit an
                additional comment from the authors.
              </p>

              <div className="bg-emerald-50 border-l-4 border-emerald-600 p-5 rounded-r-lg">
                <p>
                  In all instances where such issues have been published, it is
                  the responsibility of all parties to note that this does not
                  constitute an accusation of misconduct, but rather provides a
                  further mechanism for encouraging continued scientific debate
                  and the dissemination of knowledge.
                </p>
              </div>

            </div>
          </section>

          {/* Final Commitment */}
          <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-lg p-8 md:p-10 text-white">

            <h2 className="text-2xl font-bold mb-4">
              Commitment to the Scholarly Record
            </h2>

            <p className="text-slate-300 leading-relaxed">
              Forensic Patrika is committed to maintaining the accuracy,
              transparency, and integrity of the scientific literature.
              Corrections, retractions, expressions of concern, editorial
              notes, content removal, and Matters Arising provide mechanisms
              through which the journal can address concerns responsibly while
              preserving the integrity of the scholarly record.
            </p>

          </section>

        </div>
      </div>
    </div>
  );
}

export default CorrectionsRetractionsMattersArising;