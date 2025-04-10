import React from "react";
import "../CSS/signup.css"; // For modal background/layout
import "../CSS/SignupSuccess.css"; // Custom thank-you styles
import CheckIcon from "./Checkicon";

function SignUpSuccessfull() {
  return (
    <div className="success-wrapper">
      <div className="success-card">
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

export default SignUpSuccessfull;
