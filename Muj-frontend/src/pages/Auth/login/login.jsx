import React, { useState } from "react";

// Reusable Input component
const InputField = ({ type, placeholder, value, onChange, ariaLabel }) => (
  <div className="modal-input-wrapper">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="modal-input"
      aria-label={ariaLabel}
      required
    />
  </div>
);

const Checkbox = ({ id, label, checked, onChange }) => (
  <div className="modal-remember">
    <input
      type="checkbox"
      id={id}
      className="modal-checkbox"
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);

const LoginModal = ({ toggleLoginModal, switchToSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    onLoginSuccess?.();

    setTimeout(() => {
      toggleLoginModal(false);
    }, 2000);
  };

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
        {showSuccess ? (
          // ✅ Success Message Inline
          <div className="login-success-container">
            <div className="login-success-card">
              <h2>🎉 Login Successful!</h2>
              <p>Welcome back to MUJ Unity Fest!</p>
            </div>
          </div>
        ) : (
          <>
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
              <span
                className="modal-signup"
                onClick={switchToSignup}
                style={{ cursor: "pointer" }}
              >
                {" "}Sign up
              </span>
            </p>

            <form className="modal-form" onSubmit={handleLogin}>
              <InputField
                type="text"
                placeholder="Your email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ariaLabel="Email or phone number"
              />

              <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ariaLabel="Password"
              />

              <div className="modal-options">
                <Checkbox
                  id="remember"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <button type="button" className="modal-forgot">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="modal-submit">
                Sign in
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
