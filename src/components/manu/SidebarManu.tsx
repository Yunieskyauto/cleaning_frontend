import React, { useState } from "react";
import "./SidebarMenu.scss";
import { Link } from "react-router-dom";
import { LoginDialog } from "../dialogs/LoginDialog.tsx";
import { RegisterDialog } from "../dialogs/RegisterDialog.tsx";
import { RegisterUserDialog } from "../dialogs/RegisterUserDialog.tsx";
import ErrorAlert from "../alert/ErrorAlert.tsx";

const SidebarMenu = ({ accessLevel = 3, onUserRole }) => {
  const [dialogState, setDialogState] = useState({
    registerOpen: false,
    loginOpen: false,
  });

  const [errorState, setErrorState] = useState({
    isErrorVisible: false,
    message: "",
  });

  // Open register dialog and close login dialog
  const openRegisterDialog = () => {
    setDialogState({ registerOpen: true, loginOpen: false });
  };

  // Open login dialog and close register dialog
  const openLoginDialog = () => {
    setDialogState({ registerOpen: false, loginOpen: true });
  };

  // Close all dialogs
  const closeDialogs = () => {
    setDialogState({ registerOpen: false, loginOpen: false });
  };

  // Handle closing the error alert
  const closeErrorAlert = () => {
    setErrorState({ isErrorVisible: false, message: "" });
    openRegisterDialog();
  };

  // Set error message and show the error alert
  const showErrorAlert = (message) => {
    if (message) {
      setErrorState({ isErrorVisible: true, message });
      closeDialogs();
    }
  };

  return (
    <aside className="sidebar-menu">
      <div className="sidebar-header">
        <div className="logo">Dust Free</div>
        <div className="version">v4.0</div>
      </div>

      {/* General Section */}
      <div className="menu-section">
        <h4 className="section-title">GENERAL</h4>
        <ul className="menu-list">
          <li className="menu-item">
            <Link to="/" className="link">
              <span className="icon">🏠</span> Home
            </Link>
          </li>
          {accessLevel === 1 && (
            <>
              <li className="menu-item">
                <Link to="/" className="link">
                  <span className="icon">👤</span> Cleaners Management
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="link">
                  <span className="icon">👤</span> Users Management
                </Link>
              </li>
            </>
          )}
          {accessLevel === 3 && (
            <li className="menu-item">
              <Link to="/" className="link">
                <span className="icon">👤</span> Cleaners
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Sign In Section */}
      <div className="sign-in-section">
        <p className="sign-in-text">
          Sign in to unlock features and access more tools.
        </p>
        <button className="sign-in-button" onClick={openLoginDialog}>
          SIGN IN
        </button>
      </div>

      {/* SISYPHUS VENTURES Section */}
      <div className="menu-section">
        <h4 className="section-title">SISYPHUS VENTURES</h4>
        <ul className="menu-list">
          <li className="menu-item">
            <span className="icon">👤</span> User Management
          </li>
          <li className="menu-item">
            <span className="icon">🔒</span> Security & Access
          </li>
          <li className="menu-item">
            <span className="icon">🔐</span> Authentication
          </li>
          <li className="menu-item">
            <span className="icon">💳</span> Payments
          </li>
        </ul>
      </div>

      {/* Footer Section */}
      <div className="menu-footer">
        <ul className="menu-list">
          <li className="menu-item">
            <span className="icon">⚙️</span> Settings
          </li>
          <li className="menu-item">
            <span className="icon">📄</span> Documentation
          </li>
          <li className="menu-item">
            <span className="icon">🌐</span> Open in Browser
          </li>
        </ul>
      </div>

      {/* Dialog Components */}
      <RegisterUserDialog
        open={dialogState.registerOpen}
        onClose={closeDialogs}
        onRegister={() => {}}
        onLogin={openLoginDialog}
        onError={showErrorAlert}
      />
      <LoginDialog
        open={dialogState.loginOpen}
        onClose={closeDialogs}
        onOpenRegister={openRegisterDialog}
        onUserRole={onUserRole}
      />

      {/* Error Alert */}
      {errorState.isErrorVisible && (
        <ErrorAlert
          message={errorState.message}
          onClose={closeErrorAlert}
        />
      )}
    </aside>
  );
};

export default SidebarMenu;
