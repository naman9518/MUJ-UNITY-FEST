// AboutUs.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import decorDesign from "../../src/assets/decor-design.png";
import topImg1 from "../../src/assets/top-img-1.svg";
import topImg2 from "../../src/assets/top-img-2.svg";
import authorImg1 from "../../src/assets/author-img-1.svg";
import arrowRight from "../../src/assets/arrow_right_alt.svg";
import TeamMembers from "../../src/utilis/TeamMembers";
import "../utilis/teammember.css"

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <main>
      <section className="about-section">
        <div className="container">
          <div className="about-header" data-aos="fade-down">
            <h1>About Us</h1>
            <img
              src={decorDesign}
              alt="Design Element"
              className="design-element"
            />
          </div>

          <div className="about-content">
            <div className="mission-statement" data-aos="fade-up">
              <h2>
                Uniting Students, Building Connections, Creating Lasting Memories Together
              </h2>
              <p>
                We are bringing students together to network, collaborate, and form
                meaningful connections in an inclusive environment that celebrates
                diversity and fosters lasting friendships.
              </p>
            </div>

            <div className="about-images" data-aos="zoom-in">
              <div className="image-container">
                <img
                  src={topImg1}
                  alt="Students collaborating"
                  className="about-image"
                />
              </div>
              <div className="image-container">
                <img
                  src={topImg2}
                  alt="Student group"
                  className="about-image"
                />
              </div>
            </div>

            {/* Team Members Section */}
            <TeamMembers />

            <div className="testimonial-section" data-aos="fade-up">
              <h2>
                Hear from our <span className="highlight">former student</span> fest events
              </h2>

              <div className="testimonial-slider">
                <div className="testimonial-slide">
                  {[1, 2].map((_, index) => (
                    <div
                      className="testimonial-card"
                      key={index}
                      data-aos="fade-left"
                    >
                      <p className="testimonial-text">
                        MUJ Unity Fest was an unforgettable experience! It was
                        amazing to meet people from different backgrounds, exchange
                        ideas, and build connections that will last a lifetime. I feel
                        more connected to my university community than ever before!
                      </p>
                      <div className="testimonial-author">
                        <div className="author-image">
                          <img
                            src={authorImg1}
                            alt="Nakshatra Bharathan"
                          />
                        </div>
                        <p className="author-name">Nakshatra Bharathan</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="slider-nav next-btn">
                  <img src={arrowRight} alt="Next" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
