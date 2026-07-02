import {
  FaFileAlt,
  FaBell,
  FaCheckCircle,
  FaEnvelope,
} from "react-icons/fa";

export default function RecentActivity() {
  const activity = [
    {
      icon: <FaFileAlt />,
      title: "New manuscript assigned",
      time: "2 hours ago",
    },
    {
      icon: <FaBell />,
      title: "Review reminder",
      time: "1 day ago",
    },
    {
      icon: <FaCheckCircle />,
      title: "Review submitted",
      time: "3 days ago",
    },
    {
      icon: <FaEnvelope />,
      title: "Editorial message",
      time: "5 days ago",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">
      <h2 className="text-xl font-bold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-6">
        {activity.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              {item.icon}
            </div>

            <div>
              <h4 className="font-semibold">
                {item.title}
              </h4>

              <p className="text-gray-500 text-sm">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}