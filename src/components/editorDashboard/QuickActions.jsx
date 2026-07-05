import {
  FaUsers,
  FaClipboardCheck,
  FaEnvelope,
  FaBullhorn,
  FaFileInvoice,
} from "react-icons/fa";

const actions = [
  {
    icon: <FaUsers />,
    title: "Assign Reviewer",
    desc: "Assign a reviewer to manuscript",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Make Editorial Decision",
    desc: "Accept, revise or reject manuscript",
  },
  {
    icon: <FaEnvelope />,
    title: "Send Message",
    desc: "Communicate with authors/reviewers",
  },
  {
    icon: <FaBullhorn />,
    title: "Create Announcement",
    desc: "Send announcement to users",
  },
  {
    icon: <FaFileInvoice />,
    title: "Generate Reports",
    desc: "View and download reports",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-full p-6">
      <h2 className="text-2xl font-bold text-[#171C44] mb-6">
        Quick Actions
      </h2>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <div
            key={index}
            className="
              flex
              items-center
              gap-4
              border
              border-gray-200
              rounded-xl
              p-4
              hover:bg-gray-50
              transition
              cursor-pointer
            "
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              {action.icon}
            </div>

            <div>
              <h4 className="font-semibold text-[#171C44] text-sm">
                {action.title}
              </h4>

              <p className="text-xs text-gray-500">
                {action.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}