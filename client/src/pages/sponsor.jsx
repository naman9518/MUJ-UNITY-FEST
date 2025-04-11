"use client";
import React, { useEffect, useState } from "react";
import "../CSS/sponsor.css";
import AOS from "aos";
import "aos/dist/aos.css";
import decorDesigns from "../assets/decor-design.png";
import SponsorModal from "../components/sponsorform"; // Make sure path is correct

// Reusable Button
function SponsorButton({ children, className = "", ...props }) {
  return (
    <button className={`sponsor-button ${className}`} {...props}>
      {children}
    </button>
  );
}

function Sponsor() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleSponsorClick = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <section className={`sponsor-section ${isModalOpen ? "blurred-bg" : ""}`}>
      {/* Header */}
      <div className="sponsor-header" data-aos="fade-down">
        <img src={decorDesigns} alt="Design Element" className="designs-element" />
        <h1 className="sponsor-title">Sponsors</h1>
      </div>

      {/* Content */}
      <div className="sponsor-container" data-aos="zoom-in-up" data-aos-delay="300">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/92113200405bcc53a041066f6254df6ef95dab2b?placeholderIfAbsent=true&apiKey=b34fd0203e694b298cc231e66341e7bd"
          alt="Sponsor background"
          className="sponsor-background"
        />

        <div className="sponsor-content" data-aos="fade-up" data-aos-delay="500">
          <SponsorButton onClick={handleSponsorClick} data-aos="zoom-in" data-aos-delay="400">
            Become a sponsor
          </SponsorButton>
        </div>

        <div className="sponsor-footer" data-aos="fade-up" data-aos-delay="700" />
      </div>

      {/* Modal */}
      {isModalOpen && <SponsorModal onClose={handleCloseModal} />}
    </section>
  );
}

export default Sponsor;
