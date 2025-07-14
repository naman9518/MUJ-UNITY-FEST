import React, { useState } from 'react';
import GameLayout from "../../../../utilis/Resuable/Gamelayout";;
import speedTypingImage from "../../../../assets/quiz.svg";
import useAuthStore from '../../../../store/useAuthStore';

const LoginPromptPopup = ({ onClose }) => (
  <div className="reminder-popup">
    <div className="reminder-content">
      <h3>🔒 Login Required</h3>
      <p>You need to be logged in to register for this event.</p>
      <button className="btn btn-primary" onClick={onClose}>Okay</button>
    </div>
  </div>
);

const SpeedTyping = () => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { user } = useAuthStore();

  const handleRegisterClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowLoginPrompt(true);
    }
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  const howToPlay = [
    "Individual participation – each participant competes solo.",
    "At the start of the competition, you will be given a typing passage to replicate as quickly and accurately as possible.",
    "You will have X minutes to complete the passage.",
    "Speed and accuracy will determine your final score – the faster and more accurately you type, the better your chances of winning.",
    "Your score will be based on the words per minute (WPM) and accuracy percentage.",
    "Once the time is up, your results will be displayed, and you’ll know where you stand compared to other participants.",
  ];

  const rules = [
    "One round per participant – each participant gets one attempt.",
    "You’ll be given a randomized typing passage to replicate.",
    "Time limit: You’ll have X minutes to type the passage.",
    "Accuracy is crucial – mistakes will result in penalties.",
    "Misconduct: Any form of cheating or plagiarism will lead to disqualification.",
  ];

  return (
    <React.Fragment>
      <div className={`main-wrapper ${showLoginPrompt ? 'blurred' : ''}`}>
        <GameLayout
          title="Quiz"
          tagline="Crack clues. Race the clock. Find the treasure!"
          image={speedTypingImage}
          aboutText="Think you can type faster than your friends? Here’s your chance to prove it! The MUJ Speed Typing Competition is a fast-paced event that challenges you to type as quickly and accurately as possible. The key is speed and accuracy – because the faster you type, the higher your score!"
          howToPlay={howToPlay}
          rules={rules}
          onRegisterClick={handleRegisterClick}
        />
      </div>
      {showLoginPrompt && <LoginPromptPopup onClose={handleCloseLoginPrompt} />}
    </React.Fragment>
  );
};

export default SpeedTyping;
