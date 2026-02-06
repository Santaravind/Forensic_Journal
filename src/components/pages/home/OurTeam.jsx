import React from 'react';
import { FaGraduationCap, FaUniversity, FaUserTie } from 'react-icons/fa';
import logo from '../../assets/indresh.jpeg';

function OurTeam() {
  const team = [
    {
      id: 1,
      name: "Dr. Sant ",
      image: logo, // Use the imported variable directly
      post: "Professor",
      position: "Head of Department",
      college: "University of Science & Tech"
    },
   {
      id: 2,
      name: "Dr. Sant ",
      image: logo, // Use the imported variable directly
      post: "Professor",
      position: "Head of Department",
      college: "University of Science & Tech"
    },
    {
      id: 3,
      name: "Dr. Sant ",
      image: logo, // Use the imported variable directly
      post: "Professor",
      position: "Head of Department",
      college: "University of Science & Tech"
    },
    {
      id: 4,
      name: "Rahul",
      image: logo, // Use the imported variable directly
      post: "Professor",
      position: "Head of Department",
      college: "University of Science & Tech"
    },
    {
      id: 5,
      name: "Rahul",
      image: logo, // Use the imported variable directly
      post: "Professor",
      position: "Head of Department",
      college: "University of Science & Tech"
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 border-t-2  border-b-2 rounded-lg shadow mt-3 mr-3 ml-3    ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Editorial Team</h2>
          <div className="mt-2 h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Flex Container for Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member) => (
            <div 
              key={member.id} 
              className="flex flex-col bg-white rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-gray-100 w-full sm:w-75 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Profile Image */}
              <div className="relative mb-6 mx-auto">
                <div className="absolute inset-0 bg-blue-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform"></div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="relative w-32 h-32 object-cover rounded-2xl border-4 border-white shadow-md"
                />
              </div>

              {/* Content */}
              <div className="text-center space-y-3">
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <p className="flex items-center justify-center gap-2 font-semibold text-blue-600">
                    <FaUserTie /> {member.post}
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <FaGraduationCap /> {member.position}
                  </p>
                  <p className="flex items-center justify-center gap-2 italic">
                    <FaUniversity /> {member.college}
                  </p>
                </div>
              </div>

              {/* Contact/Social Placeholder */}
              <div className="mt-6 pt-6 border-t border-gray-50">
                <button className="w-full py-2 bg-gray-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurTeam;