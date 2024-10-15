import './input.scss'
import { FaUser, FaLock } from "react-icons/fa";
import React from 'react';
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
    <div className='input-box'>
      <input 
         className={props.className}
         type={props.type} 
         placeholder={props.placeholder}
         name={props.name}
         onChange={props.onChange}
         required
         />
       {icon()}  
  </div>
  )  
}