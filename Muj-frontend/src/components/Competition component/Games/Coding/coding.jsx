import React, { useEffect, useRef, useState } from 'react';
import gameImage from "../../../../assets/coding.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Team from "../../../../utilis/Resuable/TeamMembers";
import PaymentModal from '../paymentModal';
import useAuthStore from '../../../../store/useAuthStore'; // Import the auth store

const ReminderPopup = ({ onClose }) => (
  <div className="reminder-popup">
    <div className="reminder-content">
      <h3>🔔 Reminder</h3>
      <p>If you've completed the payment, don't forget to click the <strong>"Close"</strong> button at the bottom of the form.</p>
      <button className="btn btn-primary" onClick={onClose}>Got it</button>
    </div>
  </div>
);

const LoginPromptPopup = ({ onClose }) => (
  <div className="reminder-popup">
    <div className="reminder-content">
      <h3>🔒 Login Required</h3>
      <p>You need to be logged in to register for this event.</p>
      <button className="btn btn-primary" onClick={onClose}>Okay</button>
    </div>
  </div>
);

const TreasureHunt = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const reminderTimerRef = useRef(null);
  const { user } = useAuthStore(); // Get user from the auth store

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
    return () => {
      stopReminderTimer();
    };
  }, []);

  const startReminderTimer = () => {
    if (reminderTimerRef.current) clearInterval(reminderTimerRef.current);
    reminderTimerRef.current = setInterval(() => {
      setShowReminder(true);
    }, 8000);
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
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      setShowIframe(true);
      setShowReminder(false);
      startReminderTimer();
    }
  };

  const handleCloseReminder = () => {
    setShowReminder(false);
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  return (
    <React.Fragment>
      <main className={`main-wrapper ${showPayment || showLoginPrompt ? 'blurred' : ''}`}>
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
              <p>Step into the ultimate adventure across the MUJ campus! The Treasure Hunt is not just a game-it's a test of wit, teamwork, and quick thinking.</p>
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
        
        <Team />
      </main>
      
      {showPayment && <PaymentModal onClose={handleClosePayment} />}
      
      {showReminder && <ReminderPopup onClose={handleCloseReminder} />}

      {showLoginPrompt && <LoginPromptPopup onClose={handleCloseLoginPrompt} />}
    </React.Fragment>
  );
};

export default TreasureHunt;