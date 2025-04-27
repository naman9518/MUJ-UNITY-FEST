import React, { useState } from "react";
import SuccessMessage from "./SuccessMessage";
import ResetPassword from "./resetpassword.jsx";

const validationPatterns = {
  email: /@mujonline\.edu\.in$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
};

const errorMessages = {
  email: "Email must end with @mujonline.edu.in",
  password: "Password must contain 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.",
};

const LoginModal = ({ toggleLoginModal, switchToSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        return validationPatterns.email.test(value) ? "" : errorMessages.email;
      case "password":
        return validationPatterns.password.test(value) ? "" : errorMessages.password;
      default:
        return "";
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    const validationResults = {
      email: validateField("email", email),
      password: validateField("password", password),
    };
    
    setErrors(validationResults);
    
    if (Object.values(validationResults).every(msg => !msg)) {
      if (rememberMe) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
      }
      setShowSuccess(true);
    }
  };

  const handleForgotPassword = () => {
    setShowResetPassword(true);
  };

  const handleBackToLogin = () => {
    setShowResetPassword(false);
    setShowSuccess(false);
  };

  if (showResetPassword) {
    return (
      <div className="login-modal-wrapper">
        <div className="modal-content">
          <ResetPassword onBack={handleBackToLogin} />
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <SuccessMessage
        title="Login Successful!"
        message="Welcome back to MUJ Unity Fest!"
        actionText="Continue"
        onAction={() => {
          toggleLoginModal(false);
          onLoginSuccess?.();
        }}
        onClose={() => toggleLoginModal(false)}
      />
    );
  }

  return (
    <div className="login-modal-wrapper">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Sign in</h2>
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
          <span className="modal-signup" onClick={switchToSignup}>
            {" "}Sign up
          </span>
        </p>
        <form className="modal-form" onSubmit={handleLogin}>
          <div className="modal-input-wrapper">
            <input
              type="email"
              placeholder="University Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors({ ...errors, email: validateField("email", e.target.value) });
                }
              }}
              className={`modal-input ${errors.email ? "input-error" : ""}`}
              required
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="modal-input-wrapper">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors({ ...errors, password: validateField("password", e.target.value) });
                }
              }}
              className={`modal-input ${errors.password ? "input-error" : ""}`}
              required
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <div className="modal-options">
            <div className="modal-remember">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="modal-checkbox"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button
              type="button"
              className="modal-forgot"
              onClick={handleForgotPassword}
            >
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
};

export default LoginModal;