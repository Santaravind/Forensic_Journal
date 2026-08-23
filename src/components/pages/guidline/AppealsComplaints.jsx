import React from "react";

function AppealsComplaints() {
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Appeals and Complaints
          </h1>

          <p className="mt-3 text-lg font-medium text-indigo-700">
            FORENSIC PATRIKA: A Journal of Forensic Science
          </p>
        </div>

        {/* Policy and Process */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Policy and Process
            </h2>
          </div>

          <div className="p-8 md:p-10 text-slate-700 leading-relaxed space-y-5">
            <p>
              <span className="font-semibold text-slate-900">
                Forensic Patrika
              </span>{" "}
              aims to address appeals and complaints justly, openly, and
              rapidly. Appeals and complaints concerning decisions of editors,
              publication processes, published content, ethical concerns, and
              related matters may be made by authors, readers, and other
              stakeholders.
            </p>

            <p>
              All submissions shall be examined judiciously and confidentially
              by designated editorial personnel based upon scientific evidence
              and in accordance with the policies of the journal and established
              norms of ethical publishing.
            </p>

            <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-lg p-5">
              <p>
                Forensic Patrika reserves the right to gather further
                information whenever deemed essential for the proper
                consideration and resolution of an appeal or complaint.
              </p>
            </div>
          </div>
        </section>

        {/* Complaint About Scientific Content */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Complaint About Scientific Content
            </h2>
          </div>

          <div className="p-8 md:p-10 text-slate-700 leading-relaxed space-y-5">
            <p>
              Any complaint regarding the accuracy, authenticity,
              interpretation, or originality of scientific materials published
              in the journal may be made to the journal office with
              substantiating documents or evidence.
            </p>

            <p>
              The editorial board will examine the complaints and, if needed,
              seek input from expert individuals or the original author.
            </p>

            <div>
              <h3 className="font-bold text-slate-900 mb-3">
                Possible Editorial Actions
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>Correction</li>
                <li>Expression of Concern</li>
                <li>Retraction</li>
              </ul>
            </div>

            <p>
              An outcome will be communicated to the individual as far as
              possible.
            </p>
          </div>
        </section>

        {/* Complaint About Scientific Processes */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Complaint About Scientific Processes
            </h2>
          </div>

          <div className="p-8 md:p-10 text-slate-700 leading-relaxed space-y-5">
            <p>
              Complaints may concern editorial issues, peer review concerns,
              journal delays, communication, and administrative procedures.
            </p>

            <p>
              Complaints concerning these areas will be explored by{" "}
              <span className="font-semibold text-slate-900">
                Forensic Patrika
              </span>{" "}
              to ascertain whether the prevailing policies and procedures were
              maintained. Relevant personnel may be approached for further
              information where necessary.
            </p>

            <div className="bg-slate-50 border-l-4 border-slate-600 rounded-r-lg p-5">
              <p>
                Where legitimate grievances are found to exist, appropriate
                action(s) will be taken to redress them.
              </p>
            </div>

            <p>
              Forensic Patrika endeavours to pursue all its policies fairly and
              equitably.
            </p>
          </div>
        </section>

        {/* Complaint About Publication Ethics */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Complaint About Publication Ethics
            </h2>
          </div>

          <div className="p-8 md:p-10 text-slate-700 leading-relaxed space-y-5">
            <p>
              Suspected publication misconduct and ethical breaches, including
              but not limited to plagiarism, duplicate or simultaneous
              publication, data fabrication or falsification, authorship
              discrepancies, undisclosed conflicts of interest, and misconduct
              in peer review processes, will be taken seriously.
            </p>

            <p>
              Forensic Patrika may investigate the complaint in line with
              established guidelines of ethical publishing practices.
              Interested parties and involved institutions will be approached
              as and when appropriate.
            </p>

            <p>
              Appropriate measures will be taken if misconduct is substantiated,
              possibly resulting in:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Rejection</li>
              <li>Correction</li>
              <li>Retraction</li>
              <li>Other appropriate editorial action</li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-600 rounded-r-lg p-5">
              <p className="font-medium">
                All cases will be handled equitably and confidentially.
              </p>
            </div>
          </div>
        </section>

        {/* Act with Integrity */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Act with Integrity
            </h2>
          </div>

          <div className="p-8 md:p-10 text-slate-700 leading-relaxed space-y-5">

            <p>
              <span className="font-semibold text-slate-900">
                Forensic Patrika
              </span>{" "}
              requires all authors, reviewers, editors, and contributors to
              follow the highest standards of honesty, truthfulness,
              transparency, professional integrity, and ethics while working
              as members of the editorial and contributing process in this
              scholarly forum.
            </p>

            <p>
              Findings of scientific work must be presented faithfully, without
              suppression, falsification, or misleading statements of
              information.
            </p>

            <p>
              The journal does not allow:
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">

              <li className="flex items-start bg-red-50 p-3 rounded-lg">
                <span className="text-red-600 font-bold mr-2">✕</span>
                <span>Plagiarism</span>
              </li>

              <li className="flex items-start bg-red-50 p-3 rounded-lg">
                <span className="text-red-600 font-bold mr-2">✕</span>
                <span>
                  Dual submission of the same data or manuscript elsewhere
                </span>
              </li>

              <li className="flex items-start bg-red-50 p-3 rounded-lg">
                <span className="text-red-600 font-bold mr-2">✕</span>
                <span>Citation distortion</span>
              </li>

              <li className="flex items-start bg-red-50 p-3 rounded-lg">
                <span className="text-red-600 font-bold mr-2">✕</span>
                <span>Referee suppression</span>
              </li>

              <li className="flex items-start bg-red-50 p-3 rounded-lg">
                <span className="text-red-600 font-bold mr-2">✕</span>
                <span>Manipulation of peer-review processes</span>
              </li>

              <li className="flex items-start bg-red-50 p-3 rounded-lg">
                <span className="text-red-600 font-bold mr-2">✕</span>
                <span>Hiding competing interests</span>
              </li>

            </ul>

            <p>
              All submitted works need correct referencing and appropriate
              approvals, including ethical permission where applicable.
            </p>

            <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-r-lg p-5">
              <p>
                The editorial board shall review submitted work independently,
                impartially, and maintain the highest level of confidentiality.
                Editorial decisions must be based exclusively on scholarly
                merit and must be ethically justified.
              </p>
            </div>

            <p>
              Any suspected ethical infringement may be investigated in line
              with the journal's policies and recognised ethical principles
              governing scholarly publications.
            </p>

            <p>
              All concerned persons associated with{" "}
              <span className="font-semibold text-slate-900">
                Forensic Patrika
              </span>{" "}
              shall work to uphold trustworthiness, accountability, and
              integrity in scholarly activities.
            </p>

          </div>
        </section>

        {/* Final Commitment */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-10 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Commitment to Fair and Ethical Publishing
          </h2>

          <p className="text-slate-300 leading-relaxed">
            Forensic Patrika is committed to handling appeals and complaints
            fairly, confidentially, and transparently while protecting the
            integrity of the scholarly record and maintaining the highest
            standards of academic and publication ethics.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AppealsComplaints;