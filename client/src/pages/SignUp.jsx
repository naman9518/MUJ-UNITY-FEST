import React, { useState } from "react";
import SignUpSuccessfull from "../components/SignupSuccess";
import "../signup.css";

function SignUpModal({ toggleSignupModal, switchToLogin }) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true); // simulate success screen
  };

  const goToLogin = () => {
    setShowSuccess(false);
    toggleSignupModal(false);
    switchToLogin();
  };

  if (showSuccess) {
    return <SignUpSuccessfull goToLogin={goToLogin} />;
  }

  return (
    <div className="logout-modal-wrapper" onClick={() => toggleSignupModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Sign up</h2>
          <button className="modal-close-btn" onClick={() => toggleSignupModal(false)}>×</button>
        </div>

        <p className="modal-subtitle">
          Already have an account?
          <span
            className="modal-signin"
            onClick={switchToLogin}
            style={{ cursor: "pointer", color: "#007BFF" }}
          >
            {" "}Sign in
          </span>
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" placeholder="First Name*" className="form-input" required />
            <input type="text" placeholder="Last Name*" className="form-input" required />
          </div>

          <div className="form-row">
            <input type="tel" placeholder="Phone number*" className="form-input" required />
            <input type="tel" placeholder="Alternate phone number" className="form-input" />
          </div>

          <div className="form-row">
            <input type="email" placeholder="University mail ID*" className="form-input" required />
            <div className="otp-combined">
              <button type="button" className="get-otp-btn">Get OTP</button>
              <input type="text" className="form-input otp-input" placeholder="Enter OTP" />
            </div>
          </div>

          <div className="form-row">
            <input type="text" placeholder="Select Course*" className="form-input" required />
            <input type="text" placeholder="Select Batch*" className="form-input" required />
          </div>

          <div className="form-row">
            <input type="password" placeholder="Password" className="form-input" required />
            <input type="password" placeholder="Confirm Password" className="form-input" required />
          </div>

          <div className="checkbox-row">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I accept the terms and conditions.</label>
          </div>

          <button type="submit" className="modal-submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
