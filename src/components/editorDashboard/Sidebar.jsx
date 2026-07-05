import {
  FaHome,
  FaFileAlt,
  FaUsers,
  FaGavel,
  FaBookOpen,
  FaChartBar,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-[285px] min-h-screen bg-gradient-to-b from-[#1b237e] via-[#261c88] to-[#45108a] text-white flex flex-col border-r border-white/10 overflow-auto">

      {/* Logo Section */}
      <div className="pt-6 pb-4 flex flex-col items-center">
        <img
          src="/logo.png"
          alt="logo"
          className="w-24 h-24 object-contain"
        />

        <h2 className="text-[16px] font-bold mt-3 tracking-wide">
          FORENSIC PATRIKA
        </h2>

        <p className="text-gray-300 text-sm mt-1">
          Official Portal
        </p>
      </div>

      {/* Portal Card */}
      <div className="mx-4 bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
          <FaShieldAlt size={22} />
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            EDITOR PORTAL
          </h3>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 flex-1">

        <MenuItem
          active
          icon={<FaHome />}
          title="Dashboard"
        />

        <MenuItem
          icon={<FaFileAlt />}
          title="Submissions"
          dropdown
        />

        <MenuItem
          icon={<FaFileAlt />}
          title="Manuscripts"
          dropdown
        />

        <MenuItem
          icon={<FaUsers />}
          title="Peer Review"
          dropdown
        />

        <MenuItem
          icon={<FaGavel />}
          title="Editorial Decisions"
        />

        <MenuItem
          icon={<FaBookOpen />}
          title="Issues & Publishing"
        />

        <MenuItem
          icon={<FaUsers />}
          title="Users & Roles"
        />

        <MenuItem
          icon={<FaChartBar />}
          title="Analytics & Reports"
        />

        <MenuItem
          icon={<FaEnvelope />}
          title="Messages"
          badge="6"
        />

        <MenuItem
          icon={<FaCog />}
          title="Journal Settings"
        />
      </div>

      {/* Logout */}
      <div className="px-4 border-t border-white/10 pt-3">
        <button className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-white/10 transition">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

      {/* Help Card */}
      <div className="p-4">
        <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <FaHeadset size={20} />
            </div>

            <div>
              <h3 className="font-semibold">
                Need Help?
              </h3>

              <p className="text-xs text-gray-300 mt-1">
                Contact Editorial Office
              </p>

              <p className="text-sm mt-2">
                editor@forensicpatrika.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  title,
  active = false,
  dropdown = false,
  badge,
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer mb-2 transition-all
      ${
        active
          ? "bg-gradient-to-r from-[#3B82F6] to-[#9333EA] shadow-lg"
          : "hover:bg-white/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>

        <span className="font-medium text-[15px]">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {badge && (
          <span className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
            {badge}
          </span>
        )}

        {dropdown && (
          <FaChevronDown className="text-xs" />
        )}
      </div>
    </div>
  );
}