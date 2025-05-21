import React, { useState } from "react";
import axios from "axios";
import "./sponsorform.css";
import ThankYouPage from "./ThankYouMessage";

function SponsorModal({ onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    designation: "",
    message: "",
  });

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBaseUrl}/sponsor`, formData);
      setIsSubmitted(true);
    } catch (error) {
      alert("Submission failed. Please try again.");
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (isSubmitted) return <ThankYouPage onClose={handleClose} />;

  return (
    <div className="sponsor-modal-wrapper">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>
          ×
        </button>
        <h2 className="modal-title">Become our sponsor</h2>
        <form className="sponsor-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name*"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name*"
              required
              value={formData.companyName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="companyEmail"
              placeholder="Company Email*"
              required
              value={formData.companyEmail}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number*"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <input
              type="text"
              name="designation"
              placeholder="Your Designation*"
              required
              value={formData.designation}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="message"
            placeholder="Write to us"
            rows={4}
            value={formData.message}
            onChange={handleChange}
          />
          <label className="consent">
            <input type="checkbox" required />I authorize MUJ UNITY FEST and its
            associates to contact me with updates via email, SMS, WhatsApp, and
            voice call.
          </label>
          <button type="submit" className="signup-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SponsorModal;
