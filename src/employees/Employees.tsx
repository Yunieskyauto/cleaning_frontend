import React, { useEffect, useState,} from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { IoMdAdd } from "react-icons/io";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from "../components/input/Input.tsx";
import "./employees.scss"
import { Box, Grid2, Paper } from "@mui/material";
import { DataGrid, GridColDef,  GridRowId, GridRowsProp} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {GridActionsCellItem,} from '@mui/x-data-grid';



export interface Employee {
  id: number;
  firstName: string,
  lastName: string,
  email: string
}

export const Employees = () => {
  const initial: GridRowsProp = [{ id: 0, firstName: "", lastName: "", email: "" }] 

  const { employee } = useOutletContext()
  const navigate = useNavigate()

  const [employees, setEmployees] = useState(initial)
  const [updateList, setUpdateList] = useState(false)


  const addEmployee = () => {
    setOpen(true);
    setUpdateList(false)
  }

  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Extract and parse form data
    const formData = new FormData(event.currentTarget);
    const { email, first_name: firstName, last_name: lastName } = Object.fromEntries(formData.entries()) as {
      email: string;
      first_name: string;
      last_name: string;
    };
  
    // Early exit if access token is missing
    if (!employee.accessToken) {
      console.error("Error: Access token is missing.");
      return;
    }
  
    try {
      // Create headers
      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${employee.accessToken}`,
      });
  
      // Build request options
      const requestOptions: RequestInit = {
        method: "POST",
        headers,
        body: JSON.stringify({ firstName, lastName, email }),
      };
  
      // Make the API call
      const response = await fetch("/admin/register-cleaner", requestOptions);
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Failed to register cleaner. Status: ${response.status} ${response.statusText}`);
      }
  
      // Parse the response JSON
      const data = await response.json();
  
      // Handle successful response
      if (!data.error) {
        console.log("Registration successful:", data);
         // Map and set employees in one state update
         const formattedEmployees = data.data.cleanerList.map((item: any) => ({
          id: item.id,
          firstName: item.first_name,
          lastName: item.last_name,
          email: item.email,
        }));
        setEmployees(formattedEmployees);
      } else {
        console.error("Server returned an error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    } finally {
      // Ensure the dialog closes in all cases
      setOpen(false);
    }
  };
  
  
  useEffect(() => {
    // Early exit if the access token is not available
    if (!employee.accessToken) {
      navigate("/");
      return;
    }
  
    // Helper function to create headers
    const createHeaders = () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${employee.accessToken}`);
      return headers;
    };
  
    // Fetch employee data
    const fetchEmployees = async () => {
      try {
        const headers = createHeaders();
        const response = await fetch("/admin/employees", { method: "GET", headers });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch employees: ${response.statusText}`);
        }
  
        const data = await response.json();
  
        // Map and set employees in one state update
        const formattedEmployees = data.map((item: any) => ({
          id: item.id,
          firstName: item.first_name,
          lastName: item.last_name,
          email: item.email,
        }));
  
        setEmployees(formattedEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
  
    fetchEmployees();
  }, [updateList]);
  

  const handleDeleteEmployee = (id: number) => async () => {
    // Early exit if access token is missing
    if (!employee.accessToken) {
      console.error("Error: Access token is missing.");
      return;
    }
  
    try {
      // Create headers
      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${employee.accessToken}`,
      });
  
      // Build request options
      const requestOptions: RequestInit = {
        method: "POST",
        headers,
        body: JSON.stringify({ id }),
      };
  
      // Make the API call
      const response = await fetch("/admin/remove-cleaner", requestOptions);
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Failed to delete employee. Status: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Update the list if deletion was successful
      if (data !== -1) {
        console.log(data);
        // Map and set employees in one state update
        const formattedEmployees = data.data.map((item: any) => ({
          id: item.id,
          firstName: item.first_name,
          lastName: item.last_name,
          email: item.email,
        }));
  
        setEmployees(formattedEmployees); 
      } else {
        console.error("Server returned an error during deletion:", data);
      }
    } catch (error) {
      console.error("An error occurred during employee deletion:", error);
    }
  };
  

  const handleEditEmployee = (id) => () => {
    console.log(id)
  }


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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={ handleEditEmployee(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteEmployee(id)}
            color="inherit"
          />,
        ];
      },
    }
  ];
  
  const paginationModel = { page: 0, pageSize: 5 };
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