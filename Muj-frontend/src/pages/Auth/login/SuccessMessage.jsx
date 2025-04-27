import React from "react";
import CheckIcon from "./CheckIcon.jsx";
import Cross from "../../../assets/cross-svgrepo-com.svg";
import Styles from "./LoginSuccessMessage.module.css";

const SuccessMessage = ({ title, message, actionText, onAction, onClose }) => {
  return (
    <div className={Styles["success-message-overlay"]} onClick={onClose}>
      <div 
        className={Styles["success-message-card"]} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className={Styles["success-message-close"]} onClick={onClose}>
          <img src={Cross} alt="Close" width={20} height={20} />
        </button>
        <div className={Styles["success-message-icon"]}>
          <CheckIcon />
        </div>
        <h2 className={Styles["success-message-title"]}>{title}</h2>
        <p className={Styles["success-message-content"]}>{message}</p>
        <button
          onClick={onAction}
          className={Styles["success-message-button"]}
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;