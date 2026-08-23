import React from "react";

function Open() {
  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-16">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Open Access Policy
          </h1>

          <div className="inline-block px-5 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full">
            <p className="text-lg font-semibold text-indigo-700">
              FORENSIC PATRIKA : A Journal of Forensic Science
            </p>
          </div>

          <div className="mt-6 text-slate-600 max-w-2xl mx-auto">
            <p className="text-lg">
              <span className="font-semibold text-slate-900">
                FORENSIC PATRIKA: A Journal of Forensic Science
              </span>{" "}
              follows an Open Access Publishing model, ensuring that all
              published articles are freely, immediately, and permanently
              accessible online without subscription fees, access charges, or
              financial barriers.
            </p>
          </div>
        </div>

        {/* Policy Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Open Access Publishing
                </h2>

                <p className="text-slate-300 mt-2">
                  All published articles are freely, immediately, and
                  permanently accessible online without subscription fees,
                  access charges, or financial barriers.
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Full Open Access
                </span>
              </div>
            </div>
          </div>

          {/* Policy Content */}
          <div className="p-8 md:p-10 space-y-8">

            {/* 1. Open Access Model */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/12 flex justify-center">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full">
                  <span className="font-bold">1</span>
                </div>
              </div>

              <div className="md:w-11/12">
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Open Access Publishing Model
                </h3>

                <p className="text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900">
                    FORENSIC PATRIKA: A Journal of Forensic Science
                  </span>{" "}
                  follows an Open Access Publishing model, ensuring that all
                  published articles are freely, immediately, and permanently
                  accessible online without subscription fees, access charges,
                  or financial barriers.
                </p>
              </div>
            </div>

            {/* 2. Permitted Use */}
            <div className="border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-50/50 rounded-r-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Permitted Use of Published Content
              </h3>

              <p className="text-slate-700 mb-5 leading-relaxed">
                Under this policy, readers may read, download, copy, distribute,
                print, search, link to, and cite published articles, provided
                appropriate attribution is given to the original authors and
                the journal.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="flex items-start">
                  <span className="text-green-600 font-bold text-xl mr-3">
                    ✓
                  </span>
                  <span className="text-slate-700">
                    Read and download published articles
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="text-green-600 font-bold text-xl mr-3">
                    ✓
                  </span>
                  <span className="text-slate-700">
                    Copy and distribute published content
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="text-green-600 font-bold text-xl mr-3">
                    ✓
                  </span>
                  <span className="text-slate-700">
                    Print and search published articles
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="text-green-600 font-bold text-xl mr-3">
                    ✓
                  </span>
                  <span className="text-slate-700">
                    Link to and cite published articles
                  </span>
                </div>

              </div>
            </div>

            {/* 3. Attribution Requirements */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/12 flex justify-center">
                <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-700 rounded-full">
                  <span className="font-bold">3</span>
                </div>
              </div>

              <div className="md:w-11/12">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Attribution Requirements
                </h3>

                <p className="text-slate-700 mb-4">
                  Users of published content must comply with the following
                  attribution requirements:
                </p>

                <ul className="space-y-3">

                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">✓</span>
                    <span>
                      Appropriate attribution must always be provided to the
                      original author(s) and the journal.
                    </span>
                  </li>

                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">✓</span>
                    <span>
                      The integrity of the original work must be preserved.
                    </span>
                  </li>

                  <li className="flex items-start">
                    <span className="text-red-500 font-bold mr-3">✕</span>
                    <span>
                      Unauthorised modification of published content is
                      prohibited.
                    </span>
                  </li>

                  <li className="flex items-start">
                    <span className="text-amber-600 font-bold mr-3">!</span>
                    <span>
                      Commercial use requires prior permission unless otherwise
                      specified by the journal's licensing terms.
                    </span>
                  </li>

                </ul>
              </div>
            </div>

            {/* 4. Purpose of Open Access */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/12 flex justify-center">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full">
                  <span className="font-bold">4</span>
                </div>
              </div>

              <div className="md:w-11/12">
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Purpose of the Open Access Model
                </h3>

                <p className="text-slate-700 leading-relaxed">
                  The Open Access model adopted by{" "}
                  <span className="font-bold text-slate-900">
                    FORENSIC PATRIKA
                  </span>{" "}
                  is intended to promote the widest possible dissemination of
                  forensic science research, enhance academic visibility and
                  citation impact for authors, and ensure equitable access to
                  scholarly knowledge for students, researchers, educators,
                  practitioners, and the wider academic community and the
                  advancement of forensic science research.
                </p>
              </div>
            </div>

            {/* 5. Permanent Accessibility */}
            <div className="bg-gradient-to-r from-slate-50 to-white p-6 rounded-xl border border-slate-200">
              <div className="flex items-start">

                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
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

                <div className="ml-4">
                  <h4 className="text-lg font-bold text-slate-800">
                    Permanent Accessibility
                  </h4>

                  <p className="text-slate-700 mt-2 leading-relaxed">
                    Once an article is published, it remains permanently
                    accessible on the journal's platform and may not be
                    withdrawn except under exceptional circumstances involving
                    ethical violations, legal obligations, or significant
                    breaches of publication standards. Any such action will be
                    taken in accordance with the journal's retraction and
                    correction policies.
                  </p>
                </div>

              </div>
            </div>

            {/* 6. Conclusion */}
            <div className="pt-6 border-t border-slate-200">

              <div className="flex flex-col md:flex-row gap-6">

                <div className="md:w-1/12 flex justify-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-full">
                    <span className="font-bold">6</span>
                  </div>
                </div>

                <div className="md:w-11/12">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    Commitment to Open Access
                  </h3>

                  <p className="text-slate-700 leading-relaxed">
                    Through its Open Access policy,{" "}
                    <span className="font-bold text-slate-900">
                      FORENSIC PATRIKA: A Journal of Forensic Science
                    </span>{" "}
                    reaffirms its commitment to transparency, academic
                    integrity, responsible knowledge sharing, and the
                    advancement of high-quality, ethically responsible forensic
                    scholarship worldwide.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Benefits */}
          <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">
              Benefits for Authors
            </h3>

            <ul className="space-y-2 text-slate-700">
              <li>✓ Increased visibility and citation impact</li>
              <li>✓ Global dissemination of research</li>
              <li>✓ Equitable access to published work</li>
            </ul>
          </div>

          {/* License */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-3">
              License Information
            </h3>

            <p className="text-slate-700 mb-4">
              All content is published under a Creative Commons Attribution
              4.0 International License (CC BY 4.0).
            </p>

            <div className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-800 rounded-lg text-sm font-medium">
              CC BY 4.0
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">
              Contact for Queries
            </h3>

            <p className="text-slate-700 mb-4">
              For questions regarding our Open Access policy or permissions,
              please contact:
            </p>

            <a
              href="mailto:f.patrika.india@gmail.com"
              className="text-indigo-700 font-medium hover:text-indigo-800"
            >
              f.patrika.india@gmail.com
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Open;