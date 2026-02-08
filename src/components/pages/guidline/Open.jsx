import React from 'react'

function Open() {
  return (
    <>
    <div class="w-full bg-gradient-to-b from-slate-50 to-white min-h-screen py-12 px-4 sm:px-6">
  <div class="max-w-4xl mx-auto">
    
    {/* Page Header */}
    <div class="text-center mb-16">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
        Open Access Policy
      </h1>
      <div class="inline-block px-5 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full">
        <p class="text-lg font-semibold text-indigo-700">
          FORENSIC PATRIKA : A Journal of Forensic Science
        </p>
      </div>
      <div class="mt-6 text-slate-600 max-w-2xl mx-auto">
        <p class="text-lg">Transparent, equitable, and unrestricted access to forensic science research</p>
      </div>
    </div>

    {/* Policy Card */}
    <div class="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Card Header */}
      <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-white">Our Commitment to Open Science</h2>
            <p class="text-slate-300 mt-2">All content freely available to the global research community</p>
          </div>
          <div class="mt-4 md:mt-0">
            <span class="inline-flex items-center px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Full Open Access
            </span>
          </div>
        </div>
      </div>

      {/* Policy Content */}
      <div class="p-8 md:p-10 space-y-8">
        
        {/* Introduction Section */}
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-1/12 flex justify-center">
            <div class="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full">
              <span class="font-bold">1</span>
            </div>
          </div>
          <div class="md:w-11/12">
            <p class="text-slate-700 leading-relaxed">
              <span class="font-bold text-slate-900">FORENSIC PATRIKA : A Journal of Forensic Science </span> 
              adheres strictly to an Open Access publication model in accordance with established 
              principles of scholarly communication and knowledge dissemination. All articles 
              published in the journal are made <span class="font-semibold text-indigo-700">freely, immediately, and permanently</span> 
              available online without any subscription charges, access fees, or financial barriers for readers.
            </p>
          </div>
        </div>

        {/* User Permissions */}
        <div class="border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-50/50 rounded-r-lg">
          <h3 class="text-xl font-bold text-slate-800 mb-4">Permitted Use of Published Content</h3>
          <p class="text-slate-700 mb-4">
            Under this policy, users are permitted to read, download, copy, distribute, print, search, 
            link to the full texts of articles, and cite published content, provided that appropriate 
            acknowledgment and attribution are given to the original author(s) and the journal.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-slate-700">Appropriate attribution required</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-slate-700">Maintain integrity of original work</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <span class="text-slate-700">No unauthorized modification</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <span class="text-slate-700">No commercial exploitation</span>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-1/12 flex justify-center">
            <div class="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-700 rounded-full">
              <span class="font-bold">2</span>
            </div>
          </div>
          <div class="md:w-11/12">
            <p class="text-slate-700 leading-relaxed">
              The Open Access model adopted by <span class="font-bold text-slate-900">FORENSIC PATRIKA </span> 
              is intended to promote the widest possible dissemination of forensic science research, 
              enhance academic visibility and citation impact for authors, and ensure equitable access 
              to scholarly knowledge for students, researchers, practitioners, and the advancement of 
              forensic science research.
            </p>
          </div>
        </div>

        {/* Permanent Access */}
        <div class="bg-gradient-to-r from-slate-50 to-white p-6 rounded-xl border border-slate-200">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div class="ml-4">
              <h4 class="text-lg font-bold text-slate-800">Permanent Accessibility</h4>
              <p class="text-slate-700 mt-1">
                Once an article is published, it remains permanently accessible on the journal's 
                platform and may not be withdrawn except under exceptional circumstances involving 
                ethical violations, legal obligations, or significant breaches of publication standards. 
                Any such action will be taken in accordance with the journal's retraction and correction policies.
              </p>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div class="pt-6 border-t border-slate-200">
          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/12 flex justify-center">
              <div class="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-full">
                <span class="font-bold">3</span>
              </div>
            </div>
            <div class="md:w-11/12">
              <p class="text-slate-700 leading-relaxed">
                Through its Open Access policy, <span class="font-bold text-slate-900">FORENSIC PATRIKA : A Journal of Forensic Science</span> 
                reaffirms its commitment to transparency, academic integrity, responsible knowledge sharing, 
                and the advancement of ethically rigorous forensic scholarship.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Card Footer */}
      {/* <div class="bg-slate-50 p-6 border-t border-slate-200">
        <div class="flex flex-col sm:flex-row justify-between items-center">
          <div class="text-sm text-slate-600">
            <p>Last updated: March 2024 | Policy ID: FP-OA-2024-001</p>
          </div>
          <div class="mt-4 sm:mt-0">
            <a href="#" class="inline-flex items-center text-indigo-700 font-semibold hover:text-indigo-800">
              Download PDF Version
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div> */}
    </div>

    {/* Additional Info */}
    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100">
        <h3 class="text-lg font-bold text-slate-800 mb-3">Benefits for Authors</h3>
        <ul class="space-y-2 text-slate-700">
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Increased visibility and citation impact</span>
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Retain copyright of published work</span>
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Global dissemination of research</span>
          </li>
        </ul>
      </div>
      <div class="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200">
        <h3 class="text-lg font-bold text-slate-800 mb-3">License Information</h3>
        <p class="text-slate-700 mb-4">
          All content is published under a Creative Commons Attribution 4.0 International License (CC BY 4.0).
        </p>
        <div class="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-800 rounded-lg text-sm font-medium">
          <span>CC BY 4.0</span>
        </div>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
        <h3 class="text-lg font-bold text-slate-800 mb-3">Contact for Queries</h3>
        <p class="text-slate-700 mb-4">
          For questions regarding our Open Access policy or permissions, please contact:
        </p>
        <a href="mailto:openaccess@forensicpatrika.com" class="text-indigo-700 font-medium hover:text-indigo-800">
          f.patrika.india@gmail.com
        </a>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Open
