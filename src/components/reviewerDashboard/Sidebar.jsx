import {
  FaHome,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaEnvelope,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaHeadset,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-[290px] bg-gradient-to-b from-[#111b67] to-[#5a0db7] text-white flex flex-col">
      <div className="text-center py-8">
        <img
          src="/logo.png"
          alt=""
          className="w-28 mx-auto"
        />

        <h2 className="font-bold text-2xl mt-4">
          FORENSIC PATRIKA
        </h2>

        <p className="text-gray-300">
          Official Portal
        </p>
      </div>

      <div className="px-4">
        <div className="bg-white/10 rounded-xl p-4 flex items-center gap-3 mb-5">
          <FaUser />
          <span className="font-semibold">
            REVIEWER PORTAL
          </span>
        </div>

        <Menu icon={<FaHome />} text="Dashboard" active />
        <Menu icon={<FaFileAlt />} text="Assigned Manuscripts" />
        <Menu icon={<FaClock />} text="Pending Reviews" />
        <Menu icon={<FaCheckCircle />} text="Completed Reviews" />
        <Menu icon={<FaEnvelope />} text="Messages" />
        <Menu icon={<FaUser />} text="Profile" />
        <Menu icon={<FaCog />} text="Settings" />
      </div>

      <div className="mt-auto p-4">
        <div className="bg-white/10 rounded-xl p-5">
          <div className="flex gap-3">
            <FaHeadset size={20} />
            <div>
              <h3 className="font-semibold">
                Need Help?
              </h3>

              <p className="text-sm text-gray-300">
                editor@forensicpatrika.com
              </p>
            </div>
          </div>
        </div>

        <button className="w-full mt-4 flex items-center gap-3 p-4 rounded-xl hover:bg-white/10">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

function Menu({ icon, text, active }) {
  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer mb-2 ${
        active
          ? "bg-gradient-to-r from-blue-600 to-purple-600"
          : "hover:bg-white/10"
      }`}
    >
      {icon}
      {text}
    </div>
  );
}