import React from "react";
import { FiVolumeX, FiVolume2 } from "react-icons/fi";
import introVideoWeb from "../../../src/assets/muj-fest-hero-intro-web-view.mp4";
import introVideoMobile from "../../../src/assets/muj-fest-hero-intro-mobile-view.mp4"; 

const IntroVideo = ({ isMuted, handleMuteToggle }) => (
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
          fontSize: "24px",
        }}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <FiVolumeX /> : <FiVolume2 />}
      </button>
    </div>
  </section>
);

export default IntroVideo;
