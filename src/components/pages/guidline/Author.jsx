import React from "react";
import logos from "../../assets/logoss.png";

function Author() {
  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-12 flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="w-60 md:w-72">
            <img src={logos} alt="Forensic Patrika Logo" />
          </div>

          <div className="lg:mt-12">
            <h1 className="text-4xl md:text-4xl font-extrabold text-slate-900">
              Author Guidelines
            </h1>

            <p className="mt-3 text-xl md:text-2xl font-medium text-indigo-700">
              FORENSIC PATRIKA : A Journal of Forensic Science
            </p>
          </div>
        </div>

        {/* ================= MAIN AUTHOR GUIDELINES ================= */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12 text-slate-700 leading-relaxed space-y-10">

          {/* Introduction */}
          <section>
            <p>
              Authors are advised to carefully review and adhere to the
              following guidelines prior to submitting a manuscript to{" "}
              <span className="font-semibold text-slate-900">
                FORENSIC PATRIKA : A Journal of Forensic Science
              </span>
              . Submissions that do not meet these requirements may be returned
              for revision before further consideration.
            </p>
          </section>

          {/* 1. Eligibility */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              1. Eligibility
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Undergraduate, postgraduate, doctoral students, and
                early-career researchers are eligible to submit manuscripts.
              </li>
              <li>Co-authored submissions are permitted.</li>
              <li>
                All submissions must be original, unpublished, and not under
                consideration elsewhere.
              </li>
            </ul>
          </section>

          {/* 2. Types of Manuscripts */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              2. Types of Manuscripts Accepted
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Original research articles</li>
              <li>Review articles</li>
              <li>Case studies</li>
              <li>Short communications</li>
              <li>Conceptual or theoretical papers</li>
            </ul>
          </section>

          {/* 3. Manuscript Formatting */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              3. Manuscript Formatting (For Articles)
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-semibold">File format:</span> PDF (.pdf)
              </li>
              <li>
                <span className="font-semibold">Font:</span> Times New Roman
              </li>
              <li>
                <span className="font-semibold">Margins:</span> 1 inch on all
                sides
              </li>
              <li>
                <span className="font-semibold">Text alignment:</span> Justified
              </li>
            </ul>
          </section>

          {/* 4. Structure */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              4. Structure of the Manuscript
            </h2>

            <p className="mb-3">
              Manuscripts should be organized in the following sequence:
            </p>

            <ol className="list-decimal pl-6 space-y-2">
              <li>Title of the manuscript</li>
              <li>Author name(s) and institutional affiliation(s)</li>
              <li>Abstract (150–250 words)</li>
              <li>Keywords (3–5)</li>
              <li>Introduction</li>
              <li>Literature review (if applicable)</li>
              <li>Research methodology</li>
              <li>Results and discussion</li>
              <li>Conclusion</li>
              <li>References</li>
            </ol>
          </section>

          {/* 5. Citation and Referencing */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              5. Citation and Referencing
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Authors must maintain a consistent citation style throughout
                the manuscript.
              </li>
              <li>
                Accepted referencing styles include APA, MLA, or Chicago, as
                specified during submission.
              </li>
              <li>
                All sources must be appropriately cited to ensure academic
                integrity and avoid plagiarism.
              </li>
            </ul>
          </section>
        </div>

        {/* ================= CASE STUDIES ================= */}
        <div className="w-full bg-white py-12">
          <div className="max-w-6xl mx-auto">

            {/* Section Title */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                B. For Case Studies
              </h2>

              <p className="mt-3 text-slate-700 leading-relaxed">
                Case studies submitted to{" "}
                <span className="font-semibold text-slate-900">
                  FORENSIC PATRIKA
                </span>{" "}
                should present a structured, analytical, and academically sound
                examination of cases relevant to forensic science, criminology,
                criminal investigation, victimology, or allied disciplines.
                Submissions must demonstrate clarity, ethical responsibility,
                and scholarly relevance.
              </p>
            </div>

            {/* Case Study Content */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 md:p-10 space-y-8 text-slate-700 leading-relaxed">

              {/* 3. Word Limit */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  3. Word Limit
                </h3>

                <p>
                  Case study manuscripts must be between{" "}
                  <span className="font-semibold">
                    3,000 and 5,000 words
                  </span>
                  , excluding the abstract and references. Submissions falling
                  outside this range may be returned for revision or declined
                  unless prior approval has been obtained from the editorial
                  team.
                </p>
              </section>

              {/* 4. Manuscript Structure */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  4. Manuscript Structure
                </h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-semibold">Title:</span> Clear,
                    concise, and accurately reflective of the case and its
                    academic relevance.
                  </li>

                  <li>
                    <span className="font-semibold">Abstract:</span> 150–250
                    words summarizing the purpose, methodological approach, key
                    findings, and academic or practical implications.
                  </li>

                  <li>
                    <span className="font-semibold">Keywords:</span> 3–5
                    relevant terms.
                  </li>

                  <li>
                    <span className="font-semibold">Introduction:</span>{" "}
                    Background context, rationale, objectives, and relevance to
                    forensic science or criminology.
                  </li>

                  <li>
                    <span className="font-semibold">Case Background:</span>{" "}
                    Factual and contextual details, including legal, social, or
                    investigative settings, while maintaining objectivity and
                    confidentiality.
                  </li>

                  <li>
                    <span className="font-semibold">
                      Methodology / Analytical Framework:
                    </span>{" "}
                    Systematic, evidence-based evaluation of observations,
                    data, or outcomes.
                  </li>

                  <li>
                    <span className="font-semibold">Discussion:</span>{" "}
                    Interpretation of findings in relation to existing
                    literature, legal provisions, forensic standards, or
                    theoretical frameworks.
                  </li>

                  <li>
                    <span className="font-semibold">Conclusion:</span> Summary
                    of key insights and academic, practical, or policy-related
                    implications.
                  </li>
                </ul>
              </section>

              {/* 5. Formatting Guidelines */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  5. Formatting Guidelines
                </h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Font: Times New Roman, size 12</li>
                  <li>Line spacing: 1.5</li>
                  <li>Margins: 1 inch on all sides</li>
                  <li>Text alignment: Justified</li>
                  <li>File format: .doc or .docx</li>
                  <li>
                    Headings and subheadings must be clearly distinguished and
                    used consistently
                  </li>
                </ul>
              </section>

              {/* 6. Ethical Considerations */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  6. Ethical Considerations
                </h3>

                <p>
                  Case studies involving human participants must strictly
                  adhere to ethical research standards. Authors are required to
                  anonymize all personal identifiers unless informed consent
                  has been obtained or the information is already in the public
                  domain. All sensitive data must be handled responsibly, with
                  due regard for privacy, dignity, and confidentiality.
                </p>
              </section>

              {/* 7. Informed Consent */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  7. Informed Consent
                </h3>

                <p>
                  Where applicable, authors must clearly state that informed
                  consent was obtained from individuals involved in the case.
                  Any ethical approvals granted by institutional review boards
                  or ethics committees must be explicitly mentioned in the
                  manuscript.
                </p>
              </section>

              {/* 8. Academic Integrity */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  8. Academic Integrity and Malpractice
                </h3>

                <p>
                  All submissions must comply with the plagiarism policy of{" "}
                  <span className="font-semibold">FORENSIC PATRIKA</span>, with
                  an acceptable similarity index of up to{" "}
                  <span className="font-semibold text-indigo-700">15%</span>,
                  excluding references. Academic misconduct—including
                  fabrication, falsification, selective reporting, or
                  misrepresentation of case details—is strictly prohibited and
                  will result in immediate rejection.
                </p>
              </section>

              {/* 9. Citation and Referencing */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  9. Citation and Referencing
                </h3>

                <div className="space-y-5">

                  <p>
                    <span className="font-semibold">
                      FORENSIC PATRIKA
                    </span>{" "}
                    supports a system where accurate and judicious citation and
                    reference are integral to academic and honest scholarly
                    practice.
                  </p>

                  <p>
                    All intellectual property, such as thoughts, research
                    materials, images, methods, and previously developed works
                    used in the writing of an article should be appropriately
                    referenced and cited in the article. Failure to do so may
                    constitute plagiarism and may be deemed publication
                    misconduct.
                  </p>

                  <p>
                    Sources utilised should be factually correct, relevant,
                    up-to-date, and directly related to the manuscript in which
                    they are cited.
                  </p>

                  <p>
                    Citation manipulation, excessive self-citations, and
                    excessive or unjustified citation insertions intended to
                    inflate citation counts are dishonest and considered
                    improper. The journal does not consider it compulsory for
                    authors to include additional citations upon request by a
                    reviewer, editor, or other relevant professional where such
                    requests arise from personal biases rather than legitimate
                    scholarly relevance.
                  </p>

                  <p>
                    The journal reserves the right to take necessary action in
                    all such citation-related matters and, where applicable,
                    for other forms of publication misconduct.
                  </p>

                </div>
              </section>

              {/* Guidelines for Authors */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Guidelines for Authors
                </h3>

                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    Cite all research studies that had a tangible impact on
                    your thought, methodology, write-up design, or conceptual
                    design.
                  </li>

                  <li>
                    Cite all material and content, irrespective of their type,
                    including methods, statistical data, and conceptual bases.
                  </li>

                  <li>
                    Ensure all in-text citation entries are accounted for in
                    the complete reference list and vice versa.
                  </li>

                  <li>
                    Double-verify citation entries for spelling of authors'
                    names, publication year, title, name of the periodical or
                    journal, volume number, pages, and DOI, if available.
                  </li>

                  <li>
                    Reference figures, tables, photographs, images, graphs,
                    datasets, software, and any content generated by third
                    parties.
                  </li>

                  <li>
                    Refrain from plagiarism, duplicate publications, improper
                    self-citation, and inappropriate citation of one's own
                    publications.
                  </li>

                  <li>
                    Be sure to access and evaluate all materials to be cited
                    before inserting them into the work.
                  </li>

                  <li>
                    Randomly inserting citation entries in an effort to promote
                    citation could lead to major editorial challenges.
                  </li>

                  <li>
                    Keep self-citation at a reasonable level and cite only works
                    that directly relate to the research work being presented.
                  </li>

                  <li>
                    Make use of the journal's requested citation format as
                    specified in the instructions for authors.
                  </li>

                  <li>
                    Exercise due care with retracted and corrected information,
                    and ensure honest representation of cited material.
                  </li>

                  <li>
                    Ensure that the complete list of all citations made appears
                    on the reference pages of the paper.
                  </li>
                </ol>
              </section>

              {/* Unscrupulous Citation Practices */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Unscrupulous Practices in Relation to Citations
                </h3>

                <p className="mb-4">
                  Unscrupulous practices in relation to the use of citations
                  will be deemed inappropriate procedures, including but not
                  limited to the following:
                </p>

                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    The act of plagiarism or using someone else's intellectual
                    property without attribution of authorship.
                  </li>

                  <li>
                    Adding irrelevant citations to inflate citation counts.
                  </li>

                  <li>
                    Excessive self-citations without any academic
                    justification.
                  </li>

                  <li>
                    Involvement in citation cartels or other organised citation
                    manipulation.
                  </li>

                  <li>Fabrication of citations.</li>

                  <li>
                    Creating citation references for publications that do not
                    exist or incorrectly providing information on existing
                    publications.
                  </li>

                  <li>
                    Pressurised inclusion of personal publications by reviewers
                    or editors without sufficient citation support.
                  </li>

                  <li>
                    Pressured addition of references to elevate journal metrics,
                    including references to significant and directly relevant
                    arguments without proper recognition and description of how
                    they influence the author's work.
                  </li>
                </ol>
              </section>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Author;