import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan 2026", value: 28 },
  { month: "Feb 2026", value: 34 },
  { month: "Mar 2026", value: 45 },
  { month: "Apr 2026", value: 50 },
  { month: "May 2026", value: 56 },
  { month: "Jun 2026", value: 62 },
];

export default function SubmissionTrend() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-full p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-[#171C44]">
          Submission Trend
        </h2>

        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>This Year</option>
        </select>
      </div>

      <div className="h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#6D4AFF"
              fill="#ECE7FF"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        <div className="border rounded-xl p-4 text-center">
          <p className="text-gray-500 text-sm">
            Total Submissions
          </p>

          <h3 className="text-3xl font-bold text-[#171C44] mt-2">
            275
          </h3>

          <p className="text-xs text-gray-500">
            This Year
          </p>
        </div>

        <div className="border rounded-xl p-4 text-center">
          <p className="text-gray-500 text-sm">
            Accepted Papers
          </p>

          <h3 className="text-3xl font-bold text-[#171C44] mt-2">
            101
          </h3>

          <p className="text-xs text-gray-500">
            This Year
          </p>
        </div>

        <div className="border rounded-xl p-4 text-center">
          <p className="text-gray-500 text-sm">
            Rejection Rate
          </p>

          <h3 className="text-3xl font-bold text-[#171C44] mt-2">
            28%
          </h3>

          <p className="text-xs text-gray-500">
            This Year
          </p>
        </div>
      </div>
    </div>
  );
}