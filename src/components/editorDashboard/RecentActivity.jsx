import {
  FaFileAlt,
  FaUserCheck,
  FaClipboardCheck,
  FaGavel,
  FaBookOpen,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaFileAlt />,
    color: "bg-purple-100 text-purple-600",
    title: "New submission received",
    id: "FP-2026-1056",
    time: "1 hour ago",
  },
  {
    icon: <FaUserCheck />,
    color: "bg-yellow-100 text-yellow-600",
    title: "Reviewer assigned",
    id: "FP-2026-1055",
    time: "3 hours ago",
  },
  {
    icon: <FaClipboardCheck />,
    color: "bg-green-100 text-green-600",
    title: "Review submitted",
    id: "FP-2026-1054",
    time: "5 hours ago",
  },
  {
    icon: <FaGavel />,
    color: "bg-blue-100 text-blue-600",
    title: "Decision made (Accepted)",
    id: "FP-2026-1048",
    time: "1 day ago",
  },
  {
    icon: <FaBookOpen />,
    color: "bg-purple-100 text-purple-600",
    title: "Paper published",
    id: "FP-2026-1040",
    time: "2 days ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-full p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-[#171C44] mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5 flex-1">
        {activities.map((item, index) => (
          <div key={index} className="flex justify-between items-start">
            <div className="flex gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color}`}
              >
                {item.icon}
              </div>

              <div>
                <h4 className="font-semibold text-[#171C44] text-sm">
                  {item.title}
                </h4>

                <p className="text-gray-500 text-sm">
                  {item.id}
                </p>
              </div>
            </div>

            <span className="text-xs text-gray-500">
              {item.time}
            </span>
          </div>
        ))}
      </div>

      <button className="mt-4 text-blue-600 font-medium text-sm">
        View All Activity →
      </button>
    </div>
  );
}