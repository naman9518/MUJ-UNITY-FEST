import React from "react";

const TimeTable = () => {
  const schedule = [
    { time: "9:00 AM", event: "GATES OPEN", details: "LOREM LOREM IPSUM LOREM IPSUM LOREM IPSUM" },
    { time: "10:00 AM", event: "INTRODUCTION", details: "WELCOME SPEECH AND BRIEFING ABOUT THE EVENT" },
    { time: "11:00 AM", event: "SESSION 1", details: "DISCUSSION ON TECHNOLOGY AND FUTURE TRENDS" },
    { time: "1:00 PM", event: "LUNCH BREAK", details: "REFRESHMENTS AND NETWORKING SESSION" },
    { time: "2:30 PM", event: "SESSION 2", details: "PANEL DISCUSSION WITH INDUSTRY EXPERTS" },
    { time: "5:00 PM", event: "CLOSING CEREMONY", details: "VOTE OF THANKS AND CERTIFICATE DISTRIBUTION" },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-10 bg-white">
      {/* Heading */}
      <h3 className="text-yellow-600 font-semibold uppercase">All About</h3>
      <h1 className="text-2xl md:text-3xl font-bold">Time Table</h1>
      <div className="w-16 h-1 bg-yellow-500 my-2 mx-auto md:mx-0"></div>

      {/* Schedule */}
      <div className="w-full max-w-4xl mt-6">
        {schedule.map((item, index) => (
          <div
            key={index}
            className={`rounded-md overflow-hidden my-2 text-white flex flex-col md:flex-row ${
              index % 2 === 0 ? "bg-yellow-600" : "bg-yellow-700"
            }`}
          >
            <div className="w-full md:w-1/4 text-center py-3 font-bold border-b md:border-b-0 md:border-r border-white">
              {item.time}
            </div>
            <div className="w-full md:w-1/4 text-center py-3 font-bold border-b md:border-b-0 md:border-r border-white">
              {item.event}
            </div>
            <div className="w-full md:w-2/4 py-3 px-4">{item.details}</div>
          </div>
        ))}
      </div>

      {/* Print Ticket Button */}
      <button className="mt-6 px-6 py-2 bg-yellow-600 text-white font-bold rounded-md hover:bg-[#a5560d] transition-all duration-300">
        PRINT TICKET
      </button>
    </div>
  );
};

export default TimeTable;
