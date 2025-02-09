import React, { useEffect, useState } from "react";
import "./SidebarMenu.scss";
import { Link } from "react-router-dom";
import { useLocation, useOutletContext, useSearchParams } from "react-router-dom";
import { LoginDialog } from "../dialogs/LoginDialog.tsx";
import { RegisterUserDialog } from "../dialogs/RegisterUserDialog.tsx";
import AlertBox from "../alert/AlertBox.tsx";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineCleanHands } from "react-icons/md";
import { LiaUsersCogSolid } from "react-icons/lia";
import { RiBarChartGroupedLine } from "react-icons/ri";
import { PiUsersFour } from "react-icons/pi";
import { GoCodeReview } from "react-icons/go";
import { TbBrandBooking } from "react-icons/tb";
const SidebarMenu = ({ user }) => {
  const [dialogState, setDialogState] = useState({
    registerOpen: false,
    loginOpen: false,
  });

  const [alertState, setAlertState] = useState({
    isAlertVisible: false,
    message: "",
    type: ""
  });

  const [userRole, setUserRole] = useState({ "firstName": "", "lastName": "", "accessToken": "", "accessLevel": "", "id": 0})

  // Opens the register dialog and closes the login dialog.
  const openRegisterDialog = () => {
    setDialogState({ registerOpen: true, loginOpen: false });
  };

  // Opens the login dialog and closes the register dialog.
  const openLoginDialog = () => {
    setDialogState({ registerOpen: false, loginOpen: true });
  };

  // Closes both dialogs when an alert is opened.
  const openAlert = () => {
    setDialogState({ registerOpen: false, loginOpen: false });
  };

  // Closes all dialogs.
  const closeDialogs = () => {
    setDialogState({ registerOpen: false, loginOpen: false });
  };

  // Handles closing the alert. If the alert was an error, it reopens the register dialog.
  const closeAlert = () => {
    setAlertState({ isAlertVisible: false, message: "", type: "" });
    if (alertState.type === "error") {
      openRegisterDialog();
    }
  };

 
  // Sets the error message and displays the alert.
  const showAlert = (alert) => {
    if (alert.type !== "") {
      setAlertState({
        isAlertVisible: true,
        message: alert.message,
        type: alert.type
      });
      closeDialogs();
    }
  };

   // Effect to set the welcome message based on user role
    useEffect(() => {
     
      console.log("OnLogged", user);
    }, [user]);

  useEffect(() => {
    if (alertState.isAlertVisible) {
      openAlert();
    }
  }, [alertState]);
  
  
  return (
    <aside className="sidebar-menu">
      <div className="sidebar-header">
        <div className="logo">Dust Free</div>
        <div className="version">v4.0</div>
      </div>

      {/* GENERAL SECTION */}
      <div className="menu-section">
        <h4 className="section-title">GENERAL</h4>
        <ul className="menu-list">
          <li className="menu-item">
            <Link to="/" className="link">
              <span className="icon">
                <IoHomeOutline/>
              </span> Home
            </Link>
          </li>
          {userRole.accessLevel === 1 && (
            <>
              <li className="menu-item">
                <Link to="/" className="link">
                  <span className="icon">
                  <MdOutlineCleanHands />   
                  </span> Cleaners Management
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="link">
                  <span className="icon">
                  <LiaUsersCogSolid />
                  </span> Users Management
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="link">
                  <span className="icon">
                  <RiBarChartGroupedLine />
                  </span> Metrics
                </Link>
              </li>
            </>
          )}
          {userRole.accessLevel === 2 && (
             <>
             <li className="menu-item">
               <Link to="/" className="link">
                 <span className="icon">
                 <PiUsersFour />   
                 </span> Clients
               </Link>
             </li>
             <li className="menu-item">
               <Link to="/" className="link">
                 <span className="icon">
                 <GoCodeReview />
                 </span> Reviews
               </Link>
             </li>
             <li className="menu-item">
               <Link to="/" className="link">
                 <span className="icon">
                 <RiBarChartGroupedLine />
                 </span> Metrics
               </Link>
             </li>
           </>
          )}
           {userRole.accessLevel === 3 && (
             <>
             <li className="menu-item">
               <Link to="/" className="link">
               <span className="icon">
                 <TbBrandBooking />  
                 </span> Bookings
               </Link>
             </li>
             <li className="menu-item">
               <Link to="/" className="link">
                 <span className="icon">
                 <RiBarChartGroupedLine />
                 </span> Metrics
               </Link>
             </li>
           </>
          )}
        </ul>
      </div>
        {userRole.id === 0 && (
          <>
           {/* SIGN-IN SECTION */}
             <div className="sign-in-section">
               <p className="sign-in-text">
                 Sign in to unlock features and access more tools.
               </p>
              <button className="sign-in-button" onClick={openLoginDialog}>
                 SIGN IN
              </button>
            </div>
          </>
        )} 
  

      {/* SISYPHUS VENTURES SECTION */}
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

      {/* FOOTER SECTION */}
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

      {/* DIALOG COMPONENTS */}
      <RegisterUserDialog
        open={dialogState.registerOpen}
        onClose={closeDialogs}
        onRegisterMessage={(alert) => showAlert(alert)}
        onLogin={openLoginDialog}
      />
      <LoginDialog
        open={dialogState.loginOpen}
        onClose={closeDialogs}
        onOpenRegister={openRegisterDialog}
        onUserRole={setUserRole}
      />

      {/* ALERT COMPONENT */}
      {alertState.isAlertVisible && (
        <AlertBox
          type={alertState.type}
          message={alertState.message}
          onClose={closeAlert}
        />
      )}
    </aside>
  );
};

export default SidebarMenu;
