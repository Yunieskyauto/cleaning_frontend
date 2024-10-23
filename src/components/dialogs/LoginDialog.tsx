import React, { useEffect, useState, } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { IoMdAdd } from "react-icons/io";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from "../input/Input.tsx";
import { Box, Grid2, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRowId, GridRowsProp } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GridActionsCellItem, } from '@mui/x-data-grid';


export const LoginDialog = (props) => {

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const [emailInputState, setEmailInputState] = useState('default-input')

  const [password, setPassword] = useState('')
  const [passwordInputState, setPasswordInputState] = useState('default-input')

  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')

  const navigate = useNavigate()

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
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data => {
        if (data.Errors !== undefined) {

          setEmail(data.Data.email);
          if (data.Errors.email !== undefined) {
            setEmailErrorMsg(data.Errors.email[0]);
            setPassword("")
          }
          if (data.Errors.password !== undefined) {
            setPasswordErrorMsg(data.Errors.password[0]);
            setPassword("")
          }
        }
        if (data.access_token !== "") {
          // get user to App.js
          props.onUser({
            firstName: data.first_name,
            lastName: data.last_name,
            accessToken: data.token.access_token,
            accessLevel: data.access_level
          })
        }
      }))
      .catch(err => {
        console.log(err);
      })
  }


    const [openDialog, setOpenDialog] = React.useState(false);


    const handleCloseDialog = (isOpen) => {
        setOpenDialog(isOpen)
        props.onClose(isOpen)
    }

    const openRegister = () => {
      props.onOpenRegister()
    }

    useEffect(() => {
        setOpenDialog(props.open)
    }, [props.open])
    return (
        <Dialog
            open={openDialog}
            onClose={() => handleCloseDialog(false)}
            PaperProps={{
             sx: { borderRadius: "10px", bgcolor: "-moz-initial" },
             component: 'form',
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                handleSubmit(event)
              },
            }}>
          <Box
            sx={{
              width: 300,
              height: 400,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: 5,
            }} >
                <DialogTitle className="dialog-title">Login</DialogTitle>
                <Input
                    className={"default-input"}
                    placeholder={"Email"}
                    type={"email"}
                    name={"email"}
                    onChange={(e: any) => { handleEmailChange(e.target.value) }}
                    errorMsg={emailErrorMsg}
                />
                <Input
                    className={"default-input"}
                    placeholder={"Password"}
                    type={"password"}
                    name={"password"}
                    onChange={(e: any) => { handlePasswordChange(e.target.value) }}
                    errorMsg={passwordErrorMsg}
                />
                
                <DialogActions sx={{ display: "flex", flexDirection: "column" }}>
                    <Button
                        sx={{
                            background: "#37474f",
                            color: "#f5f5f5",
                            width: 300,
                            height: 50,
                            borderRadius: 20,
                            marginBottom: 2
                        }}
                        type="submit">Submit</Button>

                    <Button
                        variant="outlined"
                        sx={{
                            outline: "red",
                            color: "#37474f",
                            width: 300,
                            height: 50,
                            borderRadius: 20
                        }}
                        onClick={openRegister}>Register</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}