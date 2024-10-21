import React, { useEffect } from "react"
import './login.scss'
import { Input } from "../components/input/Input.tsx";
import { useState, useRef, } from "react";

export const Login = (props: any) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const [emailInputState, setEmailInputState] = useState('default-input')
  
  const [password, setPassword] = useState('')
  const [passwordInputState, setPasswordInputState] = useState('default-input')

  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')

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

    fetch(`/authenticate`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password}),
    })
      .then((response) => response.json())
      .then((data => {
        if (data.Errors !== undefined) {
          setEmail(data.Data.email);
          if (data.Errors.email !== undefined) {
            setEmailErrorMsg(data.Errors.email[0]);
          }
          if (data.Errors.password !== undefined) {
            setPasswordErrorMsg(data.Errors.password[0]);
          }
        }
        
        // get user to App.js
       props.onUser({
        firstName: data.first_name, 
        lastName: data.last_name, 
        accessToken: data.access_token, 
        accessLevel: data.access_level
      }) 

        let access  = ""
        if (data.id !== undefined && data.token.access_token !== undefined) {
        
          const headers = new Headers()
          headers.append('Content-Type', 'application/json')
          headers.append('Authorization', 'Bearer ' + data.token.access_token)
    
          const requestOptions = {
            method: "GET",
            headers: headers,
          }
          
          fetch("/admin/employees", requestOptions)
          .then((response) => response.json())
          .then(data => {
            console.log(data)
          })
        }
        access = data.access_token
      }))
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
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
