import React from "react";

function RightsPermissions() {
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
                d="M12 11c0-1.1.9-2 2-2s2 .9 2 2v1m-8 0c0-1.1.9-2 2-2s2 .9 2 2v1m-4 6h8m-4-18v4m-7 4h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Rights and Permissions
          </h1>

          <p className="mt-3 text-lg font-medium text-indigo-700">
            FORENSIC PATRIKA: A Journal of Forensic Science
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">

          {/* Permission to Reuse */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
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

                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Permission to Reuse Forensic Patrika Content
                </h2>
              </div>
            </div>

            <div className="p-8 md:p-10 text-slate-700 leading-relaxed space-y-6">

              <p>
                <span className="font-semibold text-slate-900">
                  Forensic Patrika
                </span>{" "}
                believes in good practice sharing and the proliferation of
                scholarly materials under ethical guidelines and with due
                regard for the intellectual property rights of its contributors
                and publishers.
              </p>

              <p>
                Any request for reproduction, distribution, adaptation, or
                other reuse of published content, including figures, tables,
                and any additional materials, needs proper authorisation from
                the publishers.
              </p>

              {/* Requirements */}
              <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Permission Requests Should Specify
                </h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    The specific material requested for reuse.
                  </li>
                  <li>
                    The intended purpose of the reuse.
                  </li>
                  <li>
                    The extent of utilisation.
                  </li>
                  <li>
                    The mode of usage or dissemination.
                  </li>
                  <li>
                    Any other relevant details regarding the proposed use.
                  </li>
                </ul>
              </div>

              <p>
                Permissions for educational, academic/research, and commercial
                activities may be granted based on current licensing policies
                applicable to specific content, terms and conditions for reuse,
                and appropriate citation of the source.
              </p>

              {/* Warning */}
              <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-amber-900 mb-2">
                  Unauthorised Use
                </h3>

                <p className="text-slate-700">
                  Unauthorised use, republication, or commercial exploitation
                  may lead to a breach of intellectual property rights and
                  publication rights. Forensic Patrika reserves the right to
                  approve, deny, or negotiate the terms and conditions for
                  permissions required for such republications.
                </p>
              </div>

            </div>
          </section>

          {/* Translation, Audio and Book Reprint */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Translation, Audio, and Book Reprint Rights
                </h2>

              </div>
            </div>

            <div className="p-8 md:p-10 text-slate-700 leading-relaxed space-y-6">

              <p>
                Permission to translate, record the sound of, or reprint any
                article in{" "}
                <span className="font-semibold text-slate-900">
                  Forensic Patrika
                </span>{" "}
                within a book, an edited collection, teaching or study
                materials, or another publication shall be requested from the
                journal or the relevant copyright owner.
              </p>

              <p>
                Any such translation, recording, or reprint of the material
                shall correspond as closely as possible to the original.
              </p>

              <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Responsibility for Reused Material
                </h3>

                <p>
                  In the case of any unauthorised use, including reproduction
                  of all or part of the material, unauthorised translation or
                  sound recording, or unauthorised reprint in another
                  publication, including academic material being edited for any
                  publication, the translator and publishers are responsible
                  for ensuring that the original work remains unchanged and is
                  not misrepresented.
                </p>
              </div>

              {/* Citation Requirements */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Citation Requirements
                </h3>

                <p className="mb-4">
                  Full citation must be maintained when material is translated,
                  recorded, reproduced, or reprinted.
                </p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Name of the author(s)
                  </li>
                  <li>
                    Title of the article
                  </li>
                  <li>
                    Journal reference
                  </li>
                  <li>
                    Date of publication
                  </li>
                </ul>
              </div>

              <p>
                These terms shall be applicable for the use of the articles;
                however, there may also be licensing constraints applicable to
                specific content.
              </p>

              <div className="bg-slate-50 border-l-4 border-slate-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Licensing and Further Use
                </h3>

                <p>
                  The terms and conditions under which the use of the articles
                  is allowed will be specified. Further usage may be at risk if
                  it is undertaken without appropriate authorisation from the
                  editors or relevant rights holder.
                </p>
              </div>

            </div>
          </section>

          {/* Final Notice */}
          <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-lg p-8 md:p-10 text-white">

            <h2 className="text-2xl font-bold mb-4">
              Rights and Permissions Notice
            </h2>

            <p className="text-slate-300 leading-relaxed">
              Forensic Patrika is committed to responsible sharing of scholarly
              materials while respecting the intellectual property rights of
              authors, contributors, publishers, and other rights holders.
              Users seeking to reuse, translate, record, reproduce, or reprint
              published content should obtain the necessary permissions and
              provide complete and accurate attribution.
            </p>

          </section>

        </div>
      </div>
    </div>
  );
}

export default RightsPermissions;