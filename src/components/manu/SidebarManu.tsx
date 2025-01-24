import React from "react";
import "./SidebarMenu.scss";
import { Link } from "react-router-dom";

const SidebarMenu = ({ accessLevel = 1 }) => {
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
        <button className="sign-in-button">SIGN IN</button>
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
    </aside>
  );
};

export default SidebarMenu;
