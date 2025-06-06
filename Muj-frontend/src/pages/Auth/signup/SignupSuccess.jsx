import React from "react";
import CheckIcon from "../../../components/Sponsor Component/Checkicon";

function SignUpSuccessfull({ goToLogin }) {
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
          You have successfully created your account! <br />
          Please{" "}
          <span
            onClick={goToLogin}
            style={{
              color: "#007bff",
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            log in
          </span>
          .
        </p>
      </div>
    </div>
  );
}

export default SignUpSuccessfull;
