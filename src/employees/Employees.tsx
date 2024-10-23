import React, { useEffect, useState, useMemo, Fragment } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { IoMdAdd } from "react-icons/io";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from "../components/input/Input.tsx";
import "./employees.scss"
import { Box, Grid2, Paper } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'email',
    headerName: 'email',
    type: 'string',
    width: 90,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export interface Employee {
  id: number;
  firstName: string,
  lastName: string,
  email: string
}

export const Employees = () => {
  const { employee } = useOutletContext()
  const navigate = useNavigate()

  const [employees, setEmployees] = useState([{ id: 0, firstName: "", lastName: "", email: "" }])
  const [newEmployeeError, setNewEmployeeError] = useState(true)

  const addEmployee = () => {
    setOpen(true);
    setNewEmployeeError(true)
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    const firstName = formJson.first_name;
    const lastName = formJson.last_name;

    if (employee.accessToken !== "") {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Bearer ' + employee.accessToken)

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ firstName, lastName, email }),
      }
      fetch("/admin/register-cleaner", requestOptions)
        .then((response) => response.json())
        .then(data => {
          setNewEmployeeError(data.error)
        })
    }
    setOpen(false);
  }

  useEffect(() => {
    if (employee.accessToken !== "") {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Bearer ' + employee.accessToken)

      const requestOptions = {
        method: "GET",
        headers: headers,
      }
      fetch("/admin/employees", requestOptions)
        .then((response) => response.json())
        .then(data => {

          data.map((item) => {
            let employee = {
              id: item.id,
              firstName: item.first_name,
              lastName: item.last_Name,
              email: item.email,
            }
            setEmployees(employees => [...employees, employee])
          })
        })
    } else {
      navigate("/")
    }
  }, [newEmployeeError])
  return (
    <div className="Employees">
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={employees}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
      <Fab
        icon={<IoMdAdd />}
        onClick={addEmployee}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            handleSubmit(event)
          },
        }}
      >
        <Paper className="dialog-paper" >
          <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <DialogTitle className="dialog-title">Regiter Employee</DialogTitle>
          </Box>
          <Grid2 container spacing={1}>
            <Grid2 size={6}>
              <Input
                className={"default-input"}
                placeholder={"First name"}
                type={"text"}
                name={"first_name"}
              />
            </Grid2>

            <Grid2 size={6}>
              <Input
                className={"default-input"}
                placeholder={"Last name"}
                type={"text"}
                name={"last_name"}
              />
            </Grid2>

            <Grid2 size={12}>
              <Input
                className={"default-input"}
                placeholder={"Email"}
                type={"email"}
                name={"email"}
              />
            </Grid2>

          </Grid2>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Paper>

      </Dialog>
    </div>
  )
}