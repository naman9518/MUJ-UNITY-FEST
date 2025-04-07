import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../competition.css";

import treasureHunt from '../assets/treasure-hunt.svg';
import quiz from '../assets/quiz.svg';
import lameJokes from '../assets/lame-jokes.svg';
import speedTyping from '../assets/speed-typing.svg';
import pubg from '../assets/pubg.svg';
import coding from '../assets/coding.png';
import decorDesign from "../assets/decor-design.png";

import img1 from '../assets/img1.svg';
import img2 from '../assets/img2.svg';
import img3 from '../assets/img3.svg';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.svg';
import img6 from '../assets/img6.svg';


const Competitions = () => {
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

  const winners = [
    { image: img1, name: "Aisha Sharma", title: "1st Winner of Treasure Hunt" },
    { image: img2, name: "Rahul Patel", title: "1st Winner of Quiz Competition" },
    { image: img3, name: "Priya Singh", title: "1st Winner of Lame Jokes" },
    { image: img4, name: "Vikram Mehta", title: "1st Winner of Speed Typing" },
    { image: img5, name: "Neha Kapoor", title: "1st Winner of PUBG" },
    { image: img6, name: "Arjun Kumar", title: "1st Winner of Coding Challenge" },
  ];

  return (
    <main>
      <section className="competitions-section">
        <div className="container">
            <div className="competitions-header" data-aos="fade-down">
                <h1>Competitions</h1>
                    <img
                        src={decorDesign}
                        alt="Design Element"
                        className="desegn-element"
                      />
            </div>
        </div>
     

      <div className="competitions-list">
        <div className="container">
          <div className="competitions-grid">
            {competitions.map((comp, index) => (
              <div className="competition-card" key={index} data-aos="zoom-in">
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

      <section className="winners-section">
        <div className="container" data-aos="fade-up">
          <h2>
            Meet the competitions <span className="highlight">finalists</span>
          </h2>

          <div className="winners-track-container">
            <div className="winners-track">
              {[...winners, ...winners].map((winner, index) => (
                <div className="winner-card" key={index} data-aos="flip-left">
                  <div className="winner-image">
                    <img src={winner.image} alt={winner.name} />
                  </div>
                  <h3 className="winner-name">{winner.name}</h3>
                  <p className="winner-title">{winner.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Competitions;