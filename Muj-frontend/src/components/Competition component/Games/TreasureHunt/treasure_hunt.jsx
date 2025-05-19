import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';  // Assuming auth status is in Redux
import { useNavigate } from 'react-router-dom';
import GameLayout from "../../../../utilis/Resuable/Gamelayout";
import speedTypingImage from "../../../../assets/treasure-hunt.svg";
import LoginModal from "../../../../pages/Auth/login/login"; // Adjust path if needed

const TreasureHunt = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const howToPlay = [
    "Teams of 2-3 members only.",
    "Navigate through the 360-degree virtual campus tour to discover hidden challenges.",
    "Each challenge will contain a riddle or a question. To proceed, you must choose the correct option from the given choices.",
    "Once you select the correct answer, the next clue will be unlocked, and you can move forward to the next stage.",
    "Keep solving clues and challenges to progress through the campus and move closer to the treasure!",
    "The team that solves all the challenges and finds the final treasure first will be the winner."
  ];

  const rules = [
    "No external help is allowed. All the answers can be found within the clues or in the 360-degree virtual tour.",
    "The clues are scattered across different areas of the virtual campus tour, so make sure to explore every corner carefully.",
    "Misconduct, cheating, or interfering with other teams will result in immediate disqualification.",
    "The game will have a time limit. Be quick and strategic to finish before time runs out!",
    'For tech support, contact support@mujunityfest.in'
  ];

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate("/game/treasure-hunt/register");  // Your registration page route
    }
  };

  // Close modal and navigate on successful login
  useEffect(() => {
    if (isAuthenticated && showLoginModal) {
      setShowLoginModal(false);
      navigate("/game/treasure-hunt/register");
    }
  }, [isAuthenticated, showLoginModal, navigate]);

  return (
    <>
      <GameLayout
        title="Treasure Hunt"
        tagline="Crack clues. Race the clock. Find the treasure!"
        image={speedTypingImage}
        aboutText="Step into the ultimate adventure across the MUJ campus! The Treasure Hunt is not just a game – it’s a test of wit, teamwork, and quick thinking. Each clue brings you closer to victory... and further into the mystery. Compete with the best minds, solve hidden puzzles, and race against time. Do you have what it takes to find the final treasure?"
        howToPlay={howToPlay}
        rules={rules}
        onRegisterClick={handleRegisterClick}  // pass handler here
      />

      {showLoginModal && (
        <LoginModal
          toggleLoginModal={setShowLoginModal}
          // You can pass an onLoginSuccess callback here if your modal supports it
        />
      )}
    </>
  );
};

export default TreasureHunt;
