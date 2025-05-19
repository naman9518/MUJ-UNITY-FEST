import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import GameLayout from "../../../../utilis/Resuable/Gamelayout";
import speedTypingImage from "../../../../assets/quiz.svg";
import LoginModal from '../../../../pages/Auth/login/login';  // adjust path as needed
import PaymentModal from '../paymentModal';  // adjust path as needed

const SpeedTyping = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

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

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      setShowPayment(true);
    }
  };

  const handleClosePayment = () => setShowPayment(false);
  const handleCloseLogin = () => setShowLoginModal(false);

  return (
    <>
      <GameLayout
  title="Quiz"
  tagline="Crack clues. Race the clock. Find the treasure!"
  image={speedTypingImage}
  aboutText="Think you can type faster than your friends? Here’s your chance to prove it! The MUJ Speed Typing Competition is a fast-paced event that challenges you to type as quickly and accurately as possible. The key is speed and accuracy – because the faster you type, the higher your score!"
  howToPlay={howToPlay}
  rules={rules}
  onRegisterClick={handleRegisterClick}  // changed here
  registerButtonText="Register Now"      // this prop is unused in GameLayout, can remove
/>


      {showLoginModal && <LoginModal toggleLoginModal={handleCloseLogin} />}
      {showPayment && <PaymentModal onClose={handleClosePayment} />}
    </>
  );
};

export default SpeedTyping;
