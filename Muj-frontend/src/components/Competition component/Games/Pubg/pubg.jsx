import React, { useState } from 'react';
import pubgImage from "../../../../assets/pubg.svg";
import GameLayout from "../../../../utilis/Resuable/Gamelayout";
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

const PUBG = () => {
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
    "Team-based competition – Players can participate as solo, duo, or squad (4 players).",
    "The competition will be held on [Map name, e.g., Erangel or Miramar].",
    "Players or teams will join a custom match where the goal is to survive until the end by outlasting other competitors.",
    "The match will follow the standard battle royale rules...",
  ];

  const rules = [
    "No teaming in solo mode.",
    "Team communication is allowed.",
    "Competition will consist of multiple rounds. Points for placement and kills.",
    "Any inappropriate behavior will result in disqualification.",
  ];

  return (
    <React.Fragment>
      <div className={`main-wrapper ${showLoginPrompt ? 'blurred' : ''}`}>
        <GameLayout
          title="PUBG"
          tagline="Crack clues. Race the clock. Find the treasure!"
          image={pubgImage}
          aboutText="Are you ready to drop into the battlefield and fight for victory? The MUJ PUBG Competition brings the ultimate survival experience to all PUBG enthusiasts!"
          howToPlay={howToPlay}
          rules={rules}
          onRegisterClick={handleRegisterClick}
        />
      </div>
      {showLoginPrompt && <LoginPromptPopup onClose={handleCloseLoginPrompt} />}
    </React.Fragment>
  );
};

export default PUBG;
