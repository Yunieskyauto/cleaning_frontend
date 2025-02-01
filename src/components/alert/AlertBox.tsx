import React from "react";
import "./AlertBox.scss";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const AlertBox = ({ type = "error", message, onClose }) => {
  return (
    <div className={`alert-box ${type === "success" ? "alert-box--success" : "alert-box--error"}`}>
      <div className="alert-box__content">
        <div className="alert-box__icon">
          {type === "success" ? <FaCheckCircle /> : <FaExclamationTriangle />}
        </div>
        <h2 className="alert-box__title">{type === "success" ? "Success" : "Error"}</h2>
        <p className="alert-box__message">{message}</p>
        <button className="alert-box__button" onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
