export default function ManuscriptTable() {
  const data = [
    {
      id: "FP-2024-1025",
      title: "Advancements in Forensic DNA Analysis",
      author: "Dr. A. Sharma",
      assigned: "15 May 2024",
      due: "30 May 2024",
      status: "Pending",
    },
    {
      id: "FP-2024-1024",
      title: "Forensic Entomology Review",
      author: "Dr. R. Verma",
      assigned: "10 May 2024",
      due: "25 May 2024",
      status: "Pending",
    },
    {
      id: "FP-2024-1023",
      title: "Fingerprint Analysis Using AI",
      author: "Ms. P. Singh",
      assigned: "05 May 2024",
      due: "20 May 2024",
      status: "Pending",
    },
    {
      id: "FP-2024-1022",
      title: "Ballistic Evidence Examination",
      author: "Dr. K. Patel",
      assigned: "20 Apr 2024",
      due: "Completed",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="flex justify-between items-center p-5 border-b">
        <h2 className="text-xl font-bold text-[#171c44]">
          Your Manuscript Reviews
        </h2>

        <button className="text-blue-600 font-semibold">
          View All
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">Manuscript ID</th>
            <th className="p-4 text-left">Paper Title</th>
            <th className="p-4 text-left">Author</th>
            <th className="p-4 text-left">Date Assigned</th>
            <th className="p-4 text-left">Due Date</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="p-4">{item.id}</td>

              <td className="p-4">{item.title}</td>

              <td className="p-4">{item.author}</td>

              <td className="p-4">{item.assigned}</td>

              <td className="p-4 text-red-500 font-medium">
                {item.due}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-4">
                <button
                  className={`px-6 py-2 rounded-lg text-white ${
                    item.status === "Pending"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600"
                      : "bg-green-500"
                  }`}
                >
                  {item.status === "Pending"
                    ? "Review"
                    : "View"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}