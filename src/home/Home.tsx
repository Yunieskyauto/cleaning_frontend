import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext, useSearchParams } from "react-router-dom";
import "./home.scss";
import { toast, ToastContainer } from "react-toastify";
import AlertBox from "../components/alert/AlertBox.tsx";
import { useNavigate } from "react-router-dom";
// Toast message types as constants
const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
};

export const Home = () => {
    const navigate = useNavigate();
  const { userRole } = useOutletContext(); // Access user role from context
  const location = useLocation();
  const invitationMessage = location.state || {};

  const [searchParams] = useSearchParams();
  const messageType = searchParams.get("messageType") || ""; // Get messageType from URL params
  const message = searchParams.get("message") || "";
  const userId = searchParams.get("userId");

  const alertType = searchParams.get("alertType");

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({"type": "", "message": ""})

  const [welcome, setWelcome] = useState("Home"); // Default welcome message

  const handleCloseAlert = () => {
    setOpenAlert(false);
    navigate("/");
  }

  // Effect to show toast on mount if message is present
  useEffect(() => {
    if (message && messageType) {
      handleToast(messageType, message);
    }
    if (alertType && message) {
      setOpenAlert(true)
      setAlertMessage({type: alertType, message: message})
      console.log("Alert Message", message)
    }
  }, [message, messageType, alertType]);

  // Effect to set the welcome message based on user role
  useEffect(() => {
    switch (userRole?.accessLevel) {
      case 1:
        setWelcome("Hello Admin");
        break;
      case 2:
        setWelcome("Hello Employee");
        break;
      case 3:
        setWelcome("Hello Client");
        break;
      default:
        setWelcome("Welcome Home");
    }
  }, [userRole]);

  return (
    <div className="home">
      <h1>{welcome}</h1>
      <ToastContainer style={{ width: "100%" }} />
      {openAlert && 
       (
        <AlertBox
        type={alertMessage.type}
        message={alertMessage.message}
        onClose={handleCloseAlert} 
        />
       )
      }
    </div>
  );
};

// Toast notification handler
const handleToast = (msgType, msg) => {
  if (!msgType || !msg) return; // Prevent calling toast with empty values

  const toastOptions = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: false,
    theme: "light",
  };

  if (msgType === TOAST_TYPES.ERROR) {
    toast.error(msg, toastOptions);
  } else if (msgType === TOAST_TYPES.SUCCESS) {
    toast.success(msg, toastOptions);
  }
};
