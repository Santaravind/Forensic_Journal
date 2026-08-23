import React from "react";

function ArtificialIntelligence() {
  const acceptableUses = [
    "Improving grammar, spelling, and language.",
    "Formatting manuscripts.",
    "Translation and language refinement.",
    "Organizing references.",
    "Improving readability.",
    "Data cleaning or formatting.",
    "Summarizing publicly available literature.",
    "Brainstorming research ideas, provided all scientific conclusions are independently verified.",
  ];

  const prohibitedUses = [
    "Listing AI as an author.",
    "Using AI to fabricate or falsify data, images, citations, or references.",
    "Generating scientific conclusions solely through AI.",
    "Creating fake peer reviews.",
    "Uploading confidential manuscripts to public AI platforms.",
    "Manipulating images without proper disclosure.",
    "Using AI to replace independent scientific judgement.",
    "Concealing substantial AI-generated content.",
  ];

  const authorResponsibilities = [
    "Ensure originality and accuracy of all submitted work.",
    "Verify every AI-generated statement, citation, figure, and reference.",
    "Disclose significant AI use.",
    "Accept full responsibility for the manuscript.",
    "Ensure AI use complies with research ethics and copyright requirements.",
  ];

  const reviewerResponsibilities = [
    "Maintain confidentiality of manuscripts.",
    "Not upload manuscripts or reviewer comments to public AI tools.",
    "Use AI only for limited language assistance where confidentiality is preserved.",
    "Exercise independent scientific judgement.",
    "Disclose significant AI assistance to the editorial office if requested.",
  ];

  const editorResponsibilities = [
    "Remain solely responsible for editorial decisions.",
    "Evaluate disclosed AI use appropriately.",
    "Ensure transparency and compliance with journal policies.",
    "Investigate suspected misuse of AI.",
    "Request clarification or corrections where necessary.",
  ];

  const integrityResponsibilities = [
    "Research integrity",
    "Ethical compliance",
    "Citation accuracy",
    "Plagiarism",
    "Data authenticity",
    "Scientific validity",
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-14 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Artificial Intelligence Policy
          </h1>

          <p className="mt-3 text-lg font-medium text-indigo-700">
            FORENSIC PATRIKA : A Journal of Forensic Science
          </p>

          <div className="mt-5 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600" />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="space-y-8">

          {/* Purpose */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-7 py-5">
              <h2 className="text-2xl font-bold text-white">
                Purpose
              </h2>
            </div>

            <div className="p-7 md:p-9 text-slate-700 leading-relaxed space-y-5">
              <p>
                <span className="font-semibold text-slate-900">
                  Forensic Patrika
                </span>{" "}
                supports the responsible, transparent, and ethical use of
                Artificial Intelligence (AI) technologies in scholarly
                publishing.
              </p>

              <p>
                AI tools may assist authors, reviewers, and editors in improving
                efficiency and communication; however, responsibility for the
                originality, accuracy, integrity, and scientific validity of
                all published content always remains with humans.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                  <p className="font-semibold text-indigo-900">
                    AI cannot be an author
                  </p>
                  <p className="text-sm mt-2 text-slate-600">
                    AI tools cannot be listed as authors of manuscripts.
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                  <p className="font-semibold text-purple-900">
                    Human responsibility
                  </p>
                  <p className="text-sm mt-2 text-slate-600">
                    AI cannot assume editorial or peer-review responsibilities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* General Principles */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-7 md:p-9">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              General Principles
            </h2>

            <p className="text-slate-700 mb-5">
              The following principles apply to all participants in the
              publication process:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Human accountability is non-transferable.",
                "AI may assist but never replace scholarly judgement.",
                "Any significant use of AI must be disclosed.",
                "Confidential manuscripts or reviewer reports must never be uploaded to public AI systems.",
                "Authors, reviewers, and editors remain fully responsible for every decision made during the publication process.",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Acceptable Uses */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-7 py-5">
              <h2 className="text-2xl font-bold text-white">
                Acceptable Uses of AI
              </h2>
            </div>

            <div className="p-7 md:p-9">
              <p className="text-slate-700 mb-5">
                AI may be used for the following purposes:
              </p>

              <div className="grid md:grid-cols-2 gap-3">
                {acceptableUses.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100"
                  >
                    <span className="text-emerald-600 font-bold text-lg">
                      ✓
                    </span>
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-5">
                <p className="font-medium text-amber-900">
                  Important:
                </p>
                <p className="mt-1 text-slate-700">
                  All AI-assisted content must be carefully reviewed and
                  validated by the user before submission.
                </p>
              </div>
            </div>
          </section>

          {/* Disclosure */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-7 md:p-9">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              AI Use Requiring Disclosure
            </h2>

            <p className="text-slate-700 mb-5">
              Authors should disclose AI use when it has significantly
              contributed to manuscript preparation, including:
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {[
                "Extensive writing assistance.",
                "Draft generation.",
                "Content restructuring.",
                "Literature summarization.",
                "Code generation.",
                "Data interpretation support.",
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <span className="font-semibold text-indigo-700 mr-2">
                    {index + 1}.
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="font-bold text-indigo-900 mb-4">
                Disclosure Should Include
              </h3>

              <div className="flex flex-wrap gap-3">
                {[
                  "Name of the AI tool",
                  "Version (if possible)",
                  "Purpose of use",
                ].map((item, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white border border-indigo-200 rounded-full text-sm font-medium text-indigo-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section className="bg-white rounded-2xl shadow-lg border border-red-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-7 py-5">
              <h2 className="text-2xl font-bold text-white">
                Prohibited Uses
              </h2>
            </div>

            <div className="p-7 md:p-9">
              <div className="grid md:grid-cols-2 gap-4">
                {prohibitedUses.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                      ✕
                    </span>
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-red-100 border border-red-200 rounded-xl p-5">
                <p className="font-semibold text-red-900">
                  Policy Violation
                </p>
                <p className="mt-1 text-red-800">
                  Violation of this policy may result in manuscript rejection
                  or publication retraction.
                </p>
              </div>
            </div>
          </section>

          {/* Responsibilities of Authors */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-7 md:p-9">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Responsibilities of Authors
            </h2>

            <div className="space-y-3">
              {authorResponsibilities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <span className="text-indigo-600 font-bold">✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Peer Reviewers */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-7 md:p-9">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Responsibilities of Peer Reviewers
            </h2>

            <div className="space-y-3">
              {reviewerResponsibilities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100"
                >
                  <span className="text-blue-600 font-bold">✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Editors */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-7 md:p-9">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Responsibilities of Editors
            </h2>

            <div className="space-y-3">
              {editorResponsibilities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 border border-purple-100"
                >
                  <span className="text-purple-600 font-bold">✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-5">
              <p className="font-semibold text-purple-900">
                Editorial decisions must never be delegated to AI systems.
              </p>
            </div>
          </section>

          {/* Confidentiality */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-7 md:p-9">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Confidentiality and Data Protection
            </h2>

            <p className="text-slate-700 leading-relaxed">
              Authors, reviewers, and editors must not submit unpublished
              manuscripts, peer-review reports, personal data, or confidential
              research materials to publicly accessible AI systems unless
              appropriate confidentiality safeguards are in place.
            </p>

            <div className="mt-6 flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="text-2xl">🔒</div>
              <p className="text-slate-700">
                Confidential scholarly materials must be protected from
                unauthorized disclosure when using AI technologies.
              </p>
            </div>
          </section>

          {/* Research Integrity */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-7 py-5">
              <h2 className="text-2xl font-bold text-white">
                Research Integrity
              </h2>
            </div>

            <div className="p-7 md:p-9">
              <p className="text-slate-700 mb-5">
                AI-generated content does not exempt authors from responsibility
                for:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {integrityResponsibilities.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center font-medium text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-red-50 border-l-4 border-red-600 rounded-r-xl p-5">
                <p className="font-semibold text-red-900">
                  Any misuse of AI that compromises scholarly integrity will be
                  treated as research misconduct.
                </p>
              </div>
            </div>
          </section>

          {/* Policy Review */}
          <section className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 rounded-2xl shadow-xl p-8 md:p-10 text-white">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/15 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9M4 9h5m11 11v-5h-.582m0 0a8.001 8.001 0 01-15.356-2M20 15h-5"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">
                  Policy Review
                </h2>

                <p className="text-indigo-100 leading-relaxed">
                  This AI Policy will be reviewed periodically to reflect
                  advances in Artificial Intelligence, publishing standards,
                  and international best practices.
                </p>
              </div>
            </div>
          </section>

          {/* Final Statement */}
          <div className="text-center pt-4 pb-4">
            <p className="text-sm text-slate-500 max-w-3xl mx-auto leading-relaxed">
              FORENSIC PATRIKA : A Journal of Forensic Science remains committed
              to responsible innovation while ensuring that human judgement,
              accountability, research integrity, and ethical scholarly
              practices remain at the center of academic publishing.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ArtificialIntelligence;