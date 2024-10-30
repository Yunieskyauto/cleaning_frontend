import React, { useState } from "react"
import { Link } from "react-router-dom"
import { IoIosHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import './menu.scss'
import { RegsterUserDialog } from "../dialogs/RegisterUserDialog.tsx";
import { LoginDialog } from "../dialogs/LoginDialog.tsx";

export const UserMenu = () => {
  return(
    <>
    <div className="item-box">
      <Link to='/cleaners' className="link">
        <FaUsers className="icon" />
        <span className="item-title">Cleaners</span>
      </Link>
    </div>
    <div className="item-box">
      <Link to='/bookings' className="link">
        <FaUsers className="icon" />
        <span className="item-title">Bookings</span>
      </Link>
    </div>
  </>
  )
}