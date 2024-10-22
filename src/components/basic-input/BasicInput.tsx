import './basic-input.scss'
import { FaUser, FaLock } from "react-icons/fa";
import React from 'react';
import { forwardRef } from "react";

export const Input = (props: any) => {

 const icon = () => {
    switch(props.name) {
      case 'email':
        return <FaUser className='icon'/>
      case 'password':
        return <FaLock className='icon'/>;
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
        <div className='icon-box'>
        {icon()} 
        </div>
      </div>
       <div className="error-div">{props.errorMsg}</div>
  </div>
  )  
}