import React from "react";
import feature1 from "../../../src/assets/feature-1.svg";
import feature2 from "../../../src/assets/feature-2.svg";
import feature3 from "../../../src/assets/feature-3.svg";

const AboutSection = () => {
  const features = [feature1, feature2, feature3];
  const titles = ["Unforgettable experience", "Fun events & games", "Networking"];

  return (
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
          {features.map((feature, index) => (
            <div
              className="feature-card"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              key={index}
            >
              <img src={feature} alt={`Feature ${index + 1}`} />
              <h3>{titles[index]}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
