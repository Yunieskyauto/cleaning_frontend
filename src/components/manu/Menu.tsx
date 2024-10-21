import React from "react"
import { Link } from "react-router-dom"
import { IoIosHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import './menu.scss'

export const Menu = () => {
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
          <Link to='/login' className="login-button">
            <span className="item-title">Login</span>
          </Link>
        </div>
      </div>
    </div>
  )
}