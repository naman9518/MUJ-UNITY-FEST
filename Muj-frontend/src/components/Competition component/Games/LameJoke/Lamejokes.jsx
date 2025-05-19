import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Team from "../../../../utilis/Resuable/TeamMembers";
import gameImage from '../../../../assets/lame-jokes.svg';
import LoginModal from '../../../../pages/Auth/login/login';  // Adjust path if needed
import PaymentModal from '../paymentModal';                   // If you want payment modal or similar flow

const LameJokes = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);   // optional: for payment or registration iframe/modal
  const [showReminder, setShowReminder] = useState(false); // optional reminder popup like before

  // Handler for clicking "Register Now"
  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      // If logged in, open payment modal or registration iframe etc.
      setShowPayment(true);
      // Or do something else here (e.g. navigate, open form, etc)
    }
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  return (
    <>
      <main className={showPayment ? 'blurred' : ''}>
        <section className="game-header">
          <div className="container">
            <h1>Lame Jokes</h1>
            <p>Crack clues. Race the clock. Find the treasure!</p>
          </div>
        </section>

        <section className="game-details">
          <div className="container game-details-container">
            <div className="game-image">
              <img src={gameImage} alt="Lame Jokes" />
            </div>
            <div className="game-info">
              <h2>About the <span className="highlight">game</span></h2>
              <p>Get ready for some laughs and groans in the MUJ Lame Jokes Competition! It’s not about telling the funniest joke; it’s about telling the cheesiest, cringiest, most eye-roll-inducing jokes you can come up with. The lamer the better!</p>
              <div className="registration-cta">
                <button className="btn btn-primary" onClick={handleRegisterClick}>
                  Register Now
                </button>
              </div>
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
                  <li>Individual participation – each participant competes solo.</li>
                  <li>Submit your joke via registration form or event platform.</li>
                  <li>Your joke will be shared aloud or displayed.</li>
                  <li>Audience will rate the joke via poll or voting system.</li>
                  <li>More groans/laughs = higher score!</li>
                  <li>Highest score wins.</li>
                </ul>
              </div>
              <div className="instruction-col">
                <h3><span>02</span> Game rules</h3>
                <ul>
                  <li>Jokes must be original (no plagiarism).</li>
                  <li>Keep jokes appropriate for all audiences.</li>
                  <li>Time limit per joke (e.g., 30 seconds).</li>
                  <li>Audience will judge on creativity and reaction.</li>
                  <li>No cheating – violators will be disqualified.</li>
                  <li>Need help? Contact <a href="mailto:support@mujunityfest.in" style={{ color: '#f26522', textDecoration: 'none' }}>support@mujunityfest.in</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Team />
      </main>

      {/* Login modal if user not authenticated */}
      {showLoginModal && (
        <LoginModal toggleLoginModal={setShowLoginModal} />
      )}

      {/* Optional payment modal or registration modal */}
      {showPayment && (
        <PaymentModal onClose={handleClosePayment} />
      )}

      {/* Optional reminder popup you can add here */}
    </>
  );
};

export default LameJokes;
