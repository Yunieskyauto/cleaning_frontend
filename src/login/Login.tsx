import React from "react"
import './login.scss'
import { Input } from "../components/input/Input.tsx";
import { useState, useRef, } from "react";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const [emailInputState, setEmailInputState] = useState('default-input')
  
  const [password, setPassword] = useState('')
  const [passwordInputState, setPasswordInputState] = useState('default-input')

  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')


  const passwordRef = useRef();
  const emailRef = useRef();

  const handleEmailChange = (e: string) => {
    setEmail(e)
    if (e === '') {
      setEmailInputState('default-input')
    } else {
      setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
      if (isValid) {
        setEmailInputState('valid-input')
      } else {
        setEmailInputState('invalid-input')
      }
    }
  };

  const handlePasswordChange = (e: string) => {
    setPassword(e)
    if (e !== '') {
      setPasswordInputState('valid-input')
    } else {
      setPasswordInputState('default-input')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmail('')
    setPassword('')
  }

  return (
    <div className='login'>
      <form className="wrapper" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Input
          className={emailInputState}
          placeholder={"Enter your email"}
          value={email}
          type={"email"}
          name={"email"}
          onChange={(e: any) => { handleEmailChange(e.target.value) }}
          errorMsg={emailErrorMsg}
        />

        <Input
          className={passwordInputState}
          placeholder={"Enter your assword"}
          value={password}
          type={"password"}
          name={"password"}
          onChange={(e: any) => { handlePasswordChange(e.target.value) }}
          errorMsg={passwordErrorMsg}
        />
        <div className='remember-forgot'>
          <div className='check-box'>
            <input type='checkbox' />
            <label> Remember me</label>
          </div>
          <a href='#'>Forgot password?</a>
        </div>
        <button type='submit'>Login</button>

        <div className='register-link'>
          <p>Don't have an account <a href='#'>Register</a></p>
        </div>
      </form>
    </div>
  )
}

