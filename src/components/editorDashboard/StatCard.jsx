export default function StatCard({
  icon,
  value,
  title,
  subtitle,
  iconBg,
  borderColor,
}) {
  return (
    <div
      className={`
      bg-white
      rounded-2xl
      border
      ${borderColor}
      p-5
      hover:shadow-xl
      transition-all
      duration-300
      cursor-pointer
      `}
    >
      <div className="flex justify-between items-start">
        {/* Left */}
        <div>
          <h2 className="text-[42px] font-bold text-[#171C44]">
            {value}
          </h2>

          <h3 className="font-semibold text-[#171C44] mt-1">
            {title}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {subtitle}
          </p>

          <button className="mt-5 text-blue-600 text-sm font-semibold hover:underline">
            View all →
          </button>
        </div>

        {/* Right */}
        <div
          className={`
          w-16
          h-16
          rounded-full
          flex
          items-center
          justify-center
          text-3xl
          ${iconBg}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}