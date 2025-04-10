import React, { useEffect, useRef, useState } from 'react';
import '../CSS/treasure_hunt.css';
import decorDesign from '../assets/decor-design.png';
import gameImage from '../assets/coding.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaLinkedin } from 'react-icons/fa';

// Dummy PaymentModal
const PaymentModal = ({ onClose }) => {
  return (
    <div className="payment-modal-backdrop">
      <div className="payment-modal">
        <div className="warning">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#FFE0E3" />
            <path
              d="M12 7V13"
              stroke="#FF3232"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="17" r="1.5" fill="#FF3232" />
          </svg>
        </div>
        <h2>Payment Processing</h2>
        <p>If you had made the payment, please wait for the payment confirmation within 24 hours.</p>
      </div>
    </div>
  );
};

// Reminder popup every 20 sec
const ReminderPopup = ({ onClose }) => {
  return (
    <div className="reminder-popup">
      <div className="reminder-content">
        <h3>🔔 Reminder</h3>
        <p>If you’ve completed the payment, don’t forget to click the <strong>“Close”</strong> button Bottom the form.</p>
        <button className="btn btn-primary" onClick={onClose}>Got it</button>
      </div>
    </div>
  );
};

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
        Organizing <span style={{ color: "#f26522" }}>Team</span>
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
              <img src={member.image} alt={member.name} className="team-image group-hover:scale-110" />
              <div className={`team-overlay ${member.overlayColor}`}>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team-linkedin">
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

const TreasureHunt = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const reminderTimerRef = useRef(null);

  const startReminderTimer = () => {
    if (reminderTimerRef.current) clearInterval(reminderTimerRef.current);

    reminderTimerRef.current = setInterval(() => {
      setShowReminder(true);
    }, 8000); // every 20 seconds
  };

  const stopReminderTimer = () => {
    clearInterval(reminderTimerRef.current);
    reminderTimerRef.current = null;
  };

  const handleCloseIframe = () => {
    setShowIframe(false);
    stopReminderTimer();
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  const handleRegisterClick = () => {
    setShowIframe(true);
    setShowReminder(false);
    startReminderTimer();
  };

  const handleCloseReminder = () => {
    setShowReminder(false);
  };

  useEffect(() => {
    return () => {
      stopReminderTimer(); // cleanup
    };
  }, []);

  return (
    <main className={`main-wrapper ${showPayment ? 'blurred' : ''}`}>
      <section className="game-header">
        <div className="container">
          <h1>Treasure Hunt</h1>
          <p>Crack clues. Race the clock. Find the treasure!</p>
        </div>
      </section>

      <section className="game-details">
        <div className="container game-details-container">
          <div className="game-image">
            <img src={gameImage} alt="Treasure Hunt" />
          </div>
          <div className="game-info">
            <h2>About the <span className="highlight">game</span></h2>
            <p>Step into the ultimate adventure across the MUJ campus! The Treasure Hunt is not just a game - it's a test of wit, teamwork, and quick thinking.</p>
            <p>Compete with the best minds, solve hidden puzzles, and race against time. Do you have what it takes to find the final treasure?</p>
            <div className="registration-cta">
              <button className="btn btn-primary" onClick={handleRegisterClick}>Register Now</button>
            </div>
            {showIframe && (
              <div className="iframe-container" style={{ marginTop: '20px', textAlign: 'center' }}>
                <iframe
                  src="https://organiser.klout.club/embed/explore-events/event/e4bf8834-016d-4c4d-971f-34e94e560d4d"
                  width="90%"
                  height="500"
                  frameBorder="0"
                  style={{ border: '1px solid #bfcbda88', borderRadius: '4px' }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                />
                <div style={{ marginTop: '10px' }}>
                  <button onClick={handleCloseIframe} className="btn btn-outline">Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="game-instructions">
        <div className="container instructions-container">
          <div className="instructions-header">
            <h2>Game <span className="highlight">Instructions</span></h2>
          </div>
          <div className="instructions-content">
            <div className="instruction-col">
              <h3><span>01</span> How to play</h3>
              <ul>
                <li>Teams of 2-3 members only.</li>
                <li>Navigate through the 360-degree virtual campus tour to discover hidden challenges.</li>
                <li>Each challenge will contain a riddle or a question.</li>
                <li>Choose the correct option to proceed.</li>
                <li>Keep solving clues to move closer to the treasure!</li>
                <li>The fastest team wins!</li>
              </ul>
            </div>
            <div className="instruction-col">
              <h3><span>02</span> Game rules</h3>
              <ul>
                <li>No external help allowed.</li>
                <li>Explore every area in the virtual campus carefully.</li>
                <li>Cheating leads to disqualification.</li>
                <li>Finish before time runs out!</li>
                <li>Contact <a href="mailto:support@mujunityfest.in">support@mujunityfest.in</a> for help.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <TeamMembers />

      {showPayment && <PaymentModal onClose={handleClosePayment} />}
      {showReminder && <ReminderPopup onClose={handleCloseReminder} />}
    </main>
  );
};

export default TreasureHunt;
