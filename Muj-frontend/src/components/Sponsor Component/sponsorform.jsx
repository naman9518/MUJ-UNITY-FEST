import React, { useState } from "react";
import "./sponsorform.css";
import ThankYouPage from "./ThankYouMessage";

function SponsorModal({ onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (isSubmitted) {
    return <ThankYouPage onClose={handleClose} />;
  }

  return (
    <div className="sponsor-modal-wrapper">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>×</button>
        <h2 className="modal-title">Become our sponsor</h2>
        <form className="sponsor-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" placeholder="First Name*" required />
            <input type="text" placeholder="Last Name*" required />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Company Name*" required />
            <input type="email" placeholder="Company Email*" required />
          </div>
          <div className="form-row">
            <input type="tel" placeholder="Phone Number*" required />
            <input type="text" placeholder="Your Designation*" required />
          </div>
          <textarea placeholder="Write to us" rows={4} />
          <label className="consent">
            <input type="checkbox" required />
            I authorize MUJ UNITY FEST and its associates to contact me with updates
            via email, SMS, WhatsApp, and voice call.
          </label>
          <button type="submit" className="signup-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SponsorModal;