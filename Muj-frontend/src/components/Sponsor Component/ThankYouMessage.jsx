import React from "react";
import CheckIcon from "./Checkicon";

function ThankYouPage({ onClose }) {
  return (
    <div className="success-wrapper">
      <div className="success-card">
        <button className="close-button success-close" onClick={onClose}>×</button>
        <div className="success-header">
          <div className="success-check-icon">
            <CheckIcon />
          </div>
          <h2 className="success-title">Thank you!</h2>
        </div>
        <p className="success-message">
          Your response has been submitted successfully! Our team will get back to you shortly.
        </p>
      </div>
    </div>
  );
}

export default ThankYouPage;