import React from 'react'

function Publication() {
  return (
    <div>
      <div className="w-full bg-linear-to-b from-slate-50 to-white py-16 px-4">
  <div className="max-w-6xl mx-auto">

    {/* Page Header */}
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
        Publication Procedure
      </h1>
      <p className="mt-3 text-lg font-medium text-indigo-700">
        FORENSIC PATRIKA : A Journal of Forensic Science
      </p>
    </div>

    {/* Content Card */}
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12 space-y-6 text-slate-700 leading-relaxed">

      <p>
        The publication procedure at{" "}
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </span>{" "}
        is structured to ensure academic quality, transparency, and a
        supportive experience for authors.
      </p>

      <p>
        Upon submission, each manuscript undergoes an initial editorial
        screening to evaluate its relevance to the journal’s scope,
        compliance with submission guidelines, and adherence to ethical
        and plagiarism standards. Manuscripts that satisfy these
        preliminary criteria are subsequently forwarded for peer review.
      </p>

      <p>
        Following the completion of the peer-review process and final
        approval by the editorial team, accepted manuscripts are scheduled
        for publication in the appropriate issue or volume. Authors are
        informed of the status of their submission at each stage of the
        process and are provided with relevant editorial and reviewer
        feedback.
      </p>

      <p>
        Once published, all articles are made freely accessible under an
        Open Access model to facilitate wider dissemination and academic
        engagement.
      </p>

      <p>
        Through this systematic publication procedure,{" "}
        <span className="font-semibold text-slate-900">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </span>{" "}
        seeks to uphold scholarly standards while actively encouraging and
        supporting meaningful student-led research.
      </p>

    </div>
  </div>
</div>

    </div>
  )
}

export default Publication
