import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext, useSearchParams } from "react-router-dom";
import "./home.scss";
import { toast, ToastContainer } from "react-toastify";

export const Home = () => {
  const { userRole } = useOutletContext(); // Access context
  const [welcome, setWelcome] = useState("Home"); // Default state

  const location = useLocation()
  const invitationMessage = location.state || {};

  const [searchParams] = useSearchParams();
  const messageType = searchParams.get('messageType'); // message parameter coming from [Invited] components
  const message = searchParams.get('message');

  // Trigger toast and update welcome message on initial render
  useEffect(() => {
    console.log("Message", messageType)
    // Display the toast once when the screen opens
    handleToast(messageType, message);
// light
// dark
    // Determine welcome message based on access level
    if (userRole?.accessLevel === 2) {
      setWelcome("Hello Employee");
    } else if (userRole?.accessLevel === 1) {
      setWelcome("Hello Admin");
    } else if (userRole?.accessLevel === 3) {
      setWelcome("Hello Client");
    } else {
      setWelcome("Welcome Home");
    }
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div className="home">
      <h1>{welcome}</h1>
      <ToastContainer style={{ width: "100%" }} />
    </div>
  );
};


const handleToast = (msgType, msg) => {
  if (msgType === "error" && msgType !== undefined) {  //TODO improve this implementation later (use constants)
    toast.error(msg, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      theme: "light",
    });
  }

  if (msgType === "success") {
    toast.success(msg, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      theme: "light",
    });
  }
  
}