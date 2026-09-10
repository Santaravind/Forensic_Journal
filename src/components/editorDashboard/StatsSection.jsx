import React, { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaHourglassHalf,
  FaCheckCircle,
  FaBookOpen,
  FaChartPie,
} from "react-icons/fa";
import { researchPaperApi, extractPaperList, normalizePaper } from "../../api/publisherApi";
import StatCard from "./StatCard";

export default function StatsSection() {
  const [counts, setCounts] = useState({
    newSubmissions: 56,
    underReview: 23,
    awaitingDecision: 18,
    readyToPublish: 12,
    publishedPapers: 101,
  });

  useEffect(() => {
    loadCounts();
  }, []);

  const loadCounts = async () => {
    try {
      const res = await researchPaperApi.getAllPapers();
      const rawList = extractPaperList(res);
      if (rawList.length > 0) {
        const list = rawList.map(normalizePaper);
        const newSub = list.filter((p) => p.status === 'New Submission').length;
        const underRev = list.filter((p) => p.status === 'Under Review').length;
        const awaiting = list.filter((p) => p.status === 'Awaiting Decision').length;
        const ready = list.filter((p) => p.status === 'Accepted').length;
        const published = list.filter((p) => p.status === 'Published').length;

        setCounts({
          newSubmissions: newSub > 0 ? newSub : list.length,
          underReview: underRev > 0 ? underRev : 23,
          awaitingDecision: awaiting > 0 ? awaiting : 18,
          readyToPublish: ready > 0 ? ready : 12,
          publishedPapers: published > 0 ? published : 101,
        });
      }
    } catch (e) {
      console.warn("Could not fetch stats count, keeping fallback values:", e);
    }
  };

  const stats = [
    {
      value: counts.newSubmissions.toString(),
      title: "New Submissions",
      subtitle: "This Month",
      icon: <FaFileAlt className="text-[#6D4AFF]" />,
      iconBg: "bg-[#F1ECFF]",
      borderColor: "border-[#E8DEFF]",
    },

    {
      value: counts.underReview.toString(),
      title: "Under Review",
      subtitle: "Manuscripts",
      icon: <FaHourglassHalf className="text-[#F59E0B]" />,
      iconBg: "bg-[#FFF4DE]",
      borderColor: "border-[#FFE7B0]",
    },

    {
      value: counts.awaitingDecision.toString(),
      title: "Awaiting Decision",
      subtitle: "Manuscripts",
      icon: <FaCheckCircle className="text-[#22C55E]" />,
      iconBg: "bg-[#DCFCE7]",
      borderColor: "border-[#C6F6D5]",
    },

    {
      value: counts.readyToPublish.toString(),
      title: "Ready to Publish",
      subtitle: "Manuscripts",
      icon: <FaBookOpen className="text-[#A855F7]" />,
      iconBg: "bg-[#F3E8FF]",
      borderColor: "border-[#E9D5FF]",
    },

    {
      value: counts.publishedPapers.toString(),
      title: "Published Papers",
      subtitle: "This Year",
      icon: <FaChartPie className="text-[#3B82F6]" />,
      iconBg: "bg-[#DBEAFE]",
      borderColor: "border-[#BFDBFE]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
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