import './navbar.scss'
import React from "react"
export const Navbar = (props: any) => {
    return (
     <div className="navbar">
       <div className="logo">
        <span>Cleaning</span>
       </div>
        <div className='nav-profile-box'>
          <span className='profile-photo'></span>
          <span className='profile-name'>{props.userName}</span>
        </div>
     </div>
    )
 }