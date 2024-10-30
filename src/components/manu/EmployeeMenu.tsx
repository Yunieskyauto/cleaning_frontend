import React, { useState } from "react"
import { Link } from "react-router-dom"
import { IoIosHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import './menu.scss'
import { RegsterUserDialog } from "../dialogs/RegisterUserDialog.tsx";
import { LoginDialog } from "../dialogs/LoginDialog.tsx";

export const EmployeeMenu = () => {
  return(
    <>
    <div className="item-box">
      <Link to='/customers' className="link">
        <FaUsers className="icon" />
        <span className="item-title">Customers</span>
      </Link>
    </div>
    <div className="item-box">
      <Link to='/calendar' className="link">
        <FaUsers className="icon" />
        <span className="item-title">Calendar</span>
      </Link>
    </div>
  </>
  )
}