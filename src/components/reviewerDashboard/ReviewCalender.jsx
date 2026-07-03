export default function ReviewCalendar() {
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">
      <h2 className="text-xl font-bold mb-5">
        Review Calendar
      </h2>

      <div className="text-center font-semibold mb-4">
        June 2026
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map(
          (day) => (
            <div
              key={day}
              className="font-semibold text-gray-500"
            >
              {day}
            </div>
          )
        )}

        {dates.map((date) => (
          <div
            key={date}
            className={`h-10 w-10 mx-auto flex items-center justify-center rounded-full cursor-pointer
            ${
              date === 20
                ? "bg-yellow-400 text-white"
                : ""
            }
            ${
              date === 25
                ? "bg-red-500 text-white"
                : ""
            }
          `}
          >
            {date}
          </div>
        ))}
      </div>

      <div className="flex gap-6 mt-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
          Due Soon
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
          Overdue
        </div>
      </div>
    </div>
  );
}