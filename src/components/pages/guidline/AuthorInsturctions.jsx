import React, { useState } from 'react';
import { ChevronDown, BookOpen, FileText, CheckCircle } from 'lucide-react';
import logo from '../../assets/logos.png'
export default function AuthorInsturctions() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'types',
      title: 'Types of Manuscripts',
      icon: '📄',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">Forensic Patrika publishes the following types of manuscripts:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Original Research Paper',
              'Review Paper',
                'Case study'
            ].map((type, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-emerald-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">{type}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-blue-900"><strong>Note:</strong> The Editorial Board reserves the right to determine the most appropriate manuscript category for a submission.</p>
          </div>
        </div>
      )
    },
    {
      id: 'editorial',
      title: 'Editorial Procedure',
      icon: '⚖️',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">Forensic Patrika employs peer review (single/double/triple blind) procedures for fairness, impartiality and intellectual honesty.</p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-3">Anonymization Requirements</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span className="text-indigo-600">•</span>
                <span>No identifying names of authors</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-600">•</span>
                <span>No title that may indirectly lead to identification</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-600">•</span>
                <span>No acknowledgements that may identify the author</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-600">•</span>
                <span>No identifying metadata, statement or figure</span>
              </li>
            </ul>
          </div>
          <p className="text-gray-700 pt-4"><strong>Decision Criteria:</strong> Editorial decisions to accept and reject will be based exclusively on scientific quality, novelty of research, integrity, rigor and relevance.</p>
        </div>
      )
    },
    {
      id: 'selection',
      title: 'Manuscript Selection',
      icon: '📋',
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold">1</div>
              <div>
                <h4 className="font-semibold text-gray-900">Editorial Screening</h4>
                <p className="text-gray-700 mt-1">Examination of submissions with respect to journal scope, format policy, ethics policy, scientific originality and quality.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold">2</div>
              <div>
                <h4 className="font-semibold text-gray-900">Peer Review</h4>
                <p className="text-gray-700 mt-1">Qualified, independent expert reviewers provide comments and opinions to guide the Editorial Board.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold">3</div>
              <div>
                <h4 className="font-semibold text-gray-900">Final Decision</h4>
                <p className="text-gray-700 mt-1">Editor-In-Chief/Editorial Board makes the final decision: Accept, Minor/Major Revision, or Reject.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'submission',
      title: 'Manuscript Submission Policy',
      icon: '✅',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">By submitting a manuscript to Forensic Patrika, authors confirm that they:</p>
          <div className="space-y-3">
            {[
              'Have not published or submitted the work for publication in any other venue',
              'Accept full responsibility for the contents and authenticity of their manuscript',
              'All listed authors have read and approved the submitted manuscript',
              'Have obtained institutional approval/ethical consent if required',
              'Acknowledge all funding sources and disclose potential competing interests',
              'Confirm the manuscript does not contain fabricated/falsified or plagiarized content'
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <span className="text-amber-700 font-bold">✓</span>
                <span className="text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'preparation',
      title: 'Manuscript Preparation Guidelines',
      icon: '📝',
      content: (
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Format Requirements</h4>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-semibold">Language:</span> Professional academic English</li>
              <li><span className="font-semibold">File Format:</span> Microsoft Word (.doc or .docx)</li>
              <li><span className="font-semibold">Font:</span> Times New Roman 12pt</li>
              <li><span className="font-semibold">Line Spacing:</span> 1.5 or double space</li>
              <li><span className="font-semibold">Page Numbers:</span> Continuous numbering</li>
              <li><span className="font-semibold">Heading Styles:</span> Use automated heading styles for uniformity</li>
            </ul>
          </div>

          <div className="border-t pt-5">
            <h4 className="font-semibold text-gray-900 mb-3">Manuscript Structure (Original Research)</h4>
            <div className="space-y-2">
              {['Title', 'Abstract', 'Keywords', 'Introduction', 'Materials', 'Methods', 'Results', 'Discussion', 'Conclusion', 'Acknowledgements (optional)', 'Funding', 'Conflict of interest statement', 'Data availability statement (optional)', 'References', 'Supplementary material (optional)'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded transition">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">{idx + 1}</span>
                  <span className="text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'titlepage',
      title: 'Title Page Requirements',
      icon: '📌',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700"><strong>Important:</strong> Title page must be sent separately from the blinded manuscript for anonymous peer review.</p>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Required Title Page Information</h4>
            <ul className="space-y-2 text-gray-700">
              {[
                'Full title of the manuscript',
                'Short running title (if applicable)',
                'Full name(s) of all authors',
                'Institution of each author',
                'ORCID ID (if available)',
                'Name of the corresponding author',
                'Mailing address of the corresponding author',
                'Contact e-mail of the corresponding author',
                'Contact number (optional)',
                'Total number of tables, figures, and supplementary files'
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-green-600 font-bold">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'abstract',
      title: 'Abstract & Keywords',
      icon: '💡',
      content: (
        <div className="space-y-5">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Abstract</h4>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-800 mb-3">Provide an informative, brief and accurate summary that includes:</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Purpose of the work</li>
                <li>• Methodology</li>
                <li>• Main results</li>
                <li>• Concise conclusion</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3 italic">Should allow readers to appreciate the contribution without reading the entire manuscript.</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Keywords</h4>
            <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
              <p className="text-gray-800 mb-2"><strong>Submit 4-8 keywords</strong> that:</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Correspond with major ideas and methodology</li>
                <li>• Use scientific technicalities for discoverability</li>
                <li>• Don't just reflect words in the title</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'writingstyle',
      title: 'Writing Style & Language',
      icon: '✍️',
      content: (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">✓ Good Practices</h4>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Accurate, concise, clear English</li>
                <li>• Objective and unambiguous</li>
                <li>• Active voice preferred</li>
                <li>• Uniform tense throughout</li>
                <li>• Inclusive & respectful language</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">✗ Avoid</h4>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Redundancy and obscurity</li>
                <li>• Common jargon</li>
                <li>• Convoluted expressions</li>
                <li>• Passive voice (when avoidable)</li>
                <li>• Biased or exclusive language</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Scientific Terminology</h4>
            <div className="space-y-2 text-gray-700">
              <p>• Use international standards for nomenclature and abbreviations</p>
              <p>• SI (International System of Units) must be employed</p>
              <p>• Define specialized terminology with sufficient explanation</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tables-figures',
      title: 'Tables & Figures',
      icon: '📊',
      content: (
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Tables</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Consecutively numbered with Arabic numerals</li>
              <li>✓ Short and descriptive title</li>
              <li>✓ Clear presentation and avoid duplication</li>
              <li>✓ Abbreviations and notes cited under the table</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Figures & Illustrations</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Excellent resolution quality</li>
              <li>✓ Publishable form (graphs, diagrams, plates)</li>
              <li>✓ Numbered individually with references in text</li>
              <li>✓ Caption immediately under the figure</li>
              <li>✓ Genuine portrayal of results</li>
              <li>✓ No manipulated information without documentation</li>
              <li>✓ Permissions obtained if previously published</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'research-ethics',
      title: 'Research Ethics & Compliance',
      icon: '⚠️',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-lg border-l-4 border-red-500">
            <h4 className="font-semibold text-gray-900 mb-3">Human Participants</h4>
            <p className="text-gray-700 mb-2">Ethical approval required from:</p>
            <ul className="space-y-1 text-gray-700 mb-3">
              <li>• Institution Ethics Committee, or</li>
              <li>• Institutional Review Board (IRB)</li>
            </ul>
            <p className="text-gray-700 text-sm"><strong>Must include:</strong> Ethics Committee name, approval reference number(s), and confirmation that study was conducted in accordance with ethical guidelines.</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-gray-900 mb-3">Animal Research</h4>
            <p className="text-gray-700 mb-2">All animal experiments must comply with:</p>
            <ul className="space-y-1 text-gray-700 mb-3">
              <li>• National and institutional regulations</li>
              <li>• International standards for humane care</li>
              <li>• Animal Ethics Committee approval</li>
            </ul>
            <p className="text-gray-700 text-sm"><strong>Authors must:</strong> Limit pain, suffering, and number of animals used.</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-semibold text-gray-900 mb-3">Informed Consent</h4>
            <p className="text-gray-700">Required for research involving human subjects, identifiable personal data, interviews, clinical material, photographs, tape recordings, or reports.</p>
          </div>
        </div>
      )
    },
    {
      id: 'afteracceptance',
      title: 'After Acceptance & Publication',
      icon: '🎉',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Production Process</h4>
            <p className="text-gray-700 mb-3">Manuscripts undergo:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2"><span className="text-blue-600">→</span> Copy editing</li>
              <li className="flex gap-2"><span className="text-blue-600">→</span> Typesetting</li>
              <li className="flex gap-2"><span className="text-blue-600">→</span> Formatting</li>
              <li className="flex gap-2"><span className="text-blue-600">→</span> Quality assessment</li>
            </ul>
            <p className="text-gray-700 mt-3 text-sm"><strong>Important:</strong> Authors cannot significantly change scientific elements once accepted.</p>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Proofreading</h4>
            <p className="text-gray-700 mb-2">Corresponding author receives page proofs to check for:</p>
            <ul className="space-y-1 text-gray-700">
              <li>• Printer's errors</li>
              <li>• Formatting discrepancies</li>
              <li>• Production-nature errors</li>
            </ul>
            <p className="text-gray-700 text-sm mt-3 italic">Proof amendments should only correct errors, not scientific content.</p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Online Publication</h4>
            <p className="text-gray-700">• Accepted articles made available online on accelerated basis</p>
            <p className="text-gray-700">• Eligible for persistent identifier (DOI)</p>
            <p className="text-gray-700">• Becomes part of published scholarly record</p>
          </div>
        </div>
      )
    },
    {
      id: 'copyright',
      title: 'Copyright & Licensing',
      icon: '©️',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Author Responsibilities</h4>
            <p className="text-gray-700 mb-3">Authors are responsible for ensuring that:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2"><span className="font-bold text-slate-700">•</span> Content does not violate intellectual property rights of others</li>
              <li className="flex gap-2"><span className="font-bold text-slate-700">•</span> All third-party copyrighted work has written permission</li>
              <li className="flex gap-2"><span className="font-bold text-slate-700">•</span> All reused copyright material is properly cited</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-gray-900 mb-3">License Agreement</h4>
            <p className="text-gray-700">Upon acceptance, authors license the article to Forensic Patrika to:</p>
            <ul className="space-y-1 text-gray-700 mt-2">
              <li>• Archive, print, and reproduce the material</li>
              <li>• Distribute in electronic and other formats</li>
              <li>• Publish in various editions as appropriate</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const overviewStats = [
    { label: 'Manuscript Types', value: '3' },
    { label: 'Required Keywords', value: '4-8' },
    { label: 'Font Size', value: '12pt' },
    { label: 'Line Spacing', value: '1.5 - 2.0' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <img src={logo} className="w-20 h-20" />
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Forensic Patrika</h1>
              <p className="text-blue-200 text-sm">A Journal of Forensic Science</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mt-4">Instructions for Authors</h2>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['overview', 'guidelines'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab === 'overview' ? '📋 Overview' : '📚 Complete Guidelines'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Welcome to Forensic Patrika</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
               Welcome to Forensic Patrika. We are happy to have researchers and academics from across the world.  
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
               We invite outstanding scholarly articles and original research in forensic science and allied disciplines that have the potential to increase knowledge, education, and help improve practice and serve the best interests of several scholars.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {overviewStats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-6 text-center border-t-4 border-emerald-500 hover:shadow-lg transition">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Key Points */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-lg p-8 border-l-4 border-amber-500">
              <h3 className="text-xl font-bold text-gray-900 mb-5">Key Submission Points</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Work must be original and not published elsewhere',
                  'All authors must read and approve the manuscript',
                  'Obtain ethical approval if required',
                  'Disclose all funding sources',
                  'No fabricated or plagiarized content',
                  'Include competing interests disclosure'
                ].map((point, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="text-2xl">✓</span>
                    <span className="text-gray-800">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Guidelines Tab */}
        {activeTab === 'guidelines' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-blue-600">
              <h3 className="text-lg font-bold text-gray-900">Quick Navigation</h3>
              <p className="text-gray-600 text-sm mt-2">Click on any section to expand and view detailed guidelines</p>
            </div>

            {/* Accordion Sections */}
            {sections.map((section) => (
              <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition"
                >
                  <div className="flex items-center gap-4 text-left flex-1">
                    <span className="text-2xl">{section.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-600 transition-transform ${
                      expandedSection === section.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedSection === section.id && (
                  <div className="px-6 py-6 border-t border-gray-200 bg-white animate-in fade-in">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 border-t border-gray-300 pt-8 pb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Important Reminders</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2"><span className="font-bold text-blue-600">→</span> Submit complete manuscripts through the Forensic Patrika online portal</li>
              <li className="flex gap-2"><span className="font-bold text-blue-600">→</span> Include all supporting documents: declaration, ethical statement, supplementary files</li>
              <li className="flex gap-2"><span className="font-bold text-blue-600">→</span> Title page must be submitted separately for anonymous peer review</li>
              <li className="flex gap-2"><span className="font-bold text-blue-606">→</span> Authors cannot significantly change scientific elements after acceptance</li>
            </ul>
          </div>

          <div className="mt-6 text-center text-gray-600 text-sm">
            <p>© Forensic Patrika - A Journal of Forensic Science</p>
            <p className="mt-2">For submission inquiries, contact the Editorial Office through the official portal</p>
          </div>
        </div>
      </main>
    </div>
  );
}
// export default AuthorInsturctions
