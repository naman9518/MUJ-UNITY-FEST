import React from "react";
import "./ContactThankYouMessage.css"; 

function ContactThankYouMessage({ onClose }) {
  return (
    <div className="thank-you-overlay">
      <div className="thank-you-container">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="thank-you-content">
          <div className="check-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2>Thank You!</h2>
          <p>Your message has been successfully submitted.</p>
          <p>We will get back to you as soon as possible.</p>
          <button className="back-button" onClick={onClose}>Back to Contact</button>
        </div>
      </div>
    </div>
  );
}

export default ContactThankYouMessage;