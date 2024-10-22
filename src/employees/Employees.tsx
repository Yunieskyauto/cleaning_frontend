import React, { useEffect, useState, useMemo, Fragment } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
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

export const Employees = () => {
  const { employee } = useOutletContext()
  const navigate = useNavigate()

  const [employees, setEmployees] = useState([{ "firstName": "", "lastName": "", "email": "" }])

  const [colDefs, setColDefs] = useState([
    { field: "firstName" },
    { field: "lastName" },
    { field: "email" },
  ])

  const defaultColDef = useMemo(() => {
    return {
      width: 500,
      cellStyle: { fontWeight: 'bold' },
    };
  }, []);

  const addEmployee = () => {
    setOpen(true);
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
    console.log(formJson);
    setOpen(false);
  }

  useEffect(() => {
    let x = []
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
            let empl = {
              firstName: item.first_name,
              lastName: item.last_Name,
              email: item.email,
            }
            setEmployees(employees => [...employees, empl])
          })
        })
    } else {
      navigate("/")
    }

  }, [])
  return (
    <div className="Employees">
        // wrapping container with theme & size
      <div
        className="ag-theme-quartz-dark" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={employees}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
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