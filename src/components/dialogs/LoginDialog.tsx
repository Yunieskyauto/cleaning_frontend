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
import { Box, Grid2, Paper, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRowId, GridRowsProp } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GridActionsCellItem, } from '@mui/x-data-grid';

import "./../../styles/variables.scss"

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
                console.log(data)
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
                sx: { borderRadius: "10px", bgcolor: "#bdbdbd" },
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    handleSubmit(event)
                },
            }}>
            <Box
                sx={{
                    width: 450,
                    height: 500,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                }} >
                <Box
                    sx={{
                        width: "100%",
                        height: "40%",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                    <span
                        style={{
                            color: "#37474f",
                            fontSize: 30,
                            margin: 10,
                        }}
                    >Welcome back</span>
                    <span
                        style={{
                            color: "#37474f",
                        }}
                    >Glad to see you again.</span>
                    <span
                        style={{
                            color: "#37474f",
                        }}
                    >Login to your account below</span>
                </Box>
                <Box sx={{
                        width: "100%",
                        height: "60%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        background: "#e0e0e0",
                    }} >  
                <TextField
                        required
                        error={false}
                        id="outlined-error-helper-text"
                        helperText={""}
                        label="enter email..."
                        variant="outlined"
                        type="email"
                        sx={{ marginLeft: 4, marginRight: 4, marginTop: 3 }}
                        onChange={(e: any) => { handleEmailChange(e.target.value) }}
                    />
                    <TextField
                        required
                        error={false}
                        id="outlined-error-helper-text"
                        helperText={""}
                        label="enter password.."
                        variant="outlined"
                        type="password"
                        sx={{ marginLeft: 4, marginRight: 4, marginTop: 3 }}
                        onChange={(e: any) => { handlePasswordChange(e.target.value) }}
                    />

                    <Button sx={{
                            marginLeft: 4,
                            marginRight: 4,
                            marginTop: 3,
                            background: "#37474f",
                            color: "#e0e0e0",
                            borderRadius: 2,
                            height: 50
                        }}
                        type="submit"
                        onClick={handleSubmit}
                    >Login</Button>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 3,
                            marginTop: 3,
                        }} >
                        <span style={{ color: "#37474f",paddingRight: 10 }} >Do not have an account?</span>
                        <span style={{ color: "#01579b", cursor: "pointer" }}  onClick={openRegister}>Sign up for free</span>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}