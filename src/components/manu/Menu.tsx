import React, { useState } from "react"
import { Link } from "react-router-dom"
import { IoIosHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import './menu.scss'
import { Dialog } from "@mui/material";
import { RegsterUserDialog } from "../dialogs/RegisterUserDialog.tsx";
import { LoginDialog } from "../dialogs/LoginDialog.tsx";

export const Menu = () => {
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false)
  const [openLoginDialog, setOpenLoginDialog] = useState(false)
  
  const handleOpenRegister = () => {
     setOpenRegisterDialog(true)
     setOpenLoginDialog(false)
  }
  return (
    <div className="menu">
      <div className="item">
        <span className="menu-session-title">MAIN</span>
        <div className="item-box">
          <Link to='/' className="link">
            <IoIosHome className="icon" />
            <span className="item-title">Home</span>
          </Link>
        </div>
        <div className="item-box">
          <Link to='/employees' className="link">
            <FaUsers className="icon" />
            <span className="item-title">Employees</span>
          </Link>
        </div>
        <div className="item-box">
          <Link to='/customers' className="link">
            <FaUsers className="icon" />
            <span className="item-title">Costumers</span>
          </Link>
        </div>
        <div className="line" />
        <div className="login-box">
          <span>Login to see more options.</span>
          <div className="login-button" onClick={() => setOpenLoginDialog(true)}>
            <span className="item-title">Login</span>
          </div>
        </div>
      </div>
      <RegsterUserDialog open={openRegisterDialog} onClose={(isOpen) => setOpenRegisterDialog(isOpen)} />
      <LoginDialog 
      open={openLoginDialog} 
      onClose={(isOpen) => setOpenLoginDialog(isOpen)} 
      onOpenRegister={() => handleOpenRegister()}
      />
    </div>
  )
}