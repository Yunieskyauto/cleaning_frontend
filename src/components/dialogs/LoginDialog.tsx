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
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleSubmit = (event) => {

    }

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
                />
                <Input
                    className={"default-input"}
                    placeholder={"Password"}
                    type={"password"}
                    name={"password"}
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