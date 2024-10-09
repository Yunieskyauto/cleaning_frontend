import './navbar.scss'
import React from "react"
export const Navbar = () => {
    return (
     <div className="navbar">
       <div className="logo">
        <span>Clining</span>
       </div>
        <div className='icons'>
          <a className='login'>Login</a>
        </div>
     </div>
    )
 }
 
 /*
 <img src="/search.svg" alt=""/> 
         <img src="/app.svg" alt=""/> 
         <img src="/expand.svg" alt=""/> 
 
         <div className="notifications">
          <img src="/notifications.svg" alt=""/> 
          <span>1</span>
         </div>
 */