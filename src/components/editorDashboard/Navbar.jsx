import {
  FaBell,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";

import { IoPersonCircleSharp } from "react-icons/io5";

export default function Navbar() {
  return (
    <div className="h-[90px] bg-white border-b border-gray-200 px-8 flex items-center justify-between">

      {/* Left Side */}
      <div>
        <h1 className="text-[22px] font-bold text-[#161B4B]">
          Editor Dashboard
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Welcome back! Here's an overview of your journal management.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-8">

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search manuscripts, authors, etc..."
            className="w-[350px] h-[42px] border border-gray-300 rounded-xl pl-5 pr-12 outline-none focus:border-purple-500"
          />

          <FaSearch
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <FaBell
            size={22}
            className="text-[#1B237E]"
          />

          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-[10px]
              font-bold
              w-5
              h-5
              rounded-full
              flex
              items-center
              justify-center
            "
          >
            5
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">

          <IoPersonCircleSharp
            size={52}
            className="text-[#1B237E]"
          />

          <div>
            <h3 className="font-semibold text-[#161B4B]">
              Mr Indresh
            </h3>

            <p className="text-sm text-gray-500">
              Editor-In-Chief
            </p>
          </div>

          <FaChevronDown
            className="text-gray-500 ml-2"
          />
        </div>
      </div>
    </div>
  );
}