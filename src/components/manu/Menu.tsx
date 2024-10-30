import React, { useState } from "react"
import { Link } from "react-router-dom"
import { IoIosHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import './menu.scss'
import { RegsterUserDialog } from "../dialogs/RegisterUserDialog.tsx";
import { LoginDialog } from "../dialogs/LoginDialog.tsx";
import { AdminMenu } from "./AdminMenu.tsx";
import { EmployeeMenu } from "./EmployeeMenu.tsx";
import { UserMenu } from "./UserMenu.tsx";
import { DefaultMenu } from "./DefaultMenu.tsx";

export const Menu = (props) => {
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
        { props.userLevel === 0 && <DefaultMenu /> }
        { props.userLevel === 1 && <AdminMenu /> }
        { props.userLevel === 2 && <EmployeeMenu /> }
        { props.userLevel === 3 && <UserMenu /> }
        <div className="line" />
        <div className="login-box">
          <span>Login to see more options.</span>
          <div className="login-button" onClick={() => setOpenLoginDialog(true)}>
            <span className="item-title">Login</span>
          </div>
        </div>
      </div>
      <RegsterUserDialog
        open={openRegisterDialog}
        onClose={(isOpen) => setOpenRegisterDialog(isOpen)}
      />
      <LoginDialog
        open={openLoginDialog}
        onClose={(isOpen) => setOpenLoginDialog(isOpen)}
        onOpenRegister={() => handleOpenRegister()}
        onUser={(user) => {
          props.onUser(user)
        }}
      />
    </div>
  )
}