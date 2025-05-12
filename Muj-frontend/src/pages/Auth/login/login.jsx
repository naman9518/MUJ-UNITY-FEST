import React, { useState } from "react";
import { useAuth } from "../../../contexts/authContext.jsx"; 
import SuccessMessage from "./SuccessMessage";
import ResetPassword from "./resetpassword.jsx";

const validationPatterns = {
  email: /@mujonline\.edu\.in$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
};

const errorMessages = {
  email: "Email must end with @mujonline.edu.in",
  password:
    "Password must contain 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.",
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
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth(); 

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        return validationPatterns.email.test(value) ? "" : errorMessages.email;
      case "password":
        return validationPatterns.password.test(value)
          ? ""
          : errorMessages.password;
      default:
        return "";
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (errors.email) {
      setErrors({ ...errors, email: validateField("email", newEmail) });
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
    setErrors({ ...errors, email: validateField("email", email) });
  };

  const handlePasswordBlur = () => {
    setErrors({ ...errors, password: validateField("password", password) });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationResults = {
      email: validateField("email", email),
      password: validateField("password", password),
    };
    setErrors(validationResults);

    if (Object.values(validationResults).every((msg) => !msg)) {
      const userData = { email };
      const loginSuccess = await login(userData); 
      
      if (loginSuccess) {
        if (rememberMe) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail", email);
        }
        setShowSuccess(true);
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
          <InputField
            type="email"
            placeholder="University Email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            ariaLabel="Email"
            error={errors.email}
          />
          <InputField
            type="password"
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
          <button type="submit" className="modal-submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;