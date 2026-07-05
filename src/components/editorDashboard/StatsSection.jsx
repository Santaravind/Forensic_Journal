import {
  FaFileAlt,
  FaHourglassHalf,
  FaCheckCircle,
  FaBookOpen,
  FaChartPie,
} from "react-icons/fa";

import StatCard from "./StatCard";

export default function StatsSection() {
  const stats = [
    {
      value: "56",
      title: "New Submissions",
      subtitle: "This Month",
      icon: <FaFileAlt className="text-[#6D4AFF]" />,
      iconBg: "bg-[#F1ECFF]",
      borderColor: "border-[#E8DEFF]",
    },

    {
      value: "23",
      title: "Under Review",
      subtitle: "Manuscripts",
      icon: <FaHourglassHalf className="text-[#F59E0B]" />,
      iconBg: "bg-[#FFF4DE]",
      borderColor: "border-[#FFE7B0]",
    },

    {
      value: "18",
      title: "Awaiting Decision",
      subtitle: "Manuscripts",
      icon: <FaCheckCircle className="text-[#22C55E]" />,
      iconBg: "bg-[#DCFCE7]",
      borderColor: "border-[#C6F6D5]",
    },

    {
      value: "12",
      title: "Ready to Publish",
      subtitle: "Manuscripts",
      icon: <FaBookOpen className="text-[#A855F7]" />,
      iconBg: "bg-[#F3E8FF]",
      borderColor: "border-[#E9D5FF]",
    },

    {
      value: "101",
      title: "Published Papers",
      subtitle: "This Year",
      icon: <FaChartPie className="text-[#3B82F6]" />,
      iconBg: "bg-[#DBEAFE]",
      borderColor: "border-[#BFDBFE]",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-5">
      {stats.map((item, index) => (
        <StatCard
          key={index}
          value={item.value}
          title={item.title}
          subtitle={item.subtitle}
          icon={item.icon}
          iconBg={item.iconBg}
          borderColor={item.borderColor}
        />
      ))}
    </div>
  );
}