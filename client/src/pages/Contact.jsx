import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../style.css";

import decorDesign from "../assets/decor-design.png";
import mapIcon from "../assets/map-icon.svg";
import headsetIcon from "../assets/headset-icon.svg";
import phoneIcon from "../assets/phone-icon.svg";

const ContactUs = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main>
      <section className="contact-section">
        <div className="container">
          <div className="contact-header" data-aos="fade-down">
            <h1>Contact Us</h1>
            <img
              src={decorDesign}
              alt="Design Element"
              className="design-element"
            />
          </div>
          <p className="contact-subtitle" data-aos="fade-up">
            We are here to help. Send us a message
          </p>

          <form className="contact-form" data-aos="fade-up">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="required-field">
                  First Name
                </label>
                <input type="text" id="firstName" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" className="form-control" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="required-field">
                  Email Address
                </label>
                <input type="email" id="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" className="form-control" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="enquiryType" className="required-field">
                  Type of Enquiry
                </label>
                <input type="text" id="enquiryType" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject" className="required-field">
                  Subject
                </label>
                <input type="text" id="subject" className="form-control" required />
              </div>
            </div>

            <div className="textarea-group">
              <label htmlFor="message" className="required-field">
                Your Query / Inquiry / Suggestion / Feedback
              </label>
              <textarea id="message" className="form-control" required></textarea>
            </div>

            <div className="form-submit">
              <button type="submit" className="submit-btn">
                Submit Query
              </button>
            </div>
          </form>

          <div className="contact-info">
            <div className="info-card" data-aos="fade-right">
              <div className="info-icon info-icon-map">
                <img src={mapIcon} alt="Map Icon" />
              </div>
              <h3 className="info-title">Address</h3>
              <p className="info-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="info-card" data-aos="fade-up">
              <div className="info-icon">
                <img src={headsetIcon} alt="Headset Icon" />
              </div>
              <h3 className="info-title">Chat to support</h3>
              <p className="info-content">Speak to our friendly team</p>
              <a href="mailto:muj@gmail.com" className="info-link">
                muj@gmail.com
              </a>
            </div>

            <div className="info-card" data-aos="fade-left">
              <div className="info-icon">
                <img src={phoneIcon} alt="Phone Icon" />
              </div>
              <h3 className="info-title">Call us</h3>
              <p className="info-content">Mon - Fri, 9:00 am to 6:00 pm</p>
              <a href="tel:+919448908617" className="info-link">
                +91 94489 08617
              </a>
            </div>
          </div>

          <div className="map-container" data-aos="zoom-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.8771334088133!2d75.56265937510696!3d26.843859963046796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4850e05bee9b%3A0x1b8d67402d4eb863!2sManipal%20University%20Jaipur!5e0!3m2!1sen!2sin!4v1743344341850!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MUJ Map"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
