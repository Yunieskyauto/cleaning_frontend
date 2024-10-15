import React from "react"
import './login.scss'
import { Input } from "../components/input/Input.tsx";
import { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    
    const [input, setInput] = useState('default-input')
    const [passwordInput, setPasswordInput] = useState('default-input')
    
    const [emailErrorMsg, setEmailErrorMsg] = useState('')
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('')

   const handleEmailChange = (e: string) => { 
    setEmail(e)
    if (e === '') {
        setInput('default-input')
     } else {
        setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
        if (isValid) {
            setInput('valid-input')
         } else {
            setInput('invalid-input')
         }
     }     
  };

  const handlePasswordChange = (e: string) => {
    if (e !== '') {
        setPasswordInput('valid-input')
    } else {
        setPasswordInput('default-input')
    }
  }

    return(
        <div className='login'>
            <div className="wrapper">
            <h1>Login</h1>
           <Input 
             className={input}
             placeholder={"Enter your email"}
             type={"email"}
             name={"email"}
             onChange={(e: any) => {handleEmailChange(e.target.value)}}
             errorMsg={emailErrorMsg}
           />

            <Input 
             className={passwordInput}
             placeholder={"Enter your assword"}
             type={"password"}
             name={"password"}
             onChange={(e: any) => {handlePasswordChange(e.target.value)}}
             errorMsg={passwordErrorMsg}
           />


           <div className='remember-forgot'>
              <div className='check-box'>
                <input type='checkbox'/>
                <label> Remember me</label>
              </div>
              <a href='#'>Forgot password?</a>
           </div>
           <button type='submit'>Login</button>

           <div className='register-link'>
             <p>Don't have an account <a href='#'>Register</a></p>
           </div>
            </div>
        </div>
    )
}

/*

            <Input 
             className={passwordInput}
             placeholder={"Enter your assword"}
             type={"password"}
             name={"password"}
             onChange={(e: any) => {handlePasswordChange(e.target.value)}}
            />
*/