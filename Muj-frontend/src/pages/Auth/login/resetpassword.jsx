import React, { useState } from "react";
import Styles from "./resetpassword.module.css";
import SuccessMessage from "./SuccessMessage";
import useAuthStore from "../../../store/useAuthStore";

const validationPatterns = {
  email: /@mujonline\.edu\.in$/,
  otp: /^\d{6}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
};

const errorMessages = {
  email: "Email must end with @mujonline.edu.in",
  otp: "OTP must be exactly 6 digits.",
  password:
    "Password must contain 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.",
  confirm: "Passwords do not match.",
};

const ResetPassword = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const { sendResetOtp, verifyResetPassword, error, loading } = useAuthStore();

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        return validationPatterns.email.test(value) ? "" : errorMessages.email;
      case "otp":
        return validationPatterns.otp.test(value) ? "" : errorMessages.otp;
      case "password":
        return validationPatterns.password.test(value)
          ? ""
          : errorMessages.password;
      case "confirm":
        return value === password ? "" : errorMessages.confirm;
      default:
        return "";
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    const emailError = validateField("email", email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    const isSent = await sendResetOtp({ email });

    if (isSent) {
      setOtpSent(true);
    } else {
      setErrors({ general: "Failed to send OTP" });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const validationResults = {
      otp: validateField("otp", otp),
      password: validateField("password", password),
      confirm: validateField("confirm", confirmPassword),
    };

    setErrors(validationResults);

    if (Object.values(validationResults).every((msg) => !msg)) {
      const resetData = {
        universityEmail: email,
        otp,
        newPassword: password,
      };

      const isReset = await verifyResetPassword(resetData);

      if (isReset) {
        setShowSuccess(true);
      } else {
        setErrors({ general: "Failed to reset password" });
      }
    }
  };

  if (showSuccess) {
    return (
      <SuccessMessage
        title="Password Reset Successful!"
        message="Your password has been successfully updated. You can now login with your new password."
        actionText="Back to Login"
        onAction={onBack}
        onClose={onBack}
      />
    );
  }

  return (
    <div className={Styles.resetContainer}>
      <div className={Styles.resetHeader}>
        <h2>Reset Password</h2>
        <button className={Styles.closeButton} onClick={onBack}>
          ×
        </button>
      </div>
      <form onSubmit={otpSent ? handleResetPassword : handleSendOtp}>
        <div className={Styles.inputGroup}>
          <input
            type="email"
            placeholder="University Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors({
                  ...errors,
                  email: validateField("email", e.target.value),
                });
              }
            }}
            disabled={otpSent}
            className={`${Styles.input} ${
              errors.email ? Styles.inputError : ""
            }`}
            required
          />
          {errors.email && <p className={Styles.errorText}>{errors.email}</p>}
          {!otpSent && (
            <button type="submit" className={Styles.otpButton}>
              Send OTP
            </button>
          )}
        </div>
        {otpSent && (
          <>
            <div className={Styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  if (errors.otp) {
                    setErrors({
                      ...errors,
                      otp: validateField("otp", e.target.value),
                    });
                  }
                }}
                maxLength={6}
                className={`${Styles.input} ${
                  errors.otp ? Styles.inputError : ""
                }`}
                required
              />
              {errors.otp && <p className={Styles.errorText}>{errors.otp}</p>}
            </div>
            <div className={Styles.inputGroup}>
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({
                      ...errors,
                      password: validateField("password", e.target.value),
                    });
                  }
                  // Also validate confirm password when password changes
                  if (confirmPassword) {
                    setErrors({
                      ...errors,
                      confirm: validateField("confirm", confirmPassword),
                      password: validateField("password", e.target.value),
                    });
                  }
                }}
                className={`${Styles.input} ${
                  errors.password ? Styles.inputError : ""
                }`}
                required
              />
              {errors.password && (
                <p className={Styles.errorText}>{errors.password}</p>
              )}
            </div>
            <div className={Styles.inputGroup}>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({
                    ...errors,
                    confirm: validateField("confirm", e.target.value),
                  });
                }}
                className={`${Styles.input} ${
                  errors.confirm ? Styles.inputError : ""
                }`}
                required
              />
              {errors.confirm && (
                <p className={Styles.errorText}>{errors.confirm}</p>
              )}
            </div>
            <button type="submit" className={Styles.resetButton}>
              Reset Password
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
