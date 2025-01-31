import React from "react";
import "./ErrorAlert.scss";

const ErrorAlert = ({ message, onClose }) => {
  return (
    <div className="error-alert">
      <div className="error-alert__content">
        <h2 className="error-alert__title">Error</h2>
        <p className="error-alert__message">{message}</p>
        <button className="error-alert__button" onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;
