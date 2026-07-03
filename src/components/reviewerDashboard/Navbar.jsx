import { FaBell, FaBars } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="bg-white px-8 py-5 flex justify-between items-center border-b">
      <FaBars size={22} />

      <div className="flex items-center gap-8">
        <input
          type="text"
          placeholder="Search manuscripts, authors..."
          className="w-[450px] border rounded-xl px-5 py-3 outline-none"
        />

        <div className="relative">
          <FaBell size={22} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
            2
          </span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/50"
            className="rounded-full"
          />

          <div>
            <h4 className="font-semibold">
              Mr . Indresh kumar
            </h4>

            <p className="text-sm text-gray-500">
              Reviewer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}