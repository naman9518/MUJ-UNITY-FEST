import React from "react";

const ScheduleSection = () => {
  const scheduleItems = [
    { title: "Lunch Break", time: "1:00 - 2:00PM" },
    { title: "Opening Ceremony", time: "9:00 - 10:00AM" },
    { title: "Competition Round 1", time: "10:30 - 12:30PM" },
    { title: "Networking Session", time: "2:30 - 4:00PM" },
    { title: "Awards Ceremony", time: "5:00 - 6:30PM" }
  ];

  return (
    <section className="schedule-section" data-aos="fade-up">
      <div className="container">
        <h2>
          Browse the event's <span className="highlight">schedule</span>
        </h2>
        <div className="schedule-timeline">
          {scheduleItems.map((item, index) => (
            <div
              className="timeline-item"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              key={index}
            >
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p>{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
