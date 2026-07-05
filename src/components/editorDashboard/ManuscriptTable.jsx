import { FaChevronDown } from "react-icons/fa";

export default function ManuscriptTable() {
  const manuscripts = [
    {
      id: "FP-2026-1056",
      title:
        "Advancements in Forensic DNA Analysis Using NGS Technologies",
      author: "Mr Indresh",
      date: "15 May 2026",
      status: "Under Review",
      stage: "Peer Review",
    },

    {
      id: "FP-2026-1055",
      title:
        "Forensic Entomology: A Review of Recent Applications",
      author: "Mr Indresh",
      date: "12 May 2026",
      status: "Under Review",
      stage: "Peer Review",
    },

    {
      id: "FP-2026-1054",
      title:
        "Fingerprint Analysis Using Deep Learning Techniques",
      author: "Mr Indresh",
      date: "10 May 2026",
      status: "Awaiting Decision",
      stage: "Editorial Decision",
    },

    {
      id: "FP-2026-1053",
      title:
        "Ballistic Evidence Examination: Methods and Challenges",
      author: "Mr Indresh",
      date: "08 May 2026",
      status: "Awaiting Decision",
      stage: "Editorial Decision",
    },

    {
      id: "FP-2026-1052",
      title:
        "Digital Forensics in Cyber Crime Investigation",
      author: "Mr Indresh",
      date: "05 May 2026",
      status: "New Submission",
      stage: "Initial Check",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-100 text-yellow-700";

      case "Awaiting Decision":
        return "bg-green-100 text-green-700";

      case "New Submission":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mt-6">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b">
        <h2 className="text-2xl font-bold text-[#171C44]">
          Manuscript Overview
        </h2>

        <button className="text-blue-600 font-semibold hover:underline">
          View All Manuscripts
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-[#F8F9FD]">
            <tr className="text-left">

              <th className="px-5 py-4 font-semibold text-[#171C44]">
                Manuscript ID
              </th>

              <th className="px-5 py-4 font-semibold text-[#171C44]">
                Title
              </th>

              <th className="px-5 py-4 font-semibold text-[#171C44]">
                Author
              </th>

              <th className="px-5 py-4 font-semibold text-[#171C44]">
                Date Submitted
              </th>

              <th className="px-5 py-4 font-semibold text-[#171C44]">
                Status
              </th>

              <th className="px-5 py-4 font-semibold text-[#171C44]">
                Current Stage
              </th>

              <th className="px-5 py-4 font-semibold text-[#171C44]">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {manuscripts.map((item, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-5 py-5 whitespace-nowrap">
                  {item.id}
                </td>

                <td className="px-5 py-5 max-w-[320px]">
                  {item.title}
                </td>

                <td className="px-5 py-5 whitespace-nowrap">
                  {item.author}
                </td>

                <td className="px-5 py-5 whitespace-nowrap">
                  {item.date}
                </td>

                <td className="px-5 py-5">
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-5 py-5 whitespace-nowrap">
                  {item.stage}
                </td>

                <td className="px-5 py-5">
                  <div className="flex items-center gap-3">

                    <button
                      className="
                      px-6
                      py-2
                      border
                      border-purple-300
                      rounded-lg
                      text-purple-700
                      font-medium
                      hover:bg-purple-50
                      transition
                    "
                    >
                      View
                    </button>

                    <FaChevronDown
                      className="text-gray-500 cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}