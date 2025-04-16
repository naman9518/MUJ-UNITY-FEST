import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Assets
import treasureHunt from "../../src/assets/treasure-hunt.svg";
import quiz from "../../src/assets/quiz.svg";
import lameJokes from "../../src/assets/lame-jokes.svg";
import speedTyping from "../../src/assets/speed-typing.svg";
import pubg from "../../src/assets/pubg.svg";
import coding from "../../src/assets/coding.png";
import decorDesigns from "../../src/assets/decor-design.png";
import Team from "../utilis/TeamMembers"


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
      <Team />
    </main>
  );
};

export default Competitions;
