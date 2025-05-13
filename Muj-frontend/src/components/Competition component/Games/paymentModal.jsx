import React, { useState, useEffect, useCallback } from 'react';

/**
 * PaymentModal Component
 * Displays a payment processing notification with a countdown timer,
 * progress bar, and close button that automatically closes after 5 seconds.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Function to close the modal
 */
const PaymentModal = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(5); // Changed from 10 to 5
  const [progressWidth, setProgressWidth] = useState(100);
  
  // Handle close with useCallback to prevent recreating the function
  const handleClose = useCallback(() => {
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  }, [onClose]);
  
  useEffect(() => {
    // Timer to count down from 5 seconds
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleClose(); // Auto close when timer reaches 0
          return 0;
        }
        return prevTime - 1;
      });
      
      // Update progress bar width
      setProgressWidth((prevWidth) => prevWidth - 20); // Adjusted for 5 seconds
    }, 1000);
    
    // Clean up timer on unmount
    return () => clearInterval(timer);
  }, [handleClose]);
  
  // Click handler with stopPropagation to prevent event bubbling
  const handleCloseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleClose();
  };
  
  return (
    <div 
      className="payment-modal-backdrop"
      onClick={(e) => e.stopPropagation()} // Prevent clicks from passing through
    >
      <div className="payment-modal">
        {/* Close button */}
        {/* <button 
          className="close-button" 
          onClick={handleCloseClick}
          aria-label="Close modal"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button> */}
        
        <div className="warning">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#FFE0E3"/>
            <path d="M12 7V13" stroke="#FF3232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="17" r="1.5" fill="#FF3232"/>
          </svg>
        </div>
        
        <h2>Payment Processing</h2>
        <p>If you had made the payment, please wait for the payment confirmation within 24 hours.</p>
        
        {/* Timer display */}
        <div className="timer-display">
          Closing in {timeLeft} seconds
        </div>
        
        {/* Progress bar */}
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;