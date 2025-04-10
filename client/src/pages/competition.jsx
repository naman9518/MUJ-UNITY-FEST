import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../CSS/competition.css";
import { FaLinkedin } from "react-icons/fa";

// Assets
import treasureHunt from "../assets/treasure-hunt.svg";
import quiz from "../assets/quiz.svg";
import lameJokes from "../assets/lame-jokes.svg";
import speedTyping from "../assets/speed-typing.svg";
import pubg from "../assets/pubg.svg";
import coding from "../assets/coding.png";
import decorDesigns from "../assets/decor-design.png";


// Team Data
const teamMembers = [
  {
    name: "Sujal Das",
    role: "Frontend Developer",
    description: "Passionate about building interactive UIs and seamless user experiences.",
    image: "https://i.pinimg.com/originals/a2/f4/92/a2f4921b5992b535f9cd21744b25fe6e.jpg",
    linkedin: "https://www.linkedin.com/in/sujaldas/",
    overlayColor: "overlay-lavender ",
  },
  {
    name: "Ananya Roy",
    role: "UI/UX Designer",
    description: "Designing intuitive user interfaces with a focus on aesthetics and usability.",
    image: "https://www.corysanders.com/wp-content/uploads/2012/10/highres-pic-of-Cory-from-Biltmore2-682x1024.jpg",
    linkedin: "https://www.linkedin.com/in/ananyaroy/",
    overlayColor: "overlay-mint",
  },
  {
    name: "Ritwik Sen",
    role: "Backend Developer",
    description: "Loves crafting scalable backend systems and clean APIs.",
    image: "https://i.pinimg.com/originals/7c/33/f0/7c33f06c02c7b7cb9eabc150cdd2f764.jpg",
    linkedin: "https://www.linkedin.com/in/ritwiksen/",
    overlayColor: "overlay-peach ",
  },
  {
    name: "Ishita Sharma",
    role: "Data Analyst",
    description: "Transforms raw data into valuable business insights with smart analytics.",
    image: "https://i.pinimg.com/474x/1c/e7/e5/1ce7e5699f19e422fc14f82d0e158dfd--corporate-portrait-business-portrait.jpg",
    linkedin: "https://www.linkedin.com/in/ishitasharma/",
    overlayColor: "overlay-lavender2",
  },
  {
    name: "Aditya Verma",
    role: "DevOps Engineer",
    description: "Ensures smooth CI/CD pipelines and reliable system performance.",
    image: "https://profile-images.xing.com/images/4056a561547d31e9be578fa93b31ec95-8/marcel-milde.1024x1024.jpg",
    linkedin: "#",
    overlayColor: "overlay-yellow",
  },
  {
    name: "Nisha Mehra",
    role: "AI Engineer",
    description: "Builds intelligent systems using machine learning and neural nets.",
    image: "https://img.freepik.com/premium-photo/corporate-professional-profile-photo-successful-brunette-man-ceo-man_954305-1266.jpg",
    linkedin: "#",
    overlayColor: "overlay-pink",
  },
  {
    name: "Rohan Tiwari",
    role: "Security Analyst",
    description: "Keeps our data safe and secure from threats.",
    image: "https://th.bing.com/th/id/OIP.rzkmjJNEKz9mFbvx9P7jkAHaHa?rs=1&pid=ImgDetMain",
    linkedin: "#",
    overlayColor: "overlay-blue",
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
      Meet the competitions <span style={{ color: "#f26522" }}>finalists</span>
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

const Competitions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const competitions = [
    {
      image: treasureHunt,
      alt: "Treasure Hunt",
      title: "Treasure Hunt",
      description: "Uncover hidden treasures in a race against time!",
    },
    {
      image: quiz,
      alt: "Quiz Competition",
      title: "Quiz Competition",
      description: "Test your knowledge and claim the crown of the trivia king!",
    },
    {
      image: lameJokes,
      alt: "Lame Jokes",
      title: "Lame Jokes",
      description: "Get ready for some cringeworthy laughs!",
    },
    {
      image: speedTyping,
      alt: "Speed Typing",
      title: "Speed Typing",
      description: "Type your way to victory with lightning speed!",
    },
    {
      image: pubg,
      alt: "PUBG",
      title: "PUBG",
      description: "Solve mind-bending puzzles and challenge your brain!",
    },
    {
      image: coding,
      alt: "Coding Challenge",
      title: "Coding Challenge",
      description: "Put your programming skills to the test!",
    },
  ];

  const gameRoutes = {
    "Treasure Hunt": "/game/treasure-hunt",
    "Quiz Competition": "/game/quiz",
    "Lame Jokes": "/game/lame-jokes",
    "Speed Typing": "/game/speed-typing",
    "PUBG": "/game/pubg",
    "Coding Challenge": "/game/coding-challenge",
  };

  return (
    <main>
      {/* Inline styles */}
      <style>
        {`
        .contact-header {
          width: 276px;
          height: 83px;
          padding: 10px;
          margin-top: 80px;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .contact-header h1 {
          font-size: 42px;
          color: #333;
          font-weight: 600;
          margin: 0;
          position: relative;
        }

        .design-element {
          position: absolute;
          top: -5px;
          right: -50px;
          height: 35px;
          width: auto;
        }

        .competition-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .competition-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          cursor: pointer;
        }
        `}
      </style>

      <section className="competitions-section">
        <div className="contact-header" data-aos="fade-down">
          <h1>Competitions</h1>
          <img src={decorDesigns} alt="Design Element" className="design-element" />
        </div>

        <div className="competitions-list">
          <div className="container">
            <div className="competitions-grid">
              {competitions.map((comp, index) => (
                <div
                  className="competition-card"
                  key={index}
                  data-aos="zoom-in"
                  onClick={() => {
                    const route = gameRoutes[comp.title];
                    if (route) navigate(route);
                  }}
                  style={{ cursor: gameRoutes[comp.title] ? "pointer" : "default" }}
                >
                  <div className="competition-image">
                    <img src={comp.image} alt={comp.alt} />
                  </div>
                  <div className="competition-content">
                    <h3>{comp.title}</h3>
                    <p>{comp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamMembers />
    </main>
  );
};

export default Competitions;
