import React, { useState, useEffect } from "react";
import SignUpSuccessfull from "../components/SignupSuccess";
import "../CSS/signup.css";

function SignUpModal({ toggleSignupModal, switchToLogin }) {
  const [showSuccess, setShowSuccess] = useState(false);
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

  const validateFirstName = (value) => /^[A-Za-z]+$/.test(value);
  const validateEmail = (value) => value.endsWith("@mujonline.edu.in");
  const validateOTP = (value) => /^\d{6}$/.test(value);
  const validatePassword = (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value);

  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    } else {
      clearInterval(timerInterval);
    }
  }, [otpTimer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newErrors = { ...errors };

    if (name === "firstName") {
      newErrors.firstName = validateFirstName(value)
        ? ""
        : "Only alphabets allowed.";
    }

    if (name === "email") {
      newErrors.email = validateEmail(value)
        ? ""
        : "Email must end with @mujonline.edu.in";
    }

    if (name === "otp") {
      newErrors.otp = validateOTP(value) ? "" : "OTP must be exactly 6 digits.";
    }

    if (name === "password") {
      newErrors.password = validatePassword(value)
        ? ""
        : "Password must contain 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.";
    }

    if (name === "confirmPassword") {
      newErrors.confirmPassword =
        value === formData.password ? "" : "Passwords do not match.";
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validations = {
      firstName: validateFirstName(formData.firstName),
      email: validateEmail(formData.email),
      otp: validateOTP(formData.otp),
      password: validatePassword(formData.password),
      confirmPassword: formData.confirmPassword === formData.password,
    };

    const newErrors = {};

    Object.entries(validations).forEach(([key, valid]) => {
      if (!valid) {
        switch (key) {
          case "firstName":
            newErrors[key] = "Only alphabets allowed.";
            break;
          case "email":
            newErrors[key] = "Email must end with @mujonline.edu.in";
            break;
          case "otp":
            newErrors[key] = "OTP must be exactly 6 digits.";
            break;
          case "password":
            newErrors[key] =
              "Password must contain 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.";
            break;
          case "confirmPassword":
            newErrors[key] = "Passwords do not match.";
            break;
          default:
            break;
        }
      }
    });

    setErrors(newErrors);

    const allValid = Object.keys(newErrors).length === 0;

    if (allValid) {
      setShowSuccess(true);
    }
  };

  const goToLogin = () => {
    setShowSuccess(false);
    toggleSignupModal(false);
    switchToLogin();
  };

  const handleGetOtp = () => {
    if (otpTimer === 0) {
      setOtpTimer(90); // 1 minute 30 seconds = 90 seconds
      // You can add your API call to send OTP here
    }
  };

  const formatTimer = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  if (showSuccess) return <SignUpSuccessfull goToLogin={goToLogin} />;

  return (
    <div className="logout-modal-wrapper" onClick={() => toggleSignupModal(false)}>
      <div className="modal-contents" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Sign up</h2>
          <button className="modal-close-btn" onClick={() => toggleSignupModal(false)}>×</button>
        </div>

        <p className="modal-subtitle">
          Already have an account?
          <span className="modal-signin" onClick={switchToLogin}> Sign in</span>
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
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}

          <div className="form-row">
            <input type="tel" placeholder="Phone number*" className="form-input" required />
            <input type="tel" placeholder="Alternate phone number" className="form-input" />
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
            />
            <div className="otp-combined">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className={`form-input otp-input ${errors.otp ? "input-error" : ""}`}
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
          {errors.email && <p className="error-message">{errors.email}</p>}
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
              <option value="Batch1">Batch 1</option>
              <option value="Batch2">Batch 2</option>
              <option value="Batch3">Batch 3</option>
              <option value="Batch4">Batch 4</option>
              <option value="Batch5">Batch 5</option>
              <option value="Batch6">Batch 6</option>
              <option value="Batch7">Batch 7</option>
              <option value="Batch8">Batch 8</option>
              <option value="Batch9">Batch 9</option>
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
              className={`form-input ${errors.confirmPassword ? "input-error" : ""}`}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

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
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#f26522", textDecoration: "underline" }}
              >
                Privacy Policy
              </a>.
            </label>
          </div>



          <button type="submit" className="modal-submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
