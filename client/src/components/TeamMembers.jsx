import React, { useEffect, useRef } from "react";
import { FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "../CSS/teammember.css";

const teamMembers = [
  {
    name: "Sujal Das",
    role: "Frontend Developer",
    description: "Passionate about building interactive UIs and seamless user experiences.",
    image: "https://i.pinimg.com/originals/a2/f4/92/a2f4921b5992b535f9cd21744b25fe6e.jpg",
    linkedin: "https://www.linkedin.com/in/sujaldas/",
    overlayColor: "overlay-blue",
  },
  {
    name: "Ananya Roy",
    role: "UI/UX Designer",
    description: "Designing intuitive user interfaces with a focus on aesthetics and usability.",
    image: "https://www.corysanders.com/wp-content/uploads/2012/10/highres-pic-of-Cory-from-Biltmore2-682x1024.jpg",
    linkedin: "https://www.linkedin.com/in/ananyaroy/",
    overlayColor: "overlay-pink",
  },
  {
    name: "Ritwik Sen",
    role: "Backend Developer",
    description: "Loves crafting scalable backend systems and clean APIs.",
    image: "https://i.pinimg.com/originals/7c/33/f0/7c33f06c02c7b7cb9eabc150cdd2f764.jpg",
    linkedin: "https://www.linkedin.com/in/ritwiksen/",
    overlayColor: "overlay-gray",
  },
  {
    name: "Ishita Sharma",
    role: "Data Analyst",
    description: "Transforms raw data into valuable business insights with smart analytics.",
    image: "https://i.pinimg.com/474x/1c/e7/e5/1ce7e5699f19e422fc14f82d0e158dfd--corporate-portrait-business-portrait.jpg",
    linkedin: "https://www.linkedin.com/in/ishitasharma/",
    overlayColor: "overlay-green",
  },
  {
    name: "Aditya Verma",
    role: "DevOps Engineer",
    description: "Ensures smooth CI/CD pipelines and reliable system performance.",
    image: "https://randomuser.me/api/portraits/men/72.jpg",
    linkedin: "#",
    overlayColor: "overlay-yellow",
  },
  {
    name: "Nisha Mehra",
    role: "AI Engineer",
    description: "Builds intelligent systems using machine learning and neural nets.",
    image: "https://randomuser.me/api/portraits/women/70.jpg",
    linkedin: "#",
    overlayColor: "overlay-purple",
  },
  {
    name: "Rohan Tiwari",
    role: "Security Analyst",
    description: "Keeps our data safe and secure from threats.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    linkedin: "#",
    overlayColor: "overlay-red",
  }
];

const TeamMembers = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    let animationFrameId;
    let isPaused = false;

    const scroll = () => {
      if (!isPaused) {
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="team-section">
      <h2 className="team-title" data-aos="fade-up">
      Meet our team of <span style={{ color: "#f26522" }}>organizers</span>  and <span style={{ color: "#f26522" }}>creators </span> of the fest event
</h2>


      <div ref={scrollRef} className="team-scroll-container hide-scrollbar">
        <div className="team-cards-wrapper">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card group"
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
            >
              <img
                src={member.image}
                alt={member.name}
                className="team-image group-hover:scale-110"
              />
              <div className={`team-overlay ${member.overlayColor}`}>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-linkedin"
                >
                  <FaLinkedin className="text-xl" /> Connect
                </a>
                <p className="team-description">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
