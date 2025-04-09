import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import "../CSS/style.css"

import introVideoWeb from "../assets/muj-fest-hero-intro-web-view.mp4";
import introVideoMobile from "../assets/muj-fest-hero-intro-mobile-view.mp4";
import feature1 from "../assets/feature-1.svg";
import feature2 from "../assets/feature-2.svg";
import feature3 from "../assets/feature-3.svg";
import gallery1 from "../assets/gallery-1.svg";
import gallery2 from "../assets/gallery-2.svg";
import gallery3 from "../assets/gallery-3.svg";
import gallery4 from "../assets/gallery-4.svg";
import gallery5 from "../assets/gallery-5.svg";

const EventPage = () => {
  const [faqOpen, setFaqOpen] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const answerRefs = useRef([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const toggleFAQ = (index) => {
    setFaqOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleMuteToggle = () => {
    const video = document.getElementById("introVideo");
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  useEffect(() => {
    // Update height on mount and on toggle
    answerRefs.current.forEach((ref, idx) => {
      if (ref) {
        if (faqOpen === idx) {
          ref.style.maxHeight = ref.scrollHeight + "px";
        } else {
          ref.style.maxHeight = "0px";
        }
      }
    });
  }, [faqOpen]);

  return (
    <main>
      {/* Intro Video Section */}
      <section className="intro-video-section">
        <div className="video-container" style={{ position: "relative" }}>
          <video id="introVideo" muted={isMuted} autoPlay loop playsInline>
            <source src={introVideoWeb} media="(min-width: 768px)" />
            <source src={introVideoMobile} media="(max-width: 767px)" />
            Your browser does not support the video tag.
          </video>
          <button
            onClick={handleMuteToggle}
            className="mute-button"
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              background: "#00000099",
              border: "none",
              color: "white",
              borderRadius: "50%",
              padding: "10px",
              cursor: "pointer",
              fontSize: "24px"
            }}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <FiVolumeX /> : <FiVolume2 />}
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="about-event-section" data-aos="fade-up">
        <div className="container">
          <h2>
            About the <span className="highlight">event</span>
          </h2>
          <p className="event-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua.
          </p>

          <div className="event-features">
            {[feature1, feature2, feature3].map((feature, index) => (
              <div
                className="feature-card"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                key={index}
              >
                <img src={feature} alt={`Feature ${index + 1}`} />
                <h3>
                  {["Unforgettable experience", "Fun events & games", "Networking"][index]}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="schedule-section" data-aos="fade-up">
        <div className="container">
          <h2>
            Browse the event's <span className="highlight">schedule</span>
          </h2>
          <div className="schedule-timeline">
            {[
              { title: "Lunch Break", time: "1:00 - 2:00PM" },
              { title: "Opening Ceremony", time: "9:00 - 10:00AM" },
              { title: "Competition Round 1", time: "10:30 - 12:30PM" },
              { title: "Networking Session", time: "2:30 - 4:00PM" },
              { title: "Awards Ceremony", time: "5:00 - 6:30PM" }
            ].map((item, index) => (
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

      {/* Gallery Section */}
      <section className="gallery-section" data-aos="fade-up">
        <div className="container">
          <h2>
            Check our latest <span className="highlight">gallery</span>
          </h2>
          <div className="gallery-grid">
            {[gallery1, gallery2, gallery3, gallery4, gallery5].map((img, idx) => (
              <div
                className="gallery-item"
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
                key={idx}
              >
                <img src={img} alt={`Gallery image ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" data-aos="fade-up">
        <div className="container">
          <h2>
            Frequently <span className="highlight">asked</span> questions
          </h2>

          <div className="accordion">
            {[
              {
                question: "WHEN DOES THE EVENT RUN?",
                answer:
                  "The MUJ Unity Fest will run from April 15-17, 2025. The event starts at 9:00 AM on the first day and concludes at 6:00 PM on the final day."
              },
              {
                question: "WHERE DOES THE EVENT RUN?",
                answer:
                  "The event will be held at the Manipal University Jaipur campus in the main auditorium and surrounding areas."
              },
              {
                question: "HOW DO I REGISTER FOR COMPETITIONS?",
                answer:
                  "You can register for competitions through our website by creating an account and selecting the competitions you wish to participate in. Registration closes one week before the event starts."
              },
              {
                question: "ARE THERE ACCOMMODATION OPTIONS?",
                answer:
                  "Yes, limited on-campus accommodation is available for participants coming from other cities. Please contact the organizing team for more details and bookings."
              }
            ].map((item, index) => (
              <div
                className="accordion-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                key={index}
              >
                <button className="accordion-button" onClick={() => toggleFAQ(index)}>
                  <span>{item.question}</span>
                  <span className="accordion-icon">{faqOpen === index ? "−" : "+"}</span>
                </button>
                <div
                  className="accordion-content"
                  ref={(el) => (answerRefs.current[index] = el)}
                  style={{
                    maxHeight: "0px",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease"
                  }}
                >
                  <p style={{ padding: "10px 0" }}>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventPage;
