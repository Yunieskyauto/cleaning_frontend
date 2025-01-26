import React, { useState } from "react";
import "./SidebarMenu.scss";
import { Link } from "react-router-dom";
import { LoginDialog } from "../dialogs/LoginDialog.tsx";
import { RegisterDialog } from "../dialogs/RegisterDialog.tsx";
import { RegisterUserDialog } from "../dialogs/RegisterUserDialog.tsx";

const SidebarMenu = ({ accessLevel = 3, onUserRole}) => {
   const [openRegisterDialog, setOpenRegisterDialog] = useState(false)
    const [openLoginDialog, setOpenLoginDialog] = useState(false)
  
    const handleOpenRegister = (openRegisteDialog) => {
      setOpenRegisterDialog(openRegisteDialog)
      setOpenLoginDialog(!openRegisteDialog)
    }

    const handleOpenLigin = (openLoginDialog) => {
      setOpenLoginDialog(openLoginDialog)
      setOpenRegisterDialog(!openLoginDialog)
    }

  return (
    <aside className="sidebar-menu">
      <div className="sidebar-header">
        <div className="logo">Dust Free</div>
        <div className="version">v4.0</div>
      </div>

      {/* First Sidebar Section */}
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
        <button className="sign-in-button" onClick={() => setOpenLoginDialog(true)}>SIGN IN</button>
      </div>

      {/* Second Sidebar Section */}
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
       <RegisterUserDialog 
       open={openRegisterDialog}
       onClose={(closeRegisterDialog) => setOpenRegisterDialog(closeRegisterDialog)}
       onRegister={{}}
       onLogin={(openLoginDialog) => handleOpenLigin(openLoginDialog)}
       />
       <LoginDialog
              open={openLoginDialog}
              onClose={(closeLoginDialog) => {setOpenLoginDialog(closeLoginDialog)}}
              onOpenRegister={(openRegister) => handleOpenRegister(openRegister)}
              onUser={(userRole) => onUserRole(userRole)}
            />
    </aside>
  );
};

export default SidebarMenu;
