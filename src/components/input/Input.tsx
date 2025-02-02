import './input.scss'
import { FaUser, FaLock } from "react-icons/fa";
import React from 'react';
import { forwardRef } from "react";

export const Input = (props: any) => {

 const icon = () => {
    if (props.haveIcon) {
      switch(props.name) {
        case 'email':
          return <div className='icon-box'><FaUser className='icon'/></div> 
        case 'password':
          return<div className='icon-box'><FaLock className='icon'/></div>  ;
      }
    }
  }
  return (
    <div className='input-container'>
      <div className='input-box'>
       <input 
         className={props.className}
         type={props.type} 
         placeholder={props.placeholder}
         name={props.name}
         value={props.value}
         onChange={props.onChange}
         required
         />
         {icon()} 
      </div>
       <div className="error-div">{props.errorMsg}</div>
  </div>
  )  
}