import {
  FaFileAlt,
  FaHourglassHalf,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const cards = [
  {
    icon: <FaFileAlt />,
    value: "12",
    title: "Assigned Papers",
    color: "blue",
  },
  {
    icon: <FaHourglassHalf />,
    value: "5",
    title: "Pending Reviews",
    color: "yellow",
  },
  {
    icon: <FaCheckCircle />,
    value: "18",
    title: "Completed Reviews",
    color: "green",
  },
  {
    icon: <FaClock />,
    value: "6.2",
    title: "Avg Review Time",
    color: "purple",
  },
];

export default function StatsSection() {
  return (
    <div className="grid grid-cols-4 gap-5 mt-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-sm border"
        >
          <div className="flex justify-between">
            <div>
              <h2 className="text-4xl font-bold">
                {card.value}
              </h2>

              <p className="mt-2 text-gray-500">
                {card.title}
              </p>
            </div>

            <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}