import React, { useEffect, useState,} from "react"
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
import { DataGrid, GridColDef,  GridRowId, GridRowsProp} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {GridActionsCellItem,} from '@mui/x-data-grid';

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '5rem',
    height: '5rem',
    
  };
  
export const RegsterUserDialog = (props) => {
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleSubmit = (event) => {

    }

    useEffect(() => {
        setOpenDialog(props.open)
    }, [props.open])
    return (
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            PaperProps={{
                sx: { borderRadius: "10px", bgcolor: "-moz-initial" },
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    handleSubmit(event)
                },
            }}
            
        >
          <Box 
           sx={{
            width: 400,
            height: 400, 
            display: "flex", 
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
           }} >
             <DialogTitle className="dialog-title">Regiter</DialogTitle>
             
            <Input
                className={"default-input"}
                placeholder={"First name"}
                type={"text"}
                name={"first_name"}
              />
            <Input
                className={"default-input"}
                placeholder={"Last name"}
                type={"text"}
                name={"last_name"}
              />
            
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
        
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
          </Box>
        </Dialog>
    )
}