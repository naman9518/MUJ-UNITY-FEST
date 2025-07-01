import React, { useState } from "react";
import SuccessMessage from "./SuccessMessage";
import ResetPassword from "./resetpassword.jsx";
import "./LoginModal.css";
import useAuthStore from "../../../store/useAuthStore.js";

const validationPatterns = {
  email: /@mujonline\.edu\.in$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
};

const errorMessages = {
  email: "Email must end with @mujonline.edu.in",
  password: "Password must contain 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.",
};

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  ariaLabel,
  error,
  onBlur,
}) => (
  <div className="modal-input-wrapper">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`modal-input ${error ? "input-error" : ""}`}
      aria-label={ariaLabel}
      required
    />
    {error && <p className="error-text">{error}</p>}
  </div>
);

const PasswordField = ({
  placeholder,
  value,
  onChange,
  ariaLabel,
  error,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="modal-input-wrapper">
      <div className="password-input-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`modal-input password-input ${error ? "input-error" : ""}`}
          aria-label={ariaLabel}
          required
        />
        <button
          type="button"
          className="password-toggle-btn"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            // Eye slash icon (hide password)
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
              <line x1="2" y1="2" x2="22" y2="22"></line>
            </svg>
          ) : (
            // Eye icon (show password)
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          )}
        </button>
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

const EmailField = ({
  placeholder,
  value,
  onChange,
  ariaLabel,
  error,
  onBlur,
}) => (
  <div className="modal-input-wrapper">
    <div className="email-input-container">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`modal-input email-prefix-input ${error ? "input-error" : ""}`}
        aria-label={ariaLabel}
        required
      />
      <div className="email-suffix-overlay">
        <span className="email-user-text">{value}</span>
        <span className="email-suffix">@mujonline.edu.in</span>
      </div>
    </div>
    {error && <p className="error-text">{error}</p>}
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
  const [emailPrefix, setEmailPrefix] = useState(""); 
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error } = useAuthStore();

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

  const handleEmailPrefixChange = (e) => {
    const newEmailPrefix = e.target.value;
    setEmailPrefix(newEmailPrefix);
    
    const fullEmail = newEmailPrefix + "@mujonline.edu.in";
    if (errors.email) {
      setErrors({
        ...errors,
        email: validateField("email", fullEmail)
      });
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (errors.password) {
      setErrors({
        ...errors,
        password: validateField("password", newPassword),
      });
    }
  };

  const handleEmailBlur = () => {
    const fullEmail = emailPrefix + "@mujonline.edu.in";
    setErrors({
      ...errors,
      email: validateField("email", fullEmail)
    });
  };

  const handlePasswordBlur = () => {
    setErrors({
      ...errors,
      password: validateField("password", password)
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const fullEmail = emailPrefix + "@mujonline.edu.in";
    const validationResults = {
      email: validateField("email", fullEmail),
      password: validateField("password", password),
    };
    
    setErrors(validationResults);
    
    if (Object.values(validationResults).every((msg) => !msg)) {
      setIsSubmitting(true);
      try {
        const userData = {
          email: fullEmail, // Send the complete email
          password
        };
        const loginSuccess = await login(userData);
        if (loginSuccess) {
          if (rememberMe) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", fullEmail);
          }
          setShowSuccess(true);
        }
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setIsSubmitting(false);
      }
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
          <h2 id="login-title" className="modal-title">
            Sign in
          </h2>
          <button
            className="modal-close-btn"
            onClick={() => toggleLoginModal(false)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {/* Global/server error at the top for visibility */}
        {error && <p className="error-text global-error">{error}</p>}
        <p className="modal-subtitle">
          <span>Don't have an account yet?</span>
          <span
            className="modal-signup"
            onClick={switchToSignup}
            style={{ cursor: "pointer" }}
          >
            {" "}
            Sign up
          </span>
        </p>
        <form className="modal-form" onSubmit={handleLogin}>
          <EmailField
            placeholder="University Email"
            value={emailPrefix}
            onChange={handleEmailPrefixChange}
            onBlur={handleEmailBlur}
            ariaLabel="Email prefix"
            error={errors.email}
          />
          <PasswordField
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            ariaLabel="Password"
            error={errors.password}
          />
          <div className="modal-options">
            <Checkbox
              id="remember"
              label="Remember me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <button
              type="button"
              className="modal-forgot"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="modal-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;