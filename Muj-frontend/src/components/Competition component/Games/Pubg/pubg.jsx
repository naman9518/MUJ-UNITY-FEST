import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import pubgImage from "../../../../assets/pubg.svg";
import GameLayout from "../../../../utilis/Resuable/Gamelayout";
import LoginModal from '../../../../pages/Auth/login/login';
import PaymentModal from '../paymentModal';

const PUBG = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

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

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      setShowPayment(true);
    }
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  return (
    <>
      <GameLayout
        title="PUBG"
        tagline="Crack clues. Race the clock. Find the treasure!"
        image={pubgImage}
        aboutText="Are you ready to drop into the battlefield and fight for victory? The MUJ PUBG Competition brings the ultimate survival experience to all PUBG enthusiasts!"
        howToPlay={howToPlay}
        rules={rules}
        onRegisterClick={handleRegisterClick}
        registerButtonText="Register Now"
      />

      {showLoginModal && <LoginModal toggleLoginModal={setShowLoginModal} />}
      {showPayment && <PaymentModal onClose={handleClosePayment} />}
    </>
  );
};

export default PUBG;
