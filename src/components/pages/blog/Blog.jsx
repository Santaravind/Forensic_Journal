// import React from "react";
// import logo from "../assets/logoss.png";
// function Blog() {
//   return (
//     <>
//       <div className="max-w-8xl justify-center items-center">
//         <div className="w-20 h-20 rounded-full  items-center">
//           <img src={logo} alt="logo" width={200} height={200} />
//         </div>
//         <div className="text-2xl font-black ">
//            <h1>Forensic Patrika</h1>
//         </div>

//         <div className="grid grid-cols-1  ">
//           <div className="box-border size-2px p-4 m-4">
//           <div className="">
//           <div className="ml-10 mt-20 ">
//             <h1 className="text-4xl font-medium">main title</h1>
//           </div>
//           <div className="max-w-6xl text-2xl font-sans  mr-4">
//             <p className="">
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since 1966, when designers at Letraset and James Mosley, the
//               librarian at St Bride Printing Library in London, took a 1914
//               Cicero translation and scrambled it to make dummy text for
//               Letraset's Body Type sheets. It has survived not only many
//               decades, but also the leap into electronic typesetting, remaining
//               essentially unchanged. It was popularised thanks to these sheets
//               and more recently with desktop publishing software like Aldus
//               PageMaker and Microsoft Word including versions of Lorem Ipsum.
//             </p>
//           </div>
//         </div>
//         <div>
//           <h2 className="text-2xl ">Sub title</h2>
//         </div>
//         <div>
//           <p>
//             Why do we use it? It is a long established fact that a reader will
//             be distracted by the readable content of a page when looking at its
//             layout. The point of using Lorem Ipsum is that it has a more-or-less
//             normal distribution of letters, as opposed to using 'Content here,
//             content here', making it look like readable English. Many desktop
//             publishing packages and web page editors now use Lorem Ipsum as
//             their default model text, and a search for 'lorem ipsum' will
//             uncover many web sites still in their infancy. Various versions have
//             evolved over the years, sometimes by accident, sometimes on purpose
//             (injected humour and the like).
//           </p>
//         </div>

//         </div>

//         </div>


//       </div>
//     </>
//   );
// }

// export default Blog;

import React from "react";
import logo from "../../assets/logos.png";
import { useNavigate } from "react-router-dom";
const BLOG_POSTS = [
  {
    id: 1,
    category: "Forensic Science",
    title: "Understanding Digital Evidence in Modern Investigations",
    excerpt: "Exploring the fundamentals of extracting, preserving, and analyzing digital artifacts across various file systems and devices.",
    date: "Aug 24, 2026",
    readTime: "5 min read",
    author: "Dr. A. Sharma"
  },
  {
    id: 2,
    category: "Cyber Security",
    title: "Network Intrusion Analysis and Incident Response",
    excerpt: "A deep dive into packet analysis, log monitoring, and immediate mitigation techniques during active security breaches.",
    date: "Aug 22, 2026",
    readTime: "8 min read",
    author: "R. Verma"
  },
  {
    id: 3,
    category: "Criminology",
    title: "Psychological Profiling in Complex Case Studies",
    excerpt: "How behavioral patterns assist forensic teams in establishing motives and narrowing down suspect pools.",
    date: "Aug 18, 2026",
    readTime: "6 min read",
    author: "S. Kapoor"
  },
  {
    id: 4,
    category: "Legal & Ethics",
    title: "Chain of Custody Protocols in Courtroom Admissibility",
    excerpt: "Maintaining strict evidentiary standards to ensure digital and physical evidence withstands legal scrutiny.",
    date: "Aug 15, 2026",
    readTime: "4 min read",
    author: "M. Nambiar"
  },
  {
    id: 5,
    category: "Legal & Ethics",
    title: "Chain of Custody Protocols in Courtroom Admissibility",
    excerpt: "Maintaining strict evidentiary standards to ensure digital and physical evidence withstands legal scrutiny.",
    date: "Aug 15, 2026",
    readTime: "4 min read",
    author: "M. Nambiar"
  },
  {
    id: 6,
    category: "Legal & Ethics",
    title: "Chain of Custody Protocols in Courtroom Admissibility",
    excerpt: "Maintaining strict evidentiary standards to ensure digital and physical evidence withstands legal scrutiny.Maintaining strict evidentiary standards to ensure digital and physical evidence withstands legal scrutiny.Maintaining strict evidentiary standards to ensure digital and physical evidence withstands legal scrutiny.",
    date: "Aug 15, 2026",
    readTime: "4 min read",
    author: "M. Nambiar"
  }
];

function Blog() {
   const navigate=useNavigate();

const handalBlog=(e)=>{
      e.preventDefault();
       navigate("/postb");
       
}
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header / Navbar */}
      {/* <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Forensic Patrika Logo" className="h-10 w-10 object-contain rounded-full" />
            <span className="text-2xl font-black tracking-tight text-slate-900">Forensic Patrika</span>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#all" className="hover:text-slate-900">All Posts</a>
            <a href="#forensics" className="hover:text-slate-900">Forensics</a>
            <a href="#cyber" className="hover:text-slate-900">Cyber</a>
            <a href="#criminology" className="hover:text-slate-900">Criminology</a>
          </nav>
        </div>
      </header> */}

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-6 py-10">
       

        {/* Categories Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
        </div>

        {/* Multi-Column Article Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div>
                <span className="inline-block rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                  {post.category}
                </span>
                <h3 className="mt-3 text-xl font-bold leading-snug text-slate-900 hover:text-indigo-600 cursor-pointer">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                <span>{post.author}</span>
                <span>{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
        <section className="mt-6 flex w-fit items-center rounded-2xl border border-slate-200 bg-white p-4 text-base text-slate-600 shadow-sm">
  <p className="flex items-center gap-2 font-medium">
    Want to publish your own article?
    <button onClick={handalBlog} className="font-semibold text-indigo-600 transition-colors hover:text-indigo-800 hover:underline cursor-pointer">
      Click here
    </button>
  </p>
</section>
      </main>
      
    </div>
  );
}

export default Blog;
