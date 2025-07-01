import React, { useState, useEffect } from "react";
import SignUpSuccessfull from "./SignupSuccessfull";
import useAuthStore from "../../../store/useAuthStore";

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
  password: "Password must contain 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.",
  confirmPassword: "Passwords do not match.",
};

function SignUpModal({ toggleSignupModal, switchToLogin }) {
  const { sendOtp, loading, error, signupUser } = useAuthStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    alternatePhone: "",
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (field, value) => {
    switch (field) {
      case "firstName":
        return validationPatterns.firstName.test(value) ? "" : errorMessages.firstName;
      case "email":
        return validationPatterns.email.test(value) ? "" : errorMessages.email;
      case "otp":
        return validationPatterns.otp.test(value) ? "" : errorMessages.otp;
      case "password":
        return validationPatterns.password.test(value) ? "" : errorMessages.password;
      case "confirmPassword":
        return value === formData.password ? "" : errorMessages.confirmPassword;
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResults = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key]);
      return acc;
    }, {});

    setErrors(validationResults);

    if (Object.values(validationResults).every((msg) => !msg)) {
      const finalFormData = {
        name: `${formData.firstName} ${formData.lastName}`,
        universityEmail: formData.email,
        course: formData.course,
        batch: formData.batch,
        password: formData.password,
        otp: formData.otp,
        phone: formData.phoneNumber,
        phone2: formData.alternatePhone,
      };

      const res = await signupUser(finalFormData);
      if (res.success) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          alternatePhone: "",
          otp: "",
          password: "",
          confirmPassword: "",
          course: "",
          batch: "",
        });
        setShowSuccess(true);
      } else {
        alert(res.message);
      }
    }
  };

  const goToLogin = () => {
    setShowSuccess(false);
    toggleSignupModal(false);
    switchToLogin();
  };

  const handleGetOtp = async () => {
    if (otpTimer === 0 && formData.email) {
      const errorMsg = validateField("email", formData.email);
      if (errorMsg) {
        setErrors((prev) => ({
          ...prev,
          email: errorMsg,
        }));
        return;
      }

      await sendOtp(formData.email);
      setOtpTimer(15);
      setOtpSent(true);
    }
  };

  const formatTimer = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  if (showSuccess) return <SignUpSuccessfull goToLogin={goToLogin} />;

  return (
    <div
      className="signup-modal-wrapper"
      onClick={() => toggleSignupModal(false)}
    >
      <div className="signup-modal-contents" onClick={(e) => e.stopPropagation()}>
        <div className="signup-modal-header">
          <h2 className="signup-modal-title">Sign up</h2>
          <button
            className="signup-modal-close-btn"
            onClick={() => toggleSignupModal(false)}
          >
            ×
          </button>
        </div>

        {error && <p className="signup-error-text signup-global-error">{error}</p>}

        <p className="signup-modal-subtitle">
          Already have an account?
          <span className="signup-modal-signin" onClick={switchToLogin}>
            {" "}
            Sign in
          </span>
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* First Row: First Name & Last Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name*"
            className={`signup-form-input ${errors.firstName ? "input-error" : ""}`}
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="signup-form-input"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          
          {errors.firstName && (
            <p className="signup-error-message">{errors.firstName}</p>
          )}

          {/* Second Row: Phone Numbers */}
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone number*"
            className="signup-form-input"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="alternatePhone"
            placeholder="Alternate phone number"
            className="signup-form-input"
            value={formData.alternatePhone}
            onChange={handleInputChange}
          />

          {/* Third Row: Email + OTP + Get OTP Button */}
          <div className="signup-email-otp-row signup-form-full-width">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                type="email"
                name="email"
                placeholder="University mail ID*"
                className={`signup-form-input ${errors.email ? "input-error" : ""}`}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && (
                <p className="signup-error-message">{errors.email}</p>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                name="otp"
                placeholder="OTP"
                className={`signup-form-input signup-otp-input ${
                  errors.otp ? "input-error" : ""
                }`}
                value={formData.otp}
                onChange={handleInputChange}
                maxLength="6"
              />
              {errors.otp && <p className="signup-error-message">{errors.otp}</p>}
            </div>
            <button
              type="button"
              className="signup-get-otp-btn"
              onClick={handleGetOtp}
              disabled={otpTimer > 0}
            >
              {otpTimer > 0 ? formatTimer(otpTimer) : "Get OTP"}
            </button>
          </div>
          
          {otpSent && (
            <p className="signup-otp-info-message">
              📧 Please check your university email ({formData.email}) for the OTP code.
            </p>
          )}

          {/* Fourth Row: Course & Batch */}
          <select
            name="course"
            className={`signup-form-input ${errors.course ? "input-error" : ""}`}
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
            className={`signup-form-input ${errors.batch ? "input-error" : ""}`}
            value={formData.batch}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Batch*</option>
            {Array.from({ length: 9 }, (_, i) => (
              <option key={i} value={`${i + 1}`}>
                {`Batch ${i + 1}`}
              </option>
            ))}
          </select>

          {errors.course && <p className="signup-error-message">{errors.course}</p>}
          {errors.batch && <p className="signup-error-message">{errors.batch}</p>}

          {/* Fifth Row: Passwords */}
          <input
            type="password"
            name="password"
            placeholder="Password*"
            className={`signup-form-input ${errors.password ? "input-error" : ""}`}
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password*"
            className={`signup-form-input ${
              errors.confirmPassword ? "input-error" : ""
            }`}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />

          {errors.password && (
            <p className="signup-error-message">{errors.password}</p>
          )}
          {errors.confirmPassword && (
            <p className="signup-error-message">{errors.confirmPassword}</p>
          )}

          {/* Terms & Conditions */}
          <div className="signup-checkbox-row">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I accept the{" "}
              <a
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <button type="submit" className="signup-modal-submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;








// S I G N U P         M O D A L  







// import React, { useState, useEffect } from "react";

// // Mock components and hooks for demonstration
// const SignUpSuccessfull = ({ goToLogin }) => (
//   <div className="success-wrapper">
//     <div className="success-content">
//       <div className="success-icon">✓</div>
//       <h2>Registration Successful!</h2>
//       <p>Your account has been created successfully.</p>
//       <button onClick={goToLogin} className="success-btn">
//         Go to Login
//       </button>
//     </div>
//   </div>
// );

// const useAuthStore = () => ({
//   sendOtp: async (email) => {
//     console.log(`Sending OTP to ${email}`);
//     return { success: true };
//   },
//   loading: false,
//   error: null,
//   signupUser: async (data) => {
//     console.log('Signing up user:', data);
//     return { success: true };
//   }
// });

// const validationPatterns = {
//   firstName: /^[A-Za-z]+$/,
//   email: /@mujonline\.edu\.in$/,
//   otp: /^\d{6}$/,
//   password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
// };

// const errorMessages = {
//   firstName: "Only alphabets allowed.",
//   email: "Email must end with @mujonline.edu.in",
//   otp: "OTP must be exactly 6 digits.",
//   password: "Password must contain 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.",
//   confirmPassword: "Passwords do not match.",
// };

// function SignUpModal({ toggleSignupModal = () => {}, switchToLogin = () => {} }) {
//   const { sendOtp, loading, error, signupUser } = useAuthStore();
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     alternatePhone: "",
//     otp: "",
//     password: "",
//     confirmPassword: "",
//     course: "",
//     batch: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [otpTimer, setOtpTimer] = useState(0);
//   const [timerInterval, setTimerInterval] = useState(null);

//   useEffect(() => {
//     if (otpTimer > 0) {
//       const interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
//       setTimerInterval(interval);
//       return () => clearInterval(interval);
//     }
//     return () => clearInterval(timerInterval);
//   }, [otpTimer]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: validateField(name, value),
//     }));
//   };

//   const validateField = (field, value) => {
//     switch (field) {
//       case "firstName":
//         return validationPatterns.firstName.test(value) ? "" : errorMessages.firstName;
//       case "email":
//         return validationPatterns.email.test(value) ? "" : errorMessages.email;
//       case "otp":
//         return validationPatterns.otp.test(value) ? "" : errorMessages.otp;
//       case "password":
//         return validationPatterns.password.test(value) ? "" : errorMessages.password;
//       case "confirmPassword":
//         return value === formData.password ? "" : errorMessages.confirmPassword;
//       default:
//         return "";
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationResults = Object.keys(formData).reduce((acc, key) => {
//       acc[key] = validateField(key, formData[key]);
//       return acc;
//     }, {});
//     setErrors(validationResults);

//     if (Object.values(validationResults).every((msg) => !msg)) {
//       const finalFormData = {
//         name: `${formData.firstName} ${formData.lastName}`,
//         universityEmail: formData.email,
//         course: formData.course,
//         batch: formData.batch,
//         password: formData.password,
//         otp: formData.otp,
//         phone: formData.phoneNumber,
//         phone2: formData.alternatePhone,
//       };
//       const res = await signupUser(finalFormData);
//       if (res.success) {
//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           phoneNumber: "",
//           alternatePhone: "",
//           otp: "",
//           password: "",
//           confirmPassword: "",
//           course: "",
//           batch: "",
//         });
//         setShowSuccess(true);
//       } else {
//         alert(res.message);
//       }
//     }
//   };

//   const goToLogin = () => {
//     setShowSuccess(false);
//     toggleSignupModal(false);
//     switchToLogin();
//   };

//   const handleGetOtp = async () => {
//     if (otpTimer === 0 && formData.email) {
//       const errorMsg = validateField("email", formData.email);
//       if (errorMsg) {
//         setErrors((prev) => ({
//           ...prev,
//           email: errorMsg,
//         }));
//         return;
//       }
//       await sendOtp(formData.email);
//       setOtpTimer(60);
//       setOtpSent(true);
//     }
//   };

//   const formatTimer = (seconds) => {
//     const m = String(Math.floor(seconds / 60)).padStart(2, "0");
//     const s = String(seconds % 60).padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   if (showSuccess) return <SignUpSuccessfull goToLogin={goToLogin} />;

//   return (
//     <div className="modal-overlay" onClick={() => toggleSignupModal(false)}>
//       <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2 className="modal-title">Create Your Account</h2>
//           <button
//             className="close-button"
//             onClick={() => toggleSignupModal(false)}
//             aria-label="Close modal"
//           >
//             ×
//           </button>
//         </div>

//         {error && <div className="error-banner">{error}</div>}

//         <p className="login-prompt">
//           Already have an account?{" "}
//           <span className="login-link" onClick={switchToLogin}>
//             Sign in
//           </span>
//         </p>

//         <form className="signup-form" onSubmit={handleSubmit}>
//           <div className="form-grid">
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name*"
//                 className={`form-input ${errors.firstName ? "error" : ""}`}
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 required
//               />
//               {errors.firstName && (
//                 <span className="error-message">{errors.firstName}</span>
//               )}
//             </div>

//             <div className="form-group">
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 className="form-input"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-group">
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 placeholder="Phone Number*"
//                 className="form-input"
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <input
//                 type="tel"
//                 name="alternatePhone"
//                 placeholder="Alternate Phone"
//                 className="form-input"
//                 value={formData.alternatePhone}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-group full-width">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="University Email ID*"
//                 className={`form-input ${errors.email ? "error" : ""}`}
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//               {errors.email && (
//                 <span className="error-message">{errors.email}</span>
//               )}
//             </div>

//             <div className="form-group full-width">
//               <div className="otp-container">
//                 <input
//                   type="text"
//                   name="otp"
//                   placeholder="Enter OTP"
//                   className={`form-input otp-input ${errors.otp ? "error" : ""}`}
//                   value={formData.otp}
//                   onChange={handleInputChange}
//                 />
//                 <button
//                   type="button"
//                   className={`otp-button ${otpTimer > 0 ? "disabled" : ""}`}
//                   onClick={handleGetOtp}
//                   disabled={otpTimer > 0}
//                 >
//                   {otpTimer > 0 ? formatTimer(otpTimer) : "Get OTP"}
//                 </button>
//               </div>
//               {otpSent && (
//                 <div className="otp-info">
//                   📧 OTP sent to {formData.email}
//                 </div>
//               )}
//               {errors.otp && (
//                 <span className="error-message">{errors.otp}</span>
//               )}
//             </div>

//             <div className="form-group">
//               <select
//                 name="course"
//                 className={`form-input ${errors.course ? "error" : ""}`}
//                 value={formData.course}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select Course*</option>
//                 <option value="BCA">BCA</option>
//                 <option value="BBA">BBA</option>
//                 <option value="MBA">MBA</option>
//                 <option value="MCA">MCA</option>
//                 <option value="B.Com">B.Com</option>
//                 <option value="M.Com">M.Com</option>
//               </select>
//               {errors.course && (
//                 <span className="error-message">{errors.course}</span>
//               )}
//             </div>

//             <div className="form-group">
//               <select
//                 name="batch"
//                 className={`form-input ${errors.batch ? "error" : ""}`}
//                 value={formData.batch}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select Batch*</option>
//                 {Array.from({ length: 9 }, (_, i) => (
//                   <option key={i} value={`${i + 1}`}>
//                     Batch {i + 1}
//                   </option>
//                 ))}
//               </select>
//               {errors.batch && (
//                 <span className="error-message">{errors.batch}</span>
//               )}
//             </div>

//             <div className="form-group">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password*"
//                 className={`form-input ${errors.password ? "error" : ""}`}
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required
//               />
//               {errors.password && (
//                 <span className="error-message">{errors.password}</span>
//               )}
//             </div>

//             <div className="form-group">
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password*"
//                 className={`form-input ${errors.confirmPassword ? "error" : ""}`}
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 required
//               />
//               {errors.confirmPassword && (
//                 <span className="error-message">{errors.confirmPassword}</span>
//               )}
//             </div>

//             <div className="terms-section full-width">
//               <label className="checkbox-label">
//                 <input type="checkbox" required />
//                 <span className="checkmark"></span>
//                 I accept the{" "}
//                 <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
//                   Terms & Conditions
//                 </a>{" "}
//                 and{" "}
//                 <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
//                   Privacy Policy
//                 </a>
//               </label>
//             </div>

//             <button type="submit" className="submit-button full-width" disabled={loading}>
//               {loading ? "Creating Account..." : "Create Account"}
//             </button>
//           </div>
//         </form>
//       </div>

//       <style jsx>{`
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.7);
//           backdrop-filter: blur(4px);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//           padding: 20px;
//           animation: fadeIn 0.3s ease-out;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         .modal-container {
//           background: white;
//           border-radius: 20px;
//           padding: 32px;
//           width: 100%;
//           max-width: 1044px;
//           max-height: 90vh;
//           overflow-y: auto;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
//           transform: translateY(0);
//           animation: slideUp 0.3s ease-out;
//         }

//         @keyframes slideUp {
//           from {
//             transform: translateY(20px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         .modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 24px;
//         }

//         .modal-title {
//           font-size: 28px;
//           font-weight: 700;
//           color: #1a1a1a;
//           margin: 0;
//         }

//         .close-button {
//           background: none;
//           border: none;
//           font-size: 28px;
//           color: #666;
//           cursor: pointer;
//           padding: 4px;
//           border-radius: 50%;
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.2s ease;
//         }

//         .close-button:hover {
//           background: #f5f5f5;
//           color: #f26522;
//         }

//         .error-banner {
//           background: #fee;
//           border: 1px solid #fcc;
//           color: #c44;
//           padding: 12px 16px;
//           border-radius: 8px;
//           margin-bottom: 16px;
//           font-size: 14px;
//         }

//         .login-prompt {
//           text-align: center;
//           color: #666;
//           margin-bottom: 32px;
//           font-size: 16px;
//         }

//         .login-link {
//           color: #f26522;
//           font-weight: 600;
//           cursor: pointer;
//           text-decoration: none;
//           transition: color 0.2s ease;
//         }

//         .login-link:hover {
//           color: #d14a00;
//           text-decoration: underline;
//         }

//         .signup-form {
//           width: 100%;
//         }

//         .form-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 20px;
//         }

//         .form-group {
//           display: flex;
//           flex-direction: column;
//         }

//         .full-width {
//           grid-column: 1 / -1;
//         }

//         .form-input {
//           padding: 14px 16px;
//           border: 2px solid #e1e5e9;
//           border-radius: 10px;
//           font-size: 16px;
//           transition: all 0.2s ease;
//           background: white;
//           font-family: inherit;
//         }

//         .form-input:focus {
//           outline: none;
//           border-color: #f26522;
//           box-shadow: 0 0 0 3px rgba(242, 101, 34, 0.1);
//         }

//         .form-input.error {
//           border-color: #e74c3c;
//           background: #fef5f5;
//         }

//         .form-input::placeholder {
//           color: #999;
//         }

//         select.form-input {
//           appearance: none;
//           background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
//           background-position: right 12px center;
//           background-repeat: no-repeat;
//           background-size: 16px;
//           padding-right: 40px;
//         }

//         .otp-container {
//           display: flex;
//           gap: 12px;
//           align-items: flex-start;
//         }

//         .otp-input {
//           flex: 1;
//         }

//         .otp-button {
//           padding: 14px 20px;
//           background: #f26522;
//           color: white;
//           border: none;
//           border-radius: 10px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           font-size: 14px;
//           white-space: nowrap;
//           min-width: 90px;
//         }

//         .otp-button:hover:not(.disabled) {
//           background: #d14a00;
//           transform: translateY(-1px);
//         }

//         .otp-button.disabled {
//           background: #ccc;
//           cursor: not-allowed;
//           transform: none;
//         }

//         .otp-info {
//           margin-top: 8px;
//           color: #0066cc;
//           font-size: 14px;
//           font-style: italic;
//         }

//         .error-message {
//           color: #e74c3c;
//           font-size: 14px;
//           margin-top: 6px;
//           font-weight: 500;
//         }

//         .terms-section {
//           margin-top: 8px;
//         }

//         .checkbox-label {
//           display: flex;
//           align-items: flex-start;
//           gap: 12px;
//           cursor: pointer;
//           font-size: 14px;
//           line-height: 1.5;
//           color: #555;
//         }

//         .checkbox-label input[type="checkbox"] {
//           width: 18px;
//           height: 18px;
//           margin: 0;
//           cursor: pointer;
//           accent-color: #f26522;
//         }

//         .checkbox-label a {
//           color: #f26522;
//           text-decoration: none;
//         }

//         .checkbox-label a:hover {
//           text-decoration: underline;
//         }

//         .submit-button {
//           background: linear-gradient(135deg, #f26522 0%, #d14a00 100%);
//           color: white;
//           border: none;
//           padding: 16px 24px;
//           border-radius: 10px;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           margin-top: 12px;
//           box-shadow: 0 4px 12px rgba(242, 101, 34, 0.3);
//         }

//         .submit-button:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(242, 101, 34, 0.4);
//         }

//         .submit-button:disabled {
//           background: #ccc;
//           cursor: not-allowed;
//           transform: none;
//           box-shadow: none;
//         }

//         .success-wrapper {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.7);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }

//         .success-content {
//           background: white;
//           padding: 40px;
//           border-radius: 20px;
//           text-align: center;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
//         }

//         .success-icon {
//           width: 80px;
//           height: 80px;
//           background: #4caf50;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 40px;
//           color: white;
//           margin: 0 auto 20px;
//         }

//         .success-btn {
//           background: #f26522;
//           color: white;
//           border: none;
//           padding: 12px 24px;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           margin-top: 20px;
//         }

//         @media (max-width: 768px) {
//           .modal-container {
//             padding: 24px;
//             margin: 10px;
//             max-height: 95vh;
//           }

//           .form-grid {
//             grid-template-columns: 1fr;
//             gap: 16px;
//           }

//           .modal-title {
//             font-size: 24px;
//           }

//           .otp-container {
//             flex-direction: column;
//             gap: 8px;
//           }

//           .otp-button {
//             width: 100%;
//           }
//         }

//         @media (max-width: 480px) {
//           .modal-overlay {
//             padding: 10px;
//           }

//           .modal-container {
//             padding: 20px;
//           }

//           .modal-title {
//             font-size: 22px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default SignUpModal;