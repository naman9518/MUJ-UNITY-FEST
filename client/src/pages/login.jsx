import React from "react";
import "../LoginModal.css"; // 👈 External styles

function LoginModal({ toggleLoginModal, switchToSignup }) {
  return (
    <div
      className="login-modal-wrapper"
      onClick={() => toggleLoginModal(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="login-title" className="modal-title">Sign in</h2>
          <button
            className="modal-close-btn"
            onClick={() => toggleLoginModal(false)}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <p className="modal-subtitle">
          <span>Don't have an account yet?</span>
          {/* 👇 Use switchToSignup on click */}
          <span
            className="modal-signup"
            onClick={switchToSignup}
            style={{ cursor: "pointer", color: "#007BFF" }}
          >
            {" "}Sign up
          </span>
        </p>

        <form className="modal-form">
          <div className="modal-input-wrapper">
            <input
              type="text"
              placeholder="Your email or phone number"
              className="modal-input"
              aria-label="Email or phone number"
            />
          </div>

          <div className="modal-input-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="modal-input"
              aria-label="Password"
            />
          </div>

          <div className="modal-options">
            <div className="modal-remember">
              <input
                type="checkbox"
                id="remember"
                className="modal-checkbox"
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button type="button" className="modal-forgot">
              Forgot password?
            </button>
          </div>

          <button type="submit" className="modal-submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
