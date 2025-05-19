// src/components/GameLayout.jsx
import React from 'react';
import './game.css';
import Team from './TeamMembers';

const GameLayout = ({ title, tagline, image, aboutText, howToPlay, rules, onRegisterClick }) => {
  return (
    <main>
      {/* Game Header */}
      <section className="game-header">
        <div className="container">
          <h1>{title}</h1>
          <p>{tagline}</p>
        </div>
      </section>

      {/* Game Details */}
      <section className="game-details">
        <div className="container game-details-container">
          <div className="game-image">
            <img src={image} alt={title} />
          </div>
          <div className="game-info">
            <h2>About the <span className="highlight">game</span></h2>
            <p>{aboutText}</p>
            <div className="registration-cta">
              <button
                className="btn btn-primary"
                onClick={onRegisterClick}  // Use the passed click handler here
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Game Instructions */}
      <section className="game-instructions">
        <div className="container instructions-container">
          <div className="instructions-header">
            <h2>Game <span className="highlight">Instructions</span></h2>
          </div>
          <div className="instructions-content">
            <div className="instruction-col">
              <h3><span>01</span> How to play</h3>
              <ul>
                {howToPlay.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="instruction-col">
              <h3><span>02</span> Game rules</h3>
              <ul>
                {rules.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
                <li>
                  For tech support, contact{' '}
                  <a href="mailto:support@mujunityfest.in" style={{ color: '#f26522', textDecoration: 'none' }}>
                    support@mujunityfest.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team />
    </main>
  );
};

export default GameLayout;
