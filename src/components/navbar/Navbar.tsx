import React from "react"
export const Navbar = () => {
    return (
     <div className="navbar">
       <div className="logo">
          <img src="logo.svg" alt=""/> 
          <span>Cleaning</span>
       </div>
 
       <div className="icons">
         
         <div className="user">
           <img src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt=""/> 
           <span>Yuni</span>
         </div>
         <span className="login">Login</span>
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