import React, { useState, useEffect } from "react";
import SignUpSuccessfull from "./SignupSuccess";
const validationPatterns = {
  firstName: /^[A-Za-z]+$/,
  email: /@mujonline\.edu\.in$/,
  otp: /^\d{6}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
};
const errorMessages = {
  firstName: "Only alphabets allowed.",
  email: "Email must end with @mujonline.edu.in",
  otp: "OTP must be exactly 6 digits.",
  password:
    "Password must contain 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.",
  confirmPassword: "Passwords do not match.",
};
function SignUpModal({ toggleSignupModal, switchToLogin }) {
  const [showSuccess, setShowSuccess] = useState(!1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
    course: "",
    batch: "",
  });
  const [errors, setErrors] = useState({});
  const [otpTimer, setOtpTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    }
    return () => clearInterval(timerInterval);
  }, [otpTimer]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };
  const validateField = (field, value) => {
    switch (field) {
      case "firstName":
        return validationPatterns.firstName.test(value)
          ? ""
          : errorMessages.firstName;
      case "email":
        return validationPatterns.email.test(value) ? "" : errorMessages.email;
      case "otp":
        return validationPatterns.otp.test(value) ? "" : errorMessages.otp;
      case "password":
        return validationPatterns.password.test(value)
          ? ""
          : errorMessages.password;
      case "confirmPassword":
        return value === formData.password ? "" : errorMessages.confirmPassword;
      default:
        return "";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationResults = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key]);
      return acc;
    }, {});
    setErrors(validationResults);
    if (Object.values(validationResults).every((msg) => !msg)) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
        course: "",
        batch: "",
      });
      setShowSuccess(!0);
    }
  };
  const goToLogin = () => {
    setShowSuccess(!1);
    toggleSignupModal(!1);
    switchToLogin();
  };
  const handleGetOtp = () => {
    if (otpTimer === 0) {
      setOtpTimer(90);
    }
  };
  const formatTimer = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };
  if (showSuccess) return <SignUpSuccessfull goToLogin={goToLogin} />;
  return (
    <div className="logout-modal-wrapper" onClick={() => toggleSignupModal(!1)}>
      <div className="modal-contents" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Sign up</h2>
          <button
            className="modal-close-btn"
            onClick={() => toggleSignupModal(!1)}
          >
            ×
          </button>
        </div>
        <p className="modal-subtitle">
          Already have an account?
          <span className="modal-signin" onClick={switchToLogin}>
            {" "}
            Sign in
          </span>
        </p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              className={`form-input ${errors.firstName ? "input-error" : ""}`}
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="form-input"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          {errors.firstName && (
            <p className="error-message">{errors.firstName}</p>
          )}
          <div className="form-row">
            <input
              type="tel"
              placeholder="Phone number*"
              className="form-input"
              required
            />
            <input
              type="tel"
              placeholder="Alternate phone number"
              className="form-input"
            />
          </div>
          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="University mail ID*"
              className={`form-input ${errors.email ? "input-error" : ""}`}
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{ width: "100%" }}
            />
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}
          <div className="form-row">
            <div className="otp-combined">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className={`form-input otp-input ${
                  errors.otp ? "input-error" : ""
                }`}
                value={formData.otp}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="get-otp-btn"
                onClick={handleGetOtp}
                disabled={otpTimer > 0}
              >
                {otpTimer > 0 ? formatTimer(otpTimer) : "Get OTP"}
              </button>
            </div>
          </div>
          {errors.otp && <p className="error-message">{errors.otp}</p>}
          <div className="form-row">
            <select
              name="course"
              className={`form-input ${errors.course ? "input-error" : ""}`}
              value={formData.course}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Course*</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="MBA">MBA</option>
              <option value="MCA">MCA</option>
              <option value="B.Com">B.Com</option>
              <option value="M.Com">M.Com</option>
            </select>
            <select
              name="batch"
              className={`form-input ${errors.batch ? "input-error" : ""}`}
              value={formData.batch}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Batch*</option>
              {Array.from({ length: 9 }, (_, i) => (
                <option key={i} value={`Batch${i + 1}`}>{`Batch ${
                  i + 1
                }`}</option>
              ))}
            </select>
          </div>
          {errors.course && <p className="error-message">{errors.course}</p>}
          {errors.batch && <p className="error-message">{errors.batch}</p>}
          <div className="form-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`form-input ${errors.password ? "input-error" : ""}`}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={`form-input ${
                errors.confirmPassword ? "input-error" : ""
              }`}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
          <div className="checkbox-row">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I accept the{" "}
              <a
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#f26522", textDecoration: "underline" }}
              >
                Terms&Conditions
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#f26522", textDecoration: "underline" }}
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>
          <button type="submit" className="modal-submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignUpModal;
