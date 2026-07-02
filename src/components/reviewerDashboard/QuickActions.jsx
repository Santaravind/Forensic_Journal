import {
  FaFileAlt,
  FaUpload,
  FaBook,
  FaDownload,
} from "react-icons/fa";

export default function QuickActions() {
  const actions = [
    {
      icon: <FaFileAlt />,
      title: "View Assigned Manuscripts",
    },
    {
      icon: <FaUpload />,
      title: "Submit A Review",
    },
    {
      icon: <FaBook />,
      title: "Review Guidelines",
    },
    {
      icon: <FaDownload />,
      title: "Download Reviewer Form",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">
      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="space-y-4">
        {actions.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                {item.icon}
              </div>

              <span className="font-medium">
                {item.title}
              </span>
            </div>

            <span>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}